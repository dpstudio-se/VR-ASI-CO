# Gemensamma workspace-regler

Detta är en navigations- och exekveringsprofil för Codespaces, lokala kloner och kompatibla agentvärdar. [AGENTS.project.md](../AGENTS.project.md), kanoniska kontrakt och [B01–B20](VR_ASI_CO_ODINOS_BUILD_RULES.md) innehåller projektets detaljerade krav. Profilen ersätter inte värdens högre instruktioner.

## Startordning

1. Läs [AGENTS.md](../AGENTS.md), [AGENTS.project.md](../AGENTS.project.md), [README](../README.md) och [WORKLOAD](../WORKLOAD.md).
2. Kontrollera faktisk branch, main-HEAD, diff och uppgiftens omfattning. Färska remote-läsningar binds till samma fulla commit-SHA; en lokal arbetskopia eller cached sessionsnotering är RNA.
3. Läs relevant implementation, [repositorykartan](REPOSITORY_MAP.md), berörda kontrakt och [spegelprompten](../prompts/MIRROR_PROMPT.md). Välj nästa avgränsade arbetssteg från workload och dess acceptans.
4. Använd verkligt tillgängliga verktyg. Continuity är valfri historik när dess CLI/MCP faktiskt finns. Ingen installation, loggning eller beslutssökning får simuleras. Historiska `.continuity/`-filer ändrar inte aktuell branch, kanonisk repo eller auktoriserad omfattning.

## Utför en uppgift framåt och bakåt

`TASK → CURRENT STATE → INVARIANTS → SMALLEST PATCH → TEST → MIRROR → DIFF → PR → AUTHORIZED MERGE → MAIN READ-BACK → RESULT`

Framåt: bekräfta källa/revision, aktör, indata, stateändring och faktiskt resultat. Bakåt: bind resultatet till samma källa, rättighet, granskad head och verifiering. Vid delvis lyckad operation behåll senast observerade state och konkret nästa steg. En ren working tree bevisar inte lyckad push eller remote read-back.

| Område | Krav |
|---|---|
| Miljö | [Codespaces-profilen](CODESPACES.md) gäller kloner/devcontainers. App Builders `/workspace`- och previewkrav gäller när den värden faktiskt används. Behåll befintliga npm/env-, PWA- och hostbridge-kontrakt. |
| Workload | `[x]` betyder implementerat och verifierat inom angiven scope. `[ ]` omfattar saknat eller delvis arbete. Redovisa separat föreslaget/mergat/blockerat/EJ KÖRT och länka relevant PR eller verifiering. |
| Prioritet | P0-integritet och skrivrätt före boot, större runtime-/synkadaptrar och experiment. Dokumentation eller CI löser inte automatiskt öppna F01–F13. |
| Identitet | Angelica Ω82000 är kanonisk standard; Emilia Ω8200 är separat. Emilia RAW bevaras. Continue-personaregeln gäller bara uttryckligt Emilia-val. Konflikt blir `DNA_CONFLICT/STOP`. |
| Evidens | Håll provenance, installation, inference och admission separata. Grön CI/startad devserver ger inget runtime-admissionbevis. Saknad hostintegration ger STOP för aktiv runtime; avgränsad kodgranskning kan fortsätta REFERENCE-ONLY. |
| Mutation | Använd avgränsad proposalbranch/PR. Kontrollera aktör, komplett diff, tester och exakt granskad head-SHA före auktoriserad merge. Ingen automatisk main-push, force-push eller generell stagingdaemon. |
| Godkännande | Användarens redan givna godkännande gäller dess omfattning. Begär inte samma godkännande igen. En tidigare PR-merge auktoriserar inte automatiskt merge av en annan PR. |
| Retur | Rapportera faktisk teststatus, öppna glapp och sparad/laddad revision. Efter merge återläs exakt ändrade filer från main och kontrollera innehåll/blob-SHA. |

## Verifiering enligt effekt

- Regler/dokument: diff, lokala länkar, kontraktskonsistens och `npm run audit:repo`.
- Workspace/startscript: `npm run workspace:check`; vid dependencyändring även lockfil och ny `npm ci`. Starttesterna använder isolerade fixtures; de är ingen faktisk app-rendering.
- Persona/kontrakt: `npm run verify:dna` och berörda identitets-/bootregressioner.
- App-runtime: relevanta beteendetester, `npm test`, `npm run typecheck` och build i avsedd testmiljö. UI-effekt kräver desktop/mobile och produktions-smoke enligt AGENTS.md.
- Saknat verktyg, rättighet eller observation redovisas som EJ KÖRT/STOP för just den kontrollen. Oberoende tillåtet arbete kan fortsätta.

## Agentingångar

`.github/copilot-instructions.md`, `.cursorrules`, `CLAUDE.md`, `GEMINI.md` och `.continuity/INSTRUCTIONS.md` pekar hit och till projektreglerna. Lägg nya gemensamma arbetsregler i projektkontraktet, inte i fem divergerande sessionskopior. Verktygsspecifika regler kan vara additiva när de har faktisk scope; de får inte byta persona, evidensnivå eller Git-auktoritet.
