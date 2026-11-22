from __future__ import annotations

import argparse
import logging
import os
import shutil
import time
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
ARTIFACT_ROOT = REPO_ROOT / "artifacts"
AUDIT_DIR = ARTIFACT_ROOT / "router-audit"
ARCHIVE_DIR = AUDIT_DIR / "archive"

# Retention: keep newest N reports; archive anything older than AGE_DAYS.
KEEP_COUNT = 50
AGE_DAYS = 14

LOGGER = logging.getLogger("shadow-audit-rotate")


def _safe_dir(path: Path, *, create: bool) -> Path:
    root = REPO_ROOT.resolve(strict=True)
    if path.is_symlink():
        raise OSError("rotation directories cannot be symlinks")
    if create:
        path.mkdir(parents=True, exist_ok=True)
    resolved = path.resolve(strict=True)
    resolved.relative_to(root)
    return resolved


def rotate_audit_reports(
    audit_dir: Path = AUDIT_DIR,
    *,
    keep_count: int = KEEP_COUNT,
    age_days: int = AGE_DAYS,
) -> dict[str, int]:
    """Rotate *.audit.json reports.

    - Files older than age_days are moved to archive/.
    - If more than keep_count remain, the oldest are archived.
    - Never deletes; only archives. Never touches non-audit files.
    """
    audit_dir = _safe_dir(audit_dir, create=True)
    archive_dir = _safe_dir(ARCHIVE_DIR if audit_dir == AUDIT_DIR else audit_dir / "archive", create=True)

    now = time.time()
    age_seconds = age_days * 86400
    reports = sorted(
        (p for p in audit_dir.glob("*.audit.json") if p.is_file() and not p.is_symlink()),
        key=lambda p: p.stat().st_mtime,
        reverse=True,
    )

    archived = 0
    for path in reports:
        age = now - path.stat().st_mtime
        over_age = age > age_seconds
        over_count = reports.index(path) >= keep_count
        if not (over_age or over_count):
            continue
        stamp = datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc).strftime("%Y%m%dT%H%M%S")
        dest = archive_dir / f"{stamp}-{path.name}"
        # avoid clobber
        if dest.exists():
            dest = archive_dir / f"{stamp}-{path.stem}-{int(now)}.audit.json"
        shutil.move(str(path), str(dest))
        archived += 1
        LOGGER.info("archived %s -> %s", path.name, dest.name)

    return {"scanned": len(reports), "archived": archived, "kept": len(reports) - archived}


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Rotate Shadow Audit reports.")
    parser.add_argument("--keep", type=int, default=KEEP_COUNT, help="max live reports to keep")
    parser.add_argument("--age-days", type=int, default=AGE_DAYS, help="archive reports older than this")
    args = parser.parse_args(argv)
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
    result = rotate_audit_reports(keep_count=args.keep, age_days=args.age_days)
    print(f"scanned={result['scanned']} archived={result['archived']} kept={result['kept']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
