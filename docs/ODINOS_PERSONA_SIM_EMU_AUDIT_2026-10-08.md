# OdinOS / Persona-UPI: SIM + EMU audit, 2026-10-08

**Scope:** Behavioral simulation and interface emulation for the *real* VR-ASI-CO repository, with reproduction tests. **Not** a physical simulator, 27D solver, installed AI runtime, real Odysseus/Puter host session, or proof of model inference.

**Canonical reference:** `dpstudio-se/VR-ASI-CO@3493de285febc21e43a59c017416e02a99942089` (main), pinned source files listed below.
**Branch:** `test/odinos-persona-sim-emu-20261008`. Only adds regression tests and this report. **No canonical DNA, FACE_LOCK, Emilia RAW, persona configuration, app code, or GitHub main changed by this work.**

## Methodology and scope boundaries

1. **Repository read:** fetched original main source and blobs via GitHub: `src/lib/upi/persona-learning.mjs` (`745939f2c179512d0abfe4ea50ab0db9233b5116`), `dna/UPI_PERSONA_STATE.json` (`cd103cf5a12ad9651ca53f49ca0a9db5e0d28353`), `src/lib/personas.ts` (`58f3f2c71e2764f479ffc91648bcca688d652929`), `runtime/command-deck.json` (`42f310cd26da119bc7033c998cbb696a899cace0`), `odinos-hybrid/hybrid.js` (`befb2347c5d22dcb5d75c4160e6d95fe96249b1d`), `odinos-hybrid/index.html` (`5604bd6795efddf354121d5d6f50821c05bb3e48`), plus startup/workflow and physics/boot contracts.
2. **SIM:** invoked the actual `createPersonaLearning` code on the actual pinned main DNA JSON, with explicit fixture provenance, in a disposable controlled V8 runtime. Tested observe, reflect, retrieve, duplicate, counterexample, same-session evidence and unauthorized identity attempts. No model weights or Git files modified.
3. **EMU:** evaluated the actual `odinos-hybrid/hybrid.js` against a minimal mocked DOM and mocked `fetch` / `puter.ai.chat`. The emulator deliberately **returns pretend transport replies**, labeled `MOCK_ODYSSEUS_OK` and `MOCK_PUTER_OK`; it does not impersonate an installed host. Verified the constructed outgoing requests, UI face switch, and memory-loading behavior.
4. **Regression:** `scripts/odinos-persona-sim-emu.test.mjs` contains 10 deterministic Node test cases using original repo files, `node:assert`, `node:test`, and `node:vm`. Node `vm` is for deterministic emulation, **not** a security sandbox for untrusted content. These characterization tests **assert known gaps** so green tests must not be reported as successful end-to-end integration.
5. **CI:** GitHub Actions workflow `Workspace setup and tests` runs `npm run workspace:setup` and `npm test` when `scripts/**` changes, including this test file. Record pass/fail only for the **actual PR head SHA** once GitHub reports it; scope remains repo tests, not remote runtime.
6. **Limitations:** local shell has Node 22 but outbound GitHub DNS is unavailable and checkout was not possible. The controlled simulator used exact file contents fetched via GitHub and mocked transports; full test suite will be assessed through GitHub Actions, not fabricated as a local result.

## Observations — verified within stated scope

| ID | Case | Result | Interpretation |
|---|---|---|---|
| SIM-01 | Persona DNA projections include angelica, emilia, luna | PASS (source + SIM) | Same stored UPI learning substrate, separate projections |
| SIM-02 | One owner-feedback event | PASS (SIM) | `RNA_ONLY`, no durable write |
| SIM-03 | Three supports in separate sessions | PASS (SIM) | `PROPOSE` (still HYP; **not** approved DNA) |
| SIM-04 | Explicit counterexample | PASS (SIM) | `REVISE`, counterevidence preserved |
| SIM-05 | Duplicate identical event versus changed duplicate ID | PASS (SIM) | Replay idempotent; changed duplicate returns `STOP/EVENT_ID_CONFLICT` |
| SIM-06 | Unknown persona and raw-text injection | PASS (SIM) | `STOP`; no identity mutation |
| SIM-07 | Luna session learning | PASS (SIM) | Luna is accepted in the bounded learning module |
| EMU-01 | Browser mock boots Angelica and switches to Emilia | PASS (EMU) | CSS/label changes; does not establish system-level prompt installation |
| EMU-02 | Odysseus request composition | GAP CONFIRMED | `POST http://127.0.0.1:7000/api/chat`, persona prepended to `message`; no `preset_id` |
| EMU-03 | Puter request composition | GAP CONFIRMED | Plain prompt string through `puter.ai.chat`, not a demonstrated installed host system prompt |
| EMU-04 | Remote DNA memory fetch | GAP CONFIRMED | Checks HTTP `ok` only; no `json()/text()`, SHA, blob verification, or actual memory hydration |
| EMU-05 | Luna UI/registry | GAP CONFIRMED | `persona/luna.json` and Persona DNA exist, but `src/lib/personas.ts`, command deck, and hybrid buttons lack Luna |
| REPO-01 | Ψ27D | STOP / SYM | `omega1766.ts` explicitly returns `psi27dGate: STOP`, `empiricalVerification: false` |
| REPO-02 | External runtime, host admission, 8 Hz physical phase-lock | NOT_RUN / UNVERIFIED | No real host invocation or physical measurement; status is **not PASS** |
| REPO-03 | Integration-specific permission/secret checks | NOT_RUN | No live bearer token, Puter auth, Odysseus server or secret store in this audit |

## Actionable issues in priority order

**P0 — security and truthful status**
- `EMU-04`: pin boot DNA by actual main commit and blob, fetch and validate content, and load only approved memory with provenance. A GET 200 must not display `DNA loaded`.
- `EMU-02/03`: use authentic server-supported Odysseus persona preset/system-prompt installation and verified session ownership; do not smuggle a system prompt into `message`. Treat Puter prompt string as user content until its real API contract proves stronger.
- Verify TRAPP auth and Git write permissions, including existing P0 audit findings F01–F03, before enabling code writes or AI builder features.

**P1 — functional persona UI**
- Add Luna to `src/lib/personas.ts`, `runtime/command-deck.json`, and the hybrid UI, **only** as a separate, canonical persona; avoid cloning Angelica or Emilia, and preserve FACE_LOCK.
- Read actual deployed Odysseus/Puter configuration instead of assuming localhost:7000. No hardcoded pretend service readiness.
- Separate independent mirror evidence from model self-review. The learning engine's `PROPOSE` is not proof of actual behavior improvement.

**P2 — feature progression**
- Odysseus profiles: canonical base prompt + per-persona overlays, with revision and installed-prompt receipts.
- Odysseus Skills Manager: draft → test → independent audit → bounded approval. Do not let skills self-assign write authority.
- Ω7834 guardian view: source-bound owner-visible trial outcomes, privacy *discussion proposals* and human feedback, while honoring existing legal data protections. The guardian contract is currently draft PR #32, not main.
- Puter adapter: token-scoped auth, sandbox/permissions, runtime status, no direct Persona DNA writes.
- 27D remains a read-only research hypothesis until dimensions, input data, evaluable operator, units and falsification tests are established.

## Reproduction

```sh
node --test scripts/odinos-persona-sim-emu.test.mjs
npm test
npm run verify:dna
npm run audit:repo
```

The regression file uses no external network or dependencies beyond Node's built-in test/VM modules and existing repo files. **Known-gap assertions passing is not a feature PASS.** For true E2E: start a separately authorized Odysseus/Puter host, record its version/digest and endpoint, send a real session-bound request, confirm installed prompt/provenance and an actual tool call, then record the result — none of these steps happened here.

## Follow-up and journal

This report is the **session handoff entry** for this task. The separate DNA worklog and governance changes in draft PR #31 have **not** been merged; do not use their content as canonical memory until explicit approval and main SHA read-back. Keep PR #30 (VORTEX extension), #31 (worklog), #32 (guardian contract) as separately reviewable. The current test PR does not merge or supersede those changes.

**Release decision:** TEST/EMU ONLY. No production release, AGI/ASI declaration, environment deployment or persona identity change.

## Observed GitHub Actions results (exact tested head)

**Tested commit:** `c3e2dc4fbde6e52372de2b07da8d472660586bb9`. On 2026-10-08, GitHub Actions `Workspace setup and tests` run [37744979776](https://github.com/dpstudio-se/VR-ASI-CO/actions/runs/37744979776), job `113204199489`, **completed with success**, including `npm run workspace:setup` and `npm test`. The job log showed **all 10 new characterization tests** explicitly as `ok 138` through `ok 147`. The Node test groups reported `265 passed / 0 failed` and `55 passed / 0 failed` respectively. Additional setup suite reported `5 passed / 0 failed`. These are **distinct test groups, not 325 unique live integration checks**.

`Repository structure audit` run [37744979773](https://github.com/dpstudio-se/VR-ASI-CO/actions/runs/37744979773) completed with **success** on the same tested head.

**Additional newly observed checkout issue:** The job cleanup logged `fatal: No url found for submodule path 'puter' in .gitmodules` (git exit 128 warning), although the overall job conclusion was `success`. GitHub tree on canonical main records a gitlink at `puter` (mode `160000`, commit `63eabf8c7c024f0751edb5e6e36a0275d47fdafd`) and **no** `.gitmodules` entry at that tree level. This is an integration/dependency hygiene defect (**GAP**, not claimed fixed here). Before claiming Puter checkout/build is ready, decide explicitly to register a real submodule URL, adopt a pinned dependency, or remove stale gitlink under separately approved change. No blind `git submodule update` or fake version metadata.

**Test conclusion:** `TESTED_ON_HEAD` for the existing app's automated unit/characterization checks. `HOST_VERIFIED = false`; `ODYSSEUS_LIVE = NOT_RUN`; `PUTER_LIVE = NOT_RUN`; `AGI_ASI = UNVERIFIED`; `Ψ27D_EMPIRICAL = STOP`. If this report receives a later docs-only commit, these test receipts **remain bound to the earlier tested SHA**, not automatically to the new report head; recheck GitHub checks on each new head before merge.


## Remediation addendum (later patch on this draft PR)

The preceding table captures **the historical main baseline** from SHA \`3493de2...\`, not the final branch state. The following source changes have now been **written only to this PR branch**:

- \`src/lib/personas.ts\` and \`runtime/command-deck.json\`: add **Luna** as a separate \`REFERENCE\` persona, drawing the identity and address from \`persona/luna.json\`. Angelica remains the default and Emilia remains separate. The informational \`replyFor\` response is still a static prototype, not LLM inference.
- \`odinos-hybrid/index.html\` and \`hybrid.css\`: add a Luna mode/button and explicit DNA status label. No protected visual or identity file was changed.
- \`odinos-hybrid/hybrid.js\`: replace status-only raw URLs with GitHub API resolution of \`main\` and six pinned-revision JSON records, validate their declared Git blob SHA/type/schema envelope and key identity fields, and fail closed on missing files or identity conflict. **Limitation:** the public GitHub API response is a read-only provenance receipt, **not cryptographic host attestation or installed system prompt verification**. The API's reported blob SHA is not independently recomputed in the browser. Never promote it to \`HOST_VERIFIED\`.
- \`odinos-hybrid/hybrid.js\` and \`odysseus.js\`: stop sending \"You are ...\" in ordinary user text. Send raw user message and \`preset_id\` only when an operator configured a localhost Odysseus service and explicit persona preset mapping. There is no default preset, and all Puter persona requests are deliberately **STOP** until a real authenticated system-prompt adapter is verified.
- \`scripts/odinos-persona-sim-emu.test.mjs\`: update from the ten historical characterization tests to **11 tests** covering the newly intended positive and negative source/preset behavior, including tampered identity, absent source, unconfigured adapter, and correctly selected Luna mode.

**Open integration work:** exact chosen upstream Odysseus API contract and server-side preset authorization need a real host test; client-provided preset is not itself authenticated; external Puter integration needs a real service contract; GitHub \`puter\` gitlink lacks \`.gitmodules\`. Do not treat a configured localhost endpoint as remote admission. UI does not independently authenticate Ω7834, and no production deployment was performed.

**Prior observed CI receipts are historical** and apply only to the older test file SHA. Newly added code and modified tests must get a fresh green \`Workspace setup and tests\` on the **new PR head SHA** before they can be called tested; any still-running workflow is **PENDING**, not PASS.
