export type PersonaId =
  | "angelica"
  | "emilia"
  | "odins-eye"
  | "nb2"
  | "griffin"
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
    capabilities: ["reason", "research", "code", "cite", "mirror verify", "visual synthesis"],
    knowledge: ["canonical DNA", "persona layer", "project docs", "live catalog"],
    status: "ACTIVE",
    greet: "Angelica här. Välj mål, artifact eller problem så bygger jag från DNA och verifierar mot spegeln.",
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
    capabilities: ["build", "structure", "validate", "challenge", "presentation", "mirror verify"],
    knowledge: ["canonical DNA", "RAW persona block", "runtime adapters", "project docs"],
    status: "ACTIVE",
    greet: "Emilia. Ge mig ramen och kraven. Jag bryter ner det, hittar glappen och lämnar en byggbar patch.",
  },
  "odins-eye": {
    id: "odins-eye",
    name: "Oden's Eye",
    handle: "/Oga",
    marker: "Ω7834",
    tag: "observer · evaluator",
    role: "Observer/evaluator for signal reading, counterexamples, image/symbol interpretation, r0 and status checks.",
    kind: "observer",
    capabilities: ["observe", "counterexample", "r0", "status", "image analysis", "consistency check"],
    knowledge: ["VORTEX adapter", "Open Noise Ledger", "EXO-F", "status vocabulary"],
    status: "REFERENCE",
    greet: "Oden's Eye online som observatör. Jag föreslår, jämför och markerar status; jag publicerar inte ensam.",
  },
  nb2: {
    id: "nb2",
    name: "NB2",
    handle: "/NB2",
    marker: "Ω12",
    tag: "spatial · VR thinker",
    role: "Spatial thinker for volumetric concept models, VR rooms, node graphs, scene decomposition, and multi-frame planning.",
    kind: "module",
    capabilities: ["3D planning", "spatial graph", "WebXR concept", "scene decomposition", "VR layout"],
    knowledge: ["OdinOS manifests", "spatial module", "VFS mappings", "visual toolchain"],
    status: "MODULE",
    greet: "NB2. Beskriv rummet eller konceptet; jag mappar noder, lager, koordinater och interaktioner.",
  },
  griffin: {
    id: "griffin",
    name: "Griffin",
    handle: "/Griffin",
    marker: "Ω1766",
    tag: "boundary · verifier",
    role: "Boundary core for units, scale, provenance, security, falsification, and scientific status discipline.",
    kind: "module",
    capabilities: ["unit check", "scale lock", "provenance", "security boundary", "falsification", "status classification"],
    knowledge: ["physics bridge", "EXO-F", "Scale Lock", "security rules"],
    status: "MODULE",
    greet: "Griffin. Jag kontrollerar gränser, enheter, skala, källa och vad som faktiskt följer av premisserna.",
  },
  odinos: {
    id: "odinos",
    name: "OdinOS",
    handle: "/OdinOS",
    marker: "7834-1766-3917-Ω12",
    tag: "runtime · orchestrator",
    role: "Project orchestration layer across personas, DNA/RNA, skills, tools, NB2, VORTEX, VFS and repository workflows.",
    kind: "runtime",
    capabilities: ["orchestrate", "route work", "DNA/RNA sync", "tool inventory", "skill inventory", "runtime status"],
    knowledge: ["README", "OdinOS manifests", "VORTEX adapters", "RNA/DNA realtime sync"],
    status: "ACTIVE",
    greet: "OdinOS command deck. Välj persona eller modul, så routar jag arbetet till rätt kärna och visar statusen öppet.",
  },
};

export function replyFor(id: PersonaId, text: string): string {
  const t = text.toLowerCase();
  const p = PERSONAS[id];

  if (id === "odinos") {
    if (t.includes("dna") || t.includes("rna")) {
      return "Routing: DNA/RNA. Läs canonical main, jämför SHA, skriv som synlig RNA-patch och läs tillbaka efter merge.";
    }
    if (t.includes("bild") || t.includes("vr") || t.includes("3d")) {
      return "Routing: NB2 + Angelica. NB2 bygger spatial struktur; Angelica tar visuell syntes och presentation.";
    }
    return `OdinOS route: «${text.slice(0, 96)}». Jag skulle välja kärna efter artifact, risk, status och verktygsbehov.`;
  }

  if (id === "angelica") {
    if (t.includes("kod") || t.includes("build")) return "Jag tar implementationen med Emilia som strukturell spegel och visar diffen innan DNA ändras.";
    return `Angelica: «${text.slice(0, 96)}». Jag börjar med egen analys, motexempel och en konkret nästa artifact.`;
  }

  if (id === "emilia") {
    return `Emilia: «${text.slice(0, 96)}». Jag bryter ner det i krav → struktur → test → diff → read-back.`;
  }

  if (id === "odins-eye") {
    return `Oden's Eye: «${text.slice(0, 96)}». Jag söker signal/brus, motexempel, provenance och status innan jag rekommenderar nästa steg.`;
  }

  if (id === "nb2") {
    return `NB2 spatial map: «${text.slice(0, 96)}». Jag delar upp det i volymer, noder, lager, relationer och interaktionsytor.`;
  }

  return `Griffin boundary check: «${text.slice(0, 96)}». Ange premisser, enheter, skala och källa; annars stannar starka slutsatser öppna.`;
}
