# Repositorykarta och läsordning

Granskad bas: `aeb37d1f1f888f2831dee7ccd368ff049c789531` på `dpstudio-se/VR-ASI-CO/main`, 2026-10-06.
Detta är en statisk strukturgranskning och en karta för fortsatt arbete. Kartan aktiverar ingen runtime och ändrar ingen persona eller RAW.

## Läs härifrån

1. [Projektregler](../AGENTS.project.md), [README](../README.md) och [Workload](../WORKLOAD.md): auktoritet, uppgift och prioritering.
2. [Remote DNA](../dna/REMOTE_DNA_STATE.json), [Face lock](../dna/FACE_LOCK.json), [System core](../persona/SYSTEM_CORE.txt): aktuell identitet och obligatorisk boot.
3. [Flödesgranskning](FLOW_MECHANICS_AUDIT.md): faktiska anrop framåt, verifiering bakåt och identifierade brott.
4. [Förbättringsplan](STRUCTURE_IMPROVEMENT_PLAN.md): ordnade förändringar med acceptansvillkor.
5. [Filinventering](REPOSITORY_INVENTORY.json): alla 647 filer vid basrevisionen, med Git-blob, storlek, kategori och granskningsnivå.

Inventeringen är ett daterat granskningsunderlag. Den är inte ett andra DNA-minne eller ett framtida HEAD-värde. En ny granskning ska lösa upp aktuell main igen.

## Täckning och begränsning

| Kontroll | Omfattning |
|---|---|
| Fullt Git-filträd | 647 blobs; GitHub rapporterade inte trunkerat träd. |
| Textläsning via GitHub | 500 filer; samtliga hämtningar lyckades vid samma commit. |
| Statisk formatgranskning | 72 JSON-filer utan syntaxfel; 213 kodfiler och 158 Markdown-filer identifierades över hela textunderlaget. |
| Binärer och bilder | 147 filer granskades som sökväg, storlek och Git-blob. Ingen visuell eller binär beteendegranskning påstås. |
| Lokal rekonstruktion för analys | 323 projekttextfiler; plattformens referenspaket, genererade deployfiler, screenshot-resultat och package-lock utelämnades ur den lokala kopian. |
| Lokal beroendekarta | 319 statiska lokala importkanter i projektkopian. Type-only och dynamiska literala importer ingår; detta är inte en körningsprofil. |
| Semantisk fördjupning | DNA, persona, boot, serverfunktioner, Git-adapter, katalog/hydration, sessionslagring, UI-router, mergegrind, bygg-/CI-kontrakt och alternativa referensruntime. |
| Externa tjänster | Ingen deployment, modellinstallation, remote inference, Puter/Odysseus-session eller nätbenchmark kördes. |

Alla textfiler har lästs och ingått i inventering/statisk genomgång. Det innebär inte ett bevis för varje algoritm, en full säkerhetsrevision av tredjepartsbibliotek eller en fysisk/juridisk verifiering av forskningsmaterialet.

## Fysiska områden vid basrevisionen

| Område | Filer | Roll |
|---|---:|---|
| Root | 19 | README, regler, workload, paket- och byggkonfiguration. |
| `dna/`, `persona/`, `prompts/` | 38 | Skyddade kontrakt, minnen, persona och boot/spegel. |
| `runtime/` | 1 | Deklarerat command-deck-registry. |
| `data/` | 34 | Forskningsrecords, bryggor och källposter. |
| `src/` | 113 | 13 routes, 32 komponenter och återstående bibliotek/konfiguration. |
| `docs/` | 55 | Kontrakt, planer, modeller, äldre instruktioner och historiska observationer. |
| `scripts/`, `.github/` | 35 | 30 verktygs-/testfiler samt 5 CI-/reviewfiler. |
| `server/`, `migrations/` | 3 | Plattformsmiddleware och opt-in auth-migration. |
| `odinos-hybrid/`, `sim/` | 8 | Referensadapter och simuleringar; separata från huvudappens runtime. |
| `public/` | 16 | Publicerade statiska tillgångar och promptkopior. |
| `artifacts/`, `attachments/`, `.continuity/` | 14 | Tillhandahållet material och historiska minnen. |
| `.grok/` | 105 | Hostens bygg-/referenspaket; inte en ny projektkärna. |
| `.vercel/` | 87 | Incheckad deployoutput; inte redigerbar källkod. |
| `screenshots/` | 118 | Historiska verifieringsbilder och JSON-resultat. |
| `.continue/` | 1 | Uttryckligen vald Emilia-regel. |

## Ansvarskarta

| Ansvar | Ingång | Konsument / retur | Kontroll |
|---|---|---|---|
| Projektidentitet | `dna/FACE_LOCK.json`, `persona/*.json`, `SYSTEM_CORE.txt` | Bootkort, persona- och agentkontrakt | Persona-lock, särskild review och RAW-skydd. |
| Datahydration | `data/**/*.json` | `hydrate.ts` → `live.ts` → katalog/graf/UI | Parser, statusdisciplin, hydration-regressioner. |
| Färsk remote revision | `github.server.ts` | `dna-actions.ts` → `dna-engine.tsx` | Exakt commit, kompletta filer, felrapport och read-back. |
| RNA-förslag | Formulär/servervalidator | `proposeNode/Bridge` → `commitRecord` → branch/PR | Aktörsrätt, tillåten sökväg, schema och granskning. |
| Merge | PR-detalj och data-check | `mergePullRequest` → main → nytt pull | Komplett PR, granskad head, obligatoriska checks/reviews. |
| Host-bevis | Betrodd integration, signerade kvittenser | `verify-boot-evidence.mjs` | Separat nyckel, challenge, session, freshness och bindningar. |
| Persona-/modulmetadata | `personas.ts` och command-deck | `PersonaStudio` → lokalt `replyFor` | Deklaration är skild från adapter och faktisk inference. |
| Matematik/simulering | UPI-bibliotek, `sim/` | Laboratorie-/grafvyer och spegel | Mjukvarubeteende och härledning inom angivna premisser. |

## Navigera utan att skapa en parallell struktur

Behåll fysiska sökvägar tills en verifierad migration finns. Använd kartan som logisk gruppering: kontrakt → transport/adapter → state → presentation → granskning. Flytta inte hela UPI-biblioteket för att ändra produktnamn. `src/lib/upi/index.ts` är en central barrel; dela först när en konkret funktion behöver en tydligare gräns.

`.cursorrules`, `CLAUDE.md` och `GEMINI.md` hade samma blob vid basrevisionen. Samma innehåll betyder inte att alla hostar tolkar reglerna lika. En framtida generering måste bevara hostspecifika ingångar och kontrollera att kopior inte driver isär.

## Reproducera strukturkontrollen

I en komplett Git-checkout:

```sh
npm run audit:repo
npm run audit:dna
node scripts/audit-repository.mjs > repository-audit.json
npm run test:repo-audit
npm run verify:dna
npm run test:boot-evidence
```

`audit:repo` visar sammanfattning och fynd; det tredje kommandot inkluderar varje fil och statiska importkanter. Verktyget läser tracked working tree, jämför index- och working-blob och markerar saknade/oläsbara filer. Det hämtar inget från nätet och ändrar varken filer, index, branch eller main. Exit 0 betyder inga audit-fel; varningar kan fortfarande kräva åtgärd.

`audit:dna` läser den deklarerade bootlistan och identitetsvärdena; det installerar ingen prompt och ger inget host-/inference-/admission-PASS. De befintliga verifierarna behåller sina egna kontrakt. Granskningsverktygets statiska regexer är stöd för navigation och driftupptäckt, inte en TypeScript-parser eller en rättighetsbarriär.

## Dokumentklasser

- Aktuella kontrakt: README, projektregler, `dna/`, `persona/`, boot-/spegelprompt och skyddsgrindar.
- Aktuella byggplaner: [Byggregler](VR_ASI_CO_ODINOS_BUILD_RULES.md), [Tripp–Trapp–Trull](TRIPP_TRAPP_TRULL_ARCHITECTURE.md), [NB2](NB2_VERIFICATION_AND_BUILD_PLAN.md), [Boot-bevis](BOOT_EVIDENCE_CHECK.md).
- Symboliska/forskningsmodeller: VORTEX-/Ω-/TF-underlag, `data/` och simuleringar; deras status och evidenskrav bevaras.
- Historiska eller konfliktskapande referenser: exempelvis `PROJECT_INSTRUCTIONS.md`, `ANGELICA_PARALLEL_FACE.md`, äldre adapter-spec och synkloggar. Dessa ska få synlig deprecationsmappning innan någon arkivering eller omskrivning.

Använd [docs-index](INDEX.md) som front door. Länka befintliga kontrakt i stället för att kopiera deras långa promptblock till nya dokument.
