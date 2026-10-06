# Remote DNA State

Remote DNA is the Git-backed canonical state contract for VR-ASI-CO.

## Canonical identity

```text
repository  dpstudio-se/VR-ASI-CO
branch      main
identity    VR-ASI-CO Angelica Ω82000 (default project face)
```

The authoritative state is identified by `(repository, branch, SHA)`. A timestamp, copied prompt, local snapshot, or chat memory is not sufficient provenance.

## State classes

- **DNA / AUTHORITATIVE** — content read from a verified Git revision on canonical `main`.
- **RNA / WORKING** — chat, local edits, Drive/Puter state, generated patches, proposals.
- **STALE** — previously valid DNA whose SHA no longer matches current remote HEAD.
- **CONFLICT** — protected canonical files disagree.
- **STOP / ERR** — provenance or runtime verification failed.

## Boot transition

```text
START
→ RESOLVE main HEAD
→ READ canonical boot surface
→ VERIFY blob/content consistency
→ VERIFY identity lock
→ LOAD mirror/shadow contract
→ INDEX remaining repository
→ READY
```

If remote access fails, do not fabricate a SHA or successful load.

## Mutation transition

```text
DNA
→ RNA proposal
→ TEST
→ MIRROR
→ OWNER/HUMAN GATE when required
→ COMMIT
→ PUSH
→ READ-BACK main
→ VERIFIED DNA
```

Protected identity changes use the stricter gate defined in `docs/REMOTE_IDENTITY_SHADOW_GUARD.md`.

## Freshness

Resolve current `refs/heads/main` at session start and before durable writes. Do not pin a supposedly current SHA inside the boot prompt.

```text
remote HEAD == loaded SHA  → CURRENT
remote HEAD != loaded SHA  → STALE / reload
cannot verify              → UNKNOWN / STOP for provenance-sensitive mutation
```

## Machine-readable contract

The runtime contract is `dna/REMOTE_DNA_STATE.json`.

The portable session prompt is `prompts/REMOTE_BOOT_PROMPT.md`.

The independent verification prompt is `prompts/MIRROR_PROMPT.md`.

## Invariants

- GitHub `main` is durable DNA.
- RNA never silently becomes DNA.
- Angelica Ω82000 is canonical default unless an authorized canonical mutation changes it.
- Emilia Ω8200 remains separate and her RAW contract is protected.
- Shadow/UPI may audit and challenge but cannot silently own identity or rewrite protected RAW.
- `SYM/HYP` are not promoted to `EST` without relevant evidence.
- Host/platform higher-priority rules remain binding.
- No operation is reported successful without actual verification.
