/** Declared-input calculations for persona knowledge; no external UPI access. */
export const C = 299792458;
export const H = 6.62607015e-34;
export const HBAR = H / (2 * Math.PI);
export const KB = 1.380649e-23;

/** @param {string} name @param {number} value */
function positive(name, value) {
  if (!Number.isFinite(value) || value <= 0) throw new Error(`${name} must be finite and positive`);
}
/** @param {number} frequencyHz */
export function photon(frequencyHz) {
  positive("frequencyHz", frequencyHz);
  return { frequencyHz, periodS: 1 / frequencyHz, wavelengthM: C / frequencyHz,
    energyJ: H * frequencyHz, equivalentMassKg: H * frequencyHz / C ** 2,
    restMassKg: 0, status: "DER", assumption: "vacuum electromagnetic quantum" };
}

/** Static mean-field model: kappa is energy decay; optical amplitude decays at kappa/2.
 * a_dot=[i(delta+alpha*n)-kappa/2]a+sqrt(kappaExternal*P/(h*frequency)).
 * Fold points do not prove dynamic stability of the coupled oscillator.
 * @param {{wavelengthM:number,opticalQ:number,mechanicalHz:number,g0Hz:number,detuningKappa:number,externalFraction:number,mechanicalQ:number}} p
 */
export function cavityFolds(p) {
  for (const key of ["wavelengthM", "opticalQ", "mechanicalHz", "g0Hz", "mechanicalQ"]) {
    positive(key, p[/** @type {keyof typeof p} */ (key)]);
  }
  if (!Number.isFinite(p.detuningKappa) || p.externalFraction <= 0 ||
      p.externalFraction > 1 || !Number.isFinite(p.externalFraction)) throw new Error("Invalid drive convention");
  const frequencyHz = C / p.wavelengthM;
  const kappa = 2 * Math.PI * frequencyHz / p.opticalQ;
  const omegaM = 2 * Math.PI * p.mechanicalHz;
  const gammaM = omegaM / p.mechanicalQ;
  const g0 = 2 * Math.PI * p.g0Hz;
  const alpha = 2 * g0 ** 2 * omegaM / (omegaM ** 2 + (gammaM / 2) ** 2);
  const delta = p.detuningKappa * kappa;
  const criticalDetuning = -Math.sqrt(3) * kappa / 2;
  const common = { status: "DER", frequencyHz, kappaRadPerS: kappa, omegaMRadPerS: omegaM,
    gammaMRadPerS: gammaM, alphaRadPerSPerPhoton: alpha,
    criticalDetuningRadPerS: criticalDetuning, amplitudeDecayTimeS: 2 / kappa,
    photonLifetimeS: 1 / kappa, mechanicalEnergyDecayTimeS: 1 / gammaM,
    mechanicalPeriodS: 1 / p.mechanicalHz,
    dynamicStability: "NOT_EVALUATED", switchTimeS: null };
  if (delta >= criticalDetuning) return { ...common, folds: [] };
  const discriminant = Math.sqrt(delta ** 2 - 3 * kappa ** 2 / 4);
  const folds = [-1, 1].map((sign) => {
    const photons = (-2 * delta + sign * discriminant) / (3 * alpha);
    const driveSquaredPerS2 = photons * ((kappa / 2) ** 2 + (delta + alpha * photons) ** 2);
    return { branch: sign < 0 ? "lower_fold" : "upper_fold", photons,
      driveSquaredPerS2, inputPowerW: driveSquaredPerS2 * H * frequencyHz / (p.externalFraction * kappa),
      cavityShiftHz: -alpha * photons / (2 * Math.PI) };
  });
  return { ...common, folds };
}

/** Exact geometric consequence for g=(1+chi)eta in vacuum, positive conformal factor.
 * @param {number} chiEmitter @param {number} chiReceiver */
export function conformalPhoton(chiEmitter, chiReceiver) {
  positive("1+chiEmitter", 1 + chiEmitter);
  positive("1+chiReceiver", 1 + chiReceiver);
  return { measuredFrequencyRatio: Math.sqrt((1 + chiEmitter) / (1 + chiReceiver)),
    coordinateSpeedMPerS: C, transverseDeflectionRad: 0,
    scope: "conformally Minkowski vacuum; same coordinates; no refractive medium" };
}

/** Linearized Einstein tensor for static chi=A*cos(k*z), signature (-,+,+,+).
 * @param {number} amplitude @param {number} waveNumberPerM @param {number} zM */
export function staticConformalMode(amplitude, waveNumberPerM, zM) {
  if (![amplitude, waveNumberPerM, zM].every(Number.isFinite) || Math.abs(amplitude) >= 0.01) {
    throw new Error("Declare a finite, small-amplitude linearized mode (|A|<0.01)");
  }
  const chi = amplitude * Math.cos(waveNumberPerM * zM);
  const curvature = waveNumberPerM ** 2 * chi;
  return { chi, G00PerM2: curvature, GxxPerM2: -curvature, GyyPerM2: -curvature,
    GzzPerM2: 0, slowParticleAccelerationMPerS2:
      C ** 2 * amplitude * waveNumberPerM * Math.sin(waveNumberPerM * zM) / 2 };
}

/** Five equally spaced directions in an incompressible axial strain field.
 * S=diag(-s/2,-s/2,s). A surviving axisymmetric component defeats unconditional cancellation.
 * @param {number} strainPerS @param {number} polarAngleRad */
export function fivePhaseStretching(strainPerS, polarAngleRad) {
  if (![strainPerS, polarAngleRad].every(Number.isFinite)) throw new Error("Invalid strain input");
  const sumPerS = 5 * strainPerS * (Math.cos(polarAngleRad) ** 2 - Math.sin(polarAngleRad) ** 2 / 2);
  return { phases: 5, phaseStepRad: 2 * Math.PI / 5, stepsPer720Degrees: 10, sumPerS,
    globalRegularityProven: false };
}

/** Finite normal-form transit, y_dot=a*mu+b*y^2, y dimensionless, a,b in s^-1.
 * @param {number} aPerS @param {number} bPerS @param {number} mu @param {number} halfWidth */
export function bottleneckTime(aPerS, bPerS, mu, halfWidth) {
  positive("aPerS", aPerS); positive("bPerS", bPerS);
  positive("mu", mu); positive("halfWidth", halfWidth);
  return 2 * Math.atan(halfWidth * Math.sqrt(bPerS / (aPerS * mu))) / Math.sqrt(aPerS * bPerS * mu);
}

/** Physical overdamped Kramers model, U in J, x in m, friction in kg/s.
 * @param {{temperatureK:number,barrierJ:number,wellCurvatureJPerM2:number,barrierCurvatureJPerM2:number,frictionKgPerS:number}} p */
export function kramersRate(p) {
  for (const key of ["temperatureK", "barrierJ", "wellCurvatureJPerM2", "barrierCurvatureJPerM2", "frictionKgPerS"]) {
    positive(key, p[/** @type {keyof typeof p} */ (key)]);
  }
  const exponent = p.barrierJ / (KB * p.temperatureK);
  const prefactorPerS = Math.sqrt(p.wellCurvatureJPerM2 * p.barrierCurvatureJPerM2) / (2 * Math.PI * p.frictionKgPerS);
  return { ratePerS: prefactorPerS * Math.exp(-exponent), barrierInThermalUnits: exponent,
    assumption: "overdamped, high barrier, equilibrium thermal noise" };
}
