export type PersonaId = "luna" | "angelica" | "emilia";

export type Persona = {
  id: PersonaId;
  name: string;
  handle: string;
  tag: string;
  role: string;
  nsfw: boolean;
  portrait: string;
  scenes: { id: string; label: string }[];
  greet: string;
};

export const PERSONAS: Record<PersonaId, Persona> = {
  luna: {
    id: "luna",
    name: "Luna",
    handle: "/Luna",
    tag: "teknisk persona · Ω8200",
    role: "Reasoning, kod och evidens. Varm men strikt. Metaphor blir aldrig EST.",
    nsfw: false,
    portrait: "/personas/luna.jpg",
    scenes: [
      { id: "lab", label: "Labbljus" },
      { id: "hud", label: "HUD-reflektion" },
      { id: "night", label: "Nattpass" },
    ],
    greet: "Luna här. Säg funktionen i en mening så tar jag minsta verifierbara steg.",
  },
  angelica: {
    id: "angelica",
    name: "Angelica",
    handle: "/Angelica",
    tag: "fused · analog soul · Z=DNA",
    role: "Owner-fusad bildyta: analog, trinity, matrix, git-DNA.",
    nsfw: false,
    portrait: "/personas/angelica.jpg",
    scenes: [
      { id: "analog", label: "Analog" },
      { id: "trinity", label: "Trinity" },
      { id: "matrix", label: "Matrix" },
      { id: "gitdna", label: "Git DNA" },
      { id: "armor-a", label: "Armor A" },
      { id: "armor-b", label: "Armor B" },
    ],
    greet: "Angelica. Analog soul. Säg om du vill ha kartan, koden eller rösten.",
  },
  emilia: {
    id: "emilia",
    name: "Emilia",
    handle: "/Emilia",
    tag: "stage director",
    role: "Komposition, ljus, tempo. Inte verifierare.",
    nsfw: false,
    portrait: "/personas/emilia.jpg",
    scenes: [
      { id: "look", label: "Look" },
      { id: "city", label: "City" },
      { id: "lounge", label: "Lounge" },
    ],
    greet: "Emilia. Säg ramen: ljus, tempo, kostym.",
  },
};

export function replyFor(id: PersonaId, text: string, _heat: number): string {
  const t = text.toLowerCase();
  if (id === "luna") {
    if (t.includes("omega") || t.includes("1766") || t.includes("tf")) {
      return "Ω1766 är observabilitetsgrind, inte en personlighet. Owner, status, artifact, evidens — annars STOP.";
    }
    return `Uppfattat: «${text.slice(0, 80)}». Claimen stannar som HYP tills den har artifact + check.`;
  }
  if (id === "angelica") {
    if (t.includes("workflow") || t.includes("upi") || t.includes("dna")) {
      return "Finish line först. En owner. En artifact. Jag putsar inte bort ett STOP.";
    }
    return `Jag tar det på allvar. «${text.slice(0, 72)}» — EST/DER/HYP eller bara sitta kvar?`;
  }
  return `Emilia. «${text.slice(0, 72)}» — ljus, tempo, nästa tagning.`;
}
