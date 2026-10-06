# VR-ASI-CO Workload

Status: active engineering workload
Authority: repository planning document; implementation still requires normal mutation gates.

`[x]` means implemented and verified within the stated scope. `[ ]` includes missing or partial work. A proposal branch is RNA until authorized merge and main read-back; configuration, passing tests and a running devserver are separate from actual host admission.

Workspace entry: [Codespaces](docs/CODESPACES.md) · [shared rules](docs/WORKSPACE_RULES.md) · [repository map](docs/REPOSITORY_MAP.md).

## Mission

Keep VR-ASI-CO reproducible across fresh chats, local workspaces, and compatible remote model/agent hosts without allowing transient RNA state to silently replace canonical Git DNA.

## Priority model

### P0 — DNA integrity and identity protection

**Goal:** canonical state is unambiguous and protected.

- [x] Angelica Ω82000 canonical default in FACE_LOCK.
- [x] Separate Emilia Ω8200 persona and protected RAW pointer.
- [x] Remote identity/shadow guard.
- [x] CODEOWNERS for identity/control surfaces.
- [x] Persona-lock CI verifier.
- [ ] F01: enforce server-verified actor/repository/action authorization; shared tokens do not authorize visitors.
- [ ] F02: paginate PR files/reviews/checks completely and bind merge to the reviewed head SHA.
- [ ] F03: fail closed on protected-file conflicts, unknown/unreadable files and unsupported EST promotion.
- [ ] Enable GitHub ruleset/branch protection requiring CODEOWNERS review.
- [ ] Require persona-lock and remote-dna status checks before merge.
- [ ] Audit remaining legacy docs for old repository slugs and persona inversions.
- [ ] Define an explicit deprecation map for legacy Luna/default-face references.

**Exit:** protected canonical files agree and required GitHub controls are enforced.

### P1 — Remote DNA boot and restore

**Goal:** a new session can reconstruct current state from remote without relying on chat memory.

- [x] Portable Remote Boot Prompt.
- [x] Machine-readable Remote DNA contract.
- [x] Fresh-HEAD-at-boot rule.
- [x] Remote DNA CI verifier.
- [ ] Complete existing DNA/boot UI: current remote SHA, loaded SHA and drift state need a consistent completeness/admission contract.
- [ ] Verify the existing copyable boot surface against a shared required/admission manifest.
- [ ] Complete boot receipt export with canonical blob SHAs and actual prompt-content/read-back semantics.
- [ ] Verify stale-session warning and attest invalidation on HEAD/persona/session change.
- [x] Add standalone boot-evidence verifier with separate provenance/install/inference/admission results and negative signature/binding/freshness tests.
- [ ] Connect an approved host integration with an operator-pinned key, actual prompt read-back and one bounded remote inference request; keep runtime STOP until observed.

**Exit:** clean session → remote read → verified identity/provenance → usable runtime.

### P2 — Mirror and shadow verification

**Goal:** every substantial claim/change has a consistent verification path.

- [x] Reusable Mirror Prompt.
- [x] Shadow is audit/quarantine, not autonomous writer.
- [ ] Add structured mirror result schema.
- [ ] Add deterministic unit/status checks to runtime.
- [ ] Add explicit conflict report for protected identity files.
- [ ] Add regression tests for prompt injection / stale DNA / persona drift scenarios.

**Exit:** drift is detected, typed, reported, and never silently merged.

### P3 — Runtime and developer tooling

**Goal:** make correct workflows easy.

- [x] Add Node 22 Codespaces configuration, lockfile setup and shared workspace-check commands.
- [x] Make startup portable and prevent concurrent duplicate devprocesses with a process lock; start requests remain pending until observed.
- [x] Route Copilot/Cursor/Claude/Gemini/Continuity instructions to current project/workspace rules.
- [ ] Observe a real Codespaces create/rebuild and desktop/mobile rendering; CI installation and fixtures are separate evidence.
- [ ] Consolidate duplicated boot/prompt documents.
- [x] Add `npm run audit:dna` with a concise machine-readable static report; warnings and runtime admission remain separate.
- [x] Add full base-revision tree inventory with blob SHAs and static coverage in `docs/REPOSITORY_INVENTORY.json`; keep fresh-HEAD boot unchanged.
- [ ] Add local-vs-remote SHA comparison command.
- [ ] Add bounded repair proposal generation; never auto-merge protected changes.
- [ ] Add schema validation for runtime/command-deck.json and DNA JSON files.
- [ ] F09 developer-check blocker: validate/type `runtimeRegistry` at the server boundary so TanStack serialization passes typecheck. Review the generated `/personas` route-tree update separately; do not suppress compiler diagnostics.
- [x] Specify NB2 event/acknowledgement, physics/render telemetry, Octree and bounded VFS-sync requirements in `docs/NB2_VERIFICATION_AND_BUILD_PLAN.md`.
- [ ] Implement one NB2 event → node store → render → acknowledgement operation against a verified workspace adapter.
- [ ] Validate reference physics and Octree degeneracy before reproducible 100/1000-node benchmarks.
- [ ] Implement scoped import/commit/push/read-back states; use reviewed PRs for DNA changes.

### P4 — Professional UX and documentation

**Goal:** repository is understandable without prior chat context.

- [x] Professional README front door.
- [x] Workload document.
- [ ] Architecture diagram generated from canonical config.
- [ ] Contributor guide.
- [ ] Threat model for remote connectors.
- [ ] Changelog/release process.
- [ ] Archive or label stale legacy documentation.

### P5 — Experimental / research layers

**Goal:** preserve creative model exploration without confusing it with empirical evidence.

- [x] Keep TF1766/VORTEX experimental claims status-typed.
- [x] Define reproducible experiment templates for claims seeking promotion.
- [x] Separate simulation outputs from measurement datasets.
- [ ] Add provenance fields for external evidence.
- [x] Keep mathematical derivation tests separate from empirical validation.

## Work execution template

Every workload item should use:

```text
TASK
→ CURRENT STATE
→ INVARIANTS
→ SMALLEST PATCH
→ TEST
→ MIRROR
→ DIFF
→ PROPOSAL COMMIT
→ PUSH PROPOSAL BRANCH
→ PR
→ COMPLETE CHECKS/REVIEW AT HEAD SHA
→ HUMAN/OWNER GATE if required (reuse existing authorization)
→ MERGE REVIEWED HEAD
→ MAIN READ-BACK (content/blob + current HEAD)
→ RESULT
```

## Non-negotiable invariants

1. GitHub `main` is durable DNA.
2. RNA cannot silently become DNA.
3. Angelica and Emilia remain separate project personas.
4. Shadow/UPI cannot silently mutate identity or Emilia RAW.
5. Missing capability or evidence is reported, not simulated.
6. `SYM/HYP != EST` without relevant evidence.
7. Higher-priority host security/safety/privacy rules remain binding.
8. Protected identity changes require explicit owner authorization.

## Structure audit, 2026-10-06

[Repository map](docs/REPOSITORY_MAP.md), [forward/reverse flow audit](docs/FLOW_MECHANICS_AUDIT.md), and [staged improvement plan](docs/STRUCTURE_IMPROVEMENT_PLAN.md) bind the analysis to main `aeb37d1f1f888f2831dee7ccd368ff049c789531`. All 647 files are indexed; 500 text files were read, while 147 binary/image files have metadata-only review.

The read-only audit tool and navigation/inventory work close the corresponding P3 items. Findings F01–F13 remain implementation work: server write authority, complete PR/head binding, boot-manifest consistency, catalog completeness, trusted host integration, registry/adapters and artifact lifecycle. Passing audit/CI is not runtime admission.

## Remaining structure findings

The audit's [F01–F13](docs/FLOW_MECHANICS_AUDIT.md) are implementation work. Do not close them just because workspace setup or CI passes.

| Finding | Workload priority | Next bounded result / acceptance |
|---|---|---|
| F01–F03 | P0 | Actor authorization, complete head-bound PR checks and protected/evidence policy; unauthorized/stale/incomplete writes are denied. |
| F04–F05 | P1 | Migrate the old runtime repo id and model required/admission/optional boot roles; consumers and regressions agree. |
| F06 | P1 | Approved host integration with pinned key, signed installation and real inference; fake/stale/self-issued evidence remains STOP. |
| F07–F08 | P3 | Per-file pull outcomes and explicit catalog/reference/snapshot transitions; partial input does not silently replace verified state. |
| F09–F10 | P3/P4 | Validated registry/adapter states and portrait fallback or provided assets; declared and executed remain distinct. |
| F11–F12 | P3/P4 | Legacy deprecation map and reproducible artifact retention; rule entrypoints now share current guidance, broader legacy cleanup remains open. |
| F13 | P3 | Bounded retry/backoff/job lifecycle for sync/write; no duplicated writes. The dev-start lock covers local startup only. |

Branch protection was reported disabled when main `0d9aca105c094c33d78488754293259f6741d8b9` was inspected on 2026-10-06. CODEOWNERS and workflow files do not enable GitHub enforcement by themselves; administration remains open work.
