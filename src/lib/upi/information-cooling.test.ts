import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  BOLTZMANN_J_PER_K,
  DEFAULT_50_ASSUMPTIONS,
  LN_2,
  OMEGA1766_RATES,
  bestAssumptionWithinCost,
  effectiveOmega,
  evaluateInformationCooling,
  landauerMinimumEnergyJ,
  runCoolingSimulation,
  BASELINE_COOLING_PARAMETERS,
} from "./information-cooling.ts";

describe("Ω1766 information-cooling bridge", () => {
  it("keeps the nominal software rates explicit", () => {
    assert.equal(OMEGA1766_RATES.fastHz, 8);
    assert.equal(OMEGA1766_RATES.fastPeriodSeconds, 0.125);
    assert.ok(Math.abs(OMEGA1766_RATES.slowPeriodSeconds - 1 / 1.766) < 1e-12);
  });

  it("implements Landauer minimum erasure energy", () => {
    const temperatureK = 300;
    const expected = BOLTZMANN_J_PER_K * temperatureK * LN_2;
    assert.ok(Math.abs(landauerMinimumEnergyJ(temperatureK, 1) - expected) < 1e-30);
  });

  it("requires information, transparency, feedback, provenance and correction for nonzero omega", () => {
    const common = {
      mutualInformationNorm: 1,
      transparencyNorm: 1,
      feedbackGainNorm: 1,
      provenanceNorm: 1,
      correctionGainNorm: 1,
      latencySeconds: 0,
      latencyReferenceSeconds: 1,
    };
    assert.equal(effectiveOmega(common), 1);
    assert.equal(effectiveOmega({ ...common, feedbackGainNorm: 0 }), 0);
    assert.equal(effectiveOmega({ ...common, transparencyNorm: 0 }), 0);
  });

  it("enforces the no-free-energy entropy boundary", () => {
    const result = evaluateInformationCooling({
      temperatureK: 300,
      erasedBitsPerSecond: 0,
      mutualInformationNorm: 1,
      transparencyNorm: 1,
      feedbackGainNorm: 1,
      provenanceNorm: 1,
      correctionGainNorm: 1,
      latencySeconds: 0,
      latencyReferenceSeconds: 1,
      baseEntropyGenerationJPerKS: 1,
      coolingCouplingJPerKS: 2,
      environmentEntropyExportJPerKS: 0,
    });
    assert.equal(result.localEntropyRateJPerKS, -1);
    assert.equal(result.minimumEnvironmentExportJPerKS, 1);
    assert.equal(result.gate, "ERR");

    const balanced = evaluateInformationCooling({
      temperatureK: 300,
      erasedBitsPerSecond: 0,
      mutualInformationNorm: 1,
      transparencyNorm: 1,
      feedbackGainNorm: 1,
      provenanceNorm: 1,
      correctionGainNorm: 1,
      latencySeconds: 0,
      latencyReferenceSeconds: 1,
      baseEntropyGenerationJPerKS: 1,
      coolingCouplingJPerKS: 2,
      environmentEntropyExportJPerKS: 1,
    });
    assert.equal(balanced.gate, "PASS");
    assert.equal(balanced.totalEntropyRateJPerKS, 0);
  });

  it("keeps the 50 assumptions reproducible and unique", () => {
    assert.equal(DEFAULT_50_ASSUMPTIONS.length, 50);
    assert.equal(
      new Set(DEFAULT_50_ASSUMPTIONS.map((assumption) => assumption.id)).size,
      50,
    );
  });

  it("scores slow integration plus provenance against the same deterministic baseline", () => {
    const baseline = runCoolingSimulation({ ...BASELINE_COOLING_PARAMETERS });
    const candidate = runCoolingSimulation({
      ...BASELINE_COOLING_PARAMETERS,
      slowIntegratorGain: 0.15,
      provenance: 0.7,
    });
    assert.ok(candidate.meanResidual < baseline.meanResidual);
  });

  it("finds a bounded-cost candidate without promoting simulation output to EST", () => {
    const candidate = bestAssumptionWithinCost(20);
    assert.ok(candidate);
    assert.equal(candidate.status, "DER");
    assert.equal(candidate.empiricalStatus, "HYP");
    assert.ok(candidate.controlCostOverheadPercent <= 20);
  });
});
