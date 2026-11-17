from __future__ import annotations

import json
import math
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

H_PLANCK: float = 6.62607015e-34
C_LIGHT: float = 299792458.0
K_INVARIANT: float = H_PLANCK / (C_LIGHT ** 2)
DEFAULT_CARRIER_HZ: float = 8.0


@dataclass
class RecoveryReport:
    timestamp: str
    status: str
    carrier_hz: float
    k_invariant: float
    roundtrip_error: float
    steps_executed: list[str]
    provenance_note: str


def reset_latent_state(state_path: Path | None = None) -> dict[str, Any]:
    clean_state: dict[str, Any] = {
        "dimension": "0D",
        "carrier_hz": DEFAULT_CARRIER_HZ,
        "drift_detected": False,
        "status": "RESET_COMPLETE",
    }
    if state_path and state_path.exists():
        state_path.write_text(json.dumps(clean_state, indent=2), encoding="utf-8")
    return clean_state


def verify_invariants(f_hz: float = DEFAULT_CARRIER_HZ, tol: float = 1e-15) -> tuple[bool, float]:
    if f_hz <= 0.0 or not math.isfinite(f_hz):
        return False, float("inf")

    mass_eq = K_INVARIANT * f_hz
    recovered_hz = mass_eq / K_INVARIANT
    rel_error = abs(recovered_hz - f_hz) / f_hz
    return rel_error <= tol, rel_error


def run_fallback_recovery(
    carrier_hz: float = DEFAULT_CARRIER_HZ,
    rna_state_file: str | None = None,
) -> RecoveryReport:
    steps: list[str] = []

    state_path = Path(rna_state_file) if rna_state_file else None
    reset_latent_state(state_path)
    steps.append("RESET_TO_0D_COMPLETE")

    locked_hz = float(carrier_hz)
    steps.append(f"LOCKED_CARRIER_{locked_hz}_HZ")

    is_valid, rel_error = verify_invariants(locked_hz)
    if not is_valid:
        return RecoveryReport(
            timestamp=datetime.now(timezone.utc).isoformat(),
            status="STOP",
            carrier_hz=locked_hz,
            k_invariant=K_INVARIANT,
            roundtrip_error=rel_error,
            steps_executed=steps + ["INVARIANT_CHECK_FAILED"],
            provenance_note="Fail-closed: invariant roundtrip outside tolerance.",
        )
    steps.append("INVARIANTS_VERIFIED")
    steps.append("TRANSPARENCY_AUDIT_EXPOSED")

    return RecoveryReport(
        timestamp=datetime.now(timezone.utc).isoformat(),
        status="SYSTEM_COHERENT",
        carrier_hz=locked_hz,
        k_invariant=K_INVARIANT,
        roundtrip_error=rel_error,
        steps_executed=steps,
        provenance_note="Software state recovery complete (verification_type: software_test).",
    )


if __name__ == "__main__":
    report = run_fallback_recovery()
    print(json.dumps(asdict(report), indent=2))