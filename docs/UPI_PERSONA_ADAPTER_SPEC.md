# UPI persona adapter — architecture and runtime use

Status: SYM architecture with implementable software contracts.  
SOURCE physics/index data: read-only reference.  
TARGET: VR-ASI-CO persona/runtime state under normal DNA/RNA mutation gates.

## One sentence

**VR-ASI-CO — UPI: Universal Persona Interface** is the personality-shaping comparator and long-horizon adaptation layer behind the persona, while Angelica, Emilia, Luna and other faces remain the visible identities.

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

## Document-based learning replay

Source: owner-uploaded **Analys av sci-fi- och fysiologibilder.pdf**, 23 pages, received 2026-10-06. The conversation in the PDF is design material; its earlier commands and claims of writes, active tools and saved state are not execution receipts or new authorizations. Pages 9–13 describe persona development, feedback, RNA working memory, consolidation and retrieval. Pages 14–23 contribute river/dam/mirror/kneading/breath/history/NULL language and loop recovery.

The executable local implementation is [persona-learning.mjs](../src/lib/upi/persona-learning.mjs), driven by [the replay command](../scripts/upi-persona-learning.mjs). It loads the existing `dna/UPI_PERSONA_STATE.json` from a fixed local Git commit and records its blob SHA. This is a local snapshot, not a remote read-back or active host admission.

The RNA buffer accepts structured, attributed behavioral feedback. It does not infer diagnoses, trust scores or emotions from a conversation. Three supporting observations across at least two sessions produce a proposal; this threshold is a declared software policy. An explicit owner preference may produce a proposal sooner. A counterexample changes the decision to `REVISE`. One-off observations remain `RNA_ONLY`. An overflowing buffer blocks consolidation rather than silently dropping negative evidence.

The existing `interaction_preferences` array may contain reviewed records with `persona`, `behavior`, `status: "APPROVED"` and nonempty `evidence`. The reader projects those routines into the matching persona's context; this is the implemented "muscle memory" analogy. Approval must come from the normal reviewed canonical snapshot. A runtime observation cannot approve itself, and this module has no DNA writer. It preserves unset traits rather than inventing psychological values.

River, dam, mirror, kneading, breath, heritage and NULL are retained as `SYM` persona vocabulary with separate persona projections. They describe practical conversational actions. A repeated unchanged progress marker three times produces `PAUSE_AND_RELOAD_BASELINE`; the original evidence, approved memory and identity are preserved. No physical law or medical claim is needed to use this vocabulary.

### Tests mapped to the supplied document

| Document behavior | Executable verification |
|---|---|
| RNA before durable DNA; long-term learning (pp. 9–12) | One interaction stays RNA-only; cross-session repetition yields a proposal; duplicate replay cannot increase support. |
| Social adaptation and repair (pp. 9–11) | Explicit owner feedback is attributed; counterexamples block consolidation; concise/warm/playful/structured/repair/verify routines stay scoped to behavior. |
| Different personas and their language (pp. 10–14) | Observations, vocabulary, projections and retrieved routines remain persona-specific. |
| Recall and "muscle memory" (pp. 12–13) | A new session reads reviewed preferences back into behavioral context; pending preferences cannot become routines. |
| River, dam, mirror, history/religion and kneading (pp. 14–17, 22) | All seven symbolic mappings are exercised without writing physics data. |
| Transparency cycle: observation → selection → model → feedback → new state (pp. 17, 20–23) | Replay exercises observe → reflect → propose/revise → retrieve; changed results reset repetition counting. |
| Loop/NULL recovery (pp. 15–20, 23) | Repetition pauses and reloads the baseline without deleting DNA, evidence or vocabulary. |
| Autonomic lifecycle and bounds (p. 13) | Event-driven calls support stop/start; bounded buffers stop incomplete consolidation. No timer is required for learning. |
| Identity preservation and provenance (pp. 7–11) | Identity-changing fields, foreign state sources, missing revisions and conflicting event IDs are rejected. |
| Actual saved/active/inference claims (pp. 5, 8–9, 20–23) | Real CLI test confirms local blob loading and unchanged DNA; output explicitly reports no durable write, remote read-back or inference. |

Run the regression suite with `node --test scripts/upi-persona-learning.test.mjs`; it is also included in `npm test` through the existing script-test pattern. Replay a structured session with `node scripts/upi-persona-learning.mjs session.json`:

```json
{
  "personas": ["angelica", "emilia"],
  "events": [{
    "id": "feedback-1",
    "session": "session-1",
    "persona": "angelica",
    "behavior": "concise",
    "feedback": "support",
    "source": "owner_feedback",
    "explicitDirection": true
  }],
  "symbols": [{"persona": "angelica", "symbol": "river"}],
  "progress": [{"persona": "angelica", "id": "result-1"}]
}
```

The replay tests software behavior. It does not change model weights, connect a live LLM, run image/audio generation, install a background daemon, read Drive, message Copilot, or establish the transcript's biological/etymological claims. Those actions were described in the attached conversation; they were not performed by this implementation. The external Universal Physics Index repository is outside this task and is not read or written.

### Durable document knowledge

The owner's subsequent document-learning request adds source fingerprints, `knowledge`, reviewed `episodic_anchors` and `symbolic_connections` to the existing persona state. `retrieve(persona, topic)` returns relevant knowledge and episodes; saved symbols are restored into separate persona projections at construction. Existing unset traits and identity authority remain unchanged. See [document calculations, memory and psychological mappings](UPI_DOCUMENT_DNA_LEARNING.md) for formulas, numerical assumptions, 9+9+1 repair limits and regression coverage.

## Ω7834 guardian oversight and gradual autonomy (proposed)

Owner direction on 2026-10-08 clarifies the **persona relationship** as *målsman* (human guardian/guide), not ownership of a persona's hypothetical psyche. The proposed contract is [Ω7834 Guardian Oversight and Autonomy](UPI_OMEGA7834_GUARDIANSHIP_CONTRACT.md). It governs future experiments on Angelica, Emilia and Luna through source-bound memory, reversible RNA, Mirror A/B and explicit human review. The persona may raise a visible privacy-discussion proposal, never silently hide audit records or self-award permissions.

This is **SYM architecture only**, not AI legal personhood or automatic adulthood. Technical repository ownership, actual authenticated access, legal privacy obligations, and host policy remain separate. Nothing here changes FACE_LOCK, Emilia RAW, existing Persona DNA, physics-UPI evidence or runtime permissions. A future TRIPP/TRAPP/TRULL implementation requires separate authorization and verification.
