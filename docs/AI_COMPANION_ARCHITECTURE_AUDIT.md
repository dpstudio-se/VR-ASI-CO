# AI Companion Engine – arkitekturgranskning

Status: READ-ONLY AUDIT / RNA-FÖRSLAG
Basrevision: `d8d75b78d1c49d9e93f813c2eb0913fba8e5434a`
Branch: `feat/ai-companion-engine`
Omfattning: statisk läsning av befintliga källor och projektkontrakt. Ingen appstart, testkörning, extern inference eller host-admission har utförts.

## 1. Sammanfattning

VR-ASI-CO har redan en persona-studio och ett deklarativt command-deck. Den nuvarande chattliknande ytan är däremot en lokal prototyp: `PersonaStudio.send()` lägger till användartext och ett deterministiskt svar från `replyFor()`. Det är inte en ansluten modell, minnestjänst eller faktisk remote inference.

Den säkraste vägen är ett separat, additivt Companion Engine-lager som återanvänder appens befintliga React/TanStack-arkitektur och persona-routing utan att skriva om skyddade identitetsfiler eller låtsas att en provider är ansluten.

## 2. Verifierade nulägesfynd

| Område | Observerat i basrevisionen | Konsekvens |
|---|---|---|
| Persona-UI | `src/components/persona-studio.tsx` innehåller persona-val, lokalt meddelandelog och `send()`. | Utgångspunkt för en separat Companion-yta; ersätt inte command-decket i första steget. |
| Svarsmotor | `src/lib/personas.ts` exporterar `replyFor()` med fasta textmallar. | Märk prototyprespons som lokal demo; modelladapter måste vara separat och explicit. |
| Persona-metadata | `src/lib/personas.ts` och `src/lib/cast.ts` definierar befintliga persona-id:n, roller och gränser. | Companion-profiler ska vara separata användarval, inte ändra Angelica/Emilia/Luna. |
| Canonical identity | `dna/FACE_LOCK.json`, `dna/REMOTE_DNA_STATE.json`, `persona/*.json` och `docs/REMOTE_IDENTITY_SHADOW_GUARD.md`. | Angelica Ω82000 förblir default; Emilia Ω8200 och RAW förblir separata och oförändrade. |
| Runtime registry | `runtime/command-deck.json` deklarerar personas, tools och skills. | Deklarerade capabilities får inte visas som körbara utan upptäckt adapter och verifierat anrop. |
| Persistens | Persona-val och flera mindre UI-funktioner använder `localStorage`; auth och DB är förkonfigurerade men opt-in enligt `AGENTS.md`. | Börja med versionsmärkt lokal persistens för användarstyrda preferenser. Lägg inte till databas eller auth utan ett uttryckligt cross-device/account-krav. |
| Appstruktur | React 19, TanStack Start/Router, Zustand, Zod och Tailwind finns i `package.json`. | Återanvänd befintliga beroenden; introducera inte en parallell app eller onödiga paket. |
| Provider / inference | Ingen verifierad Companion-provider hittades i den granskade chattvägen. | Bygg ett provider-interface och en tydlig unavailable/mock-status. Påstå inte att AI-anrop fungerar innan en riktig adapter och credentials finns. |
| Boot / admission | Signerad boot-evidence verifierare finns, men godkänd live host-adapter saknas enligt README och workload. | Companion-funktionalitet får inte kringgå boot-gate eller kalla en vanlig chattsession för admitted runtime. |

### Centrala källfiler

- `src/components/persona-studio.tsx`
- `src/lib/personas.ts`
- `src/lib/cast.ts`
- `runtime/command-deck.json`
- `src/lib/upi/live.ts`
- `AGENTS.md`, `AGENTS.project.md`, `docs/WORKSPACE_RULES.md`
- `README.md`, `WORKLOAD.md`, `prompts/MIRROR_PROMPT.md`

## 3. Rekommenderad målarkitektur

Håll gränserna tydliga:

1. **Companion domain** – typer för profil, konversation, meddelande, gränser, läge och minnespost.
2. **Personality engine** – användarstyrd stil och stabila preferenser; kan läsa befintliga personas men får inte mutera deras canonical definitioner.
3. **Dialogue orchestrator** – bygger en begäran och väljer en explicit adapter; returnerar status, provider/model och fel utan att fabricera svar.
4. **Provider adapter** – interface för textgenerering, cancellation och timeout. Saknad provider ska returnera `UNAVAILABLE`, inte låtsas-svar.
5. **Memory store** – separat, versionsmärkt, opt-in och redigerbar lagring. Visa vad som sparas, varför och hur det raderas/exporteras.
6. **Boundary / consent layer** – tydliga användarval för flirt/romantik, rollspel, paus och gränser. Befintliga personas behåller sina nuvarande gränser.
7. **Multimodal adapters** – framtida separata gränssnitt för TTS, STT, avatar och VR. UI ska visa `NOT_CONFIGURED` tills en verklig adapter är ansluten.
8. **Presentation** – ny Companion-route eller separat panel; håll persona command-deck intakt.

Föreslagen källstruktur (att verifiera mot aktuellt repo före implementation):

```text
src/lib/companion/
  companion-types.ts
  companion-service.ts
  dialogue-orchestrator.ts
  personality-engine.ts
  memory-store.ts
  boundary-policy.ts
  providers/provider-types.ts
  providers/unavailable-provider.ts
src/components/companion/
  companion-shell.tsx
  conversation-panel.tsx
  personality-settings.tsx
  memory-controls.tsx
  privacy-controls.tsx
src/routes/companion.tsx
```

## 4. Säkerhets- och integritetskrav

- Ingen persona- eller DNA-fil skrivs om i denna feature.
- Ingen dold minnesinsamling. Minnesfunktion är avstängd tills användaren väljer vad som får sparas.
- Lokal persistens ska ha schema-version, validering, storleksgräns och återställningsbeteende vid korrupt data.
- Ge användaren möjlighet att inspektera, redigera, exportera och rensa Companion-minnen.
- Spara inte hemligheter, autentiseringstoken eller råa provider-credentials i klientlagring.
- Skicka inte konversationsinnehåll till en extern provider utan tydlig provider-status och användarens medvetna åtgärd.
- Lägg inte till auth/DB enbart för att skapa en demo. Cross-device-minne kräver ett separat beslut om konto, ägarskap, retention och serverauktorisering.
- Inga guilt-/dependency-mönster, påtryckningar eller påståenden om att modellen är en levande människa.
- Flirt/romantik och vuxet rollspel ska vara separata, uttryckligen valda lägen med gränser och paus. Minderåriga får aldrig förekomma i sexuella sammanhang.
- Befintliga Angelica-, Emilia- och Luna-gränser gäller oförändrade. En ny Companion-profil är inte en tyst override av dem.
- Verktygsdeklaration är inte exekveringsrätt. Ingen provider, TTS, STT, avatar eller VR-adapter får markeras ACTIVE utan observerad funktion.

## 5. Implementationsordning

| Steg | Leverans | Acceptans |
|---|---|---|
| 0 | Denna nulägesgranskning och scope | Källor/revision dokumenterade; ingen skyddad fil ändrad. |
| 1 | Domäntyper + provider-interface + unavailable-adapter | Typad status; inga nätverksanrop eller falska AI-svar. |
| 2 | Lokal, opt-in memory store | Versionerat schema, validering, användarinsyn, export/rensa och tester. |
| 3 | Dialogue orchestrator | Testbar request/response, timeout/cancel, tydlig provider/model-provenance. |
| 4 | Companion UI | Ny separat route; befintlig Personas-route fungerar oförändrad. |
| 5 | Personlighet, gränser och preferenser | Användarstyrt och separat från canonical persona-DNA. |
| 6 | Riktig providerintegration | Endast efter val av provider, säker server-side secret-hantering och explicit anslutning. |
| 7 | Röst/avatar/VR | Separata adapters och verkliga QA-bevis; annars status NOT_CONFIGURED. |

## 6. Verifiering som krävs före merge

För implementationen: relevanta enhetstester, `npm test`, `npm run typecheck`, `npm run lint` och `npm run build` i avsedd Node 22-miljö. Build kan köra databas-migration om `DATABASE_URL` är satt; använd endast avsedd testdatabas. UI-ändringar kräver desktop-/mobil-smoke och granskning av genererade route-filer.

Kör även `npm run verify:dna` och `npm run audit:repo`. Dessa kontroller ersätter inte runtime-admission. Saknade verktyg eller miljö ska rapporteras som EJ KÖRT, aldrig PASS.

## 7. Öppna beslut / ej implementerat

- Ingen provider är vald eller verifierad.
- Ingen röst-/avatar-/VR-tjänst är vald eller verifierad.
- Cross-device-minne och kontobaserad synk är inte scope-godkända.
- Ingen kod i Companion Engine har implementerats i denna audit-commit.
- Ingen testkörning, app-rendering, inference eller boot-admission har utförts.

**Beslut:** REVISE / PROCEED WITH STEP 1. Bygg första steget som en isolerad, additiv kodpatch på denna branch. Behåll befintliga personas, auth, boot och canonical DNA orörda.
