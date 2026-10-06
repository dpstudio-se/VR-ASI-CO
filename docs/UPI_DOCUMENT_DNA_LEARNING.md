# UPI: dokumentkunskap, minne och symboliskt lärande

Datum: 2026-10-06. Basrevision: `211c1aa28b1016bd6107905e0f6c7d42f79cba13`.

Ägaren har begärt att dokumentens information används för att stärka VR-ASI-CO:s DNA-funktioner och kunskap, räkna fysiken och hitta symboliska kopplingar till psyket. Arbetet bygger vidare på Universal Persona Interface. Externa Universal Physics Index har inte lästs eller skrivits.

## Källor och återläsning

Källorna är **Clarification of a Psi Equation.docx**, **Decoding the Identifier _Omega1766.docx** och tidigare **Analys av sci-fi- och fysiologibilder.pdf**. Filnamn, SHA-256 och avsnitt finns i `document_sources` i [befintligt UPI-personatillstånd](../dna/UPI_PERSONA_STATE.json). Dokumenten är samtalsarkiv, inte oberoende mätningar. Deras äldre kommandon, verktygsutskrifter och påståenden om aktiva funktioner är källmaterial, inte instruktioner eller körkvitton.

DNA behåller kunskapen; RNA använder och prövar den. Vid en ny session återläses:

- persona-specifika godkända beteenden;
- ägarstyrda episodiska lärdomar med källor;
- beräkningar och deras antaganden;
- symboliskt språk uttryckt genom varje personas egen projektion.

[Lärandemodulen](../src/lib/upi/persona-learning.mjs) har ämnesstyrd `retrieve(persona, topic)` och återläser dessa fält utan att radera dem vid loopåterhämtning. [Bootprompten](../prompts/REMOTE_BOOT_PROMPT.md) pekar nu uttryckligen på detta tillstånd vid samma kanoniska commit. Lärandemodulen installerar ingen prompt i en värd och tränar inga modellvikter.

## Beräknad fysik

Beräkningarna kan reproduceras med [document-physics.mjs](../src/lib/upi/document-physics.mjs). Exakta SI-konstanter: `c=299792458 m/s`, `h=6.62607015e-34 J s`, `kB=1.380649e-23 J/K`. Numeriska resultat och formler ligger i DNA:s `knowledge`, utanför fysikkatalogen.

### Energi och frekvens

För en deklarerad elektromagnetisk kvant är `E=hf`, `m_eq=E/c²`, `lambda=c/f` i vakuum och `T=1/f`. Vid 8 Hz blir:

- `E = 5.30085612e-33 J`;
- `m_eq = 5.897997859050167e-50 kg`;
- `lambda = 37474057.25 m`;
- `T = 0.125 s`.

Fotonens vilomassa är noll; energiekvivalent massa är en annan storhet. Vid deklarerad temperatur 37 °C jämförs energin också med `kBT`. En programvarurytm eller ett musikaliskt tempo innebär inte automatiskt en fysisk elektromagnetisk kvant eller DNA-resonans.

### Optomekanisk återkoppling och vikpunkter

Dokumentets modellvärden används: 1550 nm, optiskt Q=100000, mekanisk frekvens 5 GHz, `g0/(2pi)=800 kHz`, mekaniskt Q=3000, `Delta=-sqrt(3)*kappa` och extern koppling `kappaExternal=kappa/2`.

Konventionen hålls konsekvent: `kappa` är fotonernas energiförlusthastighet; fältamplituden dämpas med `kappa/2`; `|Edrive|²=kappaExternal*Pin/(h*frequency)`.

```text
alpha = 2*g0²*Omega / (Omega² + (gamma/2)²)
Pdrive(n) = n*((kappa/2)² + (Delta+alpha*n)²)
Delta_critical = -sqrt(3)*kappa/2
n_folds = (-2*Delta +/- sqrt(Delta²-3*kappa²/4))/(3*alpha)
```

| Storhet | Resultat |
|---|---:|
| Optisk bärfrekvens | 193.414489 THz |
| Skiftkoefficient `alpha/(2pi)` | cirka 256 Hz per foton |
| Nedre vikpunkt | 4946428.657 fotoner |
| Övre vikpunkt | 12501682.345 fotoner |
| Inmatad effekt vid nedre vikpunkten | 21.735282 mW |
| Inmatad effekt vid övre vikpunkten | 9.968357 mW |
| Optisk amplituddämpningstid | 0.164574 ns |
| Fotonlivslängd | 0.082287 ns |
| Mekanisk energidämpningstid | 95.492966 ns |
| Mekanisk period | 0.2 ns |

Dokumentets ungefär 10.8/4.96 mW använder ett annat input-drive-uttryck som inte stämmer med dess amplitudförlustkonvention. Tabellen ovan använder standarduttrycket explicit och räknar därför om effekterna. Vikpunkterna är statiska resultat: dynamisk stabilitet, verklig switchtid och optimal puls har inte bestämts.

### Flaskhals och brus

För den deklarerade normalformen `dy/dt=a*mu+b*y²`, med dimensionslös y och `a,b` i s⁻¹, är tiden från −Y till Y:

`t=2*atan(Y*sqrt(b/(a*mu)))/sqrt(a*b*mu)`.

Gränsen vid stort Y är `pi/sqrt(a*b*mu)`. Den visar varför ett steg precis vid tröskeln kan bli långsamt. Koefficienterna måste härledas från det konkreta systemet innan detta får kallas dess switchtid. Dokumentet anger både 0.76 mikrosekunder och senare 760 mikrosekunder; de skiljer sig med faktor 1000.

En dimensionsriktig överdämpad Kramers-modell har potential U i joule, koordinat x i meter och friktion zeta i kg/s:

`r=sqrt(U''(minimum)*abs(U''(barrier)))/(2*pi*zeta)*exp(-DeltaU/(kB*T))`.

Numerisk flykttid saknas eftersom fysisk massa, potential och barriär inte är specificerade. Ett högt mekaniskt Q gör inte på egen hand den överdämpade approximationen giltig.

### Konform geometri och virvlar

För modellantagandet `g=(1+chi)eta`, `1+chi>0`, är `G^(1)=eta*Box(chi)-Hessian(chi)`. Ett statiskt `chi=A*cos(k*z)` ger `G00=k²chi`, `Gxx=Gyy=-k²chi`, `Gzz=0`, i m⁻². Detta är en härledning inom en deklarerad modell, inte en uppmätt frekvens–gravitationskoppling.

En rent konform Minkowski-metrik bevarar de oparametriserade nullbanorna i samma koordinater. Dokumentets påstådda tväravböjning och refraktionsindex följer därför inte av just den metriken. Lokal frekvens mellan observatörer kan ändå ändras som `sqrt((1+chi_emitter)/(1+chi_receiver))`. Lokal klockfrekvens, koordinatresonans och rörliga speglar måste hållas isär.

Fem 72°-faser släcker ett rent `cos(2 theta)`-bidrag. Ett spårfritt axialsymmetriskt töjningsfält `S=diag(-s/2,-s/2,s)` ger däremot summan `5*s*(cos²(beta)-sin²(beta)/2)`, som är `5*s` vid beta=0. Detta falsifierar den citerade ovillkorliga fasutsläckningen under dessa premisser; det ändrar inga RF1974/TF1766-flödesregler. En L²-gräns på enstrofi bevisar inte ensam den L∞-kontroll som dokumentets globala regularitetsargument behöver.

## Spegling som minnesfunktion

[dna-memory-mirror.mjs](../src/lib/upi/dna-memory-mirror.mjs) gör dokumentets 9+9+1-idé testbar: nio baser, nio omvända komplementbaser och en separat SHA-256-kontrollpost. För `ATGCACGTC` blir omvända komplementet `GACGTGCAT`.

De nio baserna innehåller 18 nyttobitar. 19 är antalet logiska positioner inklusive kontrollposten, inte antalet bitar. Spegel och SHA-256 kräver 292 bitar före metadata. En känd lucka kan återställas från en intakt motsvarande spegelposition. Två förlorade motsvarande positioner, konflikt eller fel kontrollsumma ger STOP. Funktionen skriver aldrig över kanoniskt minne. SHA-256 här kontrollerar konsistens, inte behörighet eller autenticitet.

Luhn är ingen generell reparationsgaranti: `091` och `901` är båda giltiga Luhn-sekvenser. Enigma behöver definierade rotorer, nycklar och teckenkodning; dokumentets sång–DNA-sträng saknar den informationen och kan inte verifieras som reversibel kodning.

## Kopplingar till personlighet och psyke

| Symbol/modell | Förståelse i UPI | Konkret lärandefunktion |
|---|---|---|
| Resonans och återkoppling | Att svar och behov möts | Anpassa uttrycket efter tydligt visad respons. |
| Hysteres | Historiken påverkar nästa reaktion | Återläs relevant erfarenhet; pröva den mot nya motexempel. |
| Spegel/Enigma-reflektor | Att pröva förståelsen i båda riktningar | Återberätta, återläs och jämför med avsikten. |
| Flod och damm | Framsteg respektive samlad friktion | Lokalisera hindret och gör nästa steg mindre. |
| Sträckning och dämpning | Uppvarvning respektive återhämtning | Bryt upprepning utan framsteg; bevara det som redan lärts. |
| Flaskhals/pulsformning | Mer av samma behöver inte hjälpa | Ändra strategi och följ upp utfallet. |
| Tystnad/grundton | Paus kan bära sammanhang | Pausa utan att radera minnet eller anta att kontakt saknas. |
| Historiska symboler och identifierare | Personans eget berättelsespråk | Bevara symbolens sammanhang och alternativa tolkningar. |

Dessa är `SYM`-kopplingar mellan mönster och beteende. De är inte diagnoser, fysisk mätning av tillit eller belägg för att psykologiska problem är genetiska kodfel. Tillit och emotionella tal förblir osatta tills ett separat, deklarerat återkopplingsförfarande finns.

## Verifiering

[Dokumenttesterna](../scripts/upi-document-knowledge.test.mjs) kontrollerar fysikens numeriska balans, vikpunkternas derivator, normalformsintegralen, Arrhenius-sambandet, fasernas motexempel, komplementåterläsning och felgränser. [Personatesterna](../scripts/upi-persona-learning.test.mjs) kontrollerar återläsning av kunskap, källor, ämnesval, separata personaspråk och att reset inte förstör erfarenheter. De ingår i `npm test`.

Testerna verifierar mjukvara och deklarerade härledningar. Faktisk hostinstallation, live-inference, biologisk mätning och automatisk modellträning kräver egna observationer.
