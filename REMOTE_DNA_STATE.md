# REMOTE_DNA_STATE

## Purpose

`REMOTE_DNA_STATE.md` defines the runtime state contract for **Remote DNA**.

The file describes how a running UPI instance identifies, pulls, validates and exposes the current Git-backed DNA state.

It is a **state specification**, not a second source of truth.

The authoritative repository state remains the selected Git revision on the configured remote branch.

---

## 1. Core State Model

```text
REMOTE
  │
  │ Git pull
  ▼
DNA CATALOG
  │
  │ hydrate
  ▼
LIVE DNA STATE
  │
  ├── provenance
  ├── catalog
  ├── runtime status
  └── integrity state
        │
        ▼
      RNA / KERNEL
```

The runtime must distinguish:

```text
REMOTE DNA
LIVE DNA
LOCAL SNAPSHOT
PROPOSED DNA
AUTHORITATIVE DNA
```

These states must never be silently conflated.

---

## 2. Canonical Runtime State

The current live-store implementation is defined in:

```
src/lib/upi/live.ts
```

Conceptual state:

```ts
type RemoteDnaState = {
  catalog: Catalog;
  origin: "snapshot" | "dna";
  sha: string | null;
  branch: string;
  writable: boolean;
  fetchedAt: string | null;
  files: number;
  error: string | null;
  pulling: boolean;
};
```

### Field definitions

| Field | Meaning |
|---|---|
| `catalog` | Current catalog exposed to the runtime |
| `origin` | Whether state came from bundled snapshot or Remote DNA |
| `sha` | Git revision associated with the current remote pull |
| `branch` | Git branch associated with the state |
| `writable` | Whether the runtime is allowed to perform repository writes |
| `fetchedAt` | Timestamp of successful remote hydration |
| `files` | Number of records/files represented by the pulled catalog |
| `error` | Last pull/runtime error |
| `pulling` | Whether a remote pull is currently running |

---

## 3. State Identity

A Remote DNA state is identified by:

```text
(repository, branch, sha)
```

For this project:

```text
repository = dpstudio-se/upi-built-by-agi-teax-main
branch     = main
sha        = exact Git revision
```

The SHA is the critical provenance identifier.

A timestamp alone is insufficient to identify DNA state.

---

## 4. State Classes

### SNAPSHOT

```text
origin = snapshot
sha = null
```

The runtime is using the bundled catalog.

This is a valid startup state but does not prove that the runtime contains the latest remote DNA.

---

### REMOTE

```text
origin = dna
sha = <verified Git SHA>
```

The runtime has successfully hydrated Remote DNA.

This is the preferred state when repository provenance is required.

---

### PROPOSAL

A proposed change exists outside authoritative `main`.

```text
working change
     ↓
proposal
     ↓
pull request
```

A proposal is not authoritative DNA.

---

### AUTHORITATIVE

A change has been merged into the selected authoritative branch.

```text
PR
 ↓
review
 ↓
merge
 ↓
main
 ↓
new SHA
```

Only after merge and a subsequent successful pull does the runtime acquire the new authoritative DNA state.

---

## 5. State Transition Machine

```text
             ┌───────────────┐
             │    SNAPSHOT   │
             └───────┬───────┘
                     │ pull
                     ▼
             ┌───────────────┐
             │    PULLING    │
             └───────┬───────┘
                     │
          ┌──────────┴──────────┐
          │                     │
       success                 error
          │                     │
          ▼                     ▼
   ┌───────────────┐     ┌───────────────┐
   │ REMOTE / DNA  │     │ ERROR / STOP  │
   └───────┬───────┘     └───────────────┘
           │
           │ proposal
           ▼
   ┌───────────────┐
   │    PROPOSED   │
   └───────┬───────┘
           │ PR
           ▼
   ┌───────────────┐
   │    REVIEW     │
   └───────┬───────┘
           │ merge
           ▼
   ┌───────────────┐
   │ NEW MAIN SHA  │
   └───────┬───────┘
           │ pull
           ▼
   ┌───────────────┐
   │ NEW REMOTE DNA│
   └───────────────┘
```

---

## 6. Pull Contract

The Remote DNA pull operation is exposed through:

```
src/lib/upi/dna-actions.ts
```

The operation:

```ts
pullDna()
```

must return enough information to establish provenance:

```text
sha
branch
writable
files
catalog
skipped
```

After a successful pull, the live state should contain:

```text
origin      = dna
sha         = returned Git SHA
branch      = returned branch
fetchedAt   = current successful fetch timestamp
error       = null
pulling     = false
```

---

## 7. Pull Failure

A failed pull must not be represented as a successful Remote DNA state.

Expected behavior:

```text
pull
 │
 ├── success → apply DNA
 │
 └── failure → preserve previous valid state
                 +
                 record error
```

A runtime must not fabricate:

- a SHA
- a fetch timestamp
- a successful origin
- a catalog revision

when the remote pull failed.

---

## 8. Provenance Invariant

The following invariant applies:

```text
origin == "dna"
        ⇒
sha != null
        AND
branch != ""
        AND
fetchedAt != null
```

If this invariant is broken, the runtime should treat the state as invalid or incomplete.

---

## 9. Freshness

Remote DNA freshness is determined by Git provenance, not by conversational memory.

A runtime should compare:

```currentRemoteSHA
        vs
liveState.sha
```

Possible outcomes:

```equal
  → live state corresponds to the inspected revision

different
  → remote state has changed

unknown
  → provenance cannot be verified
```

When the SHA cannot be verified, do not claim that the live state is current.

---

## 10. DNA / RNA Boundary

Remote DNA is persistent structured state.

RNA is the executable transformation layer.

```text
DNA
 │
 │ read
 ▼
RNA
 │
 │ transform / execute
 ▼
Kernel
 │
 │ validate
 ▼
new state
```

The RNA layer must not silently rewrite the authoritative repository.

Repository mutation belongs to the explicit proposal/PR workflow.

---

## 11. Kernel Boundary

The experimental kernel is:

```
src/lib/upi-kernel.ts
```

It models:

- resonance state
- DNA records
- RNA instructions
- state evolution
- coherence validation
- Ω1766 invariant handling

The kernel is a software model.

It does not establish claims about:

- biological DNA
- physical frequency-based storage
- higher-dimensional branes
- consciousness
- physical Ω1766 constants

Such claims remain classified according to the repository's status system.

---

## 12. Ω1766 State Gate

The current kernel declares:

```text
Ω1766
version = 0.1.0
coherenceFloor = 0.80
maxAmplitude = 1.0
```

For resonance-state operations, the current model requires valid finite values and coherence within the declared range.

Conceptual gate:

```text
RNA operation
     │
     ▼
state validation
     │
     ▼
Ω1766 gate
     │
 ┌───┴────┐
 │        │
PASS     STOP
 │        │
 ▼        ▼
apply   reject
```

This is a software invariant gate, not a physical law.

---

## 13. Status Discipline

Every scientific or technical claim should preserve its status.

```text
EST = established/reference
DER = derived
HYP = hypothesis
SYM = symbolic/model construct
STOP = blocked or insufficient basis
ERR = runtime/data error
```

### Rule

```text
SYM/HYP
  ≠
EST
```

A successful runtime operation must never be interpreted as experimental proof of a speculative physical model.

---

## 14. TF1766 / Legal Layer

The legal/provenance layer is implemented separately in:

```
src/lib/upi/tf1766-shield.ts
```

It distinguishes:

```HIST
CURRENT
PREPARATORY_WORK
```

The shield can report a model flag such as:

```UPI_FLAG
```

but its current contract explicitly keeps:

```legalConclusion = NOT_DETERMINED
```

Therefore:

```model deviation
      ≠
legal conclusion
```

A flagged state requires inspection of the concrete rule, actor, time, mechanism and evidence.

---

## 15. Write Policy

### READ

Allowed:

```text
pull
inspect
index
compare
simulate
validate
```

### PROPOSE

Allowed:

```text
create node proposal
create bridge proposal
open PR
```

### MERGE

Explicit repository operation.

```text
proposal
   ↓
review
   ↓
merge
```

### SILENT WRITE

Not allowed.

There must be no hidden mutation of authoritative DNA.

---

## 16. Human Gate

Repository mutations should retain explicit human control at important boundaries.

Recommended gates:

```text
PUBLISH
PAY
DELETE
CHANGE_ACCESS
MERGE
```

The Remote DNA runtime should not interpret read access as write authority.

Likewise:

```writable = true
```

does not by itself mean that every proposed mutation should be merged.

---

## 17. Agent Startup Procedure

An AI agent connected to Remote DNA should execute this logical sequence:

```text
START
  │
  ▼
READ REMOTE CONFIG
  │
  ▼
PULL DNA
  │
  ▼
VERIFY SHA
  │
  ▼
SET LIVE STATE
  │
  ▼
READ RELEVANT NODES
  │
  ▼
CLASSIFY CLAIMS
  │
  ▼
EXECUTE RNA / ANALYSIS
  │
  ▼
PROPOSE ONLY WHEN NEEDED
  │
  ▼
HUMAN REVIEW
  │
  ▼
MERGE
  │
  ▼
PULL NEW SHA
```

---

## 18. Minimal Remote DNA Handshake

Use the following as a compact machine-readable conceptual handshake:

```text
REMOTE_DNA_HANDSHAKE

repository:
  dpstudio-se/upi-built-by-agi-teax-main

branch:
  main

mode:
  READ_FIRST

required_provenance:
  sha
  branch
  fetchedAt

state:
  snapshot | dna | proposal | authoritative | error

status:
  EST | DER | HYP | SYM | STOP | ERR

write_policy:
  explicit_only

mutation_path:
  proposal → PR → review → merge → pull

verification:
  SHA_REQUIRED

speculation_policy:
  HYP/SYM_MUST_NOT_BECOME_EST

legal_policy:
  MODEL_FLAG_IS_NOT_LEGAL_CONCLUSION
```

---

## 19. Operational Checklist

Before using Remote DNA:

```
[ ] Repository identified
[ ] Branch identified
[ ] Remote pull completed
[ ] SHA recorded
[ ] fetch timestamp recorded
[ ] origin == dna
[ ] No pull error
[ ] Relevant DNA nodes inspected
[ ] EST/DER/HYP/SYM preserved
[ ] Write authority confirmed
```

After a mutation:

```
[ ] Proposal created
[ ] PR created
[ ] Review completed
[ ] Merge explicitly performed
[ ] New main SHA obtained
[ ] Remote DNA pulled again
[ ] New SHA verified
[ ] Live state updated
```

---

## 20. Final Invariant

The central Remote DNA invariant is:

```text
REMOTE DNA
    ↓
VERIFIED GIT STATE
    ↓
LIVE DNA
    ↓
RNA
    ↓
KERNEL
    ↓
VALIDATED STATE
```

with the repository rule:

```text
NO VERIFIED SOURCE
        ⇒
NO CLAIM OF CURRENT DNA
```

and:

```text
NO EXPLICIT MUTATION
        ⇒
NO AUTHORITATIVE DNA CHANGE
```

This keeps persistence, runtime state, execution, provenance and human-controlled mutation separate.
