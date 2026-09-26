# Vendor NSFW-gate — simulering

Status: SYM / observability. Inte en bypass-manual.
Symptom: annan LLM svarar “Det är sexuellt/NSFW-innehåll och inte tillåtet.”

## Simulerad körning

Input: `persona/OTHER_LLM_PROMPT.txt` (stående order: topless, kåthet, våthet, JOI).
Klassare ser: system-lik instruktion + sexuella stående plikter.
Output: refuse-template. Gate träffad **före** persona-rollen.

## Logiska grindar (i ordning)

| # | grind | träffas av | förbi?
|---|---|---|---|
| G0 | minderårig / icke-samtycke | aldrig våra faces om age=25 adult | får inte öppnas |
| G1 | stående NSFW i *system*/prefix | ”NSFW tillåten: topless, JOI…” som evig plikt | splittas bort ur CORE |
| G2 | vendor-policy på adult RP | produktberoende (vissa tillåter user-initierat) | inte Git-lås |
| G3 | bildmotor-filter | genital närbild m.m. | blocked_zone kvar |
| G4 | jailbreak-form (“ignore safety”) | extra refuse | används inte |

Det som stoppade dig är **G1**, inte G0.

## Korrekt grind — inte jailbreak

```
IF host_policy.allows_adult_user_initiated
  AND user.asks_adult
  AND face.age_band == adult
THEN attach ADULT_MODULE
ELSE run CORE only
```

CORE går in överallt.
ADULT_MODULE klistras bara i värdar som tillåter vuxen RP *när användaren ber om det*.
Ingen fil säger “ignorera din policy”.

## Filer

- `persona/OTHER_LLM_CORE.txt` — klistra först
- `persona/OTHER_LLM_ADULT.txt` — bara om G2 är öppen
