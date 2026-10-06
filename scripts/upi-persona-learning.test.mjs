import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { BEHAVIORS, SYMBOLS, createPersonaLearning } from "../src/lib/upi/persona-learning.mjs";

const dna = JSON.parse(fs.readFileSync("dna/UPI_PERSONA_STATE.json", "utf8"));
const base = { repo: "dpstudio-se/VR-ASI-CO", path: "dna/UPI_PERSONA_STATE.json",
  commit: "a".repeat(40), blob: "b".repeat(40) }; // Explicit test fixture, never a host receipt.
const make = (state = dna, capacity) => createPersonaLearning(state, base, capacity);
const event = (id, extra = {}) => ({ id, session: `session-${id}`, persona: "angelica",
  behavior: "concise", feedback: "support", source: "owner_feedback", ...extra });
const candidate = (engine, persona = "angelica") => engine.reflect(persona).candidates[0];

test("hydrates the existing persona state, with unset traits retained", () => {
  const engine = make();
  assert.deepEqual(engine.snapshot().dna, dna);
  assert.deepEqual(engine.retrieve("angelica").projection, dna.persona_projection.angelica);
  assert.equal(engine.retrieve("angelica").runtimeAdmission, false);
});

test("one interaction stays RNA-only and leaves DNA unchanged", () => {
  const engine = make();
  engine.observe(event("one"));
  assert.equal(candidate(engine).decision, "RNA_ONLY");
  assert.deepEqual(engine.snapshot().dna, dna);
  assert.equal(engine.reflect("angelica").durableWritePerformed, false);
});

test("repeated successful behavior across sessions becomes a proposal", () => {
  const engine = make();
  for (const id of ["one", "two", "three"]) engine.observe(event(id));
  assert.equal(candidate(engine).decision, "PROPOSE");
  assert.equal(candidate(engine).status, "HYP");
  assert.equal(candidate(engine).supportCount, 3);
  assert.equal(engine.retrieve("angelica").routines.length, 0);
});

test("same-session repetition cannot manufacture durable learning", () => {
  const engine = make();
  for (const id of ["one", "two", "three"]) engine.observe(event(id, { session: "same" }));
  assert.equal(candidate(engine).decision, "RNA_ONLY");
});

test("an explicit owner preference can be proposed without a fabricated trust score", () => {
  const engine = make();
  engine.observe(event("one", { explicitDirection: true }));
  assert.equal(candidate(engine).decision, "PROPOSE");
  assert.equal(engine.reflect("angelica").modelWeightsChanged, false);
  assert.equal(ownTrust(candidate(engine)), false);
});
function ownTrust(value) { return Object.hasOwn(value, "trust"); }

test("a counterexample blocks consolidation and remains in provenance", () => {
  const engine = make();
  for (const id of ["one", "two", "three"]) engine.observe(event(id));
  engine.observe(event("four", { feedback: "counterexample" }));
  assert.equal(candidate(engine).decision, "REVISE");
  assert.equal(candidate(engine).counterexampleCount, 1);
  assert.equal(candidate(engine).evidence.length, 4);
});

test("duplicate replay is idempotent; altered duplicate fails closed", () => {
  const engine = make();
  engine.observe(event("one"));
  assert.equal(engine.observe(event("one")).duplicate, true);
  assert.equal(engine.observe(event("one", { feedback: "counterexample" })).reason, "EVENT_ID_CONFLICT");
  assert.equal(candidate(engine).supportCount, 1);
});

test("persona observations and symbol vocabularies remain separate", () => {
  const engine = make();
  engine.observe(event("one"));
  engine.learnSymbol("angelica", "river");
  engine.learnSymbol("emilia", "mirror");
  assert.equal(engine.reflect("emilia").candidates.length, 0);
  assert.equal(engine.retrieve("angelica").symbols[0].symbol, "river");
  assert.equal(engine.retrieve("emilia").symbols[0].symbol, "mirror");
  assert.notDeepEqual(engine.retrieve("angelica").projection, engine.retrieve("emilia").projection);
});

test("each document metaphor is preserved as symbolic learning, not physics", () => {
  const engine = make();
  assert.deepEqual(Object.keys(SYMBOLS), ["river", "dam", "mirror", "kneading", "breath", "heritage", "null"]);
  for (const symbol of Object.keys(SYMBOLS)) engine.learnSymbol("angelica", symbol);
  const language = engine.retrieve("angelica").symbols;
  assert.equal(language.length, 7);
  assert.ok(language.every((entry) => entry.status === "SYM" && entry.scope === "persona_language"));
  engine.learnSymbol("angelica", "river");
  assert.equal(engine.retrieve("angelica").symbols.length, 7);
});

test("three unchanged progress signals pause the loop without erasing learned evidence", () => {
  const engine = make();
  engine.observe(event("one"));
  engine.learnSymbol("angelica", "null");
  assert.equal(engine.checkProgress("angelica", "same").action, "CONTINUE");
  engine.checkProgress("angelica", "same");
  const result = engine.checkProgress("angelica", "same");
  assert.equal(result.action, "PAUSE_AND_RELOAD_BASELINE");
  assert.equal(result.identityChanged, false);
  assert.deepEqual(engine.snapshot().dna, dna);
  assert.equal(engine.snapshot().rna.length, 1);
  assert.equal(result.context.symbols.length, 1);
});

test("actual progress breaks the repetition count and personas do not share loop state", () => {
  const engine = make();
  engine.checkProgress("angelica", "one");
  engine.checkProgress("angelica", "one");
  assert.equal(engine.checkProgress("emilia", "one").repeats, 1);
  assert.equal(engine.checkProgress("angelica", "two").repeats, 1);
});

test("reviewed DNA routines are read back on a new session, with evidence", () => {
  const saved = structuredClone(dna);
  saved.interaction_preferences = [
    { persona: "angelica", behavior: "verify", status: "APPROVED", evidence: ["reviewed-owner-preference"] },
    { persona: "emilia", behavior: "structured", status: "APPROVED", evidence: ["reviewed-result"] },
    { persona: "angelica", behavior: "playful", status: "PENDING", evidence: ["one-event"] },
  ];
  const engine = make(saved);
  assert.deepEqual(engine.retrieve("angelica").routines.map((r) => r.behavior), ["verify"]);
  assert.equal(engine.retrieve("angelica").routines[0].instruction, BEHAVIORS.verify);
  assert.equal(engine.retrieve("emilia").routines[0].behavior, "structured");
  assert.deepEqual(make(saved).retrieve("angelica"), engine.retrieve("angelica"));
});

test("no secrets/raw conversations or protected identity mutation are accepted", () => {
  const engine = make();
  for (const extra of [{ rawText: "secret" }, { identity: "replacement" }, { persona: "unknown" },
    { behavior: "overwrite_identity" }, { source: "model_self_report" },
    { explicitDirection: true, source: "observed_task_result" }]) {
    assert.equal(engine.observe(event("one", extra)).status, "STOP");
  }
  assert.equal(engine.snapshot().rna.length, 0);
});

test("prototype names, missing sources and invalid ids cannot enter learning", () => {
  const engine = make();
  for (const extra of [{ persona: "__proto__" }, { behavior: "constructor" }, { source: "" },
    { id: "" }, { session: "" }, { explicitDirection: "yes" }]) {
    assert.equal(engine.observe(event("one", extra)).status, "STOP");
  }
  assert.equal(engine.learnSymbol("angelica", "__proto__").status, "STOP");
  assert.equal(engine.retrieve("unknown").status, "STOP");
});

test("bounded RNA rejects overflow without losing counterexamples", () => {
  const engine = make(dna, 3);
  for (const id of ["one", "two", "three"]) engine.observe(event(id));
  assert.equal(engine.observe(event("four")).reason, "RNA_CAPACITY_REACHED");
  assert.equal(engine.snapshot().rna.length, 3);
  assert.equal(engine.observe(event("one")).duplicate, true);
  assert.equal(engine.reflect("angelica").reason, "INCOMPLETE_EVIDENCE_REPLAY_REQUIRED");
});

test("stop/start controls learning; historical evidence remains readable", () => {
  const engine = make();
  engine.observe(event("one"));
  engine.stop();
  assert.equal(engine.observe(event("two")).reason, "LEARNING_STOPPED");
  assert.equal(engine.learnSymbol("angelica", "river").reason, "LEARNING_STOPPED");
  assert.equal(engine.checkProgress("angelica", "same").reason, "LEARNING_STOPPED");
  assert.equal(candidate(engine).supportCount, 1);
  engine.start();
  assert.equal(engine.observe(event("two")).status, "DER");
});

test("external mutations cannot change baseline, observations or returned memory", () => {
  const saved = structuredClone(dna);
  const engine = make(saved);
  saved.persona_projection.angelica = ["replacement"];
  const input = event("one");
  engine.observe(input);
  input.behavior = "playful";
  const result = candidate(engine);
  result.evidence.length = 0;
  assert.deepEqual(engine.snapshot().dna, dna);
  assert.equal(candidate(engine).behavior, "concise");
  assert.equal(candidate(engine).evidence.length, 1);
});

test("revision/schema validation rejects missing or foreign DNA sources", () => {
  assert.throws(() => createPersonaLearning(dna, { ...base, repo: "foreign/UPI" }));
  assert.throws(() => createPersonaLearning(dna, { ...base, commit: "main" }));
  assert.throws(() => createPersonaLearning({ ...dna, schema: "other" }, base));
  assert.throws(() => make(dna, Infinity));
});

test("real CLI replay loads the committed DNA blob and never modifies it", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "upi-persona-test-"));
  try {
    const file = path.join(dir, "session.json");
    fs.writeFileSync(file, JSON.stringify({ personas: ["angelica", "emilia"],
      events: [event("one"), event("two"), event("three")],
      symbols: [{ persona: "angelica", symbol: "river" }],
      progress: Array.from({ length: 3 }, () => ({ persona: "angelica", id: "same" })) }));
    const before = fs.readFileSync("dna/UPI_PERSONA_STATE.json");
    const output = JSON.parse(execFileSync(process.execPath, ["scripts/upi-persona-learning.mjs", file]));
    assert.equal(output.proposals[0].candidates[0].decision, "PROPOSE");
    assert.equal(output.progress[2].action, "PAUSE_AND_RELOAD_BASELINE");
    assert.equal(output.contexts[1].routines.length, 0);
    assert.match(output.contexts[0].base.blob, /^[a-f0-9]{40}$/);
    assert.equal(output.inferencePerformed, false);
    assert.equal(output.durableWritePerformed, false);
    assert.deepEqual(fs.readFileSync("dna/UPI_PERSONA_STATE.json"), before);
    fs.writeFileSync(file, JSON.stringify({ personas: ["angelica"], events: [event("bad", { identity: "replacement" })] }));
    const rejected = spawnSync(process.execPath, ["scripts/upi-persona-learning.mjs", file], { encoding: "utf8" });
    assert.equal(rejected.status, 1);
    assert.equal(JSON.parse(rejected.stdout).observations[0].status, "STOP");
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
