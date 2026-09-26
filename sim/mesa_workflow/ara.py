"""Ara entropy core. Workflow instability, not thermodynamics."""
from collections import Counter
from math import log2

def shannon(counts: Counter) -> float:
    n = sum(counts.values())
    if n == 0:
        return 0.0
    return -sum((c / n) * log2(c / n) for c in counts.values())

def measure(events, deferred_n=0, err_count=0, clash_open=1) -> dict:
    types = Counter(e[0] if e else "?" for e in events)
    h = shannon(types)
    missing = sum(1 for e in events if e and e[0] in {"ERR", "INTENTION_FAIL"})
    instab = h + 0.4 * missing + 0.5 * deferred_n + 0.3 * clash_open + 0.2 * err_count
    return {
        "H_event": round(h, 4),
        "event_types": len(types),
        "missing_or_fail": missing,
        "deferred": deferred_n,
        "look_roll_clash": clash_open,
        "instability": round(instab, 4),
        "status": "SYM",
    }
