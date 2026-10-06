// Local, revision-bound replay. Outputs RNA proposals; never commits or invokes an LLM.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { createPersonaLearning } from "../src/lib/upi/persona-learning.mjs";

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/upi-persona-learning.mjs <structured-session.json>");
  process.exit(2);
}
const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const commit = git("rev-parse", "HEAD");
const path = "dna/UPI_PERSONA_STATE.json";
const dna = JSON.parse(git("show", `${commit}:${path}`));
const blob = git("rev-parse", `${commit}:${path}`);
const engine = createPersonaLearning(dna, { repo: "dpstudio-se/VR-ASI-CO", commit, blob, path });
if (!Array.isArray(input.events) || input.events.length > 128 ||
    !Array.isArray(input.personas) || input.personas.length > 16 ||
    (input.symbols && (!Array.isArray(input.symbols) || input.symbols.length > 128)) ||
    (input.progress && (!Array.isArray(input.progress) || input.progress.length > 128))) {
  throw new Error("Invalid or oversized replay");
}
const observations = input.events.map((event) => engine.observe(event));
const symbols = (input.symbols ?? []).map((entry) => engine.learnSymbol(entry.persona, entry.symbol));
const progress = (input.progress ?? []).map((entry) => engine.checkProgress(entry.persona, entry.id));
const proposals = input.personas.map((persona) => engine.reflect(persona));
const contexts = input.personas.map((persona) => engine.retrieve(persona));
console.log(JSON.stringify({ scope: "LOCAL_RNA_REPLAY", observations, symbols, progress, proposals, contexts,
  remoteReadBackPerformed: false, inferencePerformed: false, durableWritePerformed: false }, null, 2));
if ([...observations, ...symbols, ...progress, ...proposals, ...contexts].some((r) => r.status === "STOP")) {
  process.exitCode = 1;
}
