/** CODATA / SI exact or recommended values. Software utilities, not experimental proof. */
export const PLANCK_H = 6.62607015e-34;
export const SPEED_OF_LIGHT = 299792458;
export const N8_REFERENCE_HZ = 8;
export const G_NEWTON = 6.6743e-11;
export const PLANCK_LENGTH = 1.616255e-35;
export const BOLTZMANN_K = 1.380649e-23;

export function energyFromFrequency(hz: number) {
  return hz * PLANCK_H;
}

export function massEquivalent(hz: number) {
  return energyFromFrequency(hz) / SPEED_OF_LIGHT ** 2;
}

export function n8Index(hz: number) {
  return hz / N8_REFERENCE_HZ;
}

export function schwarzschildRadius(massKg: number) {
  return (2 * G_NEWTON * massKg) / SPEED_OF_LIGHT ** 2;
}

export function horizonArea(massKg: number) {
  const r = schwarzschildRadius(massKg);
  return 4 * Math.PI * r * r;
}

/** Bekenstein–Hawking entropy in units of k_B. Semiclassical; STOP if R_s < ℓ_P. */
export function bekensteinHawkingSOverK(massKg: number) {
  return horizonArea(massKg) / (4 * PLANCK_LENGTH ** 2);
}

export function formatScientific(value: number, digits = 6) {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";
  return value.toExponential(digits);
}

export const DNA_NOTES = {
  A: { note: "A4", hz: 440.0 },
  C: { note: "C4", hz: 261.6256 },
  G: { note: "G4", hz: 392.0 },
  T: { note: "E4", hz: 329.6276 },
  U: { note: "E4", hz: 329.6276 },
} as const;

export type DnaBase = keyof typeof DNA_NOTES;

export function parseDnaSequence(input: string) {
  return [...input.toUpperCase()].filter((ch): ch is DnaBase => ch in DNA_NOTES);
}
