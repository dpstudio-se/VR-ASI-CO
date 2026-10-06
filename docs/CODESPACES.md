# Codespaces och lokal utveckling

[Devcontainer-konfigurationen](../.devcontainer/devcontainer.json) använder den officiella Node 22/Bookworm-bilden och en icke-root-användare. Ingen befintlig Codespace skapas, rebuildas eller ändras bara genom att filen finns i Git.

## Livscykel

| Händelse | Kommando | Faktiskt resultat |
|---|---|---|
| Ny container / rebuild | `npm run workspace:setup` | `npm ci --ignore-scripts --no-audit --no-fund`, följt av DNA-, repository- och startscriptkontroller. Fel stoppar nästa steg. |
| Containerstart | `sh startup.sh` | Portabel projektrot, stopp av gammal QA-preview och en låst `npm run dev`-process om appen inte redan svarar. Returen är en startbegäran; readiness är pending. |
| Ny kontroll efter ändringar | `npm run workspace:check` | Read-only DNA-/repository-kontroll och isolerade startscriptregressioner. Ingen installation eller Git-write. |
| Apputveckling | `npm run dev` | Befintligt env-wrapperflöde och Vite på `0.0.0.0:8080`. |
| Produktions-QA | `npm run build`, därefter `npm run preview:restart` | Befintlig loopback-preview på 8081. Build inkluderar migration om `DATABASE_URL` finns. Använd avsedd testmiljö. |

`npm ci` kräver att `package.json` och lockfilen överensstämmer. Installationsscripts är avstängda; kör inte en generell rebuild för att kringgå detta. Om en viss dependency behöver ett script ska den identifieras, granskas och verifieras avgränsat. Setup startar inte migrationer, inference, externa importer eller synkdaemoner.

Env-wrappern kör executable och argument direkt utan shelltolkning. Befintliga VITE-flaggor och explicit process-env-precedens behålls; mellanslag och metatecken i argument är data. PWA-testernas default-context använder en tom fixture så appens faktiska share-title inte påverkar generiska förväntningar.

## Start och portar

- Codespaces forwardar 8080. Behåll porten privat i Ports-panelen. Konfigurationen begär ingen publicering eller ändrad åtkomst.
- 8081 är en explicit QA-preview och auto-forwardas inte. Andra portar auto-forwardas inte heller.
- Vites tillåtna host är exakt `${CODESPACE_NAME}-8080.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}` i Codespaces. Globala `allowedHosts: true` eller CORS-undantag behövs inte.
- `startup.sh` hittar roten från sin egen plats. Samma fil fungerar i `/workspaces/VR-ASI-CO`, en annan klonsökväg och App Builder-kontraktets `/workspace`.
- `flock` håller ett processlås tills `npm run dev` avslutas. Parallella/repetitiva starter kan inte skapa ytterligare devprocesser medan den första startar. Låset frigörs även när processen avslutas med fel.
- Loggen finns i `.cache/vr-asi-co/dev.log`, som är Git-ignorerad. En startbegäran och ett HTTP-svar är inte verifierad UI-rendering; följ [agentreglernas](../AGENTS.md) browser-smoke vid app-/UI-ändringar.

För en befintlig Codespace används **Codespaces: Rebuild Container** efter att den nya konfigurationen finns på vald branch. Vid problem: kontrollera creation-loggen och devloggen; skilj dependencyinstall, kontraktskontroll, startbegäran och faktisk rendering. En misslyckad setup ska inte markeras klar genom att hoppa över kontrollen.

## Arbetsflöde och regler

Läs [workspace-reglerna](WORKSPACE_RULES.md), [projektreglerna](../AGENTS.project.md) och [Workload](../WORKLOAD.md). En PR-branch är RNA tills auktoriserad merge och återläsning från main. Setup gör ingen commit, push, merge eller ändring av regler/rättigheter.

Secrets använder värdens secret-hantering. Skapa ingen `.env` i repositoryt och skriv aldrig ut tokenvärden. Bara avsedda `VITE_`-flaggor når klienten via befintligt env-wrapperflöde. Att Codespaces tillhandahåller en GitHub-token innebär ingen automatisk aktörsrätt i appens muterande serverfunktioner.

Det nya CI-flödet kör samma `workspace:setup` på Node 22 och sedan repositoryts `npm test`. Det verifierar installation och mjukvarubeteende på CI-värden; ett verkligt Codespaces-imagebygge, desktop/mobile-rendering och remote host-admission är separata kontroller.

## Kvarstående appkontroll

Granskningen 2026-10-06 hittade en befintlig typecheck-blockering: `runtimeRegistry: unknown` från `src/lib/upi/github.server.ts` kan inte passera TanStack Starts serialiseringskontrakt i `src/lib/upi/dna-actions.ts`. Den ska åtgärdas med validerat/typat registry enligt F09, inte med avstängd typkontroll. Den incheckade routeträdsfilen saknar också `/personas` tills befintlig Vite-routergenerering körts. Reviewa sådana genererade diffs separat. Workspace-checkens PASS upphäver inte dessa appfel.

## Källor för konfigurationen

- [GitHub: Node-projekt i Codespaces](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/setting-up-your-nodejs-project-for-codespaces)
- [Dev Containers: lifecycle och portattribut](https://containers.dev/implementors/json_reference/)
- [Officiell Node-containerbild](https://github.com/devcontainers/images/tree/main/src/javascript-node)
- [Vite: explicit tillåtna hosts](https://vite.dev/config/server-options.html#server-allowedhosts)
- [GitHub: portåtkomst och secrets](https://docs.github.com/en/codespaces/reference/security-in-github-codespaces)
