import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const registry = JSON.parse(await readFile(new URL("../registry/known-anchors.json", import.meta.url), "utf8"));

test("registry has unique stable identifiers", () => {
  const ids = registry.records.map((record) => record.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.every((id) => /^[A-Z0-9][A-Z0-9._-]{4,100}$/.test(id)));
});

test("every record has scope, source provenance, and limitations", () => {
  for (const record of registry.records) {
    assert.ok(record.scope, record.id);
    assert.ok(record.sources?.length, record.id);
    assert.ok(record.limitations?.length, record.id);
  }
});

test("derived claims expose derivation and hypotheses expose falsification gates", () => {
  for (const record of registry.records) {
    if (record.status === "DER") assert.ok(record.derivation?.length, record.id);
    if (record.status === "HYP") {
      assert.ok(record.required_evidence?.length, record.id);
      assert.ok(record.falsification, record.id);
    }
  }
});

test("TF1766 remains symbolic and cross-domain bridge remains a hypothesis", () => {
  assert.equal(registry.records.find((r) => r.id === "SYM-TF1766-001")?.status, "SYM");
  assert.equal(registry.records.find((r) => r.id === "HYP-72-HYDROGEN-SCHUMANN-TF1766-001")?.status, "HYP");
});

test("canonical claim schema and runtime schemas are present and versioned", async () => {
  const claimSchema = JSON.parse(await readFile(new URL("../schemas/claim.schema.json", import.meta.url), "utf8"));
  const eventSchema = JSON.parse(await readFile(new URL("../../learning/schemas/event.schema.json", import.meta.url), "utf8"));
  const healthSchema = JSON.parse(await readFile(new URL("../../learning/schemas/health.schema.json", import.meta.url), "utf8"));
  assert.match(claimSchema.$id, /upi\/gen2\/physics\/schemas\/claim\.schema\.json$/);
  assert.equal(eventSchema.properties.schema_version.const, "upi-gen2-event/1.0");
  assert.equal(healthSchema.properties.schema_version.const, "upi-gen2-health/1.0");
  assert.ok(eventSchema.required.includes("authorization"));
  assert.ok(healthSchema.required.includes("fallback"));
});

test("canonical registry validator runs from repository root", () => {
  const result = spawnSync(process.execPath, ["upi/gen2/physics/tools/validate-registry.mjs"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Physics registry OK/);
});
