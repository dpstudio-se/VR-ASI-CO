/**
 * OdinOS / Persona-UPI REPOSITORY CHARACTERIZATION and deterministic emulator.
 *
 * IMPORTANT: Passing tests describe what the pinned source CURRENTLY does,
 * including known gaps. They are not tests of a deployed Odysseus or Puter,
 * an installed system prompt, real model inference, security isolation,
 * completed physical 27D simulation or hardware phase-lock.
 *
 * No network I/O, no credential access, no main/DNA writes.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import { createPersonaLearning } from "../src/lib/upi/persona-learning.mjs";

const read = (path) => fs.readFileSync(path, "utf8");
const dna = JSON.parse(read("dna/UPI_PERSONA_STATE.json"));
const lock = JSON.parse(read("dna/FACE_LOCK.json"));
const hybridHtml = read("odinos-hybrid/index.html");
const hybridJs = read("odinos-hybrid/hybrid.js");
const personaTs = read("src/lib/personas.ts");
const commandDeck = JSON.parse(read("runtime/command-deck.json"));

// SHA strings here are explicit fixture identifiers, not runtime admission.
const fixtureProvenance = Object.freeze({
  repo: "dpstudio-se/VR-ASI-CO",
  path: "dna/UPI_PERSONA_STATE.json",
  commit: "a".repeat(40),
  blob: "b".repeat(40),
});
const createEngine = () => createPersonaLearning(dna, fixtureProvenance);
const event = (id, persona = "angelica", feedback = "support", session = id) => ({
  id, session, persona, behavior: "verify", feedback, source: "owner_feedback",
});

function emulateHybrid() {
  const listeners = new Map();
  const elements = new Map();
  const calls = [];
  const buttons = ["angelica", "emilia", "oga"].map((face) => ({
    dataset: { face },
    classList: {
      toggle(className, enabled) { this[className] = enabled; },
    },
    addEventListener(kind, handler) { listeners.set("face:" + face + ":" + kind, handler); },
  }));
  for (const id of ["log", "dna", "q", "source", "ask"]) {
    elements.set(id, {
      textContent: "",
      value: id === "source" ? "odysseus" : "",
      addEventListener(kind, handler) { listeners.set(id + ":" + kind, handler); },
    });
  }
  const document = {
    body: { className: "" },
    querySelector(selector) {
      const id = selector.replace(/^#/, "");
      assert.ok(elements.has(id), "Unexpected selector: " + selector);
      return elements.get(id);
    },
    querySelectorAll(selector) {
      assert.equal(selector, "button[data-face]");
      return buttons;
    },
  };
  const puter = {
    ai: {
      async chat(input, opts) {
        calls.push({ type: "puter", input, model: opts.model });
        return { text: "MOCK_PUTER_OK" };
      },
    },
  };
  const fetch = async (url, init) => {
    const call = { type: init?.method ?? "GET", url: String(url) };
    if (init?.body) call.body = JSON.parse(init.body);
    calls.push(call);
    if (call.type === "POST" && call.url.endsWith("/api/chat")) {
      return { ok: true, json: async () => ({ response: "MOCK_ODYSSEUS_OK" }) };
    }
    return { ok: true, json: async () => ({ intentionallyUntrusted: true }),
      text: async () => '{"intentionallyUntrusted":true}' };
  };
  // vm here is a deterministic UI mock, NOT a sandbox for untrusted code.
  const context = vm.createContext({ document, window: { puter }, puter, fetch });
  vm.runInContext(hybridJs, context, { filename: "odinos-hybrid/hybrid.js", timeout: 2500 });
  return { context, calls, elements, listeners, document,
    submit: async (question) => {
      elements.get("q").value = question;
      await listeners.get("ask:submit")({ preventDefault() {} });
    },
  };
}

test("main DNA retains separate Angelica, Emilia and Luna projections; identity lock is unchanged", () => {
  assert.deepEqual(Object.keys(dna.persona_projection), ["angelica", "emilia", "luna"]);
  assert.equal(lock.default_marker, "Ω82000");
  assert.equal(lock.default_face, "Angelica");
  assert.equal(JSON.parse(read("persona/emilia.json")).marker, "Ω8200");
  assert.equal(JSON.parse(read("persona/luna.json")).identity, "VR-ASI-CO Luna");
});

test("characterization: Luna is in DNA but currently absent from the running persona registry and hybrid buttons", () => {
  assert.equal(personaTs.includes("luna: {"), false); // KNOWN GAP, not a feature PASS.
  assert.equal(commandDeck.personas.some((p) => p.id === "luna"), false);
  assert.equal(hybridHtml.includes('data-face="luna"'), false);
  assert.equal(Object.hasOwn(dna.persona_projection, "luna"), true);
});

test("persona RNA: an observation remains RNA, three independent supports propose, and a counterexample revises", () => {
  const engine = createEngine();
  const baseline = structuredClone(engine.snapshot().dna);
  assert.equal(engine.retrieve("luna").status, "DER");
  assert.equal(engine.observe(event("one")).status, "DER");
  assert.equal(engine.reflect("angelica").candidates.find((x) => x.behavior === "verify").decision, "RNA_ONLY");
  engine.observe(event("two"));
  engine.observe(event("three"));
  assert.equal(engine.reflect("angelica").candidates.find((x) => x.behavior === "verify").decision, "PROPOSE");
  engine.observe(event("four", "angelica", "counterexample"));
  assert.equal(engine.reflect("angelica").candidates.find((x) => x.behavior === "verify").decision, "REVISE");
  assert.deepEqual(engine.snapshot().dna, baseline);
  assert.equal(engine.reflect("angelica").durableWritePerformed, false);
});

test("persona RNA: id conflicts, session spam, forged identity and protected state all fail closed", () => {
  const engine = createEngine();
  assert.equal(engine.observe(event("same")).status, "DER");
  assert.equal(engine.observe(event("same")).duplicate, true);
  assert.equal(engine.observe(event("same", "angelica", "counterexample")).reason, "EVENT_ID_CONFLICT");
  assert.equal(engine.observe(event("forged", "__proto__")).status, "STOP");
  assert.equal(engine.observe({ ...event("raw"), rawText: "private" }).status, "STOP");
  assert.equal(engine.retrieve("unknown").status, "STOP");
  const oneSession = createEngine();
  for (const id of ["a", "b", "c"]) oneSession.observe(event(id, "emilia", "support", "single-session"));
  assert.equal(oneSession.reflect("emilia").candidates.find((x) => x.behavior === "verify").decision, "RNA_ONLY");
});

test("persona RNA: Luna can accumulate reversible session evidence without changing Angelica or Emilia", () => {
  const engine = createEngine();
  const beforeAngelica = engine.retrieve("angelica");
  const beforeEmilia = engine.retrieve("emilia");
  assert.equal(engine.observe(event("luna1", "luna")).status, "DER");
  assert.equal(engine.learnSymbol("luna", "mirror").status, "SYM");
  assert.deepEqual(engine.retrieve("angelica"), beforeAngelica);
  assert.deepEqual(engine.retrieve("emilia"), beforeEmilia);
  assert.ok(engine.retrieve("luna").symbols.some((s) => s.symbol === "mirror"));
  assert.equal(engine.snapshot().dna.schema, "VR-ASI-CO-UPI-PERSONA-STATE/1.0");
});

test("browser emulator: hybrid boots to Angelica and switches its CSS/name to Emilia", async () => {
  const app = emulateHybrid();
  assert.equal(app.document.body.className, "angelica");
  assert.match(app.elements.get("dna").textContent, /Angelica/);
  app.listeners.get("face:emilia:click")();
  assert.equal(app.document.body.className, "emilia");
  assert.match(app.elements.get("dna").textContent, /Emilia/);
  await vm.runInContext("loadMemories()", app.context);
  const requests = app.calls.filter((c) => c.type === "GET");
  assert.ok(requests.some((r) => r.url.endsWith("/dna/REMOTE_DNA_STATE.json")));
  assert.ok(requests.every((r) => r.url.includes("/main/")));
  assert.match(app.elements.get("log").textContent, /DNA dna\/REMOTE_DNA_STATE\.json/);
});

test("browser emulator: Odysseus mock receives session-scoped request but no preset/system-role field", async () => {
  const app = emulateHybrid();
  app.listeners.get("face:emilia:click")();
  await app.submit("Test Odysseus");
  const call = app.calls.find((c) => c.type === "POST" && c.url.endsWith("/api/chat"));
  assert.ok(call);
  assert.equal(call.url, "http://127.0.0.1:7000/api/chat"); // Version/config gap.
  assert.equal(call.body.session, "vr-asi-co-emilia");
  assert.match(call.body.message, /^You are VR-ASI-Emilia/);
  assert.match(call.body.message, /Test Odysseus$/);
  assert.equal(Object.hasOwn(call.body, "preset_id"), false); // Prompt is USER text.
  assert.match(app.elements.get("log").textContent, /MOCK_ODYSSEUS_OK/);
});

test("browser emulator: Puter mock works as a message-based adapter, not an installed system prompt", async () => {
  const app = emulateHybrid();
  app.elements.get("source").value = "puter";
  await app.submit("Test Puter");
  const call = app.calls.find((c) => c.type === "puter");
  assert.ok(call);
  assert.equal(call.model, "gpt-5.4-nano");
  assert.match(call.input, /^You are VR-ASI-Angelica/);
  assert.match(app.elements.get("log").textContent, /MOCK_PUTER_OK/);
});

test("characterization: status-only memory fetch, absent source SHA, and no real host admission", () => {
  assert.match(hybridJs, /response\.ok\s*\?/);
  // The memory loop has no response.json/text(), no SHA and no parsed DNA content.
  const body = hybridJs.split("async function loadMemories()")[1].split("function applyFace(")[0];
  assert.doesNotMatch(body, /response\.(?:json|text)\s*\(/);
  assert.match(hybridJs, /raw\.githubusercontent\.com\/dpstudio-se\/VR-ASI-CO\/main/);
  assert.doesNotMatch(hybridJs, /commit_sha|blob_sha|verified_host_receipt/);
});

test("characterization: known unverified paths, no automatic physics-UPI or AGI/ASI runtime", () => {
  const omega = read("src/lib/upi/omega1766.ts");
  assert.match(omega, /psi27dGate:\s*"STOP"/);
  assert.match(omega, /empiricalVerification:\s*false/);
  assert.match(read("docs/TRIPP_TRAPP_TRULL_ARCHITECTURE.md"), /Ingen daemon/);
  assert.doesNotMatch(hybridJs, /\/api\/skills|preset_id|runtime_admission/);
});
