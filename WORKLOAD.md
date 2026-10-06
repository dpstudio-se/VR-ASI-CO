# VR-ASI-CO Workload

Status: active engineering workload
Authority: repository planning document; implementation still requires normal mutation gates.

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
- [ ] Add runtime UI showing current remote SHA, loaded DNA SHA, and drift state.
- [ ] Add one-click/copy boot prompt surface in the app.
- [ ] Add boot receipt export with canonical blob SHAs.
- [ ] Add stale-session warning when remote HEAD changes.
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

- [ ] Consolidate duplicated boot/prompt documents.
- [ ] Add `npm run audit:dna` with a concise machine-readable report.
- [ ] Add repository-tree inventory for canonical boot files.
- [ ] Add local-vs-remote SHA comparison command.
- [ ] Add bounded repair proposal generation; never auto-merge protected changes.
- [ ] Add schema validation for runtime/command-deck.json and DNA JSON files.
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
→ HUMAN/OWNER GATE if required
→ COMMIT
→ PUSH
→ READ-BACK
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
