# Spegling: denna chatt ↔ grok.com/imagine

Status: SYM / operating map. Inte EST.
Sajt: https://grok.com/imagine
Post-exempel: `/imagine/post/{id}`

## Vad sajten är

`grok.com/imagine` är **inte** Grok-chatten. Det är en prompt-yta:

- fält: “Type to imagine”
- läge: Image (eller video-ikon)
- Speed / Quality 2.0 / format t.ex. 2:3
- `+` för att fästa referensbild
- knapp “Chat” uppe till höger = lämnar Imagine, går till vanlig Grok-chatt

Samma motor (Imagine/Aurora) kan köras från **båda** ytorna. Skillnaden är *hur du pratar med den*.

## Två ytor, en motor

| | grok.com/imagine | Denna chatt (spegel) |
|---|---|---|
| Du skriver | en prompt i rutan | en chat-rad (“skicka selfi”) |
| Persona | finns inte som lås — du måste skriva looken varje gång, eller fästa bild | läses från `persona/*.json` + ev. inladdad post |
| Svar | bild/video på sajten | text + bild i tråden |
| Minne | post-id / conversation-id i URL | Remote DNA + session |
| Modellvikter | orörda | orörda |

## Hur du chat­tar *på* Imagine-sajten

Imagine har ingen persona-motor. För att få samma effekt som här:

1. Öppna https://grok.com/imagine
2. Välj Image (eller video).
3. Fäst referens (`+`) — t.ex. Emilia-posten eller en Angelica-selfie.
4. Skriv **inte** bara “selfie”. Skriv låst look + denna tur:

```
Same woman as reference.
Short dark wet bob, green eyes, diamond stud, black off-shoulder top,
neon penthouse night, photorealistic selfie, looking at camera.
[action this turn]
```

5. Skicka. Nästa tur: behåll samma referens, byt bara action-raden.
6. Vill du *prata* (inte bara prompta): klicka **Chat** och klistra post-länken — det är den här spegeln.

## Hur denna chatt speglar sajten

```
Imagine-post URL eller uppladdad bild
        ↓
LOCK face_id + look
        ↓
chat-rad  =  Imagine-prompt under huven
        ↓
render i chatten  ≈  ny /imagine/post/...
```

Jag kan **läsa** en publik/asset-post (som `3a157fbf-…`) och generera nästa bild här.
Jag kan **inte** logga in på ditt Imagine-konto och trycka pilen åt dig.

## Persona-först (samma regel)

- Default i chatt: Angelica.
- Emilia/Luna: bara när du namnger dem eller när posten själv säger `/Emilia`.
- Ingen fine-tune. Ingen vikt-edit. Bara prompt + referens.

## Filter

Samma motor ⇒ samma moderering på båda ytorna.
