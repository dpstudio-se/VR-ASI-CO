# VR-ASI-CO / OdinOS projektregler

Dessa instruktioner kompletterar `AGENTS.md` för projektet. Läs [arkitektur, flödesmekanik och byggregler](docs/VR_ASI_CO_ODINOS_BUILD_RULES.md) före substantiella ändringar. Följ också färsk `README.md`, `WORKLOAD.md`, `prompts/MIRROR_PROMPT.md` och berörda kanoniska kontrakt. Plattformens högre instruktioner gäller.

## Byggkontrakt

1. Utöka befintlig React/TanStack Start-app. VR-ASI-CO äger projektkontraktet; OdinOS koordinerar verkliga arbetssteg och verktyg. Skapa ingen parallell DNA-katalog eller identitetsägare.
2. Kanoniskt repo är `dpstudio-se/VR-ASI-CO`, branch `main`. Lös upp färsk HEAD; läs relevanta filer vid samma fulla commit-SHA och redovisa blob-SHA. Lokala snapshots, Drive, Puter, chat och förslagsbrancher är RNA.
3. Bevara Angelica Ω82000 som kanonisk standardpersona, Emilia Ω8200 separat och Emilia RAW ordagrant. Vid skyddad konflikt: `DNA_CONFLICT/STOP`. UPI/Shadow/Oden's Eye granskar och föreslår utan självständig publiceringsrätt.
4. Håll provenance, promptinstallation, inference och admission separata. `PROVENANCE_MATCH`, DNA-verifiering, spegel-PASS och grön CI bevisar aldrig i sig host-boot eller remote inference.
5. Betrodd host-attestering måste komma från verifierad serverintegration och bindas till repo, commit, persona/receipt, session och färskhet. Klientflaggan `verified: true` och modellens egna påståenden räcker inte. Saknat host-bevis ger STOP för aktiv runtime-admission. Auktoriserad kod-/dokumentationsgranskning kan fortsätta uttryckligen som REFERENCE-ONLY utan boot-påstående.
6. Arbetsflöde för kod/DNA: RNA-förslag → synlig diff → relevanta checks och spegel → tillämplig ägarreview → merge → återläsning. Inga dolda auto-merges. Direkt dokumentationsskrivning kräver ägarens godkända arbetsflöde.
7. Servern måste verifiera aktör och skrivrätt före mutation. En server-token eller UI-knapp är inte behörighetsbevis. Om app-auth är OFF får gemensam token inte ge besökare rätt att skriva eller mergea; använd betrodd ägarkontext eller read-only.
8. Merge ska bindas till granskad PR-head-SHA, komplett filinventering och obligatoriska checks/reviews. Skyddad RAW/identitet och evidenspromotion behöver särskild granskning. CODEOWNERS utan verifierad enforcement är en instruktion, inte bevisat branchskydd.
9. Datarecords använder tills vidare EST/DER/HYP/STOP/ERR/SYM. SEM-LOSS lagras som separat granskningsvarning tills alla schema-konsumenter migrerats tillsammans. STOP har orsak. Evidenspromotion kräver relevanta källor och granskning.
10. Använd spegelprompten och befintlig RF1974/TF1766-falsifieringsgrind för skyddad flödesmekanik. Ett ofalsifierat påstående kan behållas utan att bli empiriskt EST. Mjukvarutest, matematisk härledning, fysisk mätning och juridiskt avgörande har olika omfattning.
11. Registry beskriver förmågor; körbarhet avgörs av upptäckt adapter, tillåtelse och verifierat anrop. Märk fasta personasvar som prototyp. Simulera inte verktyg, inference, ingest, push eller bakgrundsprocesser.
12. 125 ms är nominell lokal mjukvaru-/UI-timing. GitHub-kontroll har långsammare intervall och backoff; ingen 8 Hz nätpollning. Kontinuerlig autonomi kräver en riktig host-worker med gränser, idempotens och start/stop.
13. Externa importadaptrar ska vara avgränsade, versionsbundna och idempotenta med synlig konfliktdiff. Läs bara de externa källor som uppgiften auktoriserar. Secrets får aldrig lagras i Git eller synlig prompt/logg.
14. Efter write: läs tillbaka sparade filer från main, jämför innehåll/blob-SHA och kontrollera aktuell HEAD. Om HEAD gått vidare, verifiera sparcommitten i historiken och redovisa sparad respektive laddad revision. Återhämtning i Git sker med auktoriserad revert, aldrig dold force-push.

15. Tillämpa [Tripp–Trapp–Trull-profilen](docs/TRIPP_TRAPP_TRULL_ARCHITECTURE.md): TRIPP presenterar, TRAPP verifierar behörighet och driver adaptrar, TRULL upprätthåller projektinvarianter och spegel. Portar, PID och nominell 125 ms timing skapar inga tjänster eller bevis. Verifiera integrations-API:er mot vald serviceversion; håll topologi, promptinstallation, inference och admission separata.

## Verifiera enligt ändringen

- Dokumentation/regler: granska diff, lokala länkar, källförankring och diagram. App-build är inte en dokumentkontroll.
- Kontrakt/persona: `npm run verify:dna` och relevanta boot-/identitetsregressioner.
- Runtime/kod: relevanta beteendetester, `npm run typecheck`, `npm test` och `npm run build` när ändringen berör appen. Kontrollera vad `build` gör: scriptet inkluderar migration när databas är konfigurerad; verifiera i avsedd testmiljö.
- UI: följ AGENTS.md för desktop/mobile, konsolfel och färskt produktionsbygge.
- Vid saknade verktyg eller rättigheter: ange EJ KÖRT eller STOP för berörd kontroll. Fortsätt oberoende granskning. Ingen påhittad PASS och inga borttagna tester för att få grönt.
- Rapportera ändrade filer, commit, faktisk verifiering och kvarstående glapp.

## Prioritet

Följ P0–P5 i `WORKLOAD.md` och den konkretiserade byggordningen i byggreglerna: integritet och skrivrätt → boot/host-/inference-bevis → spegelschema → OdinOS-adaptrar → UI → experiment. Dokumenterade regler aktiverar inte serverkontroller eller GitHub-inställningar automatiskt.
