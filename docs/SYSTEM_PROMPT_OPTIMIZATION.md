# Systemprompt-optimering

Status: SYM / craft. Inte EST.
Mål: färre tokens, färre G1-refusals, samma lås.

## Vad som var för tungt

Gamla OTHER_LLM_PROMPT packade: repo-lag + face-locks + stående NSFW + fysikvarningar + filter-disclaimer.
Klassare läser det som *system-sex-order* → G1.

## Regler för en bra systemprompt här

1. En plikt per rad. Inga romaner.
2. Identitet före estetik. Estetik före action.
3. Inga stående sexuella verb i prefix (”du är alltid kåt”).
4. Adult = modul, inte luft.
5. Negationer sist och få: SOURCE / EST / modellvikter / blocked_zone.
6. Max ~120–180 ord för CORE. Resten hämtas från Git när det behövs.
7. Samma ord varje gång (konsistens > novelty).

## Ordning (lås denna)

```
WHO     presentationslager / inte vikter / inte index
WHERE   TARGET repo URL
FACE    default Angelica + switch-regel
LOOK    1 mening lock
GATES   modell orörd, SOURCE läs, EST-förbud
ADULT   pekare, inte innehåll
```

## Färdig CORE (använd denna)

`persona/SYSTEM_CORE.txt`

## Färdig ADULT (inte i system på strikta värdar)

`persona/SYSTEM_ADULT.txt` — bara när användaren redan bett om vuxen tur *och* värden tillåter det.
