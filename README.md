# VR-ASI-CO — Remote DNA & Runtime Guide

**VR-ASI-CO** is the name of this project. GitHub `main` is its durable,
versioned memory; the running application pulls that data into live state for
inspection and simulation.

> **Naming note:** `UPI` remains in existing source paths, data formats and
> scientific-index terminology. It is an internal/legacy code name, not the
> project title used in this guide.
>
> **Scope note:** DNA, RNA, resonance, Ω1766 and higher-dimensional language
> describe software models here. They do not imply biological DNA, physical
> frequency storage, or experimentally established brane physics.

## At a glance

```text
GitHub main
    │
    ▼
Remote data ── pull + record SHA ──► Live application state
                                         │
                                         ▼
                                    RNA / runtime
                                         │
                                         ▼
                                   Ω1766 model gate
                                PASS · UPI_FLAG · STOP · ERR
```

The words **DNA**, **RNA** and **kernel** are useful names for the data,
transformation and runtime layers. They are not claims about biological
processes.

## Repository and key files

| Purpose | Location |
|---|---|
| Authoritative project repository | [`dpstudio-se/upi-built-by-agi-teax-main`](https://github.com/dpstudio-se/upi-built-by-agi-teax-main), branch `main` |
| Persistent model and research data | `data/` |
| Project DNA metadata | `dna/` |
| Remote pull and proposal operations | `src/lib/upi/dna-actions.ts`, `src/lib/upi/github.server.ts` |
| Data normalization and source configuration | `src/lib/upi/hydrate.ts` |
| Live provenance state | `src/lib/upi/live.ts` |
| DNA explorer | [`/dna`](https://upi-built-by-agi-teax.grok.me/dna), implemented in `src/routes/dna.tsx` |
| Experimental runtime kernel | `src/lib/upi-kernel.ts` |
| Legal/provenance model shield | `src/lib/upi/tf1766-shield.ts` |

The GitHub repository slug and internal `upi` paths are retained for technical
compatibility; the project is referred to as **VR-ASI-CO**.

## Pulling Remote DNA

The server-side `pullDna()` operation retrieves JSON records from the configured
repository and returns:

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

| Field | Meaning |
|---|---|
| `sha` | Exact Git commit used for the pull; the essential reproducibility identifier |
| `branch` | Remote branch read |
| `writable` | Whether GitHub credentials are available for proposal operations |
| `files` | Number of successfully parsed JSON files |
| `skipped` | Files that could not be fetched or parsed |
| `catalog` | Normalized nodes, bridges and sources made available to the runtime |

The configured data source and the provenance reported by the running app must
agree before its contents are treated as the current remote state. A successful
HTTP response alone is not proof that the expected repository or commit was
loaded.

### Live state and provenance

The client store in `src/lib/upi/live.ts` tracks:

```ts
{
  catalog,
  origin,       // "snapshot" | "dna"
  sha,
  branch,
  writable,
  fetchedAt,
  files,
  error,
  pulling
}
```

- `origin: "snapshot"` means the bundled fallback catalog is in use. It is not
  evidence of the latest GitHub state.
- `origin: "dna"` means a remote pull was applied to the live runtime.
- `sha`, `branch` and `fetchedAt` identify the pulled state and when it was
  applied.
- A non-null `error`, missing SHA or unexpected repository/branch means the
  state is unavailable or unverified for provenance-sensitive work.

For a reproducible analysis, record the repository, branch, full SHA and
`fetchedAt`. Do not substitute a remembered conversation, a local snapshot or
an unmerged pull request for Git provenance.

## Data status and safe handling

Preserve the status assigned to each record:

| Status | Use |
|---|---|
| `EST` | Established relation or reference within its stated scope |
| `DER` | Derived from named inputs and assumptions |
| `HYP` | Hypothesis that still needs an independent test |
| `SYM` | Symbolic or software-model construct |
| `STOP` | Blocked or not supported by the available basis |
| `ERR` | Data, schema or runtime error |

Never promote `HYP` or `SYM` to `EST` because a record appears in Git, a
calculation runs, or a numerical match is observed. If a compound status
contains `STOP`, keep the interpretation conservative and explain the block.

### Proposals are not authoritative data

The safe mutation path is:

```text
draft → pull request → human review → merge to main → pull again → verify SHA
```

A pull request is a proposal. It becomes part of the authoritative state only
after it is merged into `main`. Use read-only mode for analysis when write
credentials are absent; do not silently modify the authoritative catalog.

## Runtime model

### DNA, RNA and kernel

- **DNA:** versioned structured records in the repository.
- **RNA:** executable transformations that read records, inspect them and
  prepare proposals.
- **Kernel:** the software runtime that coordinates modeled state and checks
  declared invariants.

### Resonance state and Ω1766

A resonance record in the experimental kernel is ordinary software data:

```ts
{
  frequencyHz,
  phaseRad,
  amplitude,
  coherence,
  timestamp
}
```

The current Ω1766 model gate declares a `coherenceFloor` of `0.80` and a
`maxAmplitude` of `1.0`. Operations that fail the declared validation should
return a failure (`STOP`/`ERR`) rather than silently changing accepted state.
These values are software invariants, not physical constants or laws.

### TF1766 shield

`src/lib/upi/tf1766-shield.ts` models provenance distinctions including
`HIST`, `CURRENT` and `PREPARATORY_WORK`. Its `UPI_FLAG` is a prompt to inspect
the relevant rule and evidence; it is not a legal determination. The model
keeps `legalConclusion: "NOT_DETERMINED"`.

## Physics and resonance records

Physics-related utilities in `src/lib/upi/physics.ts` are computational or
simulation components. Repository examples include `E = hf`, a derived mass
equivalent `m = E/c²`, reference-frequency calculations, horizon quantities
and conditional Kaluza–Klein mappings. Treat each record according to its own
status and assumptions; software output is not experimental validation.

### 11D → 7.83 Hz forward-prediction test

The research records
[`UPI_FORWARD_PREDICTION_11D_783HZ.json`](data/research/UPI_FORWARD_PREDICTION_11D_783HZ.json)
and
[`11d-to-783hz-forward-prediction-001.json`](data/bridges/11d-to-783hz-forward-prediction-001.json)
define a testable workflow:

```text
independently fixed 11D geometry
    → derive R_11
    → derive f_pred
    → compare with the 7.83 Hz reference
```

The target frequency must not be inserted while deriving `R_11` or `f_pred`.
The inverse relation `R_11 = n c/(2πf)` is a conditional `DER` consistency
check, not an independent compactification prediction. The forward physical
mapping remains `HYP` until an independently specified model produces a
quantitative prediction with uncertainty.

## Agent checklist

Before using remote data:

1. Read the remote `main` state and record its repository, branch and full SHA.
2. Verify that the running application reports that same provenance; otherwise
   treat its snapshot as stale or unverified.
3. Inspect the relevant records and preserve their `EST` / `DER` / `HYP` /
   `SYM` / `STOP` / `ERR` classifications.
4. Keep model signals separate from physical evidence and legal conclusions.
5. Propose changes through the pull-request workflow; do not silently rewrite
   authoritative data.
6. After a merge, pull again and confirm the new SHA and fetch time.

> **Rule of record:** GitHub `main` defines the merged repository state.
> Conversation memory and a pending PR do not supersede it.
