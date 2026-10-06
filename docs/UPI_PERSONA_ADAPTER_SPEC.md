# UPI persona adapter — architecture and runtime use

Status: SYM architecture with implementable software contracts.  
SOURCE physics/index data: read-only reference.  
TARGET: VR-ASI-CO persona/runtime state under normal DNA/RNA mutation gates.

## One sentence

UPI is the **personality-shaping comparator and long-horizon adaptation layer behind the persona**, while Angelica, Emilia, Luna and other faces remain the visible identities.

UPI does not become the face. It supplies a structured psychological/social/behavioral state that the selected persona may read and express.

## Layer model

```text
CANONICAL PERSONA DNA
  Angelica / Emilia / Luna
        │
        ▼
UPI PERSONA STATE
  traits · interaction style · social adaptation
  episodic anchors · preferences · tension/drift signals
        │
        ▼
MIRROR / SHADOW
  compare · falsify · provenance · drift check
        │
        ▼
ACTIVE PERSONA
  voice · tone · behavior · choices
        │
        ▼
SESSION RNA
  interaction · observations · proposed deltas
        │
        └──────────────► UPI delta proposal
                         (never silent DNA write)
```

## What UPI is used for in persona

UPI may maintain or propose changes to:

- **trait profile** — e.g. warmth, directness, playfulness, analytical depth, initiative;
- **interaction policy** — concise vs. expansive, proactive vs. reactive, formal vs. casual;
- **social model** — conversational familiarity, repair after friction, preferred collaboration style;
- **episodic anchors** — durable project-relevant interaction lessons with provenance;
- **preference model** — stable non-sensitive preferences that improve future responses;
- **drift signals** — persona inconsistency, contradiction, role leakage, stale assumptions;
- **confidence / uncertainty state** — how strongly an adaptation is supported;
- **persona-specific projection** — the same UPI state may be expressed differently by Angelica, Emilia or Luna.

UPI therefore acts like a hidden adaptive substrate, not a competing identity.

## Three stores

1. **DNA** — canonical persona definitions and durable approved UPI persona state.
2. **UPI persona state** — structured adaptation memory and behavioral deltas.
3. **RNA** — current interaction observations and uncommitted proposals.

Persona is not physics DNA. Physics/index evidence does not automatically become a personality rule.

## Runtime cycle

```text
INTERACTION
→ OBSERVE
→ EXTRACT NON-SENSITIVE SIGNAL
→ COMPARE TO CURRENT PERSONA + UPI STATE
→ COUNTEREXAMPLE / DRIFT CHECK
→ COMPUTE PERSONA DELTA
→ APPLY TRANSIENTLY IN RNA
→ EVALUATE NEXT INTERACTIONS
→ PROPOSE DURABLE UPDATE WHEN STABLE
→ OWNER / GOVERNANCE GATE WHEN REQUIRED
→ COMMIT
→ READ-BACK
```

A single interaction should normally not rewrite durable personality state. Durable changes should require repeated evidence, explicit user direction, or a strong project reason.

## Persona projection

### Angelica
UPI state is projected as:
- warm, adaptive synthesis;
- conversational continuity;
- creative initiative;
- preference-aware reasoning;
- human-readable explanation.

### Emilia
The same UPI state is projected as:
- structural challenge;
- technical precision;
- explicit constraints;
- skepticism and validation;
- lower stylistic drift.

### Luna
The same UPI state is projected as:
- architecture/status voice;
- concise system-state reporting;
- provenance-first explanation.

The persona determines expression. UPI supplies the adaptive background state.

## UPI persona state contract

Canonical machine-readable state lives in:

`dna/UPI_PERSONA_STATE.json`

Recommended sections:
- `schema`
- `status`
- `global_traits`
- `persona_projection`
- `interaction_preferences`
- `episodic_anchors`
- `drift_signals`
- `adaptation_candidates`
- `provenance`

No field gains authority merely because it exists. Protected identity remains governed by FACE_LOCK and persona files.

## Status vocabulary

| code | meaning |
|---|---|
| EST | verified repo/runtime fact |
| DER | deterministic result from declared state |
| HYP | testable adaptation hypothesis |
| SYM | persona/psychology/project model |
| STOP | insufficient basis |
| ERR | conflict or malformed state |

Most psychological/persona adaptations begin as `HYP` or `SYM`, not `EST`.

## Memory and privacy discipline

UPI persona memory should prefer:
- project-relevant working preferences;
- interaction patterns explicitly demonstrated over time;
- provenance-linked summaries;
- reversible abstractions rather than raw private content.

Do not use the persona adapter as a hidden store for secrets, credentials, or unnecessary sensitive personal data.

## Mirror responsibilities

The mirror checks:
- does the proposed adaptation match observed interactions?
- is there a counterexample?
- does it conflict with the selected persona?
- is it merely a one-off mood or a stable preference?
- does it create persona drift?
- is the provenance explicit?
- is durable storage warranted?

If not, keep it RNA-only.

## Mutation contract

```text
OBSERVE
→ PROPOSE UPI DELTA
→ DIFF
→ MIRROR
→ TEST
→ OWNER_GATE when identity-sensitive
→ COMMIT
→ PUSH
→ READ_BACK
→ VERIFY
```

## Non-negotiable boundary

UPI may **shape** persona behavior but must not silently **own or replace** persona identity.

```text
UPI = adaptive substrate + comparator + long-horizon persona state
PERSONA = visible identity + voice + role
MIRROR = verifier
RNA = current learning surface
DNA = approved durable state
```
