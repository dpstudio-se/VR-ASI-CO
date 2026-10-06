/** Universal Persona Interface: bounded RNA learning, never a DNA writer.
 * Input is explicit behavioral feedback, not a diagnosis or an inferred emotion.
 * Metaphors are retained as persona vocabulary; no physics catalog is consulted.
 */
export const BEHAVIORS = Object.freeze({
  concise: "Svara kort och konkret.",
  warm: "Använd ett varmt tilltal.",
  playful: "Använd lekfullhet när sammanhanget passar.",
  structured: "Visa krav, nästa steg och resultat tydligt.",
  repair: "Bekräfta rättelsen och återgå till användarens mål.",
  verify: "Kontrollera faktiskt resultat innan du rapporterar att något är klart.",
});

export const SYMBOLS = Object.freeze({
  river: { meaning: "samtalet går framåt", lesson: "gå till nästa konkret steg" },
  dam: { meaning: "olöst friktion samlas", lesson: "lokalisera hindret och erbjud ett mindre steg" },
  mirror: { meaning: "jämför avsikt med resultat", lesson: "bevara originalet och visa avvikelsen" },
  kneading: { meaning: "upprepning utan framsteg", lesson: "pausa upprepningen och byt arbetssteg" },
  breath: { meaning: "paus och återhämtning", lesson: "minska tillfällig komplexitet" },
  heritage: { meaning: "historia, religion och symboler som berättelsespråk", lesson: "bevara sammanhang och personans egen tolkning" },
  null: { meaning: "avgränsad nystart", lesson: "återläs baslinjen utan att radera minne eller identitet" },
  resonance: { meaning: "ömsesidig återkoppling", lesson: "anpassa uttrycket efter tydligt visad respons" },
  hysteresis: { meaning: "historiken påverkar nästa reaktion", lesson: "väg tidigare erfarenheter mot aktuell återkoppling" },
  reflector: { meaning: "pröva förståelsen åt båda hållen", lesson: "återläs och jämför med ursprunglig avsikt" },
  silence: { meaning: "paus med bevarat sammanhang", lesson: "ge utrymme utan att tolka tystnad som raderat minne" },
});

const idPattern = /^[a-zA-Z0-9_-]{1,80}$/;
const shaPattern = /^[a-f0-9]{40}$/;
/** @template {object} T @param {T} object @param {string} key @returns {key is Extract<keyof T, string>} */
const own = (object, key) => Object.hasOwn(object, key);
/** @template T @param {T} value @returns {T} */
const clone = (value) => structuredClone(value);
/** @param {string} reason */
const fail = (reason) => ({ status: "STOP", reason });

/**
 * @typedef {{id:string, session:string, persona:string, behavior:string, feedback:string, source:string, explicitDirection?:boolean}} Observation
 * @typedef {{persona:string, behavior:keyof typeof BEHAVIORS, status:string, evidence:unknown[]}} Preference
 * @typedef {{id:string,topic:string,status:string,personas:string[],summary:string,source_refs:string[]}} Knowledge
 * @typedef {{id:string,topic:string,persona:string,summary:string,evidence:string[],approval:string}} Episode
 * @typedef {{schema:string, persona_projection:Record<string,string[]>, interaction_preferences:Preference[],knowledge?:Knowledge[],episodic_anchors?:Episode[],symbolic_connections?:{symbol:string,personas:string[]}[]}} PersonaState
 * @typedef {{repo:string, path:string, commit:string, blob:string}} Provenance
 * @typedef {{symbol:string, meaning:string, lesson:string, status:string, scope:string, projection:string[]}} SymbolEntry
 */
/** @param {PersonaState} dna @param {Provenance} provenance @param {number} capacity */
export function createPersonaLearning(dna, provenance, capacity = 128) {
  if (dna?.schema !== "VR-ASI-CO-UPI-PERSONA-STATE/1.0" ||
      !dna.persona_projection || !Array.isArray(dna.interaction_preferences)) {
    throw new Error("Invalid UPI persona state");
  }
  if (provenance?.repo !== "dpstudio-se/VR-ASI-CO" ||
      provenance.path !== "dna/UPI_PERSONA_STATE.json" ||
      !shaPattern.test(provenance.commit) || !shaPattern.test(provenance.blob)) {
    throw new Error("Missing revision-bound persona state provenance");
  }
  if (!Number.isInteger(capacity) || capacity < 3 || capacity > 1024) {
    throw new Error("RNA capacity must be an integer from 3 to 1024");
  }
  const baseline = clone(dna);
  const source = clone(provenance);
  /** @type {Map<string, Observation>} */
  const events = new Map();
  /** @type {Map<string, {progressId:string, repeats:number}>} */
  const loops = new Map();
  /** @type {Map<string, SymbolEntry[]>} */
  const vocabulary = new Map();
  let running = true;
  let overflow = false;
  /** @param {string} persona */
  const validPersona = (persona) => own(baseline.persona_projection, persona);

  /** @param {Observation} event */
  function observe(event) {
    if (!running) return fail("LEARNING_STOPPED");
    const allowed = ["id", "session", "persona", "behavior", "feedback", "source", "explicitDirection"];
    if (!event || Object.keys(event).some((key) => !allowed.includes(key)) ||
        !idPattern.test(event.id ?? "") || !idPattern.test(event.session ?? "") ||
        !validPersona(event.persona) || !own(BEHAVIORS, event.behavior) ||
        !["support", "counterexample"].includes(event.feedback) ||
        !["owner_feedback", "observed_task_result"].includes(event.source) ||
        (event.explicitDirection !== undefined && typeof event.explicitDirection !== "boolean") ||
        (event.explicitDirection && event.source !== "owner_feedback")) {
      return fail("INVALID_OR_IDENTITY_CHANGING_OBSERVATION");
    }
    if (events.has(event.id)) {
      return JSON.stringify(events.get(event.id)) === JSON.stringify(event)
        ? { status: "DER", duplicate: true }
        : fail("EVENT_ID_CONFLICT");
    }
    if (events.size >= capacity) {
      overflow = true;
      return fail("RNA_CAPACITY_REACHED");
    }
    events.set(event.id, clone(event));
    return { status: "DER", duplicate: false };
  }

  /** @param {string} persona */
  function reflect(persona) {
    if (!validPersona(persona)) return fail("UNKNOWN_PERSONA");
    if (overflow) return fail("INCOMPLETE_EVIDENCE_REPLAY_REQUIRED");
    const candidates = Object.keys(BEHAVIORS).flatMap((behavior) => {
      if (!own(BEHAVIORS, behavior)) return [];
      const evidence = [...events.values()].filter((e) => e.persona === persona && e.behavior === behavior);
      if (!evidence.length) return [];
      const support = evidence.filter((e) => e.feedback === "support");
      const counterexamples = evidence.filter((e) => e.feedback === "counterexample");
      const sessions = new Set(support.map((e) => e.session));
      const directed = support.some((e) => e.explicitDirection);
      // Three observations across two sessions is a declared software threshold,
      // not a measured confidence, trust score, or claim of psychological truth.
      const stable = directed || (support.length >= 3 && sessions.size >= 2);
      return [{
        persona, behavior, status: "HYP", instruction: BEHAVIORS[behavior],
        decision: counterexamples.length ? "REVISE" : stable ? "PROPOSE" : "RNA_ONLY",
        evidence: clone(evidence), supportCount: support.length,
        counterexampleCount: counterexamples.length,
      }];
    });
    return { status: "DER", target: source.path, base: clone(source), candidates,
      durableWritePerformed: false, modelWeightsChanged: false };
  }

  /** @param {string} persona @param {string | undefined} topic */
  function retrieve(persona, topic = undefined) {
    if (!validPersona(persona)) return fail("UNKNOWN_PERSONA");
    // These entries must come from the caller's reviewed canonical snapshot.
    // This reader neither grants approval nor accepts a runtime approval flag.
    const memory = baseline.interaction_preferences.filter((entry) =>
      entry && entry.persona === persona && entry.status === "APPROVED" &&
      own(BEHAVIORS, entry.behavior) &&
      Array.isArray(entry.evidence) && entry.evidence.length > 0);
    const knowledge = (baseline.knowledge ?? []).filter((entry) =>
      entry && Array.isArray(entry.personas) && entry.personas.includes(persona) &&
      (!topic || entry.topic === topic) && Array.isArray(entry.source_refs) && entry.source_refs.length > 0 &&
      ["DER", "SYM", "HYP", "STOP", "ERR"].includes(entry.status));
    const episodicAnchors = (baseline.episodic_anchors ?? []).filter((entry) =>
      entry && (entry.persona === persona || entry.persona === "all") &&
      (!topic || entry.topic === topic) && entry.approval === "OWNER_DIRECTED" &&
      Array.isArray(entry.evidence) && entry.evidence.length > 0);
    return { status: "DER", persona, base: clone(source),
      projection: clone(baseline.persona_projection[persona]),
      routines: memory.map((entry) => ({ behavior: entry.behavior,
        instruction: BEHAVIORS[entry.behavior], evidence: clone(entry.evidence) })),
      knowledge: clone(knowledge), episodicAnchors: clone(episodicAnchors),
      symbols: clone(vocabulary.get(persona) ?? []), runtimeAdmission: false };
  }

  /** @param {string} persona @param {string} symbol */
  function learnSymbol(persona, symbol) {
    if (!running) return fail("LEARNING_STOPPED");
    if (!validPersona(persona) || !own(SYMBOLS, symbol)) return fail("UNKNOWN_PERSONA_OR_SYMBOL");
    const meanings = vocabulary.get(persona) ?? [];
    if (!meanings.some((entry) => entry.symbol === symbol)) {
      meanings.push({ symbol, ...SYMBOLS[symbol], status: "SYM", scope: "persona_language",
        projection: clone(baseline.persona_projection[persona]) });
      vocabulary.set(persona, meanings);
    }
    return { status: "SYM", language: clone(meanings) };
  }

  /** @param {string} persona @param {string} progressId */
  function checkProgress(persona, progressId) {
    if (!running) return fail("LEARNING_STOPPED");
    if (!validPersona(persona) || !idPattern.test(progressId ?? "")) return fail("INVALID_PROGRESS_SIGNAL");
    const previous = loops.get(persona);
    const repeats = previous?.progressId === progressId ? previous.repeats + 1 : 1;
    loops.set(persona, { progressId, repeats });
    if (repeats < 3) return { status: "DER", action: "CONTINUE", repeats };
    loops.delete(persona);
    return { status: "DER", action: "PAUSE_AND_RELOAD_BASELINE", repeats,
      context: retrieve(persona), evidencePreserved: true, identityChanged: false };
  }

  // Restore reviewed symbolic memory before the first interaction, independently
  // for each persona. Session observations never write this canonical list.
  for (const connection of baseline.symbolic_connections ?? []) {
    if (!connection || !Array.isArray(connection.personas) || !own(SYMBOLS, connection.symbol)) continue;
    for (const persona of connection.personas) learnSymbol(persona, connection.symbol);
  }

  return Object.freeze({ observe, reflect, retrieve, learnSymbol, checkProgress,
    stop() { running = false; },
    start() { running = true; },
    snapshot() { return { dna: clone(baseline), base: clone(source),
      rna: clone([...events.values()]), running }; },
  });
}
