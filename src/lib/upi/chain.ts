import type { Status } from "./types";
import {
  PLANCK_LENGTH,
  bekensteinHawkingSOverK,
  energyFromFrequency,
  formatScientific,
  massEquivalent,
  schwarzschildRadius,
} from "./physics";
import { planckEinsteinRoundTrip } from "./group";

export type ChainBead = {
  id: string;
  title: string;
  kicker: string;
  status: Status;
  slug: string;
  symbol: string;
};

export type ChainLink = {
  id: string;
  from: string;
  to: string;
  relation: string;
  status: Status;
  formula: string;
  meaning: string;
  composable: boolean;
  generator?: { label: string; href: "/symmetry"; search: { layer: "group"; g: "lorentz" } };
};

export const CHAIN_BEADS: ChainBead[] = [
  {
    id: "f",
    title: "Frequency quantum",
    kicker: "Planck",
    status: "EST",
    slug: "upi-quantum-mechanics-1-quanta-planck-einstein-relation",
    symbol: "f",
  },
  {
    id: "E",
    title: "Energy",
    kicker: "E = hf",
    status: "EST",
    slug: "upi-quantum-mechanics-1-quanta-planck-einstein-relation",
    symbol: "E",
  },
  {
    id: "m",
    title: "Inertial equivalent",
    kicker: "Einstein / Lorentz",
    status: "EST",
    slug: "upi-relativity-1-t-energy-n-mass-energy",
    symbol: "m",
  },
  {
    id: "mI",
    title: "Information mass",
    kicker: "T€@X™ 2026",
    status: "HYP",
    slug: "upi-information-physics-1-inertia-information-mass",
    symbol: "m_I",
  },
  {
    id: "S",
    title: "Horizon entropy",
    kicker: "Bekenstein–Hawking",
    status: "EST",
    slug: "upi-gravity-1-horizon-bekenstein-hawking-entropy",
    symbol: "S",
  },
  {
    id: "B",
    title: "11D M-brane",
    kicker: "substrate",
    status: "SYM",
    slug: "upi-theories-1-m-theory-eleven-d-brane",
    symbol: "11d",
  },
];

export const CHAIN_LINKS: ChainLink[] = [
  {
    id: "planck",
    from: "f",
    to: "E",
    relation: "DERIVED_FROM",
    status: "EST",
    formula: "E = h f",
    meaning: "Planck–Einstein: a frequency quantum carries energy hf. Inverse is f = E/h.",
    composable: true,
  },
  {
    id: "einstein",
    from: "E",
    to: "m",
    relation: "DERIVED_FROM",
    status: "EST",
    formula: "m = E / c²",
    meaning:
      "Inertia of energy. Lorentz rest-energy is the same map. so(1,1) generates the boosts; this is the rest-frame reading.",
    composable: true,
    generator: { label: "Lorentz so(1,1)", href: "/symmetry", search: { layer: "group", g: "lorentz" } },
  },
  {
    id: "name",
    from: "m",
    to: "mI",
    relation: "CANDIDATE_BRIDGE",
    status: "HYP",
    formula: "m_I := m",
    meaning:
      "T€@X™ (2026) names that kilogram information mass. Same number as the DER equivalent. A name is not a second law.",
    composable: true,
  },
  {
    id: "horizon",
    from: "mI",
    to: "S",
    relation: "MEASURED_BY",
    status: "EST",
    formula: "S/k = A / 4ℓ_P²",
    meaning:
      "Bekenstein–Hawking from the Schwarzschild radius of m. EST as a formula. STOPS when R_s < ℓ_P.",
    composable: true,
  },
  {
    id: "brane",
    from: "S",
    to: "B",
    relation: "DUAL_TO",
    status: "SYM",
    formula: "S ↔ 11d brane",
    meaning:
      "Proposed substrate. Symbolic. Entropy as a number does not put the sky in eleven dimensions.",
    composable: false,
  },
  {
    id: "close",
    from: "B",
    to: "f",
    relation: "STOPS_AT",
    status: "STOP",
    formula: "11d ↛ f",
    meaning:
      "The return is not an inverse. There is no map from an 11d brane back to a frequency that recovers f. Opening the loop is the honest drawing.",
    composable: false,
  },
];

const RANK: Record<Status, number> = {
  EST: 0,
  DER: 1,
  HYP: 2,
  SYM: 3,
  STOP: 4,
  ERR: 5,
};

export function weakest(statuses: Status[]): Status {
  return statuses.reduce((a, b) => (RANK[b] > RANK[a] ? b : a));
}

export type Merge = { ids: string[] };

export function defaultMerges(): Merge[] {
  return CHAIN_LINKS.map((l) => ({ ids: [l.id] }));
}

export function canShorten(merges: Merge[], index: number) {
  const here = merges[index];
  const next = merges[index + 1];
  if (!here || !next) return false;
  const links = [...here.ids, ...next.ids].map((id) => CHAIN_LINKS.find((l) => l.id === id)!);
  return links.every((l) => l.composable);
}

export function shortenAt(merges: Merge[], index: number): Merge[] {
  if (!canShorten(merges, index)) return merges;
  const next = merges[index + 1]!;
  return merges
    .map((m, i) => (i === index ? { ids: [...m.ids, ...next.ids] } : m))
    .filter((_, i) => i !== index + 1);
}

export function expandAt(merges: Merge[], index: number): Merge[] {
  const m = merges[index];
  if (!m || m.ids.length < 2) return merges;
  const [first, ...rest] = m.ids;
  const out = [...merges];
  out.splice(index, 1, { ids: [first!] }, { ids: rest });
  return out;
}

export function mergeView(merge: Merge) {
  const links = merge.ids.map((id) => CHAIN_LINKS.find((l) => l.id === id)!);
  const first = links[0]!;
  const last = links[links.length - 1]!;
  const ids = merge.ids;
  const named = ids.includes("planck") && ids.includes("einstein");
  const status: Status = named && !ids.some((id) => id !== "planck" && id !== "einstein")
    ? "DER"
    : weakest(links.map((l) => l.status));
  const formula =
    named && ids.length === 2
      ? "m = h f / c²"
      : links.map((l) => l.formula).join(" then ");
  return {
    id: ids.join("+"),
    ids,
    from: first.from,
    to: last.to,
    status,
    formula,
    relation: named && ids.length === 2 ? "DERIVED_FROM" : links[links.length - 1]!.relation,
    meaning: links.map((l) => l.meaning).join(" "),
    composable: links.every((l) => l.composable),
    generator: links.find((l) => l.generator)?.generator,
    links,
  };
}

export function walk(hz: number) {
  const valid = Number.isFinite(hz) && hz >= 0;
  const E = valid ? energyFromFrequency(hz) : Number.NaN;
  const m = valid ? massEquivalent(hz) : Number.NaN;
  const rs = valid ? schwarzschildRadius(m) : Number.NaN;
  const S = valid ? bekensteinHawkingSOverK(m) : Number.NaN;
  const trip = valid ? planckEinsteinRoundTrip(hz) : null;
  const inDomain = valid && rs >= PLANCK_LENGTH;
  return {
    valid,
    f: hz,
    E,
    m,
    rs,
    S,
    inDomain,
    trip,
    readout: {
      f: `${formatScientific(hz)} Hz`,
      E: `${formatScientific(E)} J`,
      m: `${formatScientific(m)} kg`,
      mI: `${formatScientific(m)} kg`,
      S: formatScientific(S, 3),
      B: "symbolic",
    },
  };
}

export function beadById(id: string) {
  return CHAIN_BEADS.find((b) => b.id === id);
}
