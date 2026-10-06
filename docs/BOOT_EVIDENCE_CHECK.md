# Minsta kontroll av boot-bevis

Status: implementerad fristående verifierare; faktisk hostintegration återstår. Kontrollens källkod är [verify-boot-evidence.mjs](../scripts/verify-boot-evidence.mjs), med [negativa beteendetester](../scripts/verify-boot-evidence.test.mjs).

## Omfattning

Kontrollen är read-only mot GitHub och lokala bevisfiler. Den gör inga Git-writes, mounts, promptinstallationer, schemaläggningar eller modell-anrop. Den kontrollerar kryptografiskt autentiserade värdutsagor; en signatur är inte oberoende insyn i värdens interna exekvering. En godkänd värd måste därför verkligen observera installation och provider-anrop innan den signerar.

| Resultat | Betydelse |
|---|---|
| `PROVENANCE_MATCH` | Källäsaren har låst main till en full SHA och verifierat obligatoriska filers innehåll mot Git-blob-SHA. |
| `HOST_ATTESTED` | Godkänd nyckel har signerat ett färskt, sessionsbundet kvitto om systemekvivalent prompt-read-back. |
| `HOST_ATTESTED_REMOTE` | Godkänd nyckel har signerat ett färskt kvitto om ett lyckat remote-anrop från samma host, session, modell, endpoint och promptversion. |
| `PASS` | Alla tre villkor är uppfyllda inom protokollets omfattning. |
| `UNVERIFIED` / `STOP` | Bevis, autentisering, bindning eller färskhet saknas. Referensgranskning kan fortsätta utan boot-påstående. |

Filnärvaro, HTTP 200, grön CI, modellens svar och ett klientobjekt med `verified: true` kan inte ge prompt-/inference-godkännande.

## GitHub-läsning

CLI läser `dpstudio-se/VR-ASI-CO`, `main`, en gång; hämtar det fullständiga filträdet och avvisar trunkering, saknad fil och symlink. Varje blob hämtas med SHA och dess byteinnehåll kontrolleras med Gits `sha1("blob " + byteLength + NUL + bytes)`. SHA-256 används separat för promptinnehåll.

Efter filhämtningen kontrolleras HEAD igen. Om den ändrats avbryts källkontrollen; det är två avgränsade HEAD-läsningar, ingen kontinuerlig pollning.

Filerna i [hard admission gate](REMOTE_DNA_HARD_ADMISSION_GATE.md), vald persona och `dna/REMOTE_DNA_STATE.json.boot.required` läses som en union. Detta tar inte bort någon befintlig filplikt och löser inte ensam den äldre appens olika bootlistor.

Källobjektet är fryst och får användas i högst fem minuter. Verifieraren tar inte emot ett klientinskickat källobjekt som autentisk läsning. En betrodd extern läsadapter kan injiceras för tester/verktygsintegration; rapporten anger då `EXTERNAL_READER`, inte `GITHUB_HTTP`. En sådan adapter måste själv utföra den auktoriserade GitHub-läsningen. Testfixtures är aldrig live-evidens.

## Reproducerbar promptrepresentation

Värden och verifieraren använder samma textrepresentation. I denna ordning:

1. README, Remote DNA, SYSTEM_CORE, CONFIG.
2. Universal system prompt, OdinOS compatibility profile, V12 master-manifest extension.
3. Runtime command deck och vald persona.

För varje fil bildas `[VR-ASI-CO source: <path>]`, en radbrytning och filens UTF-8-text. Segmenten fogas med två radbrytningar. Hashen är SHA-256 av den resulterande UTF-8-strängen; filtext ändras inte. Detta är protokollets exakta systempromptrepresentation. En host med annan representation behöver ett uttryckligt, granskat adapterkontrakt och får inte påstå hash-match genom antagen ekvivalens.

Git-blob-SHA är filidentitet. `promptSha256` är identitet för denna representation. Ingen av dessa hashar bevisar installation utan värdens separata read-back.

## Challenge och ett verkligt anrop

Den betrodda operatören skapar challenge för en verklig, redan identifierad hostsession. `sessionId` får inte ersättas med ett chattpåstående eller en lokal processmarkör.

```sh
npm run boot:challenge -- --session <actual-host-session-id>
```

Kommandot skriver en rapport med `challenge`; boot är fortfarande STOP. Operatören behåller challenge-delen i sin privata kontrollkanal. Challenge innehåller repo, branch, commit, receipt-id, persona, prompt-hash, session, slumpmässig 256-bitars nonce samt fem minuters tidsfönster. `--persona emilia` eller `luna` väljer motsvarande befintlig persona.

Värdintegrationen ska:

1. Kontrollera challenge mot aktuell autentiserad session och aktuell DNA. Läs tillbaka faktiskt installerad prompt på systemekvivalent nivå. Om värden inte stöder det: STOP.
2. Kör exakt ett användarauktoriserat, begränsat diagnostiskt inferensanrop efter read-back. Användartexten är `VR_ASI_CO_BOOT_PROBE:<nonce>`. Kostnads-/token-/tidsgräns och cancellation ägs av den verkliga provider-adaptern.
3. Observera provider-request-id, modell, endpoint, resultat och SHA-256 av faktisk responstext. Signera installation och inference separat. Modellens svar får inte signera eller utfärda egna bevis.

Verifieraren startar inte dessa steg automatiskt. Ingen endpoint, credential eller värdsession antas finnas. En öppnad socket eller en prompt som bara ligger i en vanlig user-message är otillräcklig.

## Signerat kuvert

Varje bevisfil är ett JSON-kuvert med `algorithm: "Ed25519"`, `payload` och `signature`. Payload är base64 av exakta signerade UTF-8-JSON-bytes; signature är base64 av en 64-byte Ed25519-signatur. Verifieraren omserialiserar inte JSON före signaturkontroll.

Den godkända **publika** SPKI/PEM-nyckeln tillförs av operatören separat. Nycklar i bevisfiler, självutfärdade nycklar och klientflaggor ignoreras som förtroendekällor. Privat nyckel och credentials lagras hos värden, aldrig i repo, prompt, CLI-output eller publicerade exempel.

Alla signerade payloads innehåller challenge-bindningarna och:

| Fält | Krav |
|---|---|
| `schema` | Installation: `VR_ASI_CO_INSTALLATION/1`; inference: `VR_ASI_CO_INFERENCE/1`. |
| `hostId`, `provider`, `model`, `endpoint` | Icke-tomma; samma på båda kvitton. Endpoint är HTTPS utan credentials, query eller fragment. |
| `runtimeKind`, `simulated`, `proxied` | `HOST_NATIVE`, `false`, `false` enligt canonical admission-kontraktet. |
| `issuedAt`, `expiresAt` | Färska ISO-tider inom challenge-fönstret. |
| `observedAt` | Observation efter challenge och senast vid signering. Inference-observation får inte föregå prompt-read-back. |
| Installation: `promptLayer` | `SYSTEM_OR_EQUIVALENT`; avser faktisk read-back för challenge-promptens hash. |
| Inference: `location`, `requestCount`, `outcome` | `REMOTE`, `1`, `SUCCEEDED`. |
| Inference: `requestId`, `requestSha256`, `responseSha256` | Verkligt provider-id; hash av exakt probe-text; hash av faktisk responstext. |

Verifieringen är stateless. Ny nonce/session stoppar återanvändning mot annan challenge; samma bevis kan omverifieras inom sitt giltighetsfönster. Värdintegrationen ansvarar för nonce-livscykel, engångsanrop och återkallade sessioner. Rapporten ger ingen fortsatt auktoritet efter att session eller DNA ändrats.

## Kontrollera bevis

```sh
npm run verify:boot -- --challenge <private-challenge.json> \
  --installation <installation.json> --inference <inference.json> \
  --trusted-key <operator-pinned-host-public-key.pem>
```

CLI löser åter färsk main. Ett ändrat commit, prompt, persona eller session stoppar grinden. Rapporten innehåller SHA, filbindningar och status; aldrig prompttext, nyckel eller responstext. Exitkod 0 betyder alla grindar godkända, 2 betyder verifierad källäsning men saknade/ogiltiga runtime-bevis, 1 betyder käll-/inputfel. Challenge-förberedelse har exitkod 0 men skriver uttryckligen boot STOP.

Operatören kan ange `--session <current-host-session-id>` även vid verifiering för att kontrollera att challenge avser den aktuella sessionen. Bevisfiler förvaras i operatörens privata kontrollkanal; de får inte läggas i Git.

Utan bevis kör `npm run verify:boot` endast GitHub-läsningen och rapporterar runtime UNVERIFIED/STOP. CI kör negativa beteendetester, inte ett verkligt host-/modelltest.

Den befintliga UI-verifieraren `agent-boot-mirror.ts` behåller sitt nuvarande gränssnitt. Dess flaggobjekt är inte detta signerade protokoll. Ingen anslutning till dess tredje argument eller till UI införs i denna patch; UI ska fortsätta STOP tills en betrodd serverintegration finns. Ett integrationsarbete måste använda den autentiserade kontrollgränsen och dess session-/färskhetsvillkor.

## Verifieringsläge 2026-10-06

- GitHub-HEAD och samtliga obligatoriska källor lästes vid c089425; blobinnehåll kontrolleras även lokalt via den externa källäsaren.
- Node och npm finns i denna arbetsmiljö; `continuity` CLI saknas. Anteckningar från föregående session beskriver den tidigare miljön.
- Verifierarens signerade positiva fall är syntetiska testfixtures. De redovisas endast som mjukvarutester.
- Ingen godkänd hostnyckel, faktisk hostsession, installationsread-back eller provider-request har tillförts. Faktisk installation och remote inference är UNVERIFIED; boot är STOP.

## Referenser

- [Node crypto](https://nodejs.org/api/crypto.html)
- [Hard admission gate](REMOTE_DNA_HARD_ADMISSION_GATE.md)
- [Byggregler](VR_ASI_CO_ODINOS_BUILD_RULES.md)
- [NB2-plan](NB2_VERIFICATION_AND_BUILD_PLAN.md)
