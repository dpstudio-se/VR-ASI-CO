import { SPEED_OF_LIGHT } from "./physics";
import { nearlyEqual } from "./group";

export const ELECTRON_KG = 9.1093837139e-31;
export const PROTON_KG = 1.67262192595e-27;

export type MassPreset = "electron" | "proton" | "kilogram" | "photon";

export const MASS_PRESETS: { id: MassPreset; label: string; kg: number }[] = [
  { id: "electron", label: "electron", kg: ELECTRON_KG },
  { id: "proton", label: "proton", kg: PROTON_KG },
  { id: "kilogram", label: "1 kg", kg: 1 },
  { id: "photon", label: "photon", kg: 0 },
];

export function restEnergy(massKg: number) {
  return massKg * SPEED_OF_LIGHT * SPEED_OF_LIGHT;
}

export function fourMomentum(massKg: number, phi: number, photonEnergyJ = restEnergy(ELECTRON_KG)) {
  if (massKg <= 0) {
    const E = photonEnergyJ;
    return {
      E,
      p: E / SPEED_OF_LIGHT,
      E0: 0,
      gamma: Number.POSITIVE_INFINITY,
      vOverC: 1,
      lightlike: true as const,
    };
  }
  const E0 = restEnergy(massKg);
  const ch = Math.cosh(phi);
  const sh = Math.sinh(phi);
  return {
    E: E0 * ch,
    p: (E0 / SPEED_OF_LIGHT) * sh,
    E0,
    gamma: ch,
    vOverC: Math.tanh(phi),
    lightlike: false as const,
  };
}

export function invariantMass(energyJ: number, momentumKgMs: number) {
  const c = SPEED_OF_LIGHT;
  const m2 = (energyJ * energyJ) / c ** 4 - (momentumKgMs * momentumKgMs) / c ** 2;
  if (!Number.isFinite(m2)) return Number.NaN;
  if (m2 < 0 && Math.abs(m2) < 1e-48) return 0;
  return m2 <= 0 ? 0 : Math.sqrt(m2);
}

export function naiveMass(energyJ: number) {
  return energyJ / (SPEED_OF_LIGHT * SPEED_OF_LIGHT);
}

export function einsteinRoundTrip(massKg: number, phi: number) {
  const four = fourMomentum(massKg, phi);
  const mInv = invariantMass(four.E, four.p);
  const mNaive = naiveMass(four.E);
  const EBack = restEnergy(mInv);
  const residual = massKg === 0 ? Math.abs(mInv) : Math.abs(mInv - massKg);
  const closed = massKg === 0 ? mInv === 0 : nearlyEqual(mInv, massKg, 1e-9);
  return {
    ...four,
    mInv,
    mNaive,
    EBack,
    residual,
    naiveResidual: Math.abs(mNaive - massKg),
    restMapHolds: Math.abs(phi) < 1e-9 && massKg > 0,
    closed,
    forward: "E₀ → Λ(φ) → (E, p)",
    back: "m = √(E²/c⁴ − p²/c²)",
  };
}
