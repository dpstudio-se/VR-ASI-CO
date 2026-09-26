import { PLANCK_H, SPEED_OF_LIGHT } from "./physics";

/** Software tests of group axioms. Not a claim that nature is a finite group. */

export type GroupMode = "cyclic" | "u1" | "lorentz" | "planck";

export const GROUP_MODES: { id: GroupMode; label: string; status: "EST" | "DER" }[] = [
  { id: "cyclic", label: "Z₈", status: "EST" },
  { id: "u1", label: "U(1)", status: "EST" },
  { id: "lorentz", label: "Lorentz", status: "EST" },
  { id: "planck", label: "Planck–Einstein", status: "DER" },
];

export const GROUP_COPY: Record<GroupMode, { title: string; meaning: string; guard: string }> = {
  cyclic: {
    title: "Cyclic group Z₈",
    meaning:
      "Hours on a clock. Add, wrap, invert. The inverse is the other way around the same circle. Identity is 0. Eight here is the N8 coordinate size, not 8 Hz as a law.",
    guard: "Z₈ is a finite abelian group. It is not a frequency, not a lattice of spacetime, not E8.",
  },
  u1: {
    title: "Circle group U(1)",
    meaning:
      "Phases multiply. Inverse is conjugate: e^{iθ} · e^{-iθ} = 1. Photon time evolution is this group. Energy E = hf sets how fast the phase winds, not a new inverse.",
    guard: "U(1) is the gauge group of electromagnetism and the phase of a wavefunction. Closing the phase loop does not assign rest mass to a photon.",
  },
  lorentz: {
    title: "Lorentz boosts in 1+1",
    meaning:
      "Rapidities add. Inverse rapidity is minus. Identity is rest. Velocity addition (v₁+v₂)/(1+v₁v₂/c²) is that group law in disguise. E = mc² lives here: four-momentum transforms as a vector.",
    guard: "The boost group is EST. A closed numerical residual is a software test, not a new relativity.",
  },
  planck: {
    title: "Planck–Einstein isomorphism",
    meaning:
      "f ↦ hf and E ↦ E/c² are invertible linear maps. Compose: m = hf/c². Invert: E = mc², then f = E/h. Planck in, Planck out. That is the mirror. Status DER for the algebra; HYP for naming the kilogram information mass.",
    guard:
      "Invertible maps form a group (GL). {kilograms} under this map is not the Poincaré group. Photon rest mass remains 0.",
  },
};

export function wrapTau(angle: number) {
  const tau = Math.PI * 2;
  return ((angle % tau) + tau) % tau;
}

export function znAdd(n: number, a: number, b: number) {
  return (((a + b) % n) + n) % n;
}

export function znInv(n: number, a: number) {
  return (n - (a % n)) % n;
}

export function nearlyEqual(a: number, b: number, rel = 1e-12) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  if (a === b) return true;
  const scale = Math.max(Math.abs(a), Math.abs(b), 1e-18);
  return Math.abs(a - b) <= rel * scale;
}

export type RoundTrip = {
  closed: boolean;
  residual: number;
  forward: string;
  back: string;
};

export function znRoundTrip(n: number, g: number): RoundTrip {
  const inv = znInv(n, g);
  const back = znAdd(n, g, inv);
  return {
    closed: back === 0,
    residual: back,
    forward: `${g} + ${inv}`,
    back: String(back),
  };
}

export function u1RoundTrip(theta: number): RoundTrip {
  const inv = wrapTau(-theta);
  const back = wrapTau(theta + inv);
  const residual = Math.min(back, Math.PI * 2 - back);
  return {
    closed: residual < 1e-12,
    residual,
    forward: `${theta.toFixed(3)} + (${-theta.toFixed(3)})`,
    back: back.toExponential(3),
  };
}

export function velocityFromRapidity(phi: number) {
  return SPEED_OF_LIGHT * Math.tanh(phi);
}

export function composeVelocity(v1: number, v2: number) {
  const c2 = SPEED_OF_LIGHT * SPEED_OF_LIGHT;
  return (v1 + v2) / (1 + (v1 * v2) / c2);
}

export type Event11 = { t: number; x: number };

export function boost(event: Event11, phi: number): Event11 {
  const ch = Math.cosh(phi);
  const sh = Math.sinh(phi);
  const c = SPEED_OF_LIGHT;
  return {
    t: ch * event.t + (sh * event.x) / c,
    x: sh * c * event.t + ch * event.x,
  };
}

export function minkowskiOmega(event: Event11) {
  const c = SPEED_OF_LIGHT;
  return c * c * event.t * event.t - event.x * event.x;
}

export function lorentzRoundTrip(event: Event11, phi: number): RoundTrip {
  const forth = boost(event, phi);
  const back = boost(forth, -phi);
  const residual = Math.hypot(back.t - event.t, (back.x - event.x) / SPEED_OF_LIGHT);
  return {
    closed: residual < 1e-9,
    residual,
    forward: `Λ(φ) then Λ(−φ)`,
    back: `Δt=${(back.t - event.t).toExponential(2)} s`,
  };
}

export function planckEinsteinRoundTrip(hz: number) {
  const E = hz * PLANCK_H;
  const m = E / (SPEED_OF_LIGHT * SPEED_OF_LIGHT);
  const E2 = m * SPEED_OF_LIGHT * SPEED_OF_LIGHT;
  const f2 = E2 / PLANCK_H;
  const residual = Math.abs(f2 - hz);
  return {
    E,
    m,
    E2,
    f2,
    closed: nearlyEqual(hz, f2) && nearlyEqual(E, E2),
    residual,
    forward: "f → hf → hf/c²",
    back: "m → mc² → E/h",
  };
}

export const GROUP_APPLICATIONS = [
  {
    group: "Z_d / Weyl",
    usedFor: "Qudit shift and phase. Inverse gate is the other way around the cycle.",
    slug: "upi-quantum-information-1-qudit-generalized-weyl-gates",
    status: "EST" as const,
  },
  {
    group: "U(1)",
    usedFor: "Electromagnetic phase. Photon energy E = hf sets the winding rate.",
    slug: "upi-quantum-mechanics-1-quanta-planck-einstein-relation",
    status: "EST" as const,
  },
  {
    group: "Lorentz / Poincaré",
    usedFor: "Inertial frames. Interval Ω = c²t² − x² is the invariant. Mass is the rest-frame energy.",
    slug: "upi-relativity-1-spacetime-lorentz-interval",
    status: "EST" as const,
  },
  {
    group: "GL⁺ / invertibility",
    usedFor: "Planck map and Einstein map are inverse-able. Composition is m = hf/c².",
    slug: "upi-information-physics-1-inertia-frequency-mass-equivalent",
    status: "DER" as const,
  },
  {
    group: "Weyl(E₈)",
    usedFor: "Reflections generate the E₈ root system. 240 roots. Math EST; extra-dimensional physics SYM.",
    slug: "upi-coding-theory-1-root-system-e8-lattice",
    status: "EST" as const,
  },
  {
    group: "M₂₄",
    usedFor: "Mathieu group: automorphisms of the Golay code. Encode, then decode, is the inverse.",
    slug: "upi-coding-theory-1-binary-code-extended-golay",
    status: "EST" as const,
  },
  {
    group: "Co₀",
    usedFor: "Conway: automorphisms of the Leech lattice Λ₂₄.",
    slug: "upi-coding-theory-1-sphere-packing-leech-lattice",
    status: "EST" as const,
  },
  {
    group: "PSL(2,ℝ)",
    usedFor: "Isometries of AdS₃. The holographic dictionary is a duality, not this group itself.",
    slug: "upi-theories-1-holography-ads-cft",
    status: "HYP" as const,
  },
] as const;
