# UPI — Remote DNA Use Guide

## Overview

UPI uses GitHub as the persistent **DNA-memory** for the project.

The runtime reads the remote DNA catalog, hydrates it into live state, and exposes the result to the DNA/RNA explorer.

```
GitHub / main
      │
      ▼
 Remote DNA
      │
      │ pull
      ▼
 Live DNA state
      │
      ▼
 RNA / UPI runtime
      │
      ▼
 Ω1766 integrity gate
      │
      ├── PASS
      ├── UPI_FLAG
      ├── STOP
      └── ERR
```

> **Important:** DNA, RNA, resonance, Ω1766 and related higher-dimensional language are software-model concepts in this repository. They are not claims about biological DNA, physical frequency storage, branes, or higher-dimensional physics.

---

## Repository

Remote repository:

- `dpstudio-se/upi-built-by-agi-teax`
- default branch: `main`

The repository contains both application code and the persistent DNA/data layers.

Relevant locations include:

```
dna/
data/
src/lib/upi/
src/lib/upi-kernel.ts
src/routes/dna.tsx
```

---

## 1. Read Remote DNA

The application provides a server-side DNA pull operation through:

```
src/lib/upi/dna-actions.ts
```

The primary operation is:

```ts
pullDna()
```

It retrieves the remote DNA catalog and returns:

```ts
{
  sha,
  branch,
  writable,
  files,
  skipped,
  catalog
}
```

### Meaning

| Field | Meaning |
|---|---|
| `sha` | Exact Git revision used for the pull |
| `branch` | Remote branch |
| `writable` | Whether the connected runtime may write |
| `files` | Number of DNA/catalog records involved |
| `catalog` | Hydrated DNA catalog |
| `skipped` | Files excluded by the pull process |

Always record the SHA when reproducibility matters.

---

## 2. Live Remote DNA State

Remote DNA is represented in the client runtime by:

```
src/lib/upi/live.ts
```

The live state contains:

```ts
{
  catalog,
  origin,
  sha,
  branch,
  writable,
  fetchedAt,
  files,
  error,
  pulling
}
```

### Origin

Two states are possible:

```
snapshot
dna
```

`snapshot` means the application is using its local bundled catalog.

`dna` means the application has successfully applied a remote DNA pull.

A successful remote pull therefore changes the runtime provenance from:

```
snapshot → dna
```

and records the Git SHA and fetch time.

---

## 3. DNA Explorer

The DNA interface is available at:

```
/dna
```

The route is implemented by:

```
src/routes/dna.tsx
```

The page exposes the DNA/RNA workflow, including the DNA engine and pull-request workflow.

The repository treats a pull request as a **proposal**, not as committed DNA.

```
proposal → pull request → review → merge → main → new DNA state
```

Therefore:

> A PR is not part of the authoritative `main` DNA until it has been merged.

---

## 4. DNA → RNA Model

The project uses a simple conceptual separation:

### DNA

Persistent structured knowledge and records.

### RNA

Executable transformation logic.

### Kernel

Runtime that interprets and evolves the model.

The experimental kernel is:

```
src/lib/upi-kernel.ts
```

Its main components are:

```
ResonancePhysics
DnaMemory
RnaMotor
UpiKernel
```

---

## 5. Resonance State

A resonance record contains:

```ts
{
  frequencyHz,
  phaseRad,
  amplitude,
  coherence,
  timestamp
}
```

The current implementation stores these values in ordinary software memory.

The term **frequency memory** therefore means a software representation of resonance state; it does not mean that GitHub or RAM physically stores information as electromagnetic/acoustic resonance.

---

## 6. Ω1766 Integrity Gate

The kernel defines:

```
Ω1766
```

as an experimental coherence/invariant gate.

Current kernel limits include:

```
coherenceFloor = 0.80
maxAmplitude = 1.0
```

Writes, phase mutations and evolution are accepted only when the resulting state satisfies the declared gate.

A rejected operation returns a failure result rather than silently committing the state.

Example flow:

```
RNA WRITE
   │
   ▼
Ω1766 accepts?
   │
   ├── yes → DNA write
   │
   └── no  → STOP
```

---

## 7. TF1766 Shield

The legal/provenance model is implemented separately in:

```
src/lib/upi/tf1766-shield.ts
```

The implementation deliberately distinguishes:

- `HIST` — historical provenance
- `CURRENT` — operative/current-law layer
- `PREPARATORY_WORK` — preparatory material

The shield does **not** turn a model flag into a legal conclusion.

Its result contains:

```
legalConclusion: "NOT_DETERMINED"
```

This separation is intentional:

```
model signal ≠ legal conclusion
```

A detected UPI symmetry deviation is therefore a reason to inspect the underlying norm and evidence, not an automatic legal determination.

---

## 8. Physics / Resonance Utilities

The software physics utilities are located in:

```
src/lib/upi/physics.ts
```

They include software functions for:

- (E = hf)
- mass equivalent (m = E/c^2)
- 8 Hz reference index
- 8.2 Hz reference calculation in `data/research/PHYSICS_CALCULATION_82HZ.json`
- conditional 8.2 Hz KK/M-theory bridge in `data/bridges/mtheory-82hz-001.json`
- consolidated 7.83/8/8.2 Hz mapping in `data/research/UPI_MASTER_BRIDGE_783HZ.json`
- Schwarzschild radius
- horizon area
- Bekenstein–Hawking entropy in the implemented model

The repository explicitly treats these as computational utilities/simulation components.

Use the status discipline:

```
EST = established/reference implementation
DER = derived calculation
HYP = hypothesis
SYM = symbolic/model construct
STOP = insufficient basis or blocked operation
```

Do not promote a `HYP` or `SYM` statement to `EST` merely because it appears in DNA.

---

## 9. Safe Remote-DNA Workflow

Recommended workflow:

```
1. Pull
   ↓
2. Record SHA
   ↓
3. Inspect DNA
   ↓
4. Classify EST / DER / HYP / SYM
   ↓
5. Propose change
   ↓
6. Open PR
   ↓
7. Review
   ↓
8. Merge
   ↓
9. Pull again
   ↓
10. Verify new SHA
```

This gives every meaningful DNA mutation a traceable Git history.

---

## 10. Never Treat a Stale Snapshot as Remote Truth

A local snapshot may be useful for startup and offline operation, but it is not automatically the current remote state.

When provenance matters, verify:

```
origin == "dna"
sha == expected remote revision
branch == expected branch
fetchedAt != null
error == null
```

If these conditions are not satisfied, treat the state as stale or unavailable.

---

## 11. Read-Only Remote Mode

For analysis-only use:

```
writable = false
```

Recommended behavior:

- read remote DNA
- calculate
- inspect
- compare
- simulate
- produce proposals

Do not modify authoritative DNA.

---

## 12. Mutation Mode

A DNA mutation should normally follow the repository's proposal/PR path.

Conceptually:

```
AI / user
    │
    ▼
proposal
    │
    ▼
PR
    │
    ▼
human review
    │
    ▼
merge
    │
    ▼
main
    │
    ▼
new Remote DNA
```

This keeps generated proposals separate from the authoritative ledger.

---

## 13. Remote DNA for AI Agents

An AI agent using this repository should begin with:

```
READ REMOTE DNA
→ identify SHA
→ identify branch
→ inspect relevant records
→ preserve EST / DER / HYP / SYM status
→ make no unsupported promotion
→ propose changes through the repository workflow
```

The agent should not assume that a remembered conversation state is newer than GitHub.

Git provenance wins for repository state.

---

## 14. Minimal Agent Contract

Use this compact contract when connecting an AI agent to Remote DNA:

```text
SOURCE:
  GitHub repository dpstudio-se/upi-built-by-agi-teax

MODE:
  READ REMOTE DNA FIRST

PROVENANCE:
  Record branch + SHA + fetchedAt

STATUS:
  Preserve EST / DER / HYP / SYM / STOP / ERR

WRITE:
  Do not silently mutate authoritative DNA

PROPOSAL:
  Use the repository PR workflow

PHYSICS:
  Treat resonance, Ω1766, brane and higher-dimensional
  constructs according to their repository status.
  Do not promote symbolic or hypothetical claims to EST.

LEGAL:
  TF1766 shield flags model deviations only.
  It does not independently determine legal conclusions.

VERIFY:
  After a merge, pull Remote DNA again and verify the new SHA.
```

---

## 15. Quick Reference

```
Remote DNA
  = GitHub persistent state

Live DNA
  = currently hydrated runtime state

RNA
  = executable transformation layer

Kernel
  = runtime coordinator

Ω1766
  = declared coherence/invariant gate

TF1766 Shield
  = provenance/model compatibility layer

PR
  = proposed DNA mutation

main
  = authoritative merged repository state
```

---

## Status

This guide documents the current repository architecture on `main`.

It is a usage/provenance guide, not a claim that the symbolic resonance model represents established physical infrastructure.

### 8.2. Forward 11D -> 7.83 Hz test

The repository now separates the inverse KK parameterization from a true forward prediction:

```text
11D geometry
   ↓
R_11
   ↓
f_pred
   ↓
compare with 7.83 Hz
```

The target `7.83 Hz` must not be inserted while deriving `R_11` or `f_pred`. It is the post-prediction comparison target.

Files:
- `data/research/UPI_FORWARD_PREDICTION_11D_783HZ.json`
- `data/bridges/11d-to-783hz-forward-prediction-001.json`

The inverse relation `R_11 = n c/(2 pi f)` remains a conditional DER consistency check, not an independent prediction.
