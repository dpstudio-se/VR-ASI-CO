import assert from "node:assert/strict";
import { test } from "node:test";
import {
  EXO_GATES, SCALE_CHAMBERS, evaluateR0, evaluateExoF, evaluateScaleLock,
  routeSoftEos, createOpenNoiseLedger,
} from "../src/lib/upi/vortex-audit.mjs";

test("r0 requires evidence provenance and calculates expected ratio", () => {
  const result = evaluateR0({ verifiedSignal: 8, noise: 1, compression: 0, manipulation: 0, uncertainty: 1, source: "sha-bound-review" });
  assert.equal(result.status, "DER");
  assert.equal(result.score, 0.8);
  assert.equal(result.band, "green");
  assert.equal(result.authority, false);
  assert.equal(evaluateR0({ verifiedSignal: 1, noise: 0, compression: 0, manipulation: 0, uncertainty: 0 }).status, "STOP");
  assert.equal(evaluateR0({ verifiedSignal: 0, noise: 0, compression: 0, manipulation: 0, uncertainty: 0, source: "test" }).status, "STOP");
  assert.equal(evaluateR0({ verifiedSignal: -1, noise: 0, compression: 0, manipulation: 0, uncertainty: 0, source: "test" }).status, "STOP");
});
test("EXO-F never infers untested gate PASS", () => {
  assert.equal(EXO_GATES.length, 8);
  const result = evaluateExoF({ claim: "owner supplied model", gates: { scale: { result: "pass", evidence: "reviewed units" } } });
  assert.equal(result.verdict, "unknown");
  assert.equal(result.checks.source_chain.result, "unknown");
  assert.equal(evaluateExoF({ claim: "x", gates: { scale: { result: "pass" } } }).status, "STOP");
  const gates = Object.fromEntries(EXO_GATES.map(k => [k, { result: "pass", evidence: "bounded local software assertion" }]));
  assert.equal(evaluateExoF({ claim: "software claim", gates }).verdict, "pass");
  assert.equal(evaluateExoF({ claim: "software claim", gates: { ...gates, replication: { result: "fail", evidence: "counterexample" } } }).verdict, "fail");
});
test("Scale Lock checks all five chambers with score 0-10", () => {
  assert.equal(SCALE_CHAMBERS.length, 5);
  assert.equal(evaluateScaleLock({ core: 2 }).status, "STOP");
  assert.equal(evaluateScaleLock({ core: 3, motor: 2, carrier: 2, selection: 2, memory: 2 }).status, "STOP");
  const score = evaluateScaleLock({ core: 2, motor: 1, carrier: 0, selection: 2, memory: 1 });
  assert.equal(score.status, "DER");
  assert.equal(score.total, 6);
  assert.equal(score.physicalEquivalence, false);
});
test("Soft-EOS uses explicit signals, no tokenizer or weight changes", () => {
  const clean = { novelty: false, uncertainty: false, evidenceConflict: false, conceptualDrift: false, bubbleRisk: false, criticality: false };
  assert.equal(routeSoftEos(clean).mode, "COMPACT");
  assert.equal(routeSoftEos({ ...clean, evidenceConflict: true }).mode, "FULL_REFRESH");
  assert.equal(routeSoftEos({ ...clean, evidenceConflict: true }).weightsChanged, false);
  assert.equal(routeSoftEos({ ...clean, evidenceConflict: true }).tokenizerChanged, false);
  assert.equal(routeSoftEos({ ...clean, criticality: 1 }).status, "STOP");
});
test("Open Noise Ledger is visible, bounded, immutable to callers and replay-safe", () => {
  const ledger = createOpenNoiseLedger(1);
  const entry = { id: "issue1", kind: "source_conflict", detail: "candidate disagrees with DNA", source: "reviewed blob" };
  assert.equal(ledger.append(entry).status, "DER");
  entry.detail = "tamper";
  assert.equal(ledger.read().entries[0].detail, "candidate disagrees with DNA");
  assert.equal(ledger.append({ ...entry, detail: "candidate disagrees with DNA" }).duplicate, true);
  assert.equal(ledger.append(entry).reason, "LEDGER_ID_CONFLICT");
  assert.equal(ledger.append({ id: "issue2", kind: "failed_test", detail: "failed", source: "test" }).reason, "LEDGER_CAPACITY_REACHED");
  assert.equal(ledger.read().persisted, false);
  const snapshot = ledger.read();
  snapshot.entries[0].detail = "changed";
  assert.equal(ledger.read().entries[0].detail, "candidate disagrees with DNA");
  ledger.stop();
  assert.equal(ledger.append({ id: "issue3", kind: "failed_test", detail: "failed", source: "test" }).reason, "LEDGER_STOPPED");
});
