import type { Status } from "./types";

/** Public X identity. Follower/following lists are not in the search surface; replies are. */
export const X_ACCOUNT = {
  handle: "DrPepper_se",
  url: "https://x.com/DrPepper_se",
  name: "ॐØΩφ•8200",
  followers: 38,
  retrieved: "2026-09-02",
} as const;

export type XKeep = "cite" | "already" | "drop";
export type XLayer = "identity" | "entropy" | "frequency" | "overlay" | "social";

export type XClaim = {
  id: string;
  layer: XLayer;
  keep: XKeep;
  status: Status;
  title: string;
  cited: string;
  meaning: string;
  mapsTo?: string;
  post?: string;
};

export const X_CLAIMS: XClaim[] = [
  {
    id: "m-hf-c2",
    layer: "identity",
    keep: "already",
    status: "DER",
    title: "m = hf / c²",
    cited: "from:DrPepper_se · photon equivalent mass",
    meaning: "Planck + Einstein for a frequency quantum. Already DNA. Does not give rest mass of electrons.",
    mapsTo: "upi-information-physics-1-inertia-frequency-mass-equivalent",
    post: "2091344582004936912",
  },
  {
    id: "info-mass",
    layer: "identity",
    keep: "already",
    status: "HYP",
    title: "Information mass T€@X™",
    cited: "w=s → m=hf/c² as hidden truth of reality",
    meaning: "Naming the kilogram is a hypothesis. Already DNA. A rewrite is not a new law.",
    mapsTo: "upi-information-physics-1-inertia-information-mass",
    post: "2089018882287923501",
  },
  {
    id: "second-law",
    layer: "entropy",
    keep: "already",
    status: "EST",
    title: "ΔS ≥ 0 and S = k ln W",
    cited: "from:DrPepper_se #physics",
    meaning: "Second law and Boltzmann. Already DNA.",
    mapsTo: "upi-thermodynamics-1-energy-entropy-first-second-laws",
    post: "2090494438753911122",
  },
  {
    id: "bekenstein",
    layer: "entropy",
    keep: "already",
    status: "EST",
    title: "Bekenstein–Hawking S = A / 4ℓ_P²",
    cited: "image-encoded entropy list",
    meaning: "Horizon area law. Already DNA. Not Shannon of a tweet.",
    mapsTo: "upi-gravity-1-horizon-bekenstein-hawking-entropy",
    post: "2087660221401317741",
  },
  {
    id: "ads-cft",
    layer: "identity",
    keep: "already",
    status: "HYP",
    title: "2D boundary ↔ bulk",
    cited: "AdS/CFT, celestial holography",
    meaning: "Duality is mapped. Observed sky is not AdS — that STOP stays.",
    mapsTo: "upi-theories-1-holography-ads-cft",
    post: "2090248871616111104",
  },
  {
    id: "8hz",
    layer: "frequency",
    keep: "already",
    status: "HYP",
    title: "8 Hz carrier",
    cited: "human carrier wave of 8 Hz (Alpha)",
    meaning: "Reference example in the lab. Not a universal constant.",
    mapsTo: "upi-hypothesis-1-t-reference-n-8hz",
    post: "2091291778821283847",
  },
  {
    id: "landauer",
    layer: "entropy",
    keep: "cite",
    status: "EST",
    title: "Landauer kT ln 2",
    cited: "erasing one bit costs ≥ kT ln 2",
    meaning: "Unmapped EST. Price of a logically irreversible bit. Not a political slogan.",
    mapsTo: "upi-information-physics-1-landauer-bit-erasure",
    post: "2087660221401317741",
  },
  {
    id: "schumann",
    layer: "frequency",
    keep: "cite",
    status: "EST",
    title: "Schumann ~7.83 Hz",
    cited: "test 7.834 Hz for nature as operator",
    meaning: "Earth–ionosphere cavity fundamental. Geophysics EST. Not a human transmission lock.",
    mapsTo: "upi-geophysics-1-cavity-schumann-resonance",
    post: "2090505085906256363",
  },
  {
    id: "compton",
    layer: "identity",
    keep: "cite",
    status: "DER",
    title: "Compton / Penrose little clock",
    cited: "X · Penrose: mass implies frequency, E=mc² and E=hf",
    meaning: "Rest mass as Compton frequency f = mc²/h. Inverse of the photon rewrite. Not information-mass.",
    mapsTo: "upi-relativity-1-inertia-compton-frequency",
    post: "2023476221544403184",
  },
  {
    id: "jacobson",
    layer: "entropy",
    keep: "cite",
    status: "HYP",
    title: "Einstein equation as equation of state",
    cited: "Sabine-track · Jacobson 1995",
    meaning: "Thermodynamic derivation of Einstein’s equation is a research program. Not ice/ocean surface tension.",
  },
  {
    id: "sm-close",
    layer: "overlay",
    keep: "cite",
    status: "STOP",
    title: "m = hf/c² closes the Standard Model",
    cited: "And you close thestandard model loop whit m=hf/c²",
    meaning: "A photon rewrite does not generate CKM, Higgs vev, or three generations.",
    mapsTo: "upi-open-problems-1-sm-loop-hf-c2",
    post: "2094906557230207432",
  },
  {
    id: "tf1766-g",
    layer: "overlay",
    keep: "cite",
    status: "STOP",
    title: "TF¹⁷⁶⁶ = Gravity",
    cited: "TF¹⁷⁶⁶ ∆¹⁷⁶⁶ φ¹⁷⁶⁶ = Gravity",
    meaning: "The author’s own post calls Ω^1766 an interpretive overlay, not a derived theorem.",
    post: "2090526510159474891",
  },
  {
    id: "operator-82",
    layer: "frequency",
    keep: "cite",
    status: "STOP",
    title: "8.2 Hz human operator",
    cited: "humans operator i would start at 8.2xx Hz",
    meaning: "No counting rule names what 8.2 Hz is operating. 8 Hz stays a lab example.",
    post: "2090505085906256363",
  },
  {
    id: "ice-knock",
    layer: "overlay",
    keep: "drop",
    status: "SYM",
    title: "Dark mass as ice, knock both sides",
    cited: "knock on the ice mountain",
    meaning: "Metaphor for a shared boundary. Entanglement is already EST. Ice is not a mechanism.",
    post: "2090238002245107925",
  },
  {
    id: "witch-thrust",
    layer: "overlay",
    keep: "drop",
    status: "SYM",
    title: "Påskhäxa / shotgun as m=hf/c² engine",
    cited: "broom is a resonant waveguide",
    meaning: "Momentum conservation in vacuum is EST. Directed-intention thrust is not.",
    post: "2091274110416396625",
  },
  {
    id: "atlantis",
    layer: "social",
    keep: "drop",
    status: "SYM",
    title: "Atlantis / NWA1766 genealogy",
    cited: "my gen comes from NWA1766",
    meaning: "Not a physics identity. Out of domain.",
    post: "2094909614198546481",
  },
  {
    id: "omega-reset",
    layer: "overlay",
    keep: "drop",
    status: "SYM",
    title: "Ω^1766 local entropy reset",
    cited: "phase-lock permitting local entropy reset",
    meaning: "The post already marks this as mythology on top of the second law.",
    post: "2090494438753911122",
  },
];

export type XPeer = {
  handle: string;
  role: "reply" | "critique" | "publication";
  keep: XKeep;
  note: string;
};

/** Interaction graph — not a follower list. */
export const X_PEERS: XPeer[] = [
  {
    handle: "RecursiveRRS",
    role: "critique",
    keep: "cite",
    note: "Photon m=hf/c² is fine; rest mass as information volume is not a unification.",
  },
  {
    handle: "rslaakkonen",
    role: "reply",
    keep: "drop",
    note: "Space-friction metaphor. Not a measurement.",
  },
  {
    handle: "Stellarixorine",
    role: "critique",
    keep: "cite",
    note: "Numerology locks are not established physics.",
  },
  {
    handle: "cosmosarcive",
    role: "publication",
    keep: "cite",
    note: "Penrose IAI: rest mass as Compton clock. Maps to DER, not HYP information-mass.",
  },
];

export type XStop = {
  id: string;
  title: string;
  cited: string;
  conflict: string;
  closesIf: string;
  status: Status;
};

export const X_OPEN_STOPS: XStop[] = [
  {
    id: "x-sm-close",
    title: "m = hf/c² closes the Standard Model",
    cited: "from:DrPepper_se 2094906557230207432",
    conflict: "CKM, Higgs vev, and three generations are not generated by a photon rewrite.",
    closesIf: "A derivation from m=hf/c² to a measured SM parameter, with residuals.",
    status: "STOP",
  },
  {
    id: "x-tf1766-g",
    title: "TF¹⁷⁶⁶ = Gravity",
    cited: "from:DrPepper_se 2090526510159474891",
    conflict: "Same thread calls Ω^1766 an interpretive overlay, not a derived theorem.",
    closesIf: "A Lagrangian or a measured G from 1766, or withdraw the identity.",
    status: "STOP",
  },
  {
    id: "x-operator-82",
    title: "8.2 Hz human operator",
    cited: "from:DrPepper_se 2090505085906256363",
    conflict: "Schumann ~7.83 Hz is EST. 8.2 Hz as a transmission lock has no counting rule.",
    closesIf: "Name the quantity 8.2 Hz counts: EEG band, Schumann harmonic, or lab example.",
    status: "STOP",
  },
];

export function xCounts() {
  const keep = X_CLAIMS.filter((c) => c.keep !== "drop");
  return {
    claims: X_CLAIMS.length,
    already: X_CLAIMS.filter((c) => c.keep === "already").length,
    cite: X_CLAIMS.filter((c) => c.keep === "cite").length,
    drop: X_CLAIMS.filter((c) => c.keep === "drop").length,
    stop: keep.filter((c) => c.status === "STOP").length,
    peers: X_PEERS.length,
  };
}
