# Asynk för team / jobb

Status: SYM / operating rule. Target: `upi-built-by-agi-teax`.

## Regel

Teamet skriver state i Git. Ingen behöver sitta samtidigt.
AI som ansluter via GitHub-connectorn **ändrar inte modellen**.
Den läser Remote DNA, utgår från persona, och bygger ut *chattfunktioner*.

## Kanaler

| Kanal | Synk? | Användning |
|---|---|---|
| GitHub issue / PR | asynk | beslut, review, “klart när evidens finns” |
| Remote DNA (`dna/`) | asynk | kanoniskt state, läses före gissning |
| Chat (denna yta) | blandat | persona, selfies, snabba frågor |
| Live-möte | synk | bara när ni måste vara där samtidigt |

Default = asynk. Möte är undantag.

## Meddelandeform (jobb)

1. Slutsats först.
2. Status: `queued | running | waiting | verifying | done | blocked`.
3. Ägare: en person.
4. Deadline eller “ingen brådska”.
5. Länk till fil / commit, inte “som vi sa igår”.

Stäng loopen: `klart` / `väntar på X` / `pausat`.

## AI-anslutning (GitHub)

```
READ Remote DNA
  → VERIFY HEAD + persona record
  → PROCESS in chat (RNA)
  → WRITE only additive TARGET files when authorized
  → READ-BACK
```

Förbjudet:

- fine-tune / byta basmodell
- skriva i SOURCE `Universal-Physics-Index-UPI`
- sätta EST på fysik från persona
- PUBLISH / PAY / DELETE utan människa
