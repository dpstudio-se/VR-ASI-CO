# PR 30–34 landing note — 2026-10-13

All five PRs were opened against main `3493de285febc21e43a59c017416e02a99942089`. Main has moved. A blind merge would overwrite later persona, research and DNA work.

## Landed on current main

| PR | What landed |
| --- | --- |
| #32 | `docs/UPI_OMEGA7834_GUARDIANSHIP_CONTRACT.md`, link in adapter spec, `scripts/guardian-contract.test.mjs` |
| #33 | Historical audit note only. Hybrid and Luna UI changes were not merged; they conflict with later persona-studio work. |
| #31 | Rule intent recorded here. The 2026-10-08 worklog stays historical. Do not treat it as current HEAD. |

## Still on their branches — rebase, do not merge as-is

| PR | Why |
| --- | --- |
| #30 TRULL / VORTEX | Adds `vortex-audit.mjs` and a sanitized prompt. Additive in intent, but base is old. Rebase before merge. |
| #33 hybrid | Rewrites `odinos-hybrid/hybrid.js` and touches personas. Current main has a newer persona studio. |
| #34 README / remote opt-in | Rewrites README and adds a consent flow. Current README and research route are newer. |

FACE_LOCK was not rewritten. Physics UPI remains a pointer.
