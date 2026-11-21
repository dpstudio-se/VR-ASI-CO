# Physics knowledge tree

This directory uses the organization of scientific knowledge rather than persona or product features. It separates measured quantities, constants, laws, theories, models, experiments, observations, and hypotheses. A directory name is a subject classification, never an evidence status.

## Directory contract

```text
physics/
  README.md
  foundations/          mathematical and conceptual foundations
  quantities/           physical quantities, dimensions, units
  constants/            CODATA/SI constants with source editions
  laws/                 validated relations, with domain and limits
  theories/             coherent explanatory frameworks
  models/               explicit approximations and computational models
  interactions/         coupling and interaction mechanisms
  fields/               field definitions and equations
  particles/            particle properties and transitions
  domains/
    quantum/
    relativity/
    thermodynamics/
    electromagnetism/
    statistical-mechanics/
    geophysics/
    astrophysics/
    biophysics/
  experiments/          protocols, apparatus, calibration, controls
  observations/         raw/processed measurements with uncertainty
  derivations/          premise-to-result mathematical derivations
  hypotheses/           falsifiable candidates, not accepted laws
  registry/              machine-readable index of claims
  schemas/               machine-readable data contracts
  tools/                 deterministic validation utilities
  tests/                 tests for schemas, invariants, and validators
  sources/               bibliographic/source metadata
```

Create a subdirectory only when it holds distinct, reviewable material. Avoid duplicate copies: link a claim to its canonical record by stable ID.

## Record lifecycle

`OBSERVATION -> NORMALIZATION -> DIMENSIONAL_CHECK -> SOURCE_REVIEW -> DERIVATION_OR_EXPERIMENT -> COUNTEREXAMPLE_SEARCH -> CLASSIFICATION -> REVIEW -> VERSIONED_RECORD`

A hypothesis may be stored immediately as HYP. It does not become EST by repeated use, numerical resemblance, a simulation, or a directory move.

## Claim status

- `EST`: established in the stated scope and supported by appropriate evidence.
- `DER`: derived from declared premises and valid mathematics.
- `HYP`: testable hypothesis; prediction and falsification route must be stated.
- `SYM`: symbolic/project construct without established physical interpretation.
- `SEM-LOSS`: material meaning lost during translation between representations.
- `STOP`: cannot assess with available evidence or capability.
- `ERR`: known error or contradiction.

Status is per claim, not per file or folder.

## Minimum claim record

Every claim needs a stable ID, concise statement, status, domain/scope, source references, assumptions, variables, SI units/dimensions where applicable, uncertainty if measured, derivation or protocol, known limitations, counterexamples, reviewer, and revision history. Empirical records must distinguish raw observations from processed results and include calibration and uncertainty budgets.

## Dimensional discipline

Store numeric values with units. Use SI base/derived units and explicit conversions. Dimensionless values must say why they are dimensionless. Do not add or equate quantities with incompatible dimensions. A mathematical identity is not an empirical law.

## Physics and project constructs

Project symbols such as TF1766 and Ω1766 belong under `physics/hypotheses/` only when a falsifiable physical interpretation is proposed; otherwise keep them in the project's symbolic model documentation and reference them here as SYM. The registry currently keeps TF1766 classified SYM.

## Reproducibility and provenance

Pin source title, author/institution, DOI/URL, publication/version/date, retrieval date, and exact dataset or document revision. Record instrument model, calibration, environmental conditions, sampling, processing code/version, uncertainty, and controls for measurements.

## Validation

Run:

```sh
node physics/tools/validate-registry.mjs
node --test physics/tests/*.test.mjs
```

These checks validate structure and metadata only. They do not establish the truth of a physical claim.
