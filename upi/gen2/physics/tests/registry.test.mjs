import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

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
