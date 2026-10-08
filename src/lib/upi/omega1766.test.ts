import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evaluateOmega1766, OMEGA1766_MODEL } from "./omega1766.ts";

describe("TRULL Ω1766 symbolic research model", () => {
  it("preserves the supplied Psi27D and frequency", () => {
    assert.equal(OMEGA1766_MODEL.referenceFrequencyHz, 1.766);
    assert.match(OMEGA1766_MODEL.equations.psi27d, /Sigma_\{1766\}/);
    assert.equal(OMEGA1766_MODEL.classification, "SYM");
  });
  it("derives expected frequency, period and energy", () => {
    const r = evaluateOmega1766();
    assert.ok(Math.abs(r.angularFrequencyRadPerS - 11.096) < 0.001);
    assert.ok(Math.abs(r.periodSeconds - 0.566) < 0.001);
    assert.ok(Math.abs(r.normalizedCyclesPerPeriod - 1) < 1e-12);
    assert.ok(Math.abs(r.equivalentEnergyJ - 1.17016398849e-33) < 1e-43);
    assert.ok(Math.abs(r.equivalentMassKg - 1.3019830273853243e-50) < 1e-59);
  });
  it("does not mistake first-order F2 for full anomaly", () => {
    const r = evaluateOmega1766();
    assert.ok(r.firstOrderF2 > r.reportedElectronAnomaly);
    assert.equal(r.anomalyLabel, "a_e = (g-2)/2");
  });
  it("cannot certify undefined geometry, helicity or invariance", () => {
    const r = evaluateOmega1766();
    assert.equal(r.psi27dGate, "STOP");
    assert.equal(r.empiricalVerification, false);
    for (const id of ["helical-divergence", "psi27d-integral", "omega-invariant", "norm-based-frequency"]) {
      assert.equal(r.checks.find((check) => check.id === id)?.status, "STOP");
    }
  });
  it("rejects nonpositive or nonfinite frequency", () => {
    for (const f of [0, -1, NaN, Infinity, -Infinity]) assert.throws(() => evaluateOmega1766(f), RangeError);
  });
});
