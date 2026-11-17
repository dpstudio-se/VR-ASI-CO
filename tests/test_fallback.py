import json
from pathlib import Path
from runtime.fallback import (
    DEFAULT_CARRIER_HZ,
    K_INVARIANT,
    run_fallback_recovery,
    verify_invariants,
)


def test_verify_invariants_valid_frequency() -> None:
    is_valid, rel_error = verify_invariants(DEFAULT_CARRIER_HZ)
    assert is_valid is True
    assert rel_error < 1e-15


def test_verify_invariants_rejects_zero_or_negative() -> None:
    for bad_freq in (0.0, -8.0, float("nan"), float("inf")):
        is_valid, _ = verify_invariants(bad_freq)
        assert is_valid is False


def test_run_fallback_recovery_coherent(tmp_path: Path) -> None:
    rna_file = tmp_path / "rna_state.json"
    rna_file.write_text('{"dimension": "11D", "drift_detected": true}', encoding="utf-8")

    report = run_fallback_recovery(carrier_hz=8.0, rna_state_file=str(rna_file))

    assert report.status == "SYSTEM_COHERENT"
    assert report.carrier_hz == 8.0
    assert report.k_invariant == K_INVARIANT
    assert "INVARIANTS_VERIFIED" in report.steps_executed

    saved_state = json.loads(rna_file.read_text(encoding="utf-8"))
    assert saved_state["dimension"] == "0D"
    assert saved_state["drift_detected"] is False


def test_run_fallback_recovery_stops_on_invalid_carrier() -> None:
    report = run_fallback_recovery(carrier_hz=-1.0)
    assert report.status == "STOP"
    assert "INVARIANT_CHECK_FAILED" in report.steps_executed