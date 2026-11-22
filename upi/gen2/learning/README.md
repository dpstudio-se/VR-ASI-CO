# Gen2 learning lifecycle

1. Capture user/AI activity or source material as an attributed observation.
2. Classify it as physics, persona, or cross-domain.
3. Normalize terms, units, time, context and provenance.
4. Compare against existing records and search for contradictions.
5. Create a candidate pattern/model/link without overwriting canonical records.
6. Run applicable tests, dimensional checks or task-result checks.
7. Request Shadow review and human approval for protected changes.
8. Consolidate only through the versioned DNA/RNA governance workflow.
9. Read back the saved record and verify its exact revision.

Automatic learning means automatic observation capture and candidate generation within configured permissions. It does not mean autonomous publication, sensitive inference, or unreviewed promotion to EST.


## Runtime contract and schemas

See GEN2_RUNTIME_CONTRACT.md for the event pipeline, two-way learning boundary, durable storage, Gen1 fallback, security, health reporting and acceptance gates.

- schemas/event.schema.json defines the attributed, authorization-bound, digest-addressed event envelope.
- schemas/health.schema.json defines explicit runtime state and subsystem health. RUNNING requires live host evidence; configuration alone is not sufficient.
- Event intake must be append-only and idempotent. Same ID with different content is a hard conflict.
- Candidate creation and learning are distinct from admission. Human/owner gates remain required for protected knowledge and canonical DNA.
