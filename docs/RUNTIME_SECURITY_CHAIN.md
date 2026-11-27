# Runtime Security Chain: P57–P59

This document records the implementation boundary for the boot/runtime security chain.

## P57: Transactional PostgreSQL storage

Implemented on the P57 branch:
- Server-side SQL transaction API using one checked-out PostgreSQL connection for Neon transactions.
- PGlite transaction support for local/integration tests.
- Boot session, permanent nonce claim and audit-event schema.
- Atomic boot + nonce + creation-audit insert.
- Compare-and-set boot transition and audit append in one transaction.
- Database triggers reject mutation/deletion of nonce claims and boot audit events.
- Production factory rejects the PGlite fallback and requires the configured PostgreSQL backend.

Not yet established:
- A production PostgreSQL instance has not been provisioned or configured.
- Backups, restore drills, HA, network policy, secret rotation and deployment migration operations have not been verified.

## P58: Trusted host attestation

Implemented protocol:
- Ed25519 signature verification over a domain-separated, fixed-field payload.
- Binding to trusted issuer/key/host, audience, boot ID, session ID, exact DNA commit, challenge nonce and prompt hash.
- Signed prompt-readback and runtime-measurement claims.
- Exactly one observed remote inference request, response hash, provider/model identity and allowlisted HTTPS endpoint.
- Short attestation lifetime and durable one-time nonce consumption in PostgreSQL.
- Replay receipts are append-only and bound to an unexpired boot in INFERENCE_PENDING.

Critical limitation:
- PuterHostAttestationPort is an integration contract. No live Puter host attestor, trusted private key, prompt read-back measurement or deployment key registry has been provisioned or independently verified.
- A signed statement proves what the trusted signer asserted. It does not independently prove the assertion unless the attestor itself observes the host behavior through a trusted channel.

Therefore Puter runtime admission remains REFERENCE_ONLY.

## P59: Runtime grant enforcement

Implemented server-side controls:
- Grants issue only for ADMITTED boots.
- Principal, session and canonical DNA commit are bound to each grant.
- Capabilities come from a server-controlled policy and are checked against a closed allowlist.
- Each operation start rechecks grant state, expiry, principal, session, capability and current DNA commit.
- Operation IDs are unique and idempotent. A duplicate operation is never executed twice.
- Grant revocation blocks new operation starts.
- In-flight external operations are not assumed cancellable. Expired or uncertain outcomes become UNKNOWN, never automatic retries.
- Grant and operation events are recorded transactionally and protected against ordinary update/delete.

Forbidden capabilities include canonical DNA writes, main-branch commits/merges, credential issuance and security-policy changes.

## Admission status

The code and automated tests are not equivalent to a deployed production security boundary.

Production admission requires all of:
1. A real PostgreSQL service configured through protected server environment.
2. Successful production migration and backup/restore verification.
3. A separately trusted Puter host attestor with controlled Ed25519 key registration.
4. Evidence that prompt installation/read-back and inference observation are independently measured.
5. Runtime routes and every privileged tool wired through the grant/capability broker.
6. Independent security review and human approval.

Until these conditions are met, the correct status is REFERENCE_ONLY, not ADMITTED.
