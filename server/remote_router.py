from __future__ import annotations

import difflib
import hmac
import json
import logging
import os
import re
import shutil
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path, PurePosixPath
from typing import Any
from urllib.parse import parse_qs, urlsplit

HOST = "127.0.0.1"
PORT = 8766
MAX_READ_BYTES = 256 * 1024
MAX_REQUEST_BYTES = 1024 * 1024
MAX_PROPOSAL_FILES = 20
MAX_FILE_BYTES = 128 * 1024

VR_ROOT = Path(__file__).resolve().parents[1]
UPI_ROOT = (
    VR_ROOT.parent / "Universal-Physics-Index-UPI" / "Universal-Physics-Index-UPI"
)
REPOS = {"vr-asi-co": VR_ROOT, "upi": UPI_ROOT}

AGENT_ID_RE = re.compile(r"^[A-Za-z0-9._:@/-]{1,80}$")
SHA_RE = re.compile(r"^(?:[0-9a-f]{40}|[0-9a-f]{64})$")
BRANCH_RE = re.compile(r"^ref: refs/heads/([A-Za-z0-9._/-]+)$")
FORBIDDEN_NAMES = {
    ".env",
    ".env.*",
    ".git-credentials",
    ".netrc",
    ".npmrc",
    ".pypirc",
    "id_rsa",
    "id_ed25519",
    "id_ecdsa",
    "id_dsa",
    "credentials",
    "secrets",
}
FORBIDDEN_DIRECTORIES = {".aws", ".azure", ".gnupg", ".ssh"}
FORBIDDEN_SUFFIXES = {".pem", ".key", ".p12", ".pfx", ".jks", ".kdbx", ".ppk"}
SECRET_CONTENT_RE = re.compile(
    r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"
    r"|(?:gh[pousr]_|github_pat_)[A-Za-z0-9_]{20,}"
    r"|AKIA[0-9A-Z]{16}",
    re.IGNORECASE,
)
TEXT_SUFFIXES = {
    ".c",
    ".cc",
    ".cpp",
    ".css",
    ".go",
    ".html",
    ".ini",
    ".java",
    ".js",
    ".json",
    ".md",
    ".mjs",
    ".py",
    ".sh",
    ".sql",
    ".toml",
    ".ts",
    ".tsx",
    ".txt",
    ".yaml",
    ".yml",
}

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s remote-router %(message)s",
)
LOGGER = logging.getLogger("remote-router")


class RouterError(Exception):
    def __init__(self, status: int, message: str):
        super().__init__(message)
        self.status = status
        self.message = message


def _repo_root(repo: str) -> Path:
    root = REPOS.get(repo)
    if root is None:
        raise RouterError(400, "unknown repo")
    try:
        resolved = root.resolve(strict=True)
    except OSError as exc:
        raise RouterError(404, "repo unavailable") from exc
    if not resolved.is_dir():
        raise RouterError(404, "repo unavailable")
    return resolved


def _git_dir(root: Path) -> Path:
    git_entry = root / ".git"
    if git_entry.is_symlink():
        raise RouterError(503, "git metadata unavailable")
    try:
        if git_entry.is_dir():
            return git_entry.resolve(strict=True)
        if git_entry.is_file():
            pointer = git_entry.read_text(encoding="utf-8").strip()
            if not pointer.startswith("gitdir: "):
                raise RouterError(503, "git metadata unavailable")
            return (root / pointer[8:]).resolve(strict=True)
    except (OSError, UnicodeError) as exc:
        raise RouterError(503, "git metadata unavailable") from exc
    raise RouterError(503, "git metadata unavailable")


def _git_common_dir(git_dir: Path) -> Path:
    common_file = git_dir / "commondir"
    if not common_file.exists():
        return git_dir
    try:
        common = common_file.read_text(encoding="utf-8").strip()
        if not common:
            raise RouterError(503, "git common directory unavailable")
        return (git_dir / common).resolve(strict=True)
    except (OSError, UnicodeError) as exc:
        raise RouterError(503, "git common directory unavailable") from exc


def _git_head(repo: str) -> dict[str, str]:
    root = _repo_root(repo)
    git_dir = _git_dir(root)
    common_dir = _git_common_dir(git_dir)
    try:
        head = (git_dir / "HEAD").read_text(encoding="ascii").strip()
    except (OSError, UnicodeError) as exc:
        raise RouterError(503, "git HEAD unavailable") from exc

    match = BRANCH_RE.fullmatch(head)
    if match is None:
        if not SHA_RE.fullmatch(head):
            raise RouterError(503, "git HEAD is invalid")
        return {"branch": "(detached)", "head_sha": head}

    ref = match.group(1)
    if any(part in {"", ".", ".."} for part in ref.split("/")):
        raise RouterError(503, "git HEAD is invalid")
    ref_file = common_dir.joinpath("refs", "heads", *ref.split("/"))
    try:
        sha = ref_file.read_text(encoding="ascii").strip()
    except FileNotFoundError:
        sha = ""
    except (OSError, UnicodeError) as exc:
        raise RouterError(503, "git ref unavailable") from exc

    if not sha:
        try:
            packed_refs = (common_dir / "packed-refs").read_text(encoding="ascii")
        except FileNotFoundError:
            packed_refs = ""
        except (OSError, UnicodeError) as exc:
            raise RouterError(503, "git refs unavailable") from exc
        for line in packed_refs.splitlines():
            fields = line.split()
            if len(fields) == 2 and fields[1] == f"refs/heads/{ref}":
                sha = fields[0]
                break

    if not SHA_RE.fullmatch(sha):
        raise RouterError(503, "git branch ref unavailable")
    return {"branch": ref, "head_sha": sha}


def _safe_relative_path(raw_path: str) -> PurePosixPath:
    if not raw_path or len(raw_path) > 512 or "\x00" in raw_path or "\\" in raw_path:
        raise RouterError(400, "invalid repo-relative path")
    relative = PurePosixPath(raw_path)
    if relative.is_absolute() or any(
        part in {"", ".", ".."} for part in raw_path.split("/")
    ):
        raise RouterError(400, "invalid repo-relative path")
    if any(
        ":" in part
        or part.rstrip(" .") != part
        or any(character in part for character in '<>"|?*')
        for part in relative.parts
    ):
        raise RouterError(400, "invalid repo-relative path")
    if relative.parts and re.match(r"^[A-Za-z]:", relative.parts[0]):
        raise RouterError(400, "invalid repo-relative path")

    for part in relative.parts:
        lower = part.lower()
        if (
            lower == ".git"
            or lower in FORBIDDEN_DIRECTORIES
            or lower.startswith(".env")
        ):
            raise RouterError(403, "path is blocked")
        if lower in FORBIDDEN_NAMES or lower.endswith((*FORBIDDEN_SUFFIXES, ".secret")):
            raise RouterError(403, "path is blocked")
    return relative


def _repo_file(repo: str, relative: PurePosixPath, *, must_exist: bool) -> Path:
    root = _repo_root(repo)
    candidate = root.joinpath(*relative.parts)
    current = root
    for part in relative.parts:
        current = current / part
        if current.is_symlink():
            raise RouterError(403, "symlink paths are blocked")
    try:
        resolved = candidate.resolve(strict=must_exist)
        resolved.relative_to(root)
    except FileNotFoundError as exc:
        raise RouterError(404, "file not found") from exc
    except (OSError, ValueError) as exc:
        raise RouterError(403, "path is outside the repo") from exc
    return resolved


def _read_text(path: Path, limit: int) -> str:
    try:
        if not path.is_file():
            raise RouterError(400, "path is not a regular file")
        if path.stat().st_size > limit:
            raise RouterError(413, "file exceeds size limit")
        content = path.read_bytes()
    except RouterError:
        raise
    except OSError as exc:
        raise RouterError(404, "file not readable") from exc
    if len(content) > limit:
        raise RouterError(413, "file exceeds size limit")
    try:
        text = content.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise RouterError(415, "file is not UTF-8 text") from exc
    if "\x00" in text:
        raise RouterError(415, "binary files are not supported")
    if SECRET_CONTENT_RE.search(text):
        raise RouterError(403, "file appears to contain secret material")
    return text


def _status(repo: str) -> dict[str, Any]:
    root = _repo_root(repo)
    git = _git_head(repo)
    node = shutil.which("node")
    npm = shutil.which("npm") or shutil.which("npm.cmd")
    tools: dict[str, bool | str] = {
        "node": bool(node),
        "npm": bool(npm),
        "python": bool(shutil.which("python")),
        "upi": None,
        "execution": "not_available_through_api",
    }
    if repo == "upi":
        python = root / ".venv" / "Scripts" / "python.exe"
        upi = root / ".venv" / "Scripts" / "upi.exe"
        tools["python"] = python.is_file()
        tools["upi"] = upi.is_file()
    return {
        "repo": repo,
        **git,
        "dirty": None,
        "conflict": None,
        "worktree_status": "not_checked_no_subprocesses",
        "tools": tools,
    }


def _preview_proposal(payload: dict[str, Any]) -> dict[str, Any]:
    if set(payload) != {"repo", "base_sha", "files"}:
        raise RouterError(400, "proposal must contain repo, base_sha and files only")
    repo = payload.get("repo")
    base_sha = payload.get("base_sha")
    files = payload.get("files")
    if not isinstance(repo, str) or repo not in REPOS:
        raise RouterError(400, "unknown repo")
    if not isinstance(base_sha, str) or not SHA_RE.fullmatch(base_sha):
        raise RouterError(400, "base_sha must be a full Git SHA")
    head = _git_head(repo)
    if base_sha != head["head_sha"]:
        raise RouterError(409, "base_sha does not match the current local HEAD")
    if not isinstance(files, list) or not files or len(files) > MAX_PROPOSAL_FILES:
        raise RouterError(400, "files must contain 1 to 20 entries")

    diff: list[str] = []
    seen: set[str] = set()
    for entry in files:
        if not isinstance(entry, dict) or set(entry) != {"path", "content"}:
            raise RouterError(400, "each file must contain path and content only")
        raw_path = entry.get("path")
        content = entry.get("content")
        if not isinstance(raw_path, str) or not isinstance(content, str):
            raise RouterError(400, "path and content must be strings")
        relative = _safe_relative_path(raw_path)
        normalized = relative.as_posix()
        if normalized in seen:
            raise RouterError(400, "duplicate proposal path")
        seen.add(normalized)
        if Path(normalized).suffix.lower() not in TEXT_SUFFIXES:
            raise RouterError(415, "proposal file type is not allowed")
        encoded = content.encode("utf-8")
        if len(encoded) > MAX_FILE_BYTES or "\x00" in content:
            raise RouterError(413, "proposal file exceeds size limit or is binary")

        target = _repo_file(repo, relative, must_exist=False)
        if target.exists():
            before = _read_text(target, MAX_FILE_BYTES)
            old_lines = before.splitlines(keepends=True)
            from_name = normalized
        else:
            old_lines = []
            from_name = "/dev/null"
        new_lines = content.splitlines(keepends=True)
        if content and not content.endswith(("\n", "\r")):
            new_lines[-1] += "\n"
        diff.extend(
            difflib.unified_diff(
                old_lines,
                new_lines,
                fromfile=from_name,
                tofile=normalized,
                lineterm="\n",
            )
        )

    return {
        "repo": repo,
        "base_sha": base_sha,
        "status": "PREVIEW_ONLY",
        "applied": False,
        "branch_created": False,
        "pushed": False,
        "diff": "".join(diff),
    }


class RouterServer(ThreadingHTTPServer):
    daemon_threads = True
    allow_reuse_address = True


class RouterHandler(BaseHTTPRequestHandler):
    server_version = "VR-ASI-CO-Remote-Router"
    sys_version = ""

    def log_message(self, _format: str, *_args: Any) -> None:
        return

    def _json(self, status: int, payload: dict[str, Any]) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(body)

    def _agent_id(self) -> str | None:
        agent_id = self.headers.get("X-Agent-Id", "")
        if not AGENT_ID_RE.fullmatch(agent_id):
            return None
        return agent_id

    def _authorize(self, method: str) -> str | None:
        agent_id = self._agent_id()
        if agent_id is None:
            self._json(403, {"error": "valid X-Agent-Id header required"})
            return None
        token_name = (
            "VR_ASI_ROUTER_READ_TOKEN"
            if method == "GET"
            else "VR_ASI_ROUTER_WRITE_TOKEN"
        )
        expected = os.environ.get(token_name, "")
        if not expected:
            self._json(503, {"error": "router authorization is not configured"})
            LOGGER.warning("agent=%s method=%s auth=unconfigured", agent_id, method)
            return None
        authorization = self.headers.get("Authorization", "")
        supplied = authorization[7:] if authorization.startswith("Bearer ") else ""
        if not supplied:
            self._json(401, {"error": "bearer token required"})
            LOGGER.info("agent=%s method=%s auth=missing", agent_id, method)
            return None
        if not hmac.compare_digest(supplied, expected):
            self._json(403, {"error": "invalid bearer token"})
            LOGGER.warning("agent=%s method=%s auth=denied", agent_id, method)
            return None
        return agent_id

    def _handle_error(self, error: RouterError, agent_id: str | None) -> None:
        if agent_id:
            LOGGER.info(
                "agent=%s method=%s path=%s status=%s",
                agent_id,
                self.command,
                urlsplit(self.path).path,
                error.status,
            )
        self._json(error.status, {"error": error.message})

    def do_GET(self) -> None:
        agent_id = self._authorize("GET")
        if agent_id is None:
            return
        parsed = urlsplit(self.path)
        try:
            if parsed.path == "/api/router/status":
                query = parse_qs(parsed.query, strict_parsing=True)
                if set(query) - {"repo"}:
                    raise RouterError(400, "unsupported query parameter")
                repos = query.get("repo", list(REPOS))
                if not repos or any(repo not in REPOS for repo in repos):
                    raise RouterError(400, "unknown repo")
                result = [_status(repo) for repo in repos]
                payload: dict[str, Any] = {"repos": result}
                if len(result) == 1:
                    payload.update(result[0])
                LOGGER.info(
                    "agent=%s method=GET path=/api/router/status status=200",
                    agent_id,
                )
                self._json(200, payload)
            elif parsed.path == "/api/router/read":
                query = parse_qs(parsed.query, strict_parsing=True)
                if set(query) != {"repo", "path"}:
                    raise RouterError(
                        400, "repo and path query parameters are required"
                    )
                repo = query["repo"][0]
                if (
                    repo not in REPOS
                    or len(query["repo"]) != 1
                    or len(query["path"]) != 1
                ):
                    raise RouterError(400, "invalid repo or path")
                relative = _safe_relative_path(query["path"][0])
                if relative.suffix.lower() not in TEXT_SUFFIXES:
                    raise RouterError(415, "file type is not allowed")
                file_path = _repo_file(repo, relative, must_exist=True)
                text = _read_text(file_path, MAX_READ_BYTES)
                LOGGER.info(
                    "agent=%s method=GET path=/api/router/read status=200",
                    agent_id,
                )
                self._json(
                    200,
                    {
                        "repo": repo,
                        "path": relative.as_posix(),
                        "content": text,
                        "bytes": len(text.encode("utf-8")),
                    },
                )
            else:
                raise RouterError(404, "endpoint not found")
        except RouterError as error:
            self._handle_error(error, agent_id)
        except (OSError, ValueError) as error:
            self._handle_error(RouterError(400, "invalid request"), agent_id)
            LOGGER.info("request rejected: %s", type(error).__name__)

    def do_POST(self) -> None:
        agent_id = self._authorize("POST")
        if agent_id is None:
            return
        if urlsplit(self.path).path != "/api/router/propose":
            self._json(404, {"error": "endpoint not found"})
            return
        try:
            content_type = self.headers.get("Content-Type", "").split(";", 1)[0].strip()
            if content_type.lower() != "application/json":
                raise RouterError(415, "Content-Type must be application/json")
            length = self.headers.get("Content-Length", "")
            if not length.isascii() or not length.isdecimal():
                raise RouterError(411, "Content-Length is required")
            size = int(length)
            if size > MAX_REQUEST_BYTES:
                raise RouterError(413, "request exceeds size limit")
            raw = self.rfile.read(size)
            try:
                payload = json.loads(raw.decode("utf-8"))
            except (UnicodeDecodeError, json.JSONDecodeError) as error:
                raise RouterError(400, "request must be UTF-8 JSON") from error
            if not isinstance(payload, dict):
                raise RouterError(400, "request must be a JSON object")
            self._json(200, _preview_proposal(payload))
            LOGGER.info(
                "agent=%s method=POST path=/api/router/propose result=preview-only",
                agent_id,
            )
        except RouterError as error:
            self._handle_error(error, agent_id)
        except (OSError, ValueError) as error:
            self._handle_error(RouterError(400, "invalid request"), agent_id)
            LOGGER.info("request rejected: %s", type(error).__name__)


def serve() -> None:
    server = RouterServer((HOST, PORT), RouterHandler)
    LOGGER.info("listening on %s:%s; proposal mode is preview-only", HOST, PORT)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        LOGGER.info("shutdown requested")
    finally:
        server.server_close()


if __name__ == "__main__":
    serve()
