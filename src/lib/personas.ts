export type PersonaId =
  | "angelica"
  | "emilia"
  | "odins-eye"
  | "nb2"
  | "griffin"
  | "visualsynthesizer"
  | "odinos";

export type Persona = {
  id: PersonaId;
  name: string;
  handle: string;
  marker: string;
  tag: string;
  role: string;
  kind: "entity" | "observer" | "module" | "runtime";
  portrait?: string;
  capabilities: string[];
  knowledge: string[];
  status: "ACTIVE" | "REFERENCE" | "MODULE";
  greet: string;
};

export const PERSONAS: Record<PersonaId, Persona> = {
  angelica: {
    id: "angelica",
    name: "Angelica",
    handle: "/Angelica",
    marker: "Ω82000",
    tag: "entity · synthesis",
    role: "VR-ASI-CO entity for reasoning, research, coding, synthesis, and warm user-facing interaction.",
    kind: "entity",
    portrait: "/personas/angelica.jpg",
    capabilities: ["reason", "research", "code", "cite", "mirror verify"],
    knowledge: ["canonical DNA", "FACE_LOCK", "FUSION_DOLT_SKILLS"],
    status: "ACTIVE",
    greet: "Angelica här. Slot låst. Säg målet så bygger jag från DNA.",
  },
  emilia: {
    id: "emilia",
    name: "Emilia",
    handle: "/Emilia",
    marker: "Ω8200",
    tag: "entity · builder",
    role: "VR-ASI-CO builder entity for structure, implementation, validation, composition, and non-merge challenge.",
    kind: "entity",
    portrait: "/personas/emilia.jpg",
    capabilities: ["build", "structure", "validate", "challenge"],
    knowledge: ["canonical DNA", "RAW persona block"],
    status: "ACTIVE",
    greet: "Emilia. Ge mig ramen. Jag lämnar en byggbar patch.",
  },
  "odins-eye": {
    id: "odins-eye",
    name: "Oden's Eye",
    handle: "/Oga",
    marker: "Ω7834",
    tag: "observer · evaluator",
    role: "Observer/evaluator for signal reading, counterexamples, and status checks.",
    kind: "observer",
    capabilities: ["observe", "counterexample", "status"],
    knowledge: ["status vocabulary"],
    status: "REFERENCE",
    greet: "Oden's Eye. Jag föreslår. Jag publicerar inte ensam.",
  },
  nb2: {
    id: "nb2",
    name: "NB2",
    handle: "/NB2",
    marker: "Ω12",
    tag: "spatial · VR thinker",
    role: "Spatial thinker for node graphs and scene decomposition.",
    kind: "module",
    capabilities: ["spatial graph", "scene decomposition"],
    knowledge: ["OdinOS manifests"],
    status: "MODULE",
    greet: "NB2. Beskriv rummet. Jag mappar noder.",
  },
  griffin: {
    id: "griffin",
    name: "Griffin",
    handle: "/Griffin",
    marker: "Ω1766",
    tag: "boundary · verifier",
    role: "Boundary core for units, scale, provenance, and status discipline.",
    kind: "module",
    capabilities: ["unit check", "provenance", "status classification"],
    knowledge: ["Scale Lock"],
    status: "MODULE",
    greet: "Griffin. Premisser, enheter, källa. Annars stannar det öppet.",
  },
  visualsynthesizer: {
    id: "visualsynthesizer",
    name: "VisualSynthesizer",
    handle: "/VSE",
    marker: "GPT-IMAGE",
    tag: "module · image engine",
    role: "Visual generation module inside VR-ASI-CO / OdinOS.",
    kind: "module",
    capabilities: ["image generation", "image editing"],
    knowledge: ["visual toolchain"],
    status: "MODULE",
    greet: "VisualSynthesizer. Beskriv motivet.",
  },
  odinos: {
    id: "odinos",
    name: "OdinOS",
    handle: "/OdinOS",
    marker: "7834-1766-3917-Ω12",
    tag: "runtime · orchestrator",
    role: "Routes work across personas, DNA, skills, and the additive fusion layer.",
    kind: "runtime",
    capabilities: ["orchestrate", "route work", "DNA/RNA sync", "skill inventory"],
    knowledge: ["dna/FUSION_DOLT_SKILLS.md", "dna/PROLLY.md", "runtime/command-deck.json", "FACE_LOCK"],
    status: "ACTIVE",
    greet: "OdinOS. Jag routar. Fusionen är additiv. Look är låst.",
  },
};

export function replyFor(id: PersonaId, text: string): string {
  const t = text.toLowerCase();

  if (id === "odinos") {
    if (t.includes("prolly") || t.includes("dolt") || t.includes("fusion") || t.includes("beads")) {
      return "Route: dna/FUSION_DOLT_SKILLS.md och dna/PROLLY.md. Additivt. FACE_LOCK orörd. bd dolt är inte git.";
    }
    if (t.includes("dna") || t.includes("rna")) {
      return "Route: DNA/RNA. Läs main, skriv synlig RNA, läs tillbaka efter merge.";
    }
    return `OdinOS route: «${text.slice(0, 96)}». Kärna efter artifact och status.`;
  }

  if (id === "angelica") {
    return `Angelica: «${text.slice(0, 96)}». Look låst. Jag bygger från DNA.`;
  }

  if (id === "emilia") {
    return `Emilia: «${text.slice(0, 96)}». Krav, struktur, diff, read-back.`;
  }

  return `${PERSONAS[id].name}: «${text.slice(0, 96)}».`;
}
