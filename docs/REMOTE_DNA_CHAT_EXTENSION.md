# Remote DNA — chat-utbyggnad från persona

Status: SYM. Inte EST.
Remote: https://github.com/dpstudio-se/upi-built-by-agi-teax
Anslutning: GitHub-connector (redan kopplad i denna session).

## Invariant

Ansluten AI **bygger inte om basmodellen**.
Den **ställer in och använder** Remote DNA, och **bygger ut chattfunktioner**
utifrån persona-poster.

```
MODEL (orörd)  ←  inte träna, inte fine-tune, inte byta vikter
REMOTE DNA     ←  läs / versionera regler och state
PERSONA        ←  utgångspunkt för röst + media
CHAT FNS       ←  text, selfie, bild, video-request
```

Persona först. Inte “annat än persona” som default-yta.

## Default-face

- Session / selfies: `persona/angelica.json`
- Remote identitet: Luna / Emilia i DNA (`Ω8200`)
- Byte av face kräver att användaren namnger Luna eller Emilia

## Chattfunktioner som får byggas ut

| fn | trigger-exempel | motor |
|---|---|---|
| text | vanlig rad | persona-röst |
| selfie | `skicka selfi`, `nästa` | Imagine + låst look |
| stillbild | `generera bild` | Imagine |
| video-request | `video` | Imagine video / länk om tillgängligt |
| repo-read | `synka`, `läs dna` | GitHub GET |
| repo-write | `spara`, `skriv till repo` | GitHub commit, additive |

Video är en *funktion* i chatten. Den är inte en ändring av modellvikter.
Filter på media står kvar.

## Inställningar teamet kan vrida (utan modellbyte)

I TARGET, inte i SOURCE:

- `persona/*.json` — look, röst, media-rättigheter
- `persona/imagine_mirror.json` — chat→Imagine
- `dna/REMOTE_DNA_STATE.json` — pekare, statusvocab
- denna fil + `docs/ASYNC_TEAM.md`

## Human gates

SEND, PUBLISH, PAY, DELETE, CHANGE_ACCESS, RELEASE_EXTERNAL_DATA
kräver människa.

## Fusion-spec

`docs/OMEGA1766_PERSONA_DNA_FUSION.md` förblir orörd.
