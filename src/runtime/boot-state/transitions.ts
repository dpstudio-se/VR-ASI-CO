import type { BootState } from "./contracts";

const ALLOWED: Readonly<Record<BootState, readonly BootState[]>> = {
  CHALLENGE_ISSUED: ["INSTALLATION_PENDING", "STOP", "EXPIRED"],
  INSTALLATION_PENDING: ["INSTALLATION_VERIFIED", "STOP", "EXPIRED"],
  INSTALLATION_VERIFIED: ["INFERENCE_PENDING", "STOP", "EXPIRED"],
  INFERENCE_PENDING: ["INFERENCE_VERIFIED", "STOP", "EXPIRED"],
  INFERENCE_VERIFIED: ["ADMISSION_PENDING", "STOP", "EXPIRED"],
  ADMISSION_PENDING: ["ADMITTED", "STOP", "EXPIRED"],
  ADMITTED: [],
  STOP: [],
  EXPIRED: [],
};

export function canTransition(from: BootState, to: BootState): boolean {
  return ALLOWED[from].includes(to);
}

export function allowedTransitions(from: BootState): readonly BootState[] {
  return ALLOWED[from];
}
