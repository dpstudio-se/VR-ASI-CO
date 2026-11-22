from __future__ import annotations

import argparse
import ast
import hashlib
import json
import logging
import os
import re
import tempfile
import time
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath
from typing import Any

from server.shadow_audit_rotate import rotate_audit_reports

REPO_ROOT = Path(__file__).resolve().parents[1]
ARTIFACT_ROOT = REPO_ROOT / "artifacts"
QUARANTINE_DIR = ARTIFACT_ROOT / "router-quarantine"
AUDIT_DIR = ARTIFACT_ROOT / "router-audit"
POLL_INTERVAL_SECONDS = 0.125
IDLE_INTERVAL_SECONDS = 1.0
MAX_JOB_BYTES = 1_048_576
MAX_FILES_PER_JOB = 20
MAX_FILE_BYTES = 131_072
JOB_ID_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$")
ALLOWED_TOP_LEVEL_DIRS = frozenset(
    {
        "data",
        "docs",
        "dna",
        "persona",
        "prompts",
        "runtime",
        "scripts",
        "server",
        "src",
        "tests",
    }
)
PROTECTED_PATHS = frozenset(
    {
        "dna/face_lock.json",
        "persona/emilia_system_character.md",
        "persona/system_core.txt",
    }
)

LOGGER = logging.getLogger("shadow-audit")


class DuplicateJsonKey(ValueError):
    pass


def _unique_object(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for key, value in pairs:
        if key in result:
            raise DuplicateJsonKey(f"duplicate JSON key: {key}")
        result[key] = value
    return result


def _json_loads(text: str) -> Any:
    return json.loads(text, object_pairs_hook=_unique_object)


def _safe_artifact_directory(path: Path, *, create: bool) -> Path:
    root = REPO_ROOT.resolve(strict=True)
    if path.is_symlink():
        raise OSError("artifact directories cannot be symlinks")
    if create:
        path.mkdir(parents=True, exist_ok=True)
    resolved = path.resolve(strict=True)
    resolved.relative_to(root)
    return resolved


def _job_id_from_path(path: Path) -> str:
    job_id = path.stem
    if not JOB_ID_RE.fullmatch(job_id):
        digest = hashlib.sha256(
            path.name.encode("utf-8", errors="surrogatepass")
        ).hexdigest()
        return f"invalid-{digest[:20]}"
    return job_id


def _target_path(raw_path: Any, repo_root: Path) -> tuple[str | None, str | None]:
    if not isinstance(raw_path, str) or not raw_path or len(raw_path) > 512:
        return (
            None,
            "path must be a non-empty repo-relative path of at most 512 characters",
        )
    if "\x00" in raw_path or "\\" in raw_path:
        return None, "path must use safe repo-relative forward-slash syntax"
    parts = raw_path.split("/")
    if any(part in {"", ".", ".."} for part in parts) or ":" in parts[0]:
        return None, "path traversal and absolute paths are not allowed"

    relative = PurePosixPath(raw_path)
    normalized = relative.as_posix()
    lowered_parts = [part.casefold() for part in relative.parts]
    if any(part == ".git" or part.startswith(".env") for part in lowered_parts):
        return normalized, "path targets protected Git metadata or environment secrets"
    if normalized.casefold() in PROTECTED_PATHS:
        return normalized, "path targets a protected identity/core file"
    if not relative.parts or lowered_parts[0] not in ALLOWED_TOP_LEVEL_DIRS:
        return normalized, "path is outside the Shadow Audit allowed folders"

    root = repo_root.resolve(strict=True)
    candidate = root.joinpath(*relative.parts)
    current = root
    for part in relative.parts:
        current = current / part
        if current.is_symlink():
            return normalized, "path traverses a symlink"
    try:
        candidate.resolve(strict=False).relative_to(root)
    except (OSError, ValueError):
        return normalized, "resolved path is outside the repository"
    return normalized, None


class _ForbiddenCallVisitor(ast.NodeVisitor):
    def __init__(self, tree: ast.AST):
        self.os_modules: set[str] = {"os"}
        self.subprocess_modules: set[str] = {"subprocess"}
        self.builtin_modules: set[str] = {"builtins"}
        self.forbidden_names: set[str] = {"eval", "exec", "__import__"}
        self.findings: list[dict[str, int | str]] = []
        self.generic_visit(tree)
        self.findings.clear()
        self.visit(tree)

    def visit_Import(self, node: ast.Import) -> None:
        for alias in node.names:
            root_name = alias.name.split(".", 1)[0]
            local_name = alias.asname or root_name
            if root_name == "subprocess":
                self._add("subprocess import is not allowed", node)
                self.subprocess_modules.add(local_name)
            elif root_name == "os":
                self.os_modules.add(local_name)
            elif root_name == "builtins":
                self.builtin_modules.add(local_name)

    def visit_ImportFrom(self, node: ast.ImportFrom) -> None:
        module = (node.module or "").split(".", 1)[0]
        for alias in node.names:
            local_name = alias.asname or alias.name
            if module == "subprocess":
                self._add("subprocess import is not allowed", node)
                self.forbidden_names.add(local_name)
            elif (module == "os" and alias.name == "system") or (
                module == "builtins" and alias.name in {"eval", "exec", "__import__"}
            ):
                self.forbidden_names.add(local_name)

    def visit_Call(self, node: ast.Call) -> None:
        function = node.func
        if isinstance(function, ast.Name) and function.id in self.forbidden_names:
            self._add(f"call to {function.id} is not allowed", node)
        elif isinstance(function, ast.Attribute) and isinstance(
            function.value, ast.Name
        ):
            module = function.value.id
            if module in self.builtin_modules and function.attr in self.forbidden_names:
                self._add(f"builtins.{function.attr} call is not allowed", node)
        if (
            isinstance(function, ast.Name)
            and function.id == "getattr"
            and len(node.args) >= 2
            and isinstance(node.args[0], ast.Name)
            and node.args[0].id in self.os_modules
            and isinstance(node.args[1], ast.Constant)
            and node.args[1].value == "system"
        ):
            self._add("dynamic lookup of os.system is not allowed", node)
        self.generic_visit(node)

    def visit_Attribute(self, node: ast.Attribute) -> None:
        if isinstance(node.value, ast.Name):
            module = node.value.id
            if module in self.subprocess_modules:
                self._add(f"subprocess.{node.attr} reference is not allowed", node)
            elif module in self.os_modules and node.attr == "system":
                self._add("os.system reference is not allowed", node)
        self.generic_visit(node)

    def _add(self, reason: str, node: ast.AST) -> None:
        self.findings.append(
            {
                "reason": reason,
                "line": int(getattr(node, "lineno", 1)),
                "column": int(getattr(node, "col_offset", 0) + 1),
            }
        )


def _contains_est_status(value: Any) -> bool:
    if isinstance(value, dict):
        return any(
            (key == "status" and item == "EST") or _contains_est_status(item)
            for key, item in value.items()
        )
    if isinstance(value, list):
        return any(_contains_est_status(item) for item in value)
    return False


def audit_payload(
    payload: Any,
    *,
    job_id: str,
    repo_root: Path = REPO_ROOT,
) -> dict[str, Any]:
    reasons: list[dict[str, Any]] = []
    checked_files: list[str] = []
    if not isinstance(payload, dict) or not isinstance(payload.get("files"), list):
        reasons.append({"reason": "job must be a JSON object with a files array"})
        files: list[Any] = []
    else:
        files = payload["files"]
        if set(payload) - {"job_id", "repo", "base_sha", "files"}:
            reasons.append({"reason": "job contains unsupported top-level properties"})
        if len(files) == 0 or len(files) > MAX_FILES_PER_JOB:
            reasons.append(
                {"reason": f"files must contain 1 to {MAX_FILES_PER_JOB} entries"}
            )

    seen_paths: set[str] = set()
    for index, entry in enumerate(files):
        prefix = f"files[{index}]"
        if not isinstance(entry, dict) or set(entry) != {"path", "content"}:
            reasons.append(
                {
                    "file": prefix,
                    "reason": "file entry must contain path and content only",
                }
            )
            continue
        normalized, path_error = _target_path(entry.get("path"), repo_root)
        if path_error:
            reasons.append({"file": prefix, "path": normalized, "reason": path_error})
            continue
        if normalized is None:
            reasons.append(
                {"file": prefix, "reason": "target path could not be normalized"}
            )
            continue
        checked_files.append(normalized)
        if normalized.casefold() in seen_paths:
            reasons.append({"file": normalized, "reason": "duplicate target path"})
            continue
        seen_paths.add(normalized.casefold())

        content = entry.get("content")
        if not isinstance(content, str):
            reasons.append(
                {"file": normalized, "reason": "file content must be a string"}
            )
            continue
        if "\x00" in content:
            reasons.append(
                {"file": normalized, "reason": "binary content is not allowed"}
            )
            continue
        if len(content.encode("utf-8")) > MAX_FILE_BYTES:
            reasons.append(
                {"file": normalized, "reason": "file exceeds the size limit"}
            )
            continue

        suffix = PurePosixPath(normalized).suffix.casefold()
        if suffix == ".py":
            try:
                tree = ast.parse(content, filename=normalized)
            except SyntaxError as exc:
                reasons.append(
                    {
                        "file": normalized,
                        "reason": "Python syntax error",
                        "line": exc.lineno or 1,
                        "column": exc.offset or 1,
                    }
                )
                continue
            for finding in _ForbiddenCallVisitor(tree).findings:
                reasons.append({"file": normalized, **finding})
        elif suffix == ".json":
            try:
                parsed = _json_loads(content)
            except (json.JSONDecodeError, DuplicateJsonKey) as exc:
                reasons.append({"file": normalized, "reason": f"invalid JSON: {exc}"})
                continue
            if _contains_est_status(parsed):
                reasons.append(
                    {
                        "file": normalized,
                        "reason": 'JSON evidence gate rejects status "EST"',
                    }
                )

    return {
        "schema_version": 1,
        "job_id": job_id,
        "status": "QUARANTINED" if reasons else "AUDIT_PASS",
        "checked_files": checked_files,
        "reasons": reasons,
        "audited_at_utc": datetime.now(timezone.utc).isoformat(),
    }


def _write_report(audit_dir: Path, job_id: str, report: dict[str, Any]) -> None:
    destination = audit_dir / f"{job_id}.audit.json"
    encoded = (json.dumps(report, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    temporary_path: str | None = None
    try:
        with tempfile.NamedTemporaryFile(
            mode="wb", prefix=f".{job_id}.", suffix=".tmp", dir=audit_dir, delete=False
        ) as stream:
            temporary_path = stream.name
            stream.write(encoded)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary_path, destination)
    finally:
        if temporary_path and os.path.exists(temporary_path):
            os.unlink(temporary_path)


def _audit_job(job_file: Path, quarantine_dir: Path, audit_dir: Path) -> dict[str, Any]:
    job_id = _job_id_from_path(job_file)
    filename_is_valid = bool(JOB_ID_RE.fullmatch(job_file.stem))
    report_path = audit_dir / f"{job_id}.audit.json"
    input_sha256: str | None = None
    try:
        if job_file.is_symlink():
            raise OSError("quarantine job cannot be a symlink")
        job_file.resolve(strict=True).relative_to(quarantine_dir)
        raw = job_file.read_bytes()
        if len(raw) > MAX_JOB_BYTES:
            raise ValueError(f"job exceeds the {MAX_JOB_BYTES}-byte limit")
        input_sha256 = hashlib.sha256(raw).hexdigest()
        if report_path.is_file() and not report_path.is_symlink():
            try:
                previous = _json_loads(report_path.read_text(encoding="utf-8"))
            except (OSError, UnicodeError, json.JSONDecodeError, DuplicateJsonKey):
                previous = {}
            if (
                isinstance(previous, dict)
                and previous.get("input_sha256") == input_sha256
            ):
                return previous
        text = raw.decode("utf-8")
        payload = _json_loads(text)
        report = audit_payload(payload, job_id=job_id, repo_root=REPO_ROOT)
        if not filename_is_valid:
            report["status"] = "QUARANTINED"
            report["reasons"].append(
                {
                    "reason": "job filename must use letters, numbers, dot, underscore or hyphen"
                }
            )
        report["input_sha256"] = input_sha256
    except (
        OSError,
        UnicodeError,
        ValueError,
        json.JSONDecodeError,
        DuplicateJsonKey,
    ) as exc:
        report = {
            "schema_version": 1,
            "job_id": job_id,
            "status": "QUARANTINED",
            "checked_files": [],
            "reasons": [{"reason": f"job could not be safely read: {exc}"}],
            "audited_at_utc": datetime.now(timezone.utc).isoformat(),
            "input_sha256": input_sha256,
        }
    _write_report(audit_dir, job_id, report)
    return report


def process_pending_jobs() -> int:
    quarantine_dir = _safe_artifact_directory(QUARANTINE_DIR, create=True)
    audit_dir = _safe_artifact_directory(AUDIT_DIR, create=True)
    processed = 0
    for job_file in sorted(quarantine_dir.glob("*.json")):
        job_id = _job_id_from_path(job_file)
        report = _audit_job(job_file, quarantine_dir, audit_dir)
        if report.get("audited_at_utc"):
            processed += 1
            LOGGER.info("job=%s status=%s", job_id, report["status"])
    # Additive: rotate after processing so live reports stay bounded.
    try:
        rotate_audit_reports(audit_dir)
    except OSError as exc:
        LOGGER.warning("rotation skipped: %s", exc)
    return processed


def run_forever() -> None:
    while True:
        processed = process_pending_jobs()
        time.sleep(POLL_INTERVAL_SECONDS if processed else IDLE_INTERVAL_SECONDS)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Statically audit router quarantine jobs."
    )
    parser.add_argument(
        "--once",
        action="store_true",
        help="audit pending quarantine jobs once and exit",
    )
    args = parser.parse_args(argv)
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s shadow-audit %(message)s",
    )
    if args.once:
        count = process_pending_jobs()
        print(f"processed={count}")
        return 0
    run_forever()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
