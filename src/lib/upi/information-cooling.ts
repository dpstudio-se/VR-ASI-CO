/**
 * Ω1766 information-cooling bridge.
 *
 * This module keeps three scopes separate:
 * - exact thermodynamic bookkeeping (DER from declared inputs),
 * - deterministic software simulation (DER within the model),
 * - empirical claims about biological/social systems (HYP until measured).
 *
 * The 8 Hz / 1.766 Hz pair is an optional software dual-rate controller.
 * It is not promoted here to a universal physical constant.
 */

export const BOLTZMANN_J_PER_K = 1.380649e-23;
export const LN_2 = Math.log(2);

export const OMEGA1766_RATES = Object.freeze({
  fastHz: 8,
  slowHz: 1.766,
  fastPeriodSeconds: 1 / 8,
  slowPeriodSeconds: 1 / 1.766,
});

export type BridgeStatus = "DER" | "HYP" | "ERR";
export type GateCode = "PASS" | "ERR";

export type InformationCoolingInput = {
  temperatureK: number;
  erasedBitsPerSecond: number;
  mutualInformationNorm: number;
  transparencyNorm: number;
  feedbackGainNorm: number;
  provenanceNorm: number;
  correctionGainNorm: number;
  latencySeconds: number;
  latencyReferenceSeconds: number;
  baseEntropyGenerationJPerKS: number;
  coolingCouplingJPerKS: number;
  environmentEntropyExportJPerKS: number;
};

export type InformationCoolingResult = {
  calculationStatus: "DER";
  empiricalStatus: "HYP";
  gate: GateCode;
  omegaEffective: number;
  landauerMinimumPowerW: number;
  landauerEntropyRateJPerKS: number;
  localEntropyRateJPerKS: number;
  totalEntropyRateJPerKS: number;
  minimumEnvironmentExportJPerKS: number;
  latencyRatio: number;
};

function requireFiniteNonNegative(name: string, value: number) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(name + " must be finite and >= 0");
  }
}

function requireUnitInterval(name: string, value: number) {
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    throw new Error(name + " must be within [0, 1]");
  }
}

export function landauerMinimumEnergyJ(temperatureK: number, erasedBits: number) {
  requireFiniteNonNegative("temperatureK", temperatureK);
  requireFiniteNonNegative("erasedBits", erasedBits);
  return BOLTZMANN_J_PER_K * temperatureK * LN_2 * erasedBits;
}

export function landauerMinimumEntropyJPerK(erasedBits: number) {
  requireFiniteNonNegative("erasedBits", erasedBits);
  return BOLTZMANN_J_PER_K * LN_2 * erasedBits;
}

export function effectiveOmega(input: Pick<
  InformationCoolingInput,
  | "mutualInformationNorm"
  | "transparencyNorm"
  | "feedbackGainNorm"
  | "provenanceNorm"
  | "correctionGainNorm"
  | "latencySeconds"
  | "latencyReferenceSeconds"
>) {
  requireUnitInterval("mutualInformationNorm", input.mutualInformationNorm);
  requireUnitInterval("transparencyNorm", input.transparencyNorm);
  requireUnitInterval("feedbackGainNorm", input.feedbackGainNorm);
  requireUnitInterval("provenanceNorm", input.provenanceNorm);
  requireUnitInterval("correctionGainNorm", input.correctionGainNorm);
  requireFiniteNonNegative("latencySeconds", input.latencySeconds);
  if (!Number.isFinite(input.latencyReferenceSeconds) || input.latencyReferenceSeconds <= 0) {
    throw new Error("latencyReferenceSeconds must be finite and > 0");
  }

  const latencyRatio = input.latencySeconds / input.latencyReferenceSeconds;
  return (
    input.mutualInformationNorm *
    input.transparencyNorm *
    input.feedbackGainNorm *
    input.provenanceNorm *
    input.correctionGainNorm /
    (1 + latencyRatio)
  );
}

/**
 * Entropy bridge:
 *
 * Ω_eff = M * Φ * G * P * K / (1 + τ/τ0)
 *
 * Sdot_local = σ_gen + kB ln(2) Ndot_erase - Γ Ω_eff
 * Sdot_total = Sdot_local + Sdot_env
 *
 * The no-free-energy gate passes only when Sdot_total >= 0.
 */
export function evaluateInformationCooling(
  input: InformationCoolingInput,
): InformationCoolingResult {
  requireFiniteNonNegative("temperatureK", input.temperatureK);
  requireFiniteNonNegative("erasedBitsPerSecond", input.erasedBitsPerSecond);
  requireFiniteNonNegative(
    "baseEntropyGenerationJPerKS",
    input.baseEntropyGenerationJPerKS,
  );
  requireFiniteNonNegative("coolingCouplingJPerKS", input.coolingCouplingJPerKS);
  requireFiniteNonNegative(
    "environmentEntropyExportJPerKS",
    input.environmentEntropyExportJPerKS,
  );

  const omegaEffective = effectiveOmega(input);
  const latencyRatio = input.latencySeconds / input.latencyReferenceSeconds;
  const landauerMinimumPowerW =
    BOLTZMANN_J_PER_K * input.temperatureK * LN_2 * input.erasedBitsPerSecond;
  const landauerEntropyRateJPerKS =
    BOLTZMANN_J_PER_K * LN_2 * input.erasedBitsPerSecond;

  const localEntropyRateJPerKS =
    input.baseEntropyGenerationJPerKS +
    landauerEntropyRateJPerKS -
    input.coolingCouplingJPerKS * omegaEffective;

  const minimumEnvironmentExportJPerKS = Math.max(0, -localEntropyRateJPerKS);
  const totalEntropyRateJPerKS =
    localEntropyRateJPerKS + input.environmentEntropyExportJPerKS;

  return {
    calculationStatus: "DER",
    empiricalStatus: "HYP",
    gate: totalEntropyRateJPerKS >= -Number.EPSILON ? "PASS" : "ERR",
    omegaEffective,
    landauerMinimumPowerW,
    landauerEntropyRateJPerKS,
    localEntropyRateJPerKS,
    totalEntropyRateJPerKS,
    minimumEnvironmentExportJPerKS,
    latencyRatio,
  };
}

export type CoolingState = {
  hiddenLoad: number;
  residual: number;
  coherence: number;
  reviewQueue: number;
  integralResidual: number;
};

export type CoolingSimulationParameters = {
  transparency: number;
  provenance: number;
  reviewRatePerSecond: number;
  feedbackGain: number;
  slowIntegratorGain: number;
  fastObserverGain: number;
  coherenceGainPerSecond: number;
  latencySeconds: number;
  correctionGain: number;
  noiseRatePerSecond: number;
  uncertaintyInflowPerSecond: number;
  reviewInflowPerSecond: number;
};

export const BASELINE_COOLING_PARAMETERS: Readonly<CoolingSimulationParameters> =
  Object.freeze({
    transparency: 0.25,
    provenance: 0.35,
    reviewRatePerSecond: 0.35,
    feedbackGain: 0.45,
    slowIntegratorGain: 0.05,
    fastObserverGain: 0.25,
    coherenceGainPerSecond: 0.35,
    latencySeconds: 0.8,
    correctionGain: 0.5,
    noiseRatePerSecond: 0.18,
    uncertaintyInflowPerSecond: 0.35,
    reviewInflowPerSecond: 0.25,
  });

export type CoolingSimulationResult = {
  status: "DER";
  empiricalStatus: "HYP";
  meanResidual: number;
  residualIntegral: number;
  controlCostIntegral: number;
  finalState: CoolingState;
};

function validateSimulationParameters(p: CoolingSimulationParameters) {
  requireUnitInterval("transparency", p.transparency);
  requireUnitInterval("provenance", p.provenance);
  requireFiniteNonNegative("reviewRatePerSecond", p.reviewRatePerSecond);
  requireUnitInterval("feedbackGain", p.feedbackGain);
  requireFiniteNonNegative("slowIntegratorGain", p.slowIntegratorGain);
  requireUnitInterval("fastObserverGain", p.fastObserverGain);
  requireFiniteNonNegative("coherenceGainPerSecond", p.coherenceGainPerSecond);
  requireFiniteNonNegative("latencySeconds", p.latencySeconds);
  requireUnitInterval("correctionGain", p.correctionGain);
  requireFiniteNonNegative("noiseRatePerSecond", p.noiseRatePerSecond);
  requireFiniteNonNegative(
    "uncertaintyInflowPerSecond",
    p.uncertaintyInflowPerSecond,
  );
  requireFiniteNonNegative("reviewInflowPerSecond", p.reviewInflowPerSecond);
}

/**
 * Deterministic toy model used only to compare control architectures.
 * controlCostIntegral is a synthetic dimensionless cost index, not joules.
 */
export function runCoolingSimulation(
  parameters: CoolingSimulationParameters = {
    ...BASELINE_COOLING_PARAMETERS,
  },
  durationSeconds = 30,
  dtSeconds = 0.02,
): CoolingSimulationResult {
  validateSimulationParameters(parameters);
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    throw new Error("durationSeconds must be finite and > 0");
  }
  if (!Number.isFinite(dtSeconds) || dtSeconds <= 0) {
    throw new Error("dtSeconds must be finite and > 0");
  }

  const steps = Math.max(1, Math.round(durationSeconds / dtSeconds));
  const dt = durationSeconds / steps;
  const state: CoolingState = {
    hiddenLoad: 1,
    residual: 1,
    coherence: 0.45,
    reviewQueue: 0.4,
    integralResidual: 0,
  };

  let residualIntegral = 0;
  let controlCostIntegral = 0;

  for (let i = 0; i < steps; i += 1) {
    const hiddenDrain = 0.15 + 0.85 * parameters.transparency;
    const hiddenDerivative =
      parameters.uncertaintyInflowPerSecond * (1 - parameters.provenance) -
      hiddenDrain * state.hiddenLoad;

    const queueDerivative =
      parameters.reviewInflowPerSecond * state.hiddenLoad -
      parameters.reviewRatePerSecond * state.reviewQueue;

    const coherenceDerivative =
      parameters.coherenceGainPerSecond * (1 - state.coherence) -
      parameters.noiseRatePerSecond * state.coherence;

    const effectiveFeedback =
      parameters.feedbackGain *
      parameters.correctionGain *
      (1 + 0.5 * parameters.fastObserverGain) /
      (1 + parameters.latencySeconds);

    const residualDerivative =
      0.45 * state.hiddenLoad +
      0.25 * state.reviewQueue +
      0.3 * (1 - state.coherence) -
      effectiveFeedback * state.residual -
      parameters.slowIntegratorGain * state.integralResidual;

    const integralDerivative = state.residual;

    state.hiddenLoad = Math.max(0, state.hiddenLoad + hiddenDerivative * dt);
    state.reviewQueue = Math.max(0, state.reviewQueue + queueDerivative * dt);
    state.coherence = Math.min(
      1,
      Math.max(0, state.coherence + coherenceDerivative * dt),
    );
    state.residual = Math.max(0, state.residual + residualDerivative * dt);
    state.integralResidual = Math.min(
      20,
      Math.max(0, state.integralResidual + integralDerivative * dt),
    );

    const controlCostRate =
      0.8 * parameters.transparency +
      0.4 * parameters.provenance +
      0.6 * parameters.reviewRatePerSecond +
      0.7 * parameters.feedbackGain +
      0.5 * parameters.slowIntegratorGain +
      0.3 * parameters.fastObserverGain +
      0.4 * parameters.coherenceGainPerSecond +
      0.2 * parameters.correctionGain;

    residualIntegral += state.residual * dt;
    controlCostIntegral += controlCostRate * dt;
  }

  return {
    status: "DER",
    empiricalStatus: "HYP",
    meanResidual: residualIntegral / durationSeconds,
    residualIntegral,
    controlCostIntegral,
    finalState: { ...state },
  };
}

export type AssumptionSpec = {
  id: string;
  question: string;
  status: "HYP";
  patch: Partial<CoolingSimulationParameters>;
};

export const DEFAULT_50_ASSUMPTIONS: readonly AssumptionSpec[] = Object.freeze([
  { id: "transparency-drain", question: "Does stronger transparency drain hidden load faster?", status: "HYP", patch: { transparency: 0.55 } },
  { id: "provenance-inflow", question: "Does provenance reduce new hidden uncertainty?", status: "HYP", patch: { provenance: 0.7 } },
  { id: "faster-review", question: "Does faster review reduce queue-driven residual?", status: "HYP", patch: { reviewRatePerSecond: 0.7 } },
  { id: "stronger-feedback", question: "Does stronger negative feedback reduce residual?", status: "HYP", patch: { feedbackGain: 0.7 } },
  { id: "slow-integrator", question: "Does slow integral correction remove persistent residual?", status: "HYP", patch: { slowIntegratorGain: 0.12 } },
  { id: "fast-observer", question: "Does a stronger fast observer improve correction?", status: "HYP", patch: { fastObserverGain: 0.6 } },
  { id: "correction-gain", question: "Does a stronger correction path improve stability?", status: "HYP", patch: { correctionGain: 0.8 } },
  { id: "low-latency", question: "Does lower feedback latency reduce residual?", status: "HYP", patch: { latencySeconds: 0.4 } },
  { id: "coherence-gain", question: "Does stronger coherence recovery reduce noise residual?", status: "HYP", patch: { coherenceGainPerSecond: 0.7 } },
  { id: "lower-uncertainty", question: "Does lower uncertainty inflow reduce residual?", status: "HYP", patch: { uncertaintyInflowPerSecond: 0.2 } },
  { id: "transparency-plus-feedback", question: "Is transparency stronger when paired with feedback?", status: "HYP", patch: { transparency: 0.7, feedbackGain: 0.7 } },
  { id: "pi-feedback", question: "Does proportional plus integral feedback outperform proportional feedback?", status: "HYP", patch: { feedbackGain: 0.8, slowIntegratorGain: 0.12 } },
  { id: "fast-damped-feedback", question: "Does fast observation strengthen a feedback loop?", status: "HYP", patch: { fastObserverGain: 0.8, feedbackGain: 0.7 } },
  { id: "transparent-pi", question: "Does transparency plus PI control reduce residual?", status: "HYP", patch: { transparency: 0.7, feedbackGain: 0.7, slowIntegratorGain: 0.1 } },
  { id: "delayed-review", question: "Does increased latency destabilize otherwise identical feedback?", status: "HYP", patch: { latencySeconds: 1.8 } },
  { id: "mirror-correction", question: "Does independent correction gain improve mirror closure?", status: "HYP", patch: { correctionGain: 0.9, feedbackGain: 0.6 } },
  { id: "counterexample-search", question: "Does stronger provenance plus feedback mimic active counterexample search?", status: "HYP", patch: { provenance: 0.8, feedbackGain: 0.6 } },
  { id: "fail-closed-review", question: "Does faster review plus bounded correction stabilize fail-closed behavior?", status: "HYP", patch: { reviewRatePerSecond: 0.8, correctionGain: 0.6 } },
  { id: "human-gate", question: "Does a visible human review gate reduce hidden-load accumulation?", status: "HYP", patch: { transparency: 0.55, reviewRatePerSecond: 0.65 } },
  { id: "adaptive-threshold", question: "Do low latency and faster review outperform static thresholds?", status: "HYP", patch: { latencySeconds: 0.35, reviewRatePerSecond: 0.65 } },
  { id: "fast-8hz-control", question: "What does the nominal 8 Hz software observer contribute?", status: "HYP", patch: { fastObserverGain: 1 } },
  { id: "slow-1_766hz-integrator", question: "What does the nominal 1.766 Hz slow integration channel contribute?", status: "HYP", patch: { slowIntegratorGain: 0.16 } },
  { id: "dual-rate-8-1_766", question: "Does fast 8 Hz observation plus slow 1.766 Hz integration outperform either channel alone?", status: "HYP", patch: { fastObserverGain: 1, slowIntegratorGain: 0.16 } },
  { id: "phase-lock", question: "Does stronger coherence recovery alone reduce residual?", status: "HYP", patch: { coherenceGainPerSecond: 0.9 } },
  { id: "jitter-reduction", question: "Does lower noise improve the loop without stronger feedback?", status: "HYP", patch: { noiseRatePerSecond: 0.08 } },
  { id: "resonance-without-feedback", question: "Can high coherence compensate for deliberately weak feedback?", status: "HYP", patch: { coherenceGainPerSecond: 1.2, feedbackGain: 0.2 } },
  { id: "async-audit", question: "Does provenance plus faster review improve asynchronous audit?", status: "HYP", patch: { reviewRatePerSecond: 0.75, provenance: 0.7 } },
  { id: "multirate-consensus", question: "Does multirate observation, integration and review improve consensus?", status: "HYP", patch: { fastObserverGain: 0.8, slowIntegratorGain: 0.12, reviewRatePerSecond: 0.6 } },
  { id: "very-fast-review", question: "What is the benefit and synthetic control cost of very fast review?", status: "HYP", patch: { reviewRatePerSecond: 1.2, feedbackGain: 0.9 } },
  { id: "slow-efficient-integration", question: "Can slow integration plus provenance lower residual at bounded control cost?", status: "HYP", patch: { slowIntegratorGain: 0.15, provenance: 0.7 } },
  { id: "signed-provenance", question: "Does near-complete provenance reduce hidden uncertainty?", status: "HYP", patch: { provenance: 0.9 } },
  { id: "appealable-decision-path", question: "Does a fast correction route reduce queue and residual together?", status: "HYP", patch: { reviewRatePerSecond: 0.9, correctionGain: 0.85 } },
  { id: "reason-required", question: "Does stronger correction metadata improve closure?", status: "HYP", patch: { correctionGain: 0.75 } },
  { id: "public-audit-log", question: "Does transparency plus provenance improve auditability?", status: "HYP", patch: { transparency: 0.65, provenance: 0.65 } },
  { id: "immutable-history", question: "Does strong provenance plus correction reduce replay ambiguity?", status: "HYP", patch: { provenance: 0.85, correctionGain: 0.65 } },
  { id: "pr-gate", question: "Does review plus correction improve a proposal-to-merge gate?", status: "HYP", patch: { reviewRatePerSecond: 0.65, correctionGain: 0.7 } },
  { id: "read-back-after-mutation", question: "Does stronger feedback plus correction improve read-back closure?", status: "HYP", patch: { feedbackGain: 0.75, correctionGain: 0.85 } },
  { id: "status-separation", question: "Does provenance plus feedback reduce category drift?", status: "HYP", patch: { provenance: 0.75, feedbackGain: 0.65 } },
  { id: "scope-lock", question: "Does transparency alone, without stronger feedback, materially change residual?", status: "HYP", patch: { transparency: 0.45 } },
  { id: "legal-model-firewall", question: "Does lower latency plus correction reduce cross-layer residual?", status: "HYP", patch: { correctionGain: 0.8, latencySeconds: 0.5 } },
  { id: "quarantine-incoherent", question: "Does aggressive correction with low latency reduce incoherent state persistence?", status: "HYP", patch: { feedbackGain: 0.9, latencySeconds: 0.35 } },
  { id: "zero-trust-provenance", question: "What does maximum provenance plus strong correction contribute?", status: "HYP", patch: { provenance: 1, correctionGain: 0.9 } },
  { id: "distributed-mirror-mesh", question: "Does a high-feedback, high-review provenance mesh reduce residual despite higher cost?", status: "HYP", patch: { feedbackGain: 1, reviewRatePerSecond: 0.9, provenance: 0.85 } },
  { id: "canonical-source", question: "Does a stronger canonical source plus transparency lower hidden load?", status: "HYP", patch: { provenance: 0.65, transparency: 0.55 } },
  { id: "federated-canonicality", question: "Does provenance plus review plus feedback improve federated correction?", status: "HYP", patch: { provenance: 0.85, reviewRatePerSecond: 0.8, feedbackGain: 0.7 } },
  { id: "adversarial-falsifier", question: "Does strong feedback plus integration model active falsification?", status: "HYP", patch: { feedbackGain: 1, slowIntegratorGain: 0.1 } },
  { id: "causal-intervention-gate", question: "Does maximal correction and low latency improve intervention closure?", status: "HYP", patch: { correctionGain: 1, latencySeconds: 0.3 } },
  { id: "griffin-unit-gate", question: "Does reduced model noise plus provenance improve a unit-checked path?", status: "HYP", patch: { noiseRatePerSecond: 0.08, provenance: 0.7 } },
  { id: "no-free-energy-gate", question: "Does reduced uncertainty plus provenance improve a thermodynamic boundary gate?", status: "HYP", patch: { uncertaintyInflowPerSecond: 0.18, provenance: 0.75 } },
  { id: "omega1766-full-stack", question: "What is the residual/cost tradeoff of the complete Ω1766 feedback stack?", status: "HYP", patch: { transparency: 0.85, provenance: 0.9, reviewRatePerSecond: 1, feedbackGain: 0.95, slowIntegratorGain: 0.16, fastObserverGain: 1, coherenceGainPerSecond: 0.9, latencySeconds: 0.25, correctionGain: 0.95, noiseRatePerSecond: 0.08, uncertaintyInflowPerSecond: 0.18 } },
]);

export type AssumptionResult = {
  id: string;
  question: string;
  status: "DER";
  empiricalStatus: "HYP";
  residualReductionPercent: number;
  controlCostOverheadPercent: number;
  score: number;
  result: CoolingSimulationResult;
};

export function evaluateAssumptions(
  assumptions: readonly AssumptionSpec[] = DEFAULT_50_ASSUMPTIONS,
): AssumptionResult[] {
  const baseline = runCoolingSimulation({
    ...BASELINE_COOLING_PARAMETERS,
  });

  return assumptions
    .map((assumption) => {
      const result = runCoolingSimulation({
        ...BASELINE_COOLING_PARAMETERS,
        ...assumption.patch,
      });

      const residualReductionPercent =
        ((baseline.meanResidual - result.meanResidual) / baseline.meanResidual) *
        100;
      const controlCostOverheadPercent =
        ((result.controlCostIntegral - baseline.controlCostIntegral) /
          baseline.controlCostIntegral) *
        100;

      const score =
        residualReductionPercent -
        0.25 * Math.max(0, controlCostOverheadPercent);

      return {
        id: assumption.id,
        question: assumption.question,
        status: "DER" as const,
        empiricalStatus: "HYP" as const,
        residualReductionPercent,
        controlCostOverheadPercent,
        score,
        result,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function bestAssumptionWithinCost(
  maxControlCostOverheadPercent: number,
  assumptions: readonly AssumptionSpec[] = DEFAULT_50_ASSUMPTIONS,
) {
  requireFiniteNonNegative(
    "maxControlCostOverheadPercent",
    maxControlCostOverheadPercent,
  );
  return evaluateAssumptions(assumptions).find(
    (candidate) =>
      candidate.controlCostOverheadPercent <= maxControlCostOverheadPercent,
  );
}
