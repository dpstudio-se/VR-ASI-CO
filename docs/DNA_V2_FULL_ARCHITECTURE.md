# VR-ASI-CO DNA v2 — Full Architecture Map and Governance Contract

**Status:** PROPOSAL / SYM (architecture specification)  
**Version:** 2.0.0-draft  
**Created:** 2026-11-22  
**Base:** `main` at `976350a196ebd2adb8d53647fed0d964239aa6e1`  
**Branch:** `dna/v2-full-map-2026-11-22`  
**Authority:** Owner review required before adoption. This document does not replace or mutate the existing canonical DNA on `main`.

## 1. Purpose and scope

This document consolidates the VR-ASI-CO architecture into one versioned map. VR-ASI-CO is the primary project entity and governing contract. Persona UPI is its practical, adaptive learning and application layer. UPI Gen1 is a separate, stricter physics/reference index. UPI Gen2 is a curated extension layer for reviewed candidate knowledge and remains out of the ordinary interaction surface unless explicitly requested.

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
       +-------------------+-------------------+
       |                   |                   |
   UPI Gen1             UPI Gen2           DOMAIN SOURCES
 strict reference     curated candidates  code, data, papers,
 read-only comparator  hidden by default   measurements, docs
       |                   |
       +--------- MIRROR / SHADOW -----------+
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

### L3 — Persona UPI (practical adaptive substrate)

Persona UPI is the primary adaptive learning surface inside VR-ASI-CO, as defined by this v2 proposal.

Responsibilities:
- translate explicit user feedback and observed task outcomes into practical working preferences;
- preserve useful lessons, context, and domain-specific experience;
- distinguish a one-off correction from a repeated, durable pattern;
- adapt how a persona explains, plans, checks, and collaborates;
- retrieve reviewed knowledge and approved episodic anchors when relevant;
- record uncertainty and counterexamples rather than forcing agreement.

Learning pipeline:

`OBSERVE -> RECORD -> CLASSIFY -> MODEL -> APPLY -> CHECK_RESULT -> REFLECT -> PROPOSE`

Rules:
1. Raw observations enter RNA first.
2. A successful task demonstrates only the result within that task's scope.
3. Repeated behavior can support a preference candidate; it does not prove a universal rule.
4. Explicit owner direction may propose a durable preference, but identity-sensitive changes still use governance.
5. Persona UPI may adapt practical behavior; it cannot promote physics claims to EST.
6. Persona UPI does not write canonical DNA directly.

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

### L6 — UPI Gen1 (strict physics/reference index)

UPI Gen1 is the secondary, stricter physics-oriented reference layer. It is consulted to challenge or validate candidate physics claims, not to own VR-ASI-CO identity or override Persona UPI's practical application role.

Operational policy:
- read-only reference by default;
- cite exact source path/revision;
- preserve its definitions, assumptions, and scope;
- do not silently rewrite Gen1 from a VR-ASI-CO session;
- distinguish a disagreement in terminology from a physical contradiction.

### L7 — UPI Gen2 (curated physics extension; hidden by default)

Gen2 is the proposed extension layer for new physics knowledge that has passed a defined review.

Intended lifecycle:

`DISCOVER -> CAPTURE_IN_RNA -> NORMALIZE -> GEN1_COMPARISON -> DERIVATION_OR_EXPERIMENT -> COUNTEREXAMPLE -> SHADOW_REVIEW -> OWNER_OR_MAINTAINER_APPROVAL -> GEN2_CANDIDATE -> VERSIONED_PUBLICATION -> READ_BACK`

Important constraints:
- "Automatic addition" means the system may automatically create a candidate record after configured gates; it does **not** mean an unreviewed claim is silently treated as established physics.
- Candidate records retain status (often HYP, DER, or SYM) and full provenance.
- A new Gen2 entry does not alter Gen1.
- Gen2 is not surfaced in ordinary responses unless the user asks to inspect, register, add, compare, or review Gen2.
- Gen2 must not become a hidden authority that bypasses explicit evidence or owner controls.

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
2. Persona UPI is the practical adaptive substrate; it does not own identity or canonical writes.
3. UPI Gen1 remains the strict, secondary physics reference.
4. UPI Gen2 remains hidden by default and receives only governed candidate knowledge.
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
4. Add explicit Gen1/Gen2 source references and candidate schema only after the Gen2 repository/path and maintainers are confirmed.
5. Update the canonical README and boot manifest only after owner approval.
6. Add tests for status transitions, provenance, hidden-by-default Gen2 routing, and owner-gated publication.
7. Merge only after tests and read-back pass.

## 8. Known gaps and decisions still required

- The exact canonical repository/path for UPI Gen1 must be confirmed against its current branch and revision.
- The intended UPI Gen2 repository, schema, ownership, and publication gate are not yet defined in this repository.
- The phrase "automatically added to Gen2" needs a precise distinction between automatic candidate capture and approved publication.
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

The scientific knowledge tree is implemented under `physics/`, organized by discipline and epistemic workflow rather than by persona. The complete directory contract is in `physics/README.md`.

- `physics/foundations/`, `quantities/`, `constants/`, `laws/`, `theories/`, `models/`, `interactions/`, `fields/`, and `particles/` separate kinds of scientific knowledge.
- `physics/domains/` groups domain-specific material such as quantum physics, relativity, thermodynamics, electromagnetism, statistical mechanics, geophysics, astrophysics, and biophysics.
- `physics/experiments/` and `observations/` keep protocols and measurements distinct.
- `physics/derivations/` stores explicit premise-to-result reasoning.
- `physics/hypotheses/` stores falsifiable proposals, not accepted laws.
- `physics/registry/` is the stable machine-readable claim index; `schemas/`, `tools/`, and `tests/` enforce record structure.

The initial registry is `physics/registry/known-anchors.json`. It contains eight baseline records with per-claim status, scope, provenance, limitations, and (where applicable) derivation or falsification gates. `physics/schemas/claim.schema.json` defines the claim data contract. `physics/tools/validate-registry.mjs` and `physics/tests/registry.test.mjs` validate metadata and governance invariants; they do not prove physical truth.

Do not create empty directories just to complete the diagram. Add a directory when there is real content to maintain. Keep one canonical record per claim and reference it by ID from other documents.
