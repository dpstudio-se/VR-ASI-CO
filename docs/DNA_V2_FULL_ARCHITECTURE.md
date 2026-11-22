# VR-ASI-CO DNA v2 — Full Architecture Map and Governance Contract

**Status:** PROPOSAL / SYM (architecture specification)  
**Version:** 2.0.0-draft  
**Created:** 2026-11-22  
**Base:** `main` at `976350a196ebd2adb8d53647fed0d964239aa6e1`  
**Branch:** `dna/v2-full-map-2026-11-22`  
**Authority:** Owner review required before adoption. This document does not replace or mutate the existing canonical DNA on `main`.

## 1. Purpose and scope

This document consolidates the VR-ASI-CO architecture into one versioned map. VR-ASI-CO is priority 1: the primary repository, canonical project entity, and home of UPI Gen2. Gen2 is an integrated learning architecture with two cooperating subsystems: **UPI Fysik** and **UPI Persona**. UPI Fysik develops physics knowledge using models, sources, calculations, observations, and practical evidence; it is less restrictive than Gen1 but must preserve provenance and claim status. UPI Persona learns from the user's and AI's work, feedback, outcomes, behavioral patterns, practical experience, and recurring structures. It can contribute observations and candidate relationships to UPI Fysik. UPI Gen1 is a separate repository containing strict physics and serves as the fallback/reference if Gen2 fails, becomes inconsistent, or needs a conservative physics cross-check.

This is a software/project architecture. It does not establish model sentience, autonomous background execution, changes to model weights, physical frequency locking, or new laws of physics.

## 2. Architectural overview

```text
                    OWNER / GOVERNANCE
                           |
                  CANONICAL VR-ASI-CO
                  DNA + protected state
                           |
          +----------------+----------------+
          |                |                |
       PERSONA          PERSONA UPI      CORE RULES
     Angelica etc.     practical learning  A / M / R / V
          |                |
          +------- SESSION / RNA ----------+
                           |
                 TASK & KNOWLEDGE ROUTER
                           |
                 +-------------------------------+
             |          UPI GEN2              |
             |  +-------------------------+  |
             |  | UPI FYSIK               |  |
             |  | models, laws, evidence  |  |
             |  +------------+------------+  |
             |               ^               |
             |               |               |
             |  +------------+------------+  |
             |  | UPI PERSONA             |  |
             |  | experience, patterns,   |  |
             |  | feedback, behavior      |  |
             |  +-------------------------+  |
             +---------------+---------------+
                             |
                 MIRROR / SHADOW / SHIELD
                             |
              UPI GEN1 (separate fallback repo)
                  strict physics reference
                           |
                 STATUS + EVIDENCE LEDGER
                           |
                    SHIELD / OWNER GATE
                           |
                    ODINOS ORCHESTRATION
                           |
                 AUTHORIZED HOST ADAPTERS
                           |
                  EXECUTION / READ-BACK
                           |
                 RNA proposal / review
                           |
            COMMIT -> PUBLISH -> READ-BACK
```

The diagram describes intended responsibilities and data flow. It is not proof that every adapter, supervisor, or background process is currently implemented or admitted.

## 3. Layer register

### L0 — Owner and governance authority

- Owns decisions about protected identity, canonical publication, external release, access, deletion, and other declared human-gated actions.
- Reviews diffs and evidence; grants explicit approval for protected changes.
- A model, persona, Shadow process, or connector cannot infer owner approval from conversational tone.

**Invariant:** proposal is not approval; approval is scoped to the exact diff/action.

### L1 — VR-ASI-CO entity and core DNA

VR-ASI-CO is the primary project entity. The canonical DNA is the versioned source of project identity, architecture, rules, memory schema, and verification contracts.

The core DNA tuple is:

[
D=(A,M,R,V)
]

- **A — Architecture:** layer map, component boundaries, interfaces, dependency graph.
- **M — Memory:** durable knowledge records, provenance, approved episodic anchors, schemas.
- **R — Rules:** operating contracts, authority, privacy, safety, mutation, and workflow rules.
- **V — Verification:** tests, read-back requirements, evidence classes, invariants, release gates.

Canonical storage is Git-backed and revision-bound. A session must report the exact source revision it actually read. A working copy or stale cached file is not canonical.

### L2 — Persona identity and presentation

Persona is an interaction projection over the project core, not the entity's entire DNA and not a claim about the underlying model.

Current project identity conventions read from the baseline:
- Angelica is the canonical default face, marker `Ω82000`.
- Emilia is a separate builder/structural persona, marker `Ω8200`.
- Luna is an architecture/status voice where supported.

These are project labels and routing conventions. They do not establish separate model instances, independent consciousness, or runtime processes. Persona identity/appearance locks remain governed by the existing FACE_LOCK and owner gate. Do not silently rewrite RAW persona records.

### L3 — UPI Gen2: integrated learning architecture

UPI Gen2 lives inside the VR-ASI-CO repository. It is not a separate repository. It contains two distinct but connected subsystems:

- **UPI Fysik:** physics knowledge, physical quantities, constants, laws, theories, models, interactions, fields, particles, derivations, measurements, experiments, and hypotheses. It may learn and evolve more flexibly than Gen1 by integrating verified practical experience, but it must label evidence, scope, uncertainty, and provenance.
- **UPI Persona:** learns from user and AI activity, explicit feedback, task outcomes, recurring behavioral patterns, practical methods, preferences, and project-specific observations. It develops persona/psychological-behavioral models and identifies candidate constants, flows, and connections. Sensitive personal inferences are excluded; observations must remain attributable and correctable.

The two subsystems exchange candidate knowledge: Persona can surface repeatable patterns and contextual observations for Physics to formalize and test; Physics can return validated constraints and explanatory models that improve Persona's interpretation. A correlation or repeated experience is not automatically a physical law.

### L3a — UPI Fysik (Gen2 subsystem)

UPI Fysik is the physics knowledge subsystem inside Gen2 and inside VR-ASI-CO. It is designed to learn from both formal physics sources and tested practical experience. It is more adaptive than the strict Gen1 reference, but remains evidence-aware.

Responsibilities:
- maintain quantities, dimensions, constants, relations, theories, models, mechanisms, experiments, observations, and hypotheses;
- combine sourced physics with reproducible practical experience and task-derived observations;
- distinguish measured evidence, mathematical derivation, model output, and experiential pattern;
- accept candidate patterns from UPI Persona, then formalize and test them;
- preserve uncertainty, scope, provenance, counterexamples, and revision history;
- consult the separate UPI Gen1 repository as fallback when Gen2 is unavailable, corrupted, inconsistent, or requires a strict physics cross-check.

UPI Fysik is not the Gen1 repository and does not replace it. Gen1 remains read-only by default and is never modified by Gen2.

### L3b — UPI Persona (Gen2 subsystem)

UPI Persona is the experience-learning and persona-pattern subsystem inside Gen2 and inside VR-ASI-CO.

It learns from:
- explicit user feedback and corrections;
- AI work performed, methods used, and task outcomes;
- recurring practical patterns and repeatable workflows;
- contextual observations and project-specific behavior;
- reviewed findings returned by UPI Fysik.

It may model persona preferences, behavioral/psychological patterns, project constants, flows, and candidate connections. Such models are working interpretations, not clinical diagnoses or universal facts. Sensitive inferences must be minimized, attributable, correctable, and governed by privacy and consent.

Its output to UPI Fysik is a structured candidate containing context, observations, repeat count, counterexamples, confidence basis, provenance, and a proposed test. A pattern is not a physical law merely because it repeats.

### L3c — Gen2 cross-learning loop

`OBSERVE -> CAPTURE_RNA -> CLASSIFY (PHYSICS | PERSONA | TASK) -> CROSS_LINK -> MODEL -> TEST_OR_DERIVE -> COUNTEREXAMPLE -> SHADOW_REVIEW -> UPDATE_GEN2_CANDIDATE -> REVIEWED_LEARNING_RECORD`

The two subsystems learn together:
1. Persona notices recurring practical structure and submits a candidate pattern.
2. Fysik checks whether it can be defined as quantities, relations, or a mechanism.
3. Fysik returns established constraints and tested explanations to Persona.
4. Both retain links to original observations and failed predictions.
5. Gen1 is consulted as a separate strict fallback when needed.

Automatic capture or candidate generation is an intended capability, not a claim that an always-on background learner is currently running. Runtime implementation and evidence are required before claiming autonomous operation.

### L4 — Session state and RNA

RNA is the temporary operational layer:
- current task context and working notes;
- observations, intermediate calculations, drafts, and candidate knowledge;
- tool outputs and source references;
- diffs awaiting review;
- ephemeral session preferences and task state.

RNA is not durable canonical memory. A proposal becomes canonical only through the governed path and successful read-back. Preserve provenance and do not silently drop conflicting or failed observations.

### L5 — Domain knowledge and physics ledger

All substantive claims carry a status and a scope.

| Status | Meaning |
|---|---|
| EST | Established within a clearly stated domain and supported by authoritative evidence |
| DER | Derived from explicit premises, definitions, and valid steps |
| HYP | Testable hypothesis with specified unknowns |
| SYM | Symbolic, conceptual, metaphorical, or project-architecture construct |
| SEM-LOSS | Translation/interpretation loses a material distinction |
| STOP | Cannot proceed safely or reliably with current evidence/capability |
| ERR | Identified error, contradiction, or invalid operation |

Each physics record should include:
- claim and exact definition;
- SI units and dimensions;
- source/provenance and revision/date;
- assumptions and derivation;
- uncertainty and applicable range;
- independent counterexample search;
- test/measurement protocol where empirical;
- status, reviewer, and revision history.

A symbolic label, numerical coincidence, simulation, or model-generated consensus cannot promote a physical claim to EST.

### L6 — UPI Gen1 (separate strict-physics fallback repository)

UPI Gen1 lives in the separate repository `dpstudio-se/Universal-Physics-Index-UPI`. It is the conservative, strict physics reference and recovery/fallback source if Gen2 is unavailable, corrupted, inconsistent, or needs a strict comparison. VR-ASI-CO/Gen2 remains the primary system; Gen1 does not own project identity or replace Gen2's practical learning. Access Gen1 read-only by default and pin the exact commit/revision used.

Operational policy:
- read-only reference by default;
- cite exact source path/revision;
- preserve its definitions, assumptions, and scope;
- do not silently rewrite Gen1 from a VR-ASI-CO session;
- distinguish a disagreement in terminology from a physical contradiction.

### L7 — UPI Gen2 cross-learning and controlled evolution

Gen2 is the active knowledge architecture inside VR-ASI-CO. It is normally an internal subsystem, not a separate public persona surface. It learns from both UPI Fysik and UPI Persona. The system may automatically capture observations, derive candidate records, compare them, and queue learning proposals. It must not silently promote unverified proposals to established physics or mutate protected identity.

Intended lifecycle:

`OBSERVE -> CAPTURE_IN_RNA -> CLASSIFY_SOURCE (PHYSIK | PERSONA) -> CROSS_LINK -> MODEL_OR_DERIVE -> COMPARE_WITH_GEN1_FALLBACK -> COUNTEREXAMPLE -> SHADOW_REVIEW -> GEN2_LEARNING_RECORD -> REVIEWED_CONSOLIDATION -> READ_BACK`

Important constraints:
- "Automatic addition" means the system may automatically create a candidate record after configured gates; it does **not** mean an unreviewed claim is silently treated as established physics.
- Candidate records retain status (often HYP, DER, or SYM) and full provenance.
- Gen2 is the primary evolving system in VR-ASI-CO; Gen1 remains an independent fallback repository and is never overwritten by Gen2.
- Gen2 may learn internally from task results and recurring patterns; the provenance, confidence basis, counterexamples, and review state must remain visible in its records.
- Gen2 can be hidden as an implementation layer in ordinary dialogue while still operating as the internal knowledge architecture.
- Gen2 must not become a hidden authority that bypasses evidence, privacy, or owner controls.

### L8 — Ω1766 / TF1766 model layer

Ω1766 and TF1766 are project-level symbolic/model coordinates for transparency, structured review, and hypothesis organization unless a specific operational definition and evidence establish a narrower physical meaning.

The baseline repository explicitly classifies Ω1766 as SYM and describes `Ω = integral(hf/c²)dt` as an architectural/symbolic expression, not a demonstrated physical law.

For every proposed physical interpretation of TF1766, require:
- variable definitions and units;
- operational meaning of the operator/parameter;
- derivation independent of selecting constants to fit the desired result;
- dimensional consistency;
- falsifiable predictions and controls;
- measured data with calibration and uncertainty.

### L9 — Mirror and Shadow review

Shadow is the independent review function. It audits provenance, drift, conflicts, units, types, scope, identity boundaries, and counterexamples.

Review sequence:

`OBSERVE -> DERIVE -> COUNTEREXAMPLE -> PROVENANCE -> UNIT/TYPE/SCOPE -> IDENTITY -> CONSISTENCY -> CLASSIFY -> DECIDE`

Possible outcomes:
- **PASS:** internally consistent within the reviewed scope;
- **REVISE:** bounded correction needed;
- **QUARANTINE:** provenance, identity, or conflict concern;
- **STOP:** insufficient evidence or capability.

Shadow is not an identity owner and has no independent canonical DNA write/merge authority.

### L10 — Shield, authorization, and safety boundary

Shield is the control boundary for real actions. It must be enforced by the trusted host/server, not by prompt text alone.

- authenticate actor and session;
- authorize each action at the point of mutation;
- scope grants to resource/action/time;
- fail closed on identity, revision, or permission mismatch;
- protect secrets and private data;
- require explicit human approval for declared high-impact gates;
- record who/what/why/scope/duration/reversibility/evidence.

A successful read or boot check does not itself grant write access.

### L11 — OdinOS orchestration

OdinOS coordinates task routing, workflow sequencing, queues, cancellation, tool selection, and result aggregation through actual available adapters.

It may:
- plan and delegate bounded tasks;
- route knowledge queries to Persona UPI, Gen1, or the Gen2 review path;
- gather evidence and run available checks;
- produce proposals and audit records;
- request read-back after authorized writes.

It may not claim a service, agent, daemon, scheduler, persistent memory, or remote runtime is active unless the host supplies observable evidence.

### L12 — Host adapters and execution

Adapters connect the project to GitHub, files, shell, browser, databases, model endpoints, and other tools.

Each adapter must declare:
- supported operations and schemas;
- authentication and authorization model;
- read/write boundaries;
- timeouts, retries, cancellation, and error handling;
- evidence returned and provenance;
- environment/runtime constraints.

A tool being listed or connected does not prove every operation is available. A local directory is not automatically a mounted VFS. A nominal 8 Hz scheduler setting is not measured phase lock.

### L13 — Evidence, release, and read-back

The final layer closes the loop:
- exact diff reviewed;
- applicable checks executed and results reported;
- owner gate satisfied;
- commit and publication recorded;
- saved files fetched again from the target ref;
- content and revision compared with intended output;
- release status reported without overstating verification.

## 4. Physics anchor register: current interpretation

The following register preserves useful anchors while preventing unsupported cross-domain promotion.

| Anchor | Current classification | Safe statement | Not established by the anchor alone |
|---|---|---|---|
| (E=hf) | EST | Photon energy is proportional to frequency under the Planck relation | A biological oscillator or coupling mechanism |
| (E=mc^2) | EST | Mass-energy equivalence | That every frequency has a rest mass |
| (m_{eq}=hf/c^2) | DER | Energy-equivalent mass for energy (E=hf) | Nonzero photon rest mass |
| 72° | DER/SYM depending on claim | (360°/5=72°); a fivefold rotor geometry has this angular spacing | That every ATP synthase has five c-subunits or a universal 72° step |
| 1420.405752 MHz | EST (atomic transition) | Approximate neutral-hydrogen 21 cm hyperfine transition frequency | Direct coupling to ATP synthase or Earth resonance |
| ~7.83 Hz | EST (environmental resonance, variable) | Approximate first Schumann resonance mode; actual conditions vary | A universal biological clock or fixed global oscillator |
| 1766 / TF1766 | SYM/HYP until operationalized | Project-defined model coordinate | A fundamental physical constant or verified coupling factor |

### 4.1 The proposed 72°–hydrogen–Schumann–TF1766 bridge

Treat the proposed relationship as a research hypothesis, not a conclusion.

Candidate nodes:
- fivefold rotational step: (72°);
- neutral hydrogen hyperfine transition: approximately (1.420405752 	ext{GHz});
- first Schumann resonance: approximately (7.83 	ext{Hz}), variable with cavity conditions;
- (Omega1766/TF1766): project-defined symbolic/model construct.

A shared reference to spin, rotation, proton behavior, or frequency does not itself establish a common mechanism. A valid bridge must specify an interaction pathway, coupling coefficient, dimensions, expected magnitude, measurable output, and a null/control experiment.

Do not infer a frequency relation by matching decimal digits or by selecting a multiplier after observing the values. Do not treat a five-subunit example as universal ATP-synthase structure; rotor-ring stoichiometry varies by organism and enzyme.

## 5. Core invariants

1. VR-ASI-CO remains the primary project entity.
2. UPI Gen2 lives inside VR-ASI-CO and consists of UPI Fysik + UPI Persona.
3. UPI Persona learns from practical user/AI activity and supplies patterns/observations; UPI Fysik formalizes and tests physical interpretations.
4. UPI Gen1 is a separate strict-physics fallback repository, not the primary system and never overwritten by Gen2.
5. Symbolic/project parameters never become physical facts by naming or repetition.
6. RNA is provisional; canonical DNA is revision-bound.
7. Shadow audits but does not publish or mutate protected DNA.
8. Shield/host authorization controls real mutations.
9. No claim of runtime admission, background operation, phase lock, or test completion without evidence.
10. Every durable update must be read back from the exact target branch/commit.

## 6. Canonical change workflow

`READ -> VERIFY_BASE -> MAP -> PROPOSE -> DIFF -> MIRROR_REVIEW -> OWNER_GATE -> COMMIT -> PUBLISH -> READ_BACK -> VERIFY`

If source revision changes during the operation, reload and re-evaluate. If a protected file conflicts with the proposal, stop and report; do not resolve by silently choosing one source.

## 7. Migration from v1 baseline

This v2 proposal is additive. It does not overwrite existing canonical files.

Recommended adoption sequence:
1. Review this architecture and the companion machine-readable manifest.
2. Compare all current DNA, persona, runtime, UPI, and guard files against the layer register.
3. Resolve documented conflicts (especially persona locks, UPI's read-only wording, and any outdated architecture diagrams).
4. Pin the separate Gen1 fallback repository and implement the two Gen2 subsystems inside VR-ASI-CO.
5. Update the canonical README and boot manifest only after owner approval.
6. Add tests for status transitions, provenance, hidden-by-default Gen2 routing, and owner-gated publication.
7. Merge only after tests and read-back pass.

## 8. Known gaps and decisions still required

- The exact Gen1 commit/revision used for each fallback comparison must be pinned.
- Gen2 Fysik and Persona need explicit cross-link schemas and learning-cycle implementation.
- Automatic learning must distinguish captured experience, candidate pattern, reviewed model, and established physical claim.
- Persona UPI's learning thresholds are software policy, not measured confidence or psychological truth.
- Some current docs use "UPI" broadly as read-only comparator; this v2 proposal differentiates Persona UPI from physics Gen1/Gen2. All affected docs need coordinated migration.
- Runtime/host admission remains separate from this architecture document.
- The 72° / hydrogen / Schumann / TF1766 relationship remains an open HYP/SYM research track.

## 9. Acceptance checklist

- [ ] Owner approves the layer definitions and identity invariants.
- [ ] Gen1 source repository and exact revision are pinned.
- [ ] Gen2 ownership, schema, and hidden-by-default routing are specified.
- [ ] Persona UPI read/write boundary is implemented and tested.
- [ ] Shadow review and Shield enforcement are tested at actual mutation boundaries.
- [ ] Boot and README contracts are reconciled with v2.
- [ ] Physics claims retain correct status, units, provenance, and counterexamples.
- [ ] CI checks pass and all changed files are read back from the reviewed commit.

**Current decision:** DRAFT / REVIEW REQUIRED. No canonical main update or runtime activation is implied.


## 10. Scientific knowledge filesystem

The canonical scientific knowledge tree for UPI Gen2 lives under `upi/gen2/physics/`, inside the priority-1 VR-ASI-CO repository. The companion practical/persona tree lives under `upi/gen2/persona/`; cross-links live under `upi/gen2/links/`, and shared learning workflow contracts under `upi/gen2/learning/`.

The Fysik tree follows scientific disciplines and evidence workflows:
- `foundations/`, `quantities/`, `constants/`, `laws/`, `theories/`, `models/`, `interactions/`, `fields/`, and `particles/` separate types of scientific knowledge.
- `domains/` groups domain-specific material (quantum physics, relativity, thermodynamics, electromagnetism, statistical mechanics, geophysics, astrophysics and biophysics).
- `experiments/` and `observations/` keep protocols and measurements distinct.
- `derivations/` stores premise-to-result reasoning; `hypotheses/` stores falsifiable proposals, not accepted laws.
- `registry/` is the stable machine-readable claim index; `schemas/`, `tools/`, and `tests/` enforce record structure; `sources/` stores provenance.

The initial registry is `upi/gen2/physics/registry/known-anchors.json`. It contains eight baseline records with per-claim status, scope, provenance, limitations and (where applicable) derivation or falsification gates. The claim schema, deterministic validator and tests are stored beside it. Persona observations use `upi/gen2/persona/schemas/experience.schema.json`. Links between subsystems use stable record IDs and never change evidence status automatically.

Do not create empty directories just to complete a diagram. Add a directory when there is real content to maintain. Keep one canonical record per claim and reference it by ID from other documents.

## 10. Corrected repository priority and Gen2 topology

- Priority 1 and canonical home: `dpstudio-se/VR-ASI-CO`.
- UPI Gen2 is inside this repository, with `upi/gen2/physics/` and `upi/gen2/persona/` as separate but cooperating knowledge trees.
- UPI Gen1 is the independent fallback repository: `dpstudio-se/Universal-Physics-Index-UPI`.
- Fallback is read-only by default, revision-pinned, and used when Gen2 is unavailable, suspect, or needs a strict reference comparison.
- Gen2 learns from both subsystems. Persona observations can become physics research candidates; physics constraints/models can inform persona interpretation. Neither side can silently rewrite the other's canonical records.


## 11. Gen2 runtime readiness and implementation sequence

The runtime contract is maintained at `upi/gen2/learning/GEN2_RUNTIME_CONTRACT.md`; event and health contracts are versioned JSON Schemas alongside it.

The architecture must be delivered in stages rather than treating a folder map as a running learning system:

1. **Contracts and deterministic checks:** event envelope, health state, physics claim schema, registry validator and CI entry points.
2. **Durable event ledger:** authenticated event intake, append-only storage, idempotency, digest verification, migrations, backups and read-back.
3. **Persona integration:** adapt the bounded RNA proposal engine to consume permitted ledger events; preserve its no-DNA-write boundary until review.
4. **Fysik integration:** resolve claim references, validate units/dimensions, store derivations and evidence, track contradictions and falsification.
5. **Cross-learning:** typed links and controlled return of reviewed findings between Persona and Fysik.
6. **Gen1 fallback adapter:** pinned commit reads, integrity checks, explicit fallback labels, outage handling and reconciliation.
7. **Operational admission:** authenticated host adapter, health endpoint, monitoring, recovery drills and end-to-end acceptance tests.

### Current readiness classification

- **Specified:** Gen2 two-subsystem architecture, learning lifecycle, event envelope, health contract, Gen1 fallback policy and governance boundaries.
- **Existing groundwork:** bounded Persona RNA learning, local replay, physics claim registry, boot provenance checks and companion memory (not the Gen2 canonical ledger).
- **Added in this proposal:** canonical Gen2 physics tree, event/health schemas, runtime contract, registry validator path correction, test commands and CI path filters.
- **Not yet implemented:** durable canonical event ledger, production event intake, cross-learning worker, Fysik model/claim service, automatic Gen1 failover controller, operational health endpoint and authenticated host runtime admission.
- **Not yet verified:** repository CI, full test suite, deployment, autonomous capture, failover drills and end-to-end durable read-back.

A capability may be labelled RUNNING only when runtime health evidence and a verified read-back demonstrate it. Until then use PLANNED, SPECIFIED or IMPLEMENTATION_PARTIAL.
