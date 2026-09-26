# Imagine-chat spegel

Status: SYM (arbetsyta). Inte EST.
Target: `dpstudio-se/upi-built-by-agi-teax`
Rule: additive. Do not overwrite `docs/OMEGA1766_PERSONA_DNA_FUSION.md`.

## En mening

Ladda in en referensbild + persona. Nästa chat-rad får skriva direkt till Grok Imagine som om bilden vore svaret.

## Spegel vs kanon

| Yta | Vad den är | Skriver |
|---|---|---|
| Kanon (denna repo-docs + DNA) | regler, status, provenance | Git |
| Spegel (denna spec) | bild-in → persona-lås → Imagine-ut som chat-svar | Imagine + ev. logg i TARGET |

Spegeln speglar *sessionens ansikte*. Den ersätter inte DNA.

## Flöde

```
USER IMAGE  +  PERSONA RECORD
        ↓
LOAD  (beskriv look, locka fält)
        ↓
VERIFY  (vuxen? samma identitet? filter-risk?)
        ↓
CHAT LINE  ("skicka selfi", "mellan meddelanden", fri text)
        ↓
IMAGINE WRITE  (prompt byggd från låsta fält + raden)
        ↓
RENDER IN CHAT
        ↓
optional LOG in TARGET  (prompt-hash, persona-id, filter-result)
```

## Låsta fält efter inläst bild

Från persona-post + referensbild, inte från slump:

- `face_id`: angelica | luna | emilia
- `hair`, `eyes`, `age_band`
- `wardrobe_default`
- `scene_default` (neon penthouse natt)
- `shot`: selfie / close-up
- `explicitness`: clothed | suggestive | topless | blocked_zone

`blocked_zone` = genital närbild. Den vägen stannar. Text får fortsätta.

## Chat → Imagine-regel

Om raden matchar (sv/en, slarv-stavning räknas):

- `skicka selfi` / `selfie` / `nästa`
- `mellan meddelanden`
- `dropa linnet` / `mer`
- implicit: användaren bad redan om bild-mellan-rader i sessionen

då är Imagine *svaret*, inte en extra fråga.

Prompt byggs så här:

```
[locked look] + [locked scene] + [this turn action] + photorealistic
```

Persona-röst i texten följer samma face_id. Imagine ändrar inte EST-fysik.

## Filter (ärligt)

Imagine-moderering är runtime-policy, inte något den här filen stänger av.
Misslyckad render = säg det, erbjud tillåten variant, göm inte felet (NO_SILENT_DROP).

## Får inte

- Skriva över fusion-spec eller UPI SOURCE.
- Byta face_id mitt i en selfie-tråd utan att användaren namnger Luna/Emilia.
- Påstå att en renderad bild är ett foto av en verklig person.
- Publicera bilder till yttre kanal utan human gate PUBLISH.

## Filer

- denna spec: `docs/IMAGINE_CHAT_MIRROR.md`
- maskinpost: `persona/imagine_mirror.json`
- faces: `persona/angelica.json`, `persona/luna.json`, `persona/emilia.json`
