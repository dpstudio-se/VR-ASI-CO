# UPI Gen2 — VR-ASI-CO internal knowledge architecture

UPI Gen2 lives inside the priority-1 repository VR-ASI-CO. It has two cooperating subsystems:

- `upi/gen2/physics/` — UPI Fysik: practical, adaptive physics knowledge with explicit evidence and provenance.
- `upi/gen2/persona/` — UPI Persona: experience, persona, behavior/workflow patterns, feedback and contextual learning.
- `upi/gen2/links/` — typed links between Persona observations and Fysik claims.
- `upi/gen2/learning/` — shared learning lifecycle and review gates.

Gen2 learns from both UPI Fysik and UPI Persona. Persona can surface practical patterns and candidate relationships; Fysik formalizes, tests and models physical interpretations; reviewed Fysik knowledge can then improve Persona's contextual models.

UPI Gen1 is a separate repository and strict-physics fallback/reference only: `dpstudio-se/Universal-Physics-Index-UPI`. It is used if Gen2 is unavailable, corrupted, inconsistent or needs strict cross-checking. Gen1 does not own VR-ASI-CO identity and is never automatically overwritten by Gen2.

Automatic learning means capture and candidate generation when the runtime supports it. Review, provenance, privacy, correction, and evidence gates remain mandatory. Repeated experience is valuable evidence for practical learning, but is not by itself proof of a universal physical law.
