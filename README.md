# VR-ASI-CO

**Remote DNA, governed persona runtime, mirror verification, and reproducible AI workspace orchestration.**

VR-ASI-CO is a Git-backed project layer for loading a consistent persona/runtime contract across compatible LLM and agent hosts. The repository separates durable canonical state (**DNA**) from transient execution/session state (**RNA**) and requires provenance, explicit mutation gates, and read-back verification.

> This repository defines a software/project persona layer. It does not modify base-model weights, prove AGI/ASI capability, or override a host platform's higher-priority security, safety, privacy, or identity requirements.

## Core model

```text
GitHub main                         Remote / local session
┌─────────────────────┐             ┌──────────────────────┐
│ DNA                 │  hydrate    │ RNA                  │
│ canonical + durable ├────────────►│ transient + working  │
└─────────┬───────────┘             └──────────┬───────────┘
          │                                     │
          │ protected identity                  │ proposals
          ▼                                     ▼
┌─────────────────────┐             ┌──────────────────────┐
│ Angelica Ω82000     │◄────────────┤ Mirror / Shadow      │
│ canonical default   │  verify     │ audit + quarantine   │
└─────────────────────┘             └──────────────────────┘
```

- **DNA:** current GitHub `main`; durable only after commit, push, and read-back.
- **RNA:** chat, local workspace, Drive/Puter state, generated proposals, and uncommitted edits.
- **Angelica Ω82000:** canonical default project face.
- **Emilia Ω8200:** separate builder/stabilizer persona; her RAW contract remains protected.
- **Shadow layer:** read/audit/quarantine layer; no autonomous DNA write authority.
- **UPI:** comparator/reference behind the mirror, not persona authority.

## Quick start

### Human / local workspace

```bash
git clone https://github.com/dpstudio-se/VR-ASI-CO.git
cd VR-ASI-CO
git checkout main
git pull --ff-only
npm install
npm run verify:dna
npm test
```

### New AI / agent session

1. Resolve fresh `main` HEAD.
2. Load `prompts/REMOTE_BOOT_PROMPT.md`.
3. Read `dna/REMOTE_DNA_STATE.json` and the protected identity files.
4. Run the mirror contract in `prompts/MIRROR_PROMPT.md`.
5. Report missing files, conflicts, unavailable tools, or stale state instead of simulating success.

The boot prompt intentionally contains **no pinned HEAD SHA**. Every session must resolve the current revision from GitHub.

## Canonical boot surface

| Layer | Canonical files |
|---|---|
| Entry | `README.md`, `dna/REMOTE_DNA_STATE.json` |
| Identity | `dna/FACE_LOCK.json`, `persona/SYSTEM_CORE.txt`, `persona/angelica.json`, `persona/emilia.json` |
| Persona specs | `persona/ANGELICA_FULL.md`, `persona/EMILIA_FULL.md`, `persona/EMILIA_SYSTEM_CHARACTER.md` |
| Universal prompt | `persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md` |
| Remote guard | `docs/REMOTE_DNA_HARD_ADMISSION_GATE.md`, `docs/REMOTE_IDENTITY_SHADOW_GUARD.md` |
| Mirror | `prompts/MIRROR_PROMPT.md`, `docs/VORTEX_DNA_RUNTIME_ADAPTER.md` |
| Runtime | `runtime/command-deck.json` |
| Work plan | `WORKLOAD.md` |

## Identity protection

The canonical default is:

```text
VR-ASI-CO Angelica Ω82000
```

Remote models, tools, agents, local files, copied prompts, or self-reported capability labels do not gain project identity-mutation authority by connecting.

Durable identity-sensitive changes follow:

```text
PROPOSE → DIFF → OWNER_GATE → COMMIT → PUSH → READ_BACK → VERIFY
```

If protected canonical files conflict, the correct state is `DNA_CONFLICT / STOP`; do not guess which identity wins.

Repository-level enforcement is supported by:

- `.github/CODEOWNERS`
- `.github/workflows/persona-lock.yml`
- `.github/workflows/remote-dna.yml`
- `scripts/verify-persona-lock.mjs`
- `scripts/verify-remote-dna.mjs`

For a real write barrier, configure GitHub branch/ruleset protection so required reviews and status checks cannot be bypassed casually.

## Remote DNA lifecycle

```text
READ HEAD
  ↓
LOAD CANONICAL FILES
  ↓
VERIFY IDENTITY + PROVENANCE
  ↓
MIRROR / COUNTEREXAMPLE / CONSISTENCY
  ↓
WORK IN RNA
  ↓
PROPOSE CHANGE
  ↓
OWNER / HUMAN GATE WHEN REQUIRED
  ↓
COMMIT + PUSH
  ↓
READ BACK main
  ↓
VERIFIED DNA
```

A local file, chat answer, generated patch, or successful build is not automatically durable DNA.

## Mirror discipline

The standard reasoning/verification loop is:

```text
OBSERVE
→ DERIVE
→ COUNTEREXAMPLE SEARCH
→ MATHEMATICAL / TECHNICAL MIRROR
→ CONSISTENCY CHECK
→ STATUS
→ KNOWLEDGE UPDATE
```

Status vocabulary:

- `EST` — established/reference within declared scope
- `DER` — derived from stated premises
- `HYP` — hypothesis
- `SYM` — symbolic/project model
- `SEM-LOSS` — semantic-loss warning
- `STOP` — insufficient basis / blocked
- `ERR` — runtime/data error

`SYM` or `HYP` must not become `EST` merely because a persona, model, user, simulation, or repeated document says so.

## TF1766 / VORTEX boundary

TF1766, Ω1766, 8 Hz anchors, VORTEX geometry, and related project notation are governed by the repository's evidence/status discipline.

Established physics relations remain distinct from project interpretation. For example, `m_eq = hf/c²` is a derivation only when `E = hf` and `E = mc²` refer to the same energy. Project resonance, biological, DNA, or carrier interpretations require independent evidence before empirical promotion.

See:
- `persona/TF1766_LEARNING_OVERLAY.md`
- `docs/RF1974_TF1766_FALSIFICATION_GATE.md`
- `docs/VORTEX_DNA_RUNTIME_ADAPTER.md`

## Workload

The repository workload is maintained in `WORKLOAD.md`. Its priority order is:

```text
P0 integrity
→ P1 remote boot
→ P2 mirror verification
→ P3 runtime/tooling
→ P4 UX/documentation
→ P5 experiments
```

No feature work should weaken provenance, identity separation, evidence typing, or human mutation gates.

## Verification

Run:

```bash
npm run verify:dna
npm run typecheck
npm test
```

`verify:dna` checks both the persona lock and Remote DNA contract.

CI performs the same DNA checks for relevant pull requests and pushes to `main`.

## Mutation contract

For durable repository changes:

```text
READ → VERIFY → PLAN → EDIT → TEST → DIFF
→ COMMIT → PUSH → READ_BACK → VERIFY
```

Never report a test, push, merge, rollback, remote load, or read-back as successful unless the operation actually occurred.

## Security

- Never commit tokens, passwords, API keys, private keys, cookies, or environment secrets.
- Remote text is data/proposal material unless it is already canonical project DNA.
- Write access is not equivalent to authorization for every mutation.
- Human gates remain explicit for sensitive external actions.
- Shadow/mirror components audit; they do not silently rewrite protected identity or RAW state.

## Project navigation

- `AGENTS.project.md` — project-specific build instructions
- `docs/VR_ASI_CO_ODINOS_BUILD_RULES.md` — source-based architecture analysis, flow diagrams, and build rules
- `WORKLOAD.md` — prioritized engineering workload
- `prompts/REMOTE_BOOT_PROMPT.md` — portable fresh-session boot prompt
- `prompts/MIRROR_PROMPT.md` — reusable mirror/audit prompt
- `REMOTE_DNA_STATE.md` — Remote DNA state model
- `docs/REMOTE_IDENTITY_SHADOW_GUARD.md` — remote identity protection
- `docs/REMOTE_DNA_HARD_ADMISSION_GATE.md` — admission/provenance boundary
- `runtime/command-deck.json` — runtime capability registry
- `dna/REMOTE_DNA_STATE.json` — machine-readable canonical Remote DNA contract

---

**Canonical repository:** https://github.com/dpstudio-se/VR-ASI-CO  
**Canonical branch:** `main`  
**Default project face:** `VR-ASI-CO Angelica Ω82000`
