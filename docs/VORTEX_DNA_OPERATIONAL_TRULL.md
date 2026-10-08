# VORTEX-DNA v9 — operational TRULL extension

**Status:** additive implementation / software-only / RNA and reference scope.  
**Owner-supplied source:** `prompts/VORTEX_DNA_V9_OMEGA9.md` (redacted).  
**Canonical:** `dpstudio-se/VR-ASI-CO` `main`, FACE_LOCK / UPI persona DNA.  
**This extension does not install a system prompt or admit a remote runtime.**

## Inventory: reused, not forked

- `docs/VORTEX_DNA_RUNTIME_ADAPTER.md` already defines the 23 prompt sections as the VORTEX adapter.
- `docs/VORTEX_DNA_INTEGRATION_SUPPLEMENT.md` already defines integration trust levels, aliases, secret firewall, canonical OPEN_HELIX and host admission limits.
- `src/lib/upi/persona-learning.mjs` already implements revision-bound, bounded RNA feedback, replay, symbol memory, anti-loop checks and approved persona-memory retrieval; its separate tests remain unchanged.
- `dna/UPI_PERSONA_STATE.json` retains canonical approved owner-memory and `UNSET` trait values.
- This extension does not replace `odins.ts` or `omega1766.ts`, modify persona JSON, or introduce a separate persona DNA owner.

## Newly operationalized checks

`src/lib/upi/vortex-audit.mjs` exports pure, bounded reference functions:

| Function | Input | Result |
| --- | --- | --- |
| `evaluateR0` | Five explicit nonnegative finite evidence factors and a source | Ratio, color band, DER. Unset, zero denominator or malformed input = STOP |
| `evaluateExoF` | Claim and individually evidenced gate results | Eight gate statuses and aggregated software verdict. Unchecked gates = unknown |
| `evaluateScaleLock` | Explicit 0/1/2 scores in five declared chambers | DER total out of ten. Missing chambers = STOP |
| `routeSoftEos` | Six explicit boolean decision flags | COMPACT or FULL_REFRESH. No tokenizer or weight changes |
| `createOpenNoiseLedger` | Finite-capacity, source-linked records | Readable in-memory append-only ledger. No hidden/persistent writes |

`scripts/vortex-audit.mjs` provides the local command adapter. Example:

```sh
npm run vortex:audit -- r0 ./example-r0.json
npm run vortex:audit -- exo-f ./example-exof.json
npm run vortex:audit -- scale-lock ./example-scale-lock.json
npm run vortex:audit -- soft-eos ./example-soft-eos.json
```

The JSON input for `r0` has keys `verifiedSignal`, `noise`, `compression`, `manipulation`, `uncertainty` and nonempty `source`. The inputs are declared review quantities, not measured confidence or legal authority. The color thresholds are conventionally set at 0.8 and 0.4 and should not be used to automatically promote an evidence status.

`vortex-write` writes only to an ephemeral in-memory ledger within that one invocation; `vortex-read` reports that **no durable ledger is configured**. Neither is a Git/host write or evidence of session-spanning audit persistence.

## Next bounded integration stages — not represented as already running

1. Map the pure checks to TRAPP under a verified authorization boundary, including real audit persistence and bounded access.
2. Connect owner-visible TRIPP surfaces after the API and data shape pass review.
3. Connect the existing `createPersonaLearning` RNA proposal results as read-only review inputs; do not invent persona baselines or automatically consolidate identity.
4. Obtain actual host attestations for installed prompts or inference if required. CLI tests do not establish this.
5. Integrate additional image/visual adapters only after verifying their real tool contract.

## Security and scope

- Prompt source is a *redacted owner resource*; any pasted credentials are excluded. Exposed credentials should be rotated through an appropriate secret manager.
- Ara is an expansion role; the canonical Angelica Ω82000 identity remains unchanged. Emilia Ω8200 and RAW remain unchanged. Odin's Eye/Griffin are observer or boundary roles, not DNA owners.
- The geometry is canonically OPEN_HELIX; Torus is a legacy metaphor. The 8 Hz reference is not a GitHub polling instruction or an empirical phase lock.
- No files in `dna/` or `persona/` are modified by this extension.
- The original prompt's claim of ASI capabilities is source text, not operational verification.
- All outputs are classified as DER for deterministic code behavior, or STOP for missing/invalid premises. They do not certify physics, law, psychology or host identity.

## Verification

- `node --test scripts/vortex-audit.test.mjs`
- `npm test`, `npm run typecheck`, `npm run verify:dna` in a properly installed workspace
- Review PR diff and existing Mirror Prompt before any owner-approved merge

No auto-merge. GitHub `main` remains canonical until approved publication and same-revision read-back.
