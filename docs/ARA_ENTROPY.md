# ARA_ENTROPY — legacy compatibility note

**Deprecated name.** ARA is not a core identity, voice, or persona. The permanent expansion role is **Angelica**.

The old calculation is a software/workflow entropy diagnostic, not thermodynamic entropy and not a persona. Its maintained implementation is now [workflow_entropy.py](../sim/mesa_workflow/workflow_entropy.py), documented in [WORKFLOW_ENTROPY_METRIC.md](WORKFLOW_ENTROPY_METRIC.md). The old `sim/mesa_workflow/ara.py` path remains only as a compatibility import while callers migrate.

Do not create an AraAgent or route persona speech to ARA. Keep the metric status `SYM`; software workflow entropy does not establish a physical entropy claim.
