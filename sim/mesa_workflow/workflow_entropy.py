"""Workflow-event entropy diagnostic.

This is a software/workflow metric, not thermodynamic entropy and not a persona.
"""
from collections import Counter
from math import log2
from typing import Iterable, Sequence


def shannon(counts: Counter) -> float:
    """Return Shannon entropy (bits) for event-type counts."""
    total = sum(counts.values())
    if total <= 0:
        return 0.0
    return -sum((count / total) * log2(count / total) for count in counts.values() if count > 0)


def measure(
    events: Iterable[Sequence[object] | None],
    deferred_n: int = 0,
    err_count: int = 0,
    clash_open: int = 1,
) -> dict[str, object]:
    """Return the legacy-compatible event entropy and workflow instability fields."""
    event_list = list(events)
    types = Counter(event[0] if event else "?" for event in event_list)
    entropy_bits = shannon(types)
    missing = sum(
        1 for event in event_list if event and event[0] in {"ERR", "INTENTION_FAIL"}
    )
    instability = (
        entropy_bits
        + 0.4 * missing
        + 0.5 * max(0, deferred_n)
        + 0.3 * max(0, clash_open)
        + 0.2 * max(0, err_count)
    )
    return {
        "H_event": round(entropy_bits, 4),
        "event_types": len(types),
        "missing_or_fail": missing,
        "deferred": deferred_n,
        "look_roll_clash": clash_open,
        "instability": round(instability, 4),
        "status": "SYM",
    }
