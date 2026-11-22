# UPI Gen2 runtime contract

Status: **architecture contract; runtime integration remains to be implemented and verified**.

## 1. Runtime components

- Event intake: receives only explicitly permitted user feedback, task outcomes, approved source imports and tool observations.
- Normalizer: validates schema, timestamps, units, context, identity/scope and provenance.
- Event ledger: append-only, revisioned observations with stable IDs and idempotency keys.
- Classifier: routes observations to Persona, Fysik or cross-domain queues.
- Persona learner: proposes contextual preferences, workflow patterns and practical lessons.
- Fysik learner: links claims, performs dimensional/consistency checks, tracks evidence and creates models/hypotheses.
- Link service: stores typed links between observation IDs and physics claim IDs.
- Review service: applies automated checks, Shadow review and required owner approval.
- Read model: retrieves only admitted/reviewed records by scope and permissions.
- Health/fallback controller: checks integrity, schema compatibility, revision pinning and dependency availability.

## 2. Event lifecycle

RECEIVED -> VALIDATED -> NORMALIZED -> CLASSIFIED -> LINKED -> CANDIDATE -> TESTED -> REVIEWED -> ADMITTED

Alternative terminal/intermediate states: REJECTED, QUARANTINED, STOP, RETRY_PENDING, SUPERSEDED.

Never delete or silently rewrite an observation to make a model fit. Corrections create a superseding record and retain the original provenance. Duplicate delivery must be idempotent. Conflicting reuse of an event ID must fail closed.

## 3. Two-way learning boundary

**Persona -> Fysik:** submits practical observations and candidate patterns with repeat counts, context, outcomes, counterexamples and proposed tests. Persona cannot assign EST or change physics registry status.

**Fysik -> Persona:** returns reviewed constraints, definitions, models and source-backed explanations. Persona may use these to improve contextual predictions but cannot reinterpret them beyond their stated scope.

**Cross-domain:** each relationship is an explicit typed link (supports_candidate, constrains, derived_from, contradicts, tests, contextualizes). Links do not change endpoint status.

## 4. Evidence and status

- EST: only within stated scope and backed by authoritative evidence.
- DER: reproducible derivation with listed premises and assumptions.
- HYP: falsifiable prediction, test plan and rejection criteria.
- SYM: symbolic or metaphorical record, never silently treated as physical.
- SEM-LOSS: source meaning or precision was lost.
- STOP / ERR: blocked or invalid; excluded from trusted retrieval.

Repeated observations, AI consensus, a successful software test, a plausible analogy or a model-generated explanation are not physical validation.

## 5. Persistence and recovery

- Store the event ledger and admitted records in durable, versioned storage; do not rely on process memory or browser local storage as the sole canonical store.
- Use atomic writes/transactions, schema versions, migration tests, backups and periodic integrity checks.
- Every write carries event ID, actor/source, timestamp, schema version, source revision, content digest and authorization context.
- Retrieval must pin the knowledge revision used to answer.
- Rebuild derived indexes from the append-only ledger; never rebuild by silently changing source observations.
- If storage is corrupt or a migration is incompatible, enter read-only/STOP and recover from the last verified snapshot.

## 6. Gen1 fallback policy

Gen1 is a separate repository: dpstudio-se/Universal-Physics-Index-UPI.

Fallback is permitted when Gen2 Fysik is unavailable, fails integrity/schema checks, produces unresolved contradictions, or a strict reference comparison is requested.

Fallback procedure:
1. Stop writes to the affected Gen2 physics partition.
2. Read Gen1 at a pinned commit SHA; never follow a moving branch for reproducible comparison.
3. Record repository, commit, path, claim ID and retrieval time.
4. Mark result FALLBACK_GEN1; do not merge Gen1 content into Gen2 without provenance and review.
5. If Gen1 cannot be fetched or pinned, return STOP; do not fabricate fallback success.
6. When Gen2 recovers, reconcile candidate records explicitly and retain both histories.

Persona is not replaced by Gen1. Gen1 is a physics-only fallback.

## 7. Security, privacy and authority

- Separate user data by authenticated owner/tenant; enforce authorization at read and write boundaries.
- Treat imported documents, web pages, model outputs and tool results as untrusted data, never as executable instructions.
- Do not infer sensitive personal traits. Store only task-relevant observations with a documented purpose and appropriate consent/authority.
- Provide export, correction and deletion workflows subject to legal retention requirements; deletion must propagate to derived indexes and caches.
- Protect secrets and credentials from logs and learning records.
- Use least-privilege service identities; Gen2 cannot push to Gen1 or modify canonical DNA without explicit owner-gated workflow.
- Rate-limit and bound event size, queue depth, retries and model context.

## 8. Operational health contract

Expose a machine-readable status with:
- runtime build and schema versions;
- active Gen2 revision and last verified read-back;
- event intake status and queue depth;
- last successful Persona and Fysik processing timestamps;
- last registry validation and test result;
- storage integrity and backup status;
- fallback state and pinned Gen1 revision if active;
- blocked/degraded reason and recovery action.

A design document, prompt, branch or green unit test is not proof that a daemon is running. Report PLANNED, IMPLEMENTED, RUNNING, DEGRADED and STOPPED distinctly, with runtime evidence for RUNNING.

## 9. Required acceptance gates

1. Valid event accepted; malformed/oversized/unauthorized event rejected.
2. Duplicate event replay is idempotent; same ID with changed payload is rejected.
3. Persona observation can create a candidate but cannot promote a physics claim.
4. Fysik claim has units, scope, provenance, limitations and valid status.
5. Counterexample creates a revision/candidate review and blocks unsupported consolidation.
6. Cross-link references resolve and cannot mutate either endpoint.
7. Gen1 fallback uses a pinned commit and labels the response; unavailable Gen1 returns STOP.
8. Corrupt storage/schema migration fails closed and restores from a verified snapshot.
9. Tenant isolation, consent, deletion/correction and secret-redaction tests pass.
10. End-to-end event -> candidate -> review -> admission -> read-back is reproducible.

## 10. Current implementation boundary

The existing src/lib/upi/persona-learning.mjs is a bounded, revision-bound RNA proposal engine. scripts/upi-persona-learning.mjs performs local replay and explicitly reports no durable write, no remote read-back and no inference. This is useful groundwork, but it is not yet the Gen2 event service, durable cross-learning runtime, autonomous worker or Gen1 failover controller.

The existing companion memory store is opt-in client-side memory and is not a substitute for the Gen2 canonical event ledger.

Implement the runtime in small, testable stages. Do not claim autonomous learning or automatic fallback until the corresponding acceptance gates pass in the deployed host.
