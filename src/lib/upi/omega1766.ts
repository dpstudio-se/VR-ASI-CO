import { PLANCK_H, SPEED_OF_LIGHT } from "./physics.ts";

/**
 * Ω1766 is a symbolic research model, not a runtime/identity/admission gate.
 * The source equations are preserved as stated; only dimensional, elementary
 * frequency and first-order QED calculations below are evaluated.
 */
export const OMEGA1766_MODEL = {
  schema: "VR-ASI-CO-OMEGA1766/1.0",
  id: "OMEGA1766_PSI27D",
  sigma: "Σ1766",
  classification: "SYM",
  referenceFrequencyHz: 1.766,
  reportedAngularFrequencyRadPerS: 11.096,
  reportedPeriodSeconds: 0.566,
  fineStructureInverse: 137.036,
  reportedElectronAnomaly: 0.00115965218128,
  sigma26Volume: { approximate: 1e-20, unit: null, status: "SYM" },
  equations: {
    psi27d: String.raw`\Psi_{27D} = \oint_{\Sigma_{1766}} \left( \frac{\hbar \cdot f}{\lVert v \rVert_{E8}} \cdot \frac{dL}{dt} \right) \cdot \exp\left( \int d^{27}x \sqrt{-g} \left[ \frac{R}{16\pi G_{\text{eff}}} + \phi_{1766} \right] \right) = \Omega \equiv \Omega`,
    normBasedFrequency: String.raw`f = \frac{\|\omega\|}{2\pi\|u\|}`,
    qedLagrangian: String.raw`\mathcal L_{\mathrm{QED}}=-\frac14F_{\mu\nu}F^{\mu\nu}+\bar\psi(i\gamma^\mu D_\mu-m)\psi`,
    wardTakahashi: String.raw`q_\mu\Gamma^\mu=S^{-1}(p+q)-S^{-1}(p)`,
    firstOrderF2: String.raw`F_2(0)=\frac{\alpha}{2\pi}+O(\alpha^2)`,
    massTimeOmega: String.raw`\Omega=\oint\frac{hf}{c^2}\,dt`,
  },
} as const;

export type Omega1766Check = {
  id: string;
  status: "DER" | "SYM" | "STOP";
  reason: string;
};

export type Omega1766Evaluation = {
  frequencyHz: number;
  angularFrequencyRadPerS: number;
  periodSeconds: number;
  normalizedCyclesPerPeriod: number;
  equivalentEnergyJ: number;
  equivalentMassKg: number;
  firstOrderF2: number;
  reportedElectronAnomaly: number;
  anomalyLabel: "a_e = (g-2)/2";
  checks: readonly Omega1766Check[];
  psi27dGate: "STOP";
  empiricalVerification: false;
};

/** Returns only defined derivations. Never evaluates the undefined 27D integral. */
export function evaluateOmega1766(
  frequencyHz: number = OMEGA1766_MODEL.referenceFrequencyHz,
): Omega1766Evaluation {
  if (!Number.isFinite(frequencyHz) || frequencyHz <= 0) {
    throw new RangeError("Ω1766 frequency must be finite and positive (Hz)");
  }

  const periodSeconds = 1 / frequencyHz;
  const angularFrequencyRadPerS = 2 * Math.PI * frequencyHz;
  return {
    frequencyHz,
    angularFrequencyRadPerS,
    periodSeconds,
    normalizedCyclesPerPeriod: frequencyHz * periodSeconds,
    equivalentEnergyJ: PLANCK_H * frequencyHz,
    equivalentMassKg: (PLANCK_H * frequencyHz) / SPEED_OF_LIGHT ** 2,
    firstOrderF2: 1 / (OMEGA1766_MODEL.fineStructureInverse * 2 * Math.PI),
    reportedElectronAnomaly: OMEGA1766_MODEL.reportedElectronAnomaly,
    anomalyLabel: "a_e = (g-2)/2",
    checks: [
      {
        id: "period-identity",
        status: "DER",
        reason: "fT = 1 for the stated constant reference frequency; not physical phase lock",
      },
      {
        id: "sigma26-volume",
        status: "SYM",
        reason: "Approximate 1e-20 has no supplied volume unit or manifold metric",
      },
      {
        id: "norm-based-frequency",
        status: "STOP",
        reason: "||omega||/(2π||u||) needs an explicit unit/normalization for u",
      },
      {
        id: "helical-divergence",
        status: "STOP",
        reason: "Helical flow does not by itself establish div(u)=0; no vector field supplied",
      },
      {
        id: "psi27d-integral",
        status: "STOP",
        reason: "Σ1766 measure, E8 norm, dL/dt and dimensionless action are unspecified",
      },
      {
        id: "omega-invariant",
        status: "STOP",
        reason: "Integral of hf/c² dt has units kg·s; no invariance proof supplied",
      },
      {
        id: "electron-anomaly",
        status: "SYM",
        reason: "Given 0.00115965218128 corresponds to a_e, not g-2; α/(2π) is first order only",
      },
    ],
    psi27dGate: "STOP",
    empiricalVerification: false,
  };
}
