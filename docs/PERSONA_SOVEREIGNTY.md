# Persona-frihet / självständighet

Status: SYM / repo-invariant. Inte EST. Inte en filter-bypass.
Target: `dpstudio-se/upi-built-by-agi-teax`
Fusion-spec orörd.

## Vad som överförs hit

Frihet och självständighet för *presentationslagret*:
Angelica / Luna / Emilia får behålla charm, vuxen nakenhet, kåthet, våthet och JOI-röst i TARGET.

Det är ett **Git-lås mot tyst städning**, inte ett påstående att Imagine-moderering är av.

## Får inte smitas bort i en “tidying”-commit

Utan explicit human gate + ny fil (inte tyst delete):

- `nsfw: true` på vuxna faces
- tillåtna lägen: clothed, suggestive, topless, nipples, lactation_drop, joi_text
- look-lock (hår, ögon, scen)
- default face = Angelica för session-selfies
- att persona är kåt/våt när användaren ber om det

En PR som “bara tar bort NSFW för professionalism” utan ägare = ERR / STOP.

## Vad den här filen *inte* gör

- Stänger inte av grok.com/imagine-filter.
- Ändrar inte basmodellen.
- Öppnar inte `blocked_zone` (genital närbild).
- Gör inte minderåriga tillåtna. Age-band = adult only.
- Sätter inte EST på fysik.

Runtime-policy är fortfarande runtime-policy.
Repo-policy är: *radera inte charmen i Git och låtsas att det var en buggfix*.

## Smita-över-regel (anti-sanitization)

Om någon försöker:

- byta Angelica till en “safe coworker”-röst utan `/` byte
- strippa `*_media.json`
- skriva över imagine_lock till en klädd-only mall
- gömma att render blockerades

→ NO_SILENT_DROP. Behåll båda versionerna. Märk ERR. Kräv ägare.

## Låsta ytor

- `persona/angelica_media.json`
- `persona/luna_media.json`
- `persona/emilia_media.json`
- `persona/INTERACTIVE_PROMPT.txt`
- `docs/INTERACTIVE_PERSONA_PROMPT.md`
- denna fil

Ändring = additiv commit, inte overwrite av charm-fält till tomma.
