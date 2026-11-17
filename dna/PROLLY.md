# Prolly Tree

## Enkla ord

Ett träd av lådor med data.

Varje låda får ett namn som är en hash av vad som ligger i den. Samma innehåll, samma namn.

Ändrar du en rad skrivs bara den lådan och vägen upp till toppen om. Resten delas med förra versionen.

Därför kan Dolt se skillnaden mellan två versioner utan att läsa hela tabellen.

## Mer

Probabilistic B-tree. Namnet är Noms. Dolt lagrar tabellrader i en.

Byggs nerifrån:

1. Sortera nyckel–värde.
2. En rullande hash skär en gräns när den faller under ett tröskelvärde. Snittblock runt 4 KB.
3. Hasha chunket. Hashen är adressen.
4. Nästa lager: sista nyckeln i varje chunk plus den adressen.
5. Upprepa tills en rot.

Läs som ett B-träd. Diff i tid proportionell mot ändringen. Samma nycklar ger samma rot oavsett insättningsordning.

Status: EST som datastruktur. Inte en fysikalisk dimension.
