from __future__ import annotations

import json
from pathlib import Path

import pytest

from server import shadow_audit


def proposal(path: str, content: str) -> dict[str, object]:
    return {"files": [{"path": path, "content": content}]}


def test_clean_python_code_passes() -> None:
    report = shadow_audit.audit_payload(
        proposal("src/example.py", "def add(a, b):\n    return a + b\n"),
        job_id="clean-python",
    )

    assert report["status"] == "AUDIT_PASS"
    assert report["checked_files"] == ["src/example.py"]
    assert report["reasons"] == []


@pytest.mark.parametrize(
    "content",
    [
        "import subprocess\nsubprocess.run(['whoami'])\n",
        "import os as operating_system\noperating_system.system('whoami')\n",
        "import os\nshell = os.system\nshell('whoami')\n",
        "import os as operating_system\ngetattr(operating_system, 'system')('whoami')\n",
        "from os import system as shell\nshell('whoami')\n",
        "eval('1 + 1')\n",
        "exec('pass')\n",
        "__import__('os')\n",
    ],
)
def test_forbidden_python_calls_are_quarantined(content: str) -> None:
    report = shadow_audit.audit_payload(
        proposal("server/proposal.py", content),
        job_id="unsafe-python",
    )

    assert report["status"] == "QUARANTINED"
    assert report["reasons"]


def test_python_syntax_error_is_quarantined() -> None:
    report = shadow_audit.audit_payload(
        proposal("tests/proposal.py", "def broken(:\n    pass\n"),
        job_id="invalid-python",
    )

    assert report["status"] == "QUARANTINED"
    assert report["reasons"][0]["reason"] == "Python syntax error"


@pytest.mark.parametrize(
    ("path", "content"),
    [
        ("../../outside.py", "pass\n"),
        ("dna/FACE_LOCK.json", '{"status":"DER"}'),
        ("persona/EMILIA_SYSTEM_CHARACTER.md", "replacement"),
        ("persona/SYSTEM_CORE.txt", "replacement"),
        (".env", "SECRET=value"),
        ("README.md", "outside an allowed folder"),
    ],
)
def test_protected_and_out_of_scope_paths_are_quarantined(
    path: str, content: str
) -> None:
    report = shadow_audit.audit_payload(
        proposal(path, content),
        job_id="blocked-path",
    )

    assert report["status"] == "QUARANTINED"
    assert report["reasons"]


@pytest.mark.parametrize(
    "content",
    [
        '{"status":"EST"}',
        '{"record":{"status":"EST"}}',
    ],
)
def test_json_est_status_is_quarantined(content: str) -> None:
    report = shadow_audit.audit_payload(
        proposal("data/proposal.json", content),
        job_id="est-json",
    )

    assert report["status"] == "QUARANTINED"
    assert any("status" in reason["reason"] for reason in report["reasons"])


@pytest.mark.parametrize(
    "content",
    [
        "{not json}",
        '{"status":"DER","status":"HYP"}',
    ],
)
def test_invalid_or_duplicate_key_json_is_quarantined(content: str) -> None:
    report = shadow_audit.audit_payload(
        proposal("data/proposal.json", content),
        job_id="invalid-json",
    )

    assert report["status"] == "QUARANTINED"
    assert report["reasons"]


def test_json_without_est_passes() -> None:
    report = shadow_audit.audit_payload(
        proposal("data/proposal.json", '{"status":"DER"}'),
        job_id="derived-json",
    )

    assert report["status"] == "AUDIT_PASS"


def test_once_writes_audit_report_and_skips_unchanged_jobs(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
) -> None:
    quarantine_dir = tmp_path / "artifacts" / "router-quarantine"
    audit_dir = tmp_path / "artifacts" / "router-audit"
    quarantine_dir.mkdir(parents=True)
    job = quarantine_dir / "job-01.json"
    job.write_text(
        json.dumps(proposal("server/proposal.py", "value = 1\n")),
        encoding="utf-8",
    )
    monkeypatch.setattr(shadow_audit, "REPO_ROOT", tmp_path)
    monkeypatch.setattr(shadow_audit, "QUARANTINE_DIR", quarantine_dir)
    monkeypatch.setattr(shadow_audit, "AUDIT_DIR", audit_dir)

    assert shadow_audit.main(["--once"]) == 0
    assert capsys.readouterr().out.strip() == "processed=1"
    audit_file = audit_dir / "job-01.audit.json"
    report = json.loads(audit_file.read_text(encoding="utf-8"))
    assert report["status"] == "AUDIT_PASS"
    original_timestamp = report["audited_at_utc"]

    assert shadow_audit.process_pending_jobs() == 1
    assert (
        json.loads(audit_file.read_text(encoding="utf-8"))["audited_at_utc"]
        == original_timestamp
    )


def test_polling_intervals_are_bounded_to_local_idle_and_active_modes() -> None:
    assert shadow_audit.POLL_INTERVAL_SECONDS == 0.125
    assert shadow_audit.IDLE_INTERVAL_SECONDS > shadow_audit.POLL_INTERVAL_SECONDS
