import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const registryPath = resolve("upi/gen2/physics/registry/known-anchors.json");
const allowed = new Set(["EST", "DER", "HYP", "SYM", "SEM-LOSS", "STOP", "ERR"]);

function fail(message) {
  console.error(`PHYSICS REGISTRY ERROR: ${message}`);
  process.exitCode = 1;
}

const registry = JSON.parse(await readFile(registryPath, "utf8"));
if (registry.schema !== "VR-ASI-CO-PHYSICS-REGISTRY/1.0") fail("unexpected registry schema");
if (!Array.isArray(registry.records)) fail("records must be an array");

const ids = new Set();
for (const [index, record] of (registry.records ?? []).entries()) {
  const where = `records[${index}]`;
  if (!record.id || ids.has(record.id)) fail(`${where}: missing or duplicate id ${record.id ?? ""}`);
  ids.add(record.id);
  if (!record.statement || typeof record.statement !== "string") fail(`${where}: statement required`);
  if (!allowed.has(record.status)) fail(`${where}: invalid status ${record.status}`);
  if (!record.domain || !record.scope) fail(`${where}: domain and scope required`);
  if (!Array.isArray(record.sources) || record.sources.length === 0) fail(`${where}: at least one source/provenance entry required`);
  if (!Array.isArray(record.limitations) || record.limitations.length === 0) fail(`${where}: limitations must be explicit`);
  if (record.status === "DER" && (!Array.isArray(record.derivation) || !record.derivation.length)) fail(`${where}: DER requires derivation steps`);
  if (record.status === "HYP" && (!Array.isArray(record.required_evidence) || !record.required_evidence.length || !record.falsification)) fail(`${where}: HYP requires evidence gates and falsification route`);
  for (const variable of record.variables ?? []) {
    for (const key of ["symbol", "meaning", "unit", "dimension"]) {
      if (!variable[key]) fail(`${where}: variable missing ${key}`);
    }
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`Physics registry OK: ${registry.records.length} records; ${ids.size} unique IDs.`);
