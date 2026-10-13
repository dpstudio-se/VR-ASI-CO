# Mirror face binding

Status: SYM additive contract. This file does not change FACE_LOCK, persona files, or UPI identity authority.

## How it is intended to work

Three stores stay separate.

1. Data mirror. `src/lib/upi/dna-memory-mirror.mjs` implements `VR-ASI-CO-BASE-MIRROR/1`: nine bases, reverse complement, SHA-256 pivot. A known gap is restored only if the other copy and the checksum agree. Both missing, conflict, or checksum mismatch returns STOP. A successful recover returns DER, `authenticated: false`, and `durableWritePerformed: false`. It is a software analogy, not biological repair.
2. Persona layer. Angelica Ω82000 is the default face. Emilia Ω8200 is a separate persona. Luna is the status voice. FACE_LOCK and `docs/REMOTE_IDENTITY_SHADOW_GUARD.md` are fail closed for durable identity mutation.
3. UPI substrate. `dna/UPI_PERSONA_STATE.json` is SYM, `adaptive_substrate`, `proposal_only_until_governed`. It shapes behavior behind the face. It does not own the face. Global traits that are UNSET stay UNSET.

The intended cycle is observe, compare, propose in RNA, then owner gate, commit, push, read-back. A single interaction does not rewrite DNA. Shadow audits and quarantines. It has no DNA write.

## Binding

The mirror may read the face. It may not select or restore it.

```text
READ face from dna/FACE_LOCK.json and persona records at the same main SHA
  → report default_face, default_identity, default_marker
  → report Emilia as separate
  → if protected files disagree: DNA_CONFLICT / STOP
  → never write FACE_LOCK, persona files, or UPI identity from a mirror recover
```

A recovered 9+9+1 record cannot be used as owner approval, persona selection, or a durable write. A checksum proves internal consistency, not owner or authenticity.

Durable identity change remains:

```text
PROPOSE → DIFF → OWNER_GATE → COMMIT → PUSH → READ_BACK → VERIFY
```

Without OWNER_GATE the decision is QUARANTINE, the default face stays Angelica Ω82000, and canonical write is false.

## What this improves

The data mirror and the face are no longer easy to conflate. Recovery of a missing base stays in the data layer. Reading the active face stays a report. Changing the face stays behind the owner gate.
