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

test("main DNA retains separate Angelica, Emilia and Luna projections; identity lock is unchanged", () => {
  assert.deepEqual(Object.keys(dna.persona_projection), ["angelica", "emilia", "luna"]);
  assert.equal(lock.default_marker, "Ω82000");
  assert.equal(lock.default_face, "Angelica");
  assert.equal(JSON.parse(read("persona/emilia.json")).marker, "Ω8200");
  assert.equal(JSON.parse(read("persona/luna.json")).identity, "VR-ASI-CO Luna");
});

test("Luna is now present in DNA, runnable registry and hybrid buttons", () => {
  assert.equal(personaTs.includes("luna: {"), true);
  assert.equal(commandDeck.personas.some((p) => p.id === "luna"), true);
  assert.equal(hybridHtml.includes('data-face="luna"'), true);
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



function emulateHybrid({ missing = null, conflict = false, presetIds = null } = {}) {
  const handlers = new Map(), elements = new Map(), calls = [];
  const buttons = ["angelica","emilia","luna","oga"].map(face => ({
    dataset:{face},
    classList:{toggle(key,value){this[key]=value;}},
    addEventListener(type,handler){handlers.set("face:"+face+":"+type,handler);},
  }));
  for(const id of ["log","dna","dna-status","q","source","ask"]) {
    elements.set(id,{textContent:"",value:id==="source"?"odysseus":"",
      addEventListener(type,handler){handlers.set(id+":"+type,handler);}});
  }
  const document={body:{className:""},querySelector(s){const v=elements.get(s.slice(1));assert.ok(v,s);return v;},
    querySelectorAll(s){assert.equal(s,'button[data-face]');return buttons;}};
  const sourceFiles = {
    "dna/FACE_LOCK.json":JSON.parse(read("dna/FACE_LOCK.json")),
    "dna/UPI_PERSONA_STATE.json":dna,
    "dna/REMOTE_DNA_STATE.json":JSON.parse(read("dna/REMOTE_DNA_STATE.json")),
    "persona/angelica.json":JSON.parse(read("persona/angelica.json")),
    "persona/emilia.json":JSON.parse(read("persona/emilia.json")),
    "persona/luna.json":JSON.parse(read("persona/luna.json")),
  };
  if(conflict)sourceFiles["persona/emilia.json"].marker="WRONG";
  const fetch=async (url,opts={})=>{
    const req={url:String(url),method:opts.method||"GET"};
    if(opts.body)req.body=JSON.parse(opts.body);
    calls.push(req);
    if(req.url.endsWith("/branches/main"))return{ok:true,json:async()=>({commit:{sha:"a".repeat(40)}})};
    const match=req.url.match(/\/contents\/([^?]+)\?ref=([a-f0-9]{40})$/);
    if(match){
      if(match[1]===missing)return {ok:false,status:404};
      const value=sourceFiles[match[1]];
      if(!value)return{ok:false,status:404};
      const content=Buffer.from(JSON.stringify(value),"utf8").toString("base64");
      return{ok:true,json:async()=>({type:"file",sha:"b".repeat(40),encoding:"base64",size:content.length,content})};
    }
    if(req.url.endsWith("/api/chat"))return{ok:true,json:async()=>({response:"MOCK_ODYSSEUS_OK"})};
    return {ok:false,status:404};
  };
  const window={ODINOS_CONFIG:presetIds?{odysseusBase:"http://127.0.0.1:7011",presetIds}:{}};
  const context=vm.createContext({document,window,fetch,atob:(s)=>Buffer.from(s,"base64").toString("binary"),
    decodeURIComponent,escape,console});
  vm.runInContext(hybridJs,context,{filename:"odinos-hybrid/hybrid.js",timeout:2500});
  const settle=async()=>{for(let i=0;i<15;i++)await new Promise(resolve=>setImmediate(resolve));};
  return {calls,handlers,elements,document,settle,async submit(q) {
    elements.get("q").value=q;
    await handlers.get("ask:submit")({preventDefault(){}});
  }};
}
test("browser emulation: real source JSON parsed at one pinned SHA, not just HTTP 200",async()=>{
  const a=emulateHybrid();await a.settle();
  assert.match(a.elements.get("dna-status").textContent,/källläst på a{12}/);
  const sources=a.calls.filter(r=>r.url.includes("/contents/"));
  assert.equal(sources.length,6);
  assert.ok(sources.every(r=>r.url.endsWith("?ref="+"a".repeat(40))));
  a.handlers.get("face:luna:click")();
  assert.equal(a.document.body.className,"luna");
  assert.match(a.elements.get("dna").textContent,/Luna/);
});
test("browser emulation: missing required GitHub file fails closed",async()=>{
  const a=emulateHybrid({missing:"persona/luna.json"});await a.settle();
  assert.match(a.elements.get("dna-status").textContent,/STOP/);
  await a.submit("hello");
  assert.equal(a.calls.filter(r=>r.url.endsWith("/api/chat")).length,0);
});
test("browser emulation: conflicting protected identity fails closed",async()=>{
  const a=emulateHybrid({conflict:true});await a.settle();
  assert.match(a.elements.get("dna-status").textContent,/PERSONA_IDENTITY_CONFLICT/);
  await a.submit("hello");
  assert.equal(a.calls.filter(r=>r.url.endsWith("/api/chat")).length,0);
});
test("browser emulation: without installed preset, Odysseus and Puter stop",async()=>{
  const a=emulateHybrid();await a.settle();
  await a.submit("test");
  assert.match(a.elements.get("log").textContent,/PRESET_OR_LOCAL_ENDPOINT_NOT_CONFIGURED/);
  a.elements.get("source").value="puter";
  await a.submit("test");
  assert.match(a.elements.get("log").textContent,/PUTER_PERSONA_INSTALLATION_NOT_VERIFIED/);
  assert.equal(a.calls.filter(r=>r.method==="POST").length,0);
});
test("browser emulation: configured Odysseus preset is passed separately from user content",async()=>{
  const a=emulateHybrid({presetIds:{emilia:"emilia-reviewed-preset"}});await a.settle();
  a.handlers.get("face:emilia:click")();
  await a.submit("Test Odysseus");
  const r=a.calls.find(x=>x.url.endsWith("/api/chat"));
  assert.equal(r.url,"http://127.0.0.1:7011/api/chat");
  assert.equal(r.body.preset_id,"emilia-reviewed-preset");
  assert.equal(r.body.message,"Test Odysseus");
  assert.equal(r.body.session,"vr-asi-co-emilia");
  assert.match(a.elements.get("log").textContent,/HOST_PROMPT_READ_BACK: NOT_VERIFIED/);
});
test("repository: ψ27D remains unverified and browser cannot mutate persona DNA",()=>{
  assert.match(read("src/lib/upi/omega1766.ts"),/psi27dGate:\s*"STOP"/);
  assert.match(read("src/lib/upi/omega1766.ts"),/empiricalVerification:\s*false/);
  assert.doesNotMatch(hybridJs,/githubApi.+(?:PUT|PATCH)|git\s+push/);
});
