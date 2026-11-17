from __future__ import annotations

import json
import logging
import threading
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

import pytest

from server import remote_router

TEST_SHA = "1" * 40


def make_repo(root: Path, files: dict[str, str] | None = None) -> Path:
    (root / ".git" / "refs" / "heads").mkdir(parents=True)
    (root / ".git" / "HEAD").write_text("ref: refs/heads/main\n", encoding="ascii")
    (root / ".git" / "refs" / "heads" / "main").write_text(
        f"{TEST_SHA}\n", encoding="ascii"
    )
    for name, content in (files or {}).items():
        target = root / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(content.encode("utf-8"))
    return root


@pytest.fixture
def router(tmp_path: Path, monkeypatch: pytest.MonkeyPatch):
    vr_root = make_repo(
        tmp_path / "vr",
        {"README.md": "# VR\n", "notes.txt": "private text\n"},
    )
    upi_root = make_repo(tmp_path / "upi", {"README.md": "# UPI\n"})
    monkeypatch.setattr(remote_router, "REPOS", {"vr-asi-co": vr_root, "upi": upi_root})
    monkeypatch.setenv("VR_ASI_ROUTER_READ_TOKEN", "read-test-token")
    monkeypatch.setenv("VR_ASI_ROUTER_WRITE_TOKEN", "write-test-token")
    server = remote_router.RouterServer(("127.0.0.1", 0), remote_router.RouterHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    yield f"http://127.0.0.1:{server.server_port}", vr_root, upi_root
    server.shutdown()
    server.server_close()
    thread.join(timeout=2)


def request(
    base_url: str,
    path: str,
    *,
    method: str = "GET",
    token: str | None = "read-test-token",
    agent_id: str | None = "pytest-agent",
    body: dict[str, Any] | None = None,
    content_type: str = "application/json",
) -> tuple[int, dict[str, Any]]:
    headers: dict[str, str] = {}
    if token is not None:
        headers["Authorization"] = f"Bearer {token}"
    if agent_id is not None:
        headers["X-Agent-Id"] = agent_id
    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers["Content-Type"] = content_type
    req = urllib.request.Request(
        base_url + path, data=data, headers=headers, method=method
    )
    try:
        with urllib.request.urlopen(req, timeout=2) as response:
            return response.status, json.loads(response.read())
    except urllib.error.HTTPError as error:
        return error.code, json.loads(error.read())


def test_missing_and_invalid_auth_are_rejected(router) -> None:
    base_url, _, _ = router
    status, _ = request(base_url, "/api/router/status?repo=vr-asi-co", token=None)
    assert status == 401
    status, _ = request(base_url, "/api/router/status?repo=vr-asi-co", token="wrong")
    assert status == 403
    status, _ = request(
        base_url,
        "/api/router/status?repo=vr-asi-co",
        agent_id=None,
    )
    assert status == 403


def test_logs_agent_id_without_bearer_token(router, caplog) -> None:
    base_url, _, _ = router
    caplog.set_level(logging.INFO, logger="remote-router")
    request(
        base_url,
        "/api/router/status?repo=vr-asi-co",
        token="read-test-token",
    )
    assert "pytest-agent" in caplog.text
    assert "read-test-token" not in caplog.text


def test_service_contract_is_loopback_only() -> None:
    assert remote_router.HOST == "127.0.0.1"
    assert remote_router.PORT == 8766


def test_get_status_reports_head_and_unknown_worktree_state(router) -> None:
    base_url, _, _ = router
    status, payload = request(base_url, "/api/router/status?repo=vr-asi-co")
    assert status == 200
    assert payload["repo"] == "vr-asi-co"
    assert payload["branch"] == "main"
    assert payload["head_sha"] == TEST_SHA
    assert payload["dirty"] is None
    assert payload["conflict"] is None
    assert payload["worktree_status"] == "not_checked_no_subprocesses"


def test_read_blocks_traversal_env_and_git_metadata(router) -> None:
    base_url, _, _ = router
    traversal = urllib.parse.urlencode({"repo": "vr-asi-co", "path": "../outside.txt"})
    assert request(base_url, f"/api/router/read?{traversal}")[0] == 400
    for path in (
        ".env",
        ".git/HEAD",
        ".env.local",
        ".ssh/id_ed25519",
    ):
        query = urllib.parse.urlencode({"repo": "vr-asi-co", "path": path})
        assert request(base_url, f"/api/router/read?{query}")[0] == 403
    query = urllib.parse.urlencode({"repo": "vr-asi-co", "path": "README.md:secret"})
    assert request(base_url, f"/api/router/read?{query}")[0] == 400


def test_read_returns_bounded_utf8_text(router) -> None:
    base_url, _, _ = router
    query = urllib.parse.urlencode({"repo": "vr-asi-co", "path": "README.md"})
    status, payload = request(base_url, f"/api/router/read?{query}")
    assert status == 200
    assert payload["content"] == "# VR\n"
    assert payload["bytes"] == len(b"# VR\n")


def test_read_blocks_private_key_material(router) -> None:
    base_url, vr_root, _ = router
    (vr_root / "key.txt").write_text(
        "-----BEGIN PRIVATE KEY-----\nredacted\n",
        encoding="utf-8",
    )
    query = urllib.parse.urlencode({"repo": "vr-asi-co", "path": "key.txt"})
    assert request(base_url, f"/api/router/read?{query}")[0] == 403


def test_read_rejects_symlink_outside_repo(
    router, monkeypatch: pytest.MonkeyPatch
) -> None:
    base_url, vr_root, _ = router
    link = vr_root / "linked.txt"
    original_is_symlink = Path.is_symlink

    def is_symlink(path: Path) -> bool:
        return path == link or original_is_symlink(path)

    monkeypatch.setattr(Path, "is_symlink", is_symlink)
    query = urllib.parse.urlencode({"repo": "vr-asi-co", "path": "linked.txt"})
    assert request(base_url, f"/api/router/read?{query}")[0] == 403


def test_propose_returns_diff_without_writing_or_creating_branch(router) -> None:
    base_url, vr_root, _ = router
    body = {
        "repo": "vr-asi-co",
        "base_sha": TEST_SHA,
        "files": [
            {"path": "README.md", "content": "# Updated\n"},
            {"path": "docs/proposal.md", "content": "Proposal only.\n"},
        ],
    }
    before_files = sorted(
        path.relative_to(vr_root).as_posix()
        for path in vr_root.rglob("*")
        if path.is_file() and ".git" not in path.parts
    )
    status, payload = request(
        base_url,
        "/api/router/propose",
        method="POST",
        token="write-test-token",
        body=body,
    )
    after_files = sorted(
        path.relative_to(vr_root).as_posix()
        for path in vr_root.rglob("*")
        if path.is_file() and ".git" not in path.parts
    )
    assert status == 200
    assert payload["status"] == "PREVIEW_ONLY"
    assert payload["applied"] is False
    assert payload["branch_created"] is False
    assert payload["pushed"] is False
    assert "--- README.md" in payload["diff"]
    assert "+++ README.md" in payload["diff"]
    assert "docs/proposal.md" in payload["diff"]
    assert before_files == after_files
    assert (vr_root / "README.md").read_text(encoding="utf-8") == "# VR\n"


def test_propose_requires_current_base_sha(router) -> None:
    base_url, _, _ = router
    status, _ = request(
        base_url,
        "/api/router/propose",
        method="POST",
        token="write-test-token",
        body={
            "repo": "vr-asi-co",
            "base_sha": "2" * 40,
            "files": [{"path": "proposal.md", "content": "No write.\n"}],
        },
    )
    assert status == 409


def test_propose_rejects_non_string_repo_and_non_json_content_type(router) -> None:
    base_url, _, _ = router
    status, _ = request(
        base_url,
        "/api/router/propose",
        method="POST",
        token="write-test-token",
        body={
            "repo": [],
            "base_sha": TEST_SHA,
            "files": [{"path": "proposal.md", "content": "preview\n"}],
        },
    )
    assert status == 400
    status, _ = request(
        base_url,
        "/api/router/propose",
        method="POST",
        token="write-test-token",
        body={
            "repo": "vr-asi-co",
            "base_sha": TEST_SHA,
            "files": [{"path": "proposal.md", "content": "preview\n"}],
        },
        content_type="text/plain",
    )
    assert status == 415


def test_propose_rejects_blocked_paths_and_extra_fields(router) -> None:
    base_url, _, _ = router
    for proposal in (
        {
            "repo": "vr-asi-co",
            "base_sha": TEST_SHA,
            "files": [{"path": ".env", "content": "secret"}],
        },
        {
            "repo": "vr-asi-co",
            "base_sha": TEST_SHA,
            "files": [{"path": "../outside.txt", "content": "no"}],
        },
        {
            "repo": "vr-asi-co",
            "base_sha": TEST_SHA,
            "files": [{"path": "proposal.md", "content": "no"}],
            "branch": "main",
        },
    ):
        status, _ = request(
            base_url,
            "/api/router/propose",
            method="POST",
            token="write-test-token",
            body=proposal,
        )
        assert status in {400, 403}


def test_post_uses_write_token_not_read_token(router) -> None:
    base_url, _, _ = router
    status, _ = request(
        base_url,
        "/api/router/propose",
        method="POST",
        token="read-test-token",
        body={
            "repo": "vr-asi-co",
            "base_sha": TEST_SHA,
            "files": [{"path": "proposal.md", "content": "preview\n"}],
        },
    )
    assert status == 403
