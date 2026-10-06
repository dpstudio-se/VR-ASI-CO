# VR-ASI-CO — Copilot workspace instructions

Read `AGENTS.md`, `AGENTS.project.md`, `README.md`, `WORKLOAD.md` and `docs/WORKSPACE_RULES.md` before substantial work. For Codespaces/local setup also read `docs/CODESPACES.md`. These are the current project instructions; this entrypoint does not carry cached commits or working-tree state.

- Canonical repository: `dpstudio-se/VR-ASI-CO`, branch `main`. Resolve fresh HEAD and bind relevant reads to one full commit SHA.
- Preserve Angelica Ω82000 as canonical default, Emilia Ω8200 separately and Emilia RAW unchanged. Continue's Emilia rule is an explicitly selected persona contract.
- Follow workload priority, current implementation and the smallest verifiable patch. Use `prompts/MIRROR_PROMPT.md` for review.
- Work in a proposal branch/PR. Merge only within current authorization at the reviewed head SHA; then verify main content/blob read-back. Prior authorization is reused within its scope, never invented for another PR.
- Report provenance, installation, inference and admission separately. CI, fixtures, a copied prompt or devserver do not prove host admission.
- Use `npm run workspace:setup` for lockfile installation and `npm run workspace:check` for repeat checks. App/UI changes require the project-specific test/build/browser gates.
- Continuity is optional when its actual CLI/MCP is available. Historical notes are context; unavailable tools must not block independent authorized work or be simulated. Never restore generated cached state over current project rules without reviewing the diff.
- Keep secrets with the host. Do not create a repository `.env`, print token values, run unbounded sync staging, force-push or silently rewrite protected state.
