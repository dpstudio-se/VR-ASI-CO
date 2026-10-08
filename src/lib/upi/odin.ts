import type { Status } from "./types";
import { OMEGA1766_PERSONA_BRIDGE } from "./omega1766-persona.ts";
import { decodeGolay, encodeGolay } from "./golay";
import { ELECTRON_KG, einsteinRoundTrip } from "./einstein";
import {
  lorentzRoundTrip,
  planckEinsteinRoundTrip,
  u1RoundTrip,
  znRoundTrip,
} from "./group";
import { jacobiResidual, so11RoundTrip, so3RoundTrip } from "./lie";
import { G_NEWTON, PLANCK_H, PLANCK_LENGTH, SPEED_OF_LIGHT, BOLTZMANN_K } from "./physics";

export type OdinLayer = "micro" | "meso" | "macro";
export type OdinKeep = "keep" | "drop";

export type OdinNode = {
  id: string;
  layer: OdinLayer;
  keep: OdinKeep;
  title: string;
  status: Status;
  meaning: string;
  href?: "/lab" | "/lattice" | "/dna" | "/symmetry";
};

export const ODIN_NODES: OdinNode[] = [
  {
    id: "omega1766-persona-learning",
    layer: "meso",
    keep: "keep",
    title: "Ω1766 / Persona DNA learning",
    status: OMEGA1766_PERSONA_BRIDGE.status,
    meaning: "Persona adaptation proposal engine: observe, model, test bounds, return RNA delta. Angelica/Emilia identity remains owner-gated. No physical 27D claim.",
    href: "/dna",
  },
  {
    id: "planck-einstein",
    layer: "micro",
    keep: "keep",
    title: "Planck ↔ Einstein",
    status: "DER",
    meaning: "f → hf → hf/c² → mc² → E/h. Invertible maps. Software test.",
    href: "/lab",
  },
  {
    id: "mass-shell",
    layer: "micro",
    keep: "keep",
    title: "Einstein map",
    status: "EST",
    meaning: "Rest intercept m = E₀/c². Boost slides the hyperbola. Photon STOP.",
    href: "/lab",
  },
  {
    id: "lorentz",
    layer: "micro",
    keep: "keep",
    title: "Lorentz inverse",
    status: "EST",
    meaning: "Λ(φ) then Λ(−φ) is identity. so(1,1) generates the boosts.",
    href: "/symmetry",
  },
  {
    id: "golay",
    layer: "micro",
    keep: "keep",
    title: "Golay encode/decode",
    status: "EST",
    meaning: "G₂₄: encode then decode recovers the word. Perfect code is G₂₃.",
    href: "/lattice",
  },
  {
    id: "chain",
    layer: "meso",
    keep: "keep",
    title: "Chain compose",
    status: "HYP",
    meaning: "Walk link by link. Shorten only composable maps. Weakest status wins.",
    href: "/lab",
  },
  {
    id: "open-loop",
    layer: "meso",
    keep: "keep",
    title: "Open the loop",
    status: "STOP",
    meaning: "11d does not invert back to frequency. Opening is the honest drawing.",
    href: "/lab",
  },
  {
    id: "dna",
    layer: "macro",
    keep: "keep",
    title: "GitHub DNA",
    status: "EST",
    meaning: "Main is canonical memory. UI is RNA. A PR is not DNA until merge.",
    href: "/dna",
  },
  {
    id: "rl-alloc",
    layer: "micro",
    keep: "drop",
    title: "RL memory allocator",
    status: "SYM",
    meaning: "Odin Omega claims a host OS with reinforcement learning. This index has no host to reconfigure.",
  },
  {
    id: "dnn-cache",
    layer: "micro",
    keep: "drop",
    title: "DNN predictive cache",
    status: "SYM",
    meaning: "Transformers predicting L1/L2/L3 fills are not a physics result. Constants here are CODATA, not inferred.",
  },
  {
    id: "pid-mcts",
    layer: "meso",
    keep: "drop",
    title: "PID / MCTS / PPO",
    status: "SYM",
    meaning: "Control-theory names without a plant. Dropped. The meso loop here is typed composition, not Monte Carlo search.",
  },
  {
    id: "indaleko",
    layer: "macro",
    keep: "drop",
    title: "Indaleko / ArangoDB",
    status: "STOP",
    meaning: "A different UPI: personal file memory. Mapped as a cited 160TB corpus on Lab, not as infrastructure. Do not fork the name.",
    href: "/lab",
  },
  {
    id: "hft",
    layer: "macro",
    keep: "drop",
    title: "HFT / climate OS",
    status: "SYM",
    meaning: "Application fiction in the document. Out of domain for a physics index.",
  },
];

export const ODIN_LAYERS: { id: OdinLayer; title: string; kicker: string }[] = [
  { id: "micro", title: "Micro", kicker: "software_test" },
  { id: "meso", title: "Meso", kicker: "compose / STOP" },
  { id: "macro", title: "Macro", kicker: "DNA / RNA" },
];

export type MirrorResult = {
  id: string;
  title: string;
  closed: boolean;
  residual: number;
  status: Status;
};

export function runMirrors(): MirrorResult[] {
  const pe = planckEinsteinRoundTrip(8);
  const lor = lorentzRoundTrip({ t: 1, x: 0 }, 0.7);
  const ein = einsteinRoundTrip(ELECTRON_KG, 0.7);
  const z8 = znRoundTrip(8, 3);
  const u1 = u1RoundTrip(1.2);
  const so11 = so11RoundTrip(0.7);
  const so3 = so3RoundTrip([0, 0, 1], 0.8);
  const jac = jacobiResidual([1, 0, 0], [0, 1, 0], [0, 0, 1]);
  const info = 0xabc;
  const cw = encodeGolay(info);
  const dec = decodeGolay(cw);
  return [
    { id: "planck-einstein", title: "Planck ↔ Einstein", closed: pe.closed, residual: pe.residual, status: "DER" },
    { id: "lorentz", title: "Lorentz Λ(φ)Λ(−φ)", closed: lor.closed, residual: lor.residual, status: "EST" },
    { id: "mass-shell", title: "Einstein invariant m", closed: ein.closed, residual: ein.residual, status: "EST" },
    { id: "z8", title: "Z₈ inverse", closed: z8.closed, residual: z8.residual, status: "EST" },
    { id: "u1", title: "U(1) conjugate", closed: u1.closed, residual: u1.residual, status: "EST" },
    { id: "so11", title: "exp so(1,1)", closed: so11.closed, residual: so11.residual, status: "EST" },
    { id: "so3", title: "SO(3) Rodrigues", closed: so3.closed, residual: so3.residual, status: "EST" },
    { id: "jacobi", title: "so(3) Jacobi", closed: jac < 1e-12, residual: jac, status: "EST" },
    { id: "golay", title: "Golay encode/decode", closed: dec.distance === 0 && dec.codeword === cw, residual: dec.distance, status: "EST" },
  ];
}

export const CONSTANT_CACHE = [
  { name: "h", value: PLANCK_H, unit: "J s", source: "SI exact", status: "EST" as const },
  { name: "c", value: SPEED_OF_LIGHT, unit: "m/s", source: "SI exact", status: "EST" as const },
  { name: "G", value: G_NEWTON, unit: "m³ kg⁻¹ s⁻²", source: "CODATA recommended", status: "EST" as const },
  { name: "ℓ_P", value: PLANCK_LENGTH, unit: "m", source: "CODATA recommended", status: "EST" as const },
  { name: "k", value: BOLTZMANN_K, unit: "J/K", source: "SI exact", status: "EST" as const },
];
