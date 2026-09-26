import type { Status, UpiBridge, UpiNode } from "./types";
import { getLiveCatalog } from "./live";

export type Relation = "DERIVED_FROM" | "MEASURED_BY" | "DUAL_TO" | "STOPS_AT";

export const RELATIONS: Relation[] = ["DERIVED_FROM", "MEASURED_BY", "DUAL_TO", "STOPS_AT"];

export const RELATION_COPY: Record<
  Relation,
  { label: string; meaning: string; dash: string }
> = {
  DERIVED_FROM: {
    label: "Derived from",
    meaning: "Follows from the target record under named assumptions.",
    dash: "0",
  },
  MEASURED_BY: {
    label: "Measured by",
    meaning: "Observable or measurement rule for the source.",
    dash: "0",
  },
  DUAL_TO: {
    label: "Dual to",
    meaning: "Fourier or algebraic dual of the target.",
    dash: "6 5",
  },
  STOPS_AT: {
    label: "Stops at",
    meaning: "Hits a named computational or evidence boundary.",
    dash: "2 4",
  },
};

export const RELATION_COLOR: Record<Relation, string> = {
  DERIVED_FROM: "var(--color-der)",
  MEASURED_BY: "var(--color-est)",
  DUAL_TO: "var(--color-hyp)",
  STOPS_AT: "var(--color-stop)",
};

export const STATUS_COLOR: Record<Status, string> = {
  EST: "var(--color-est)",
  DER: "var(--color-der)",
  HYP: "var(--color-hyp)",
  STOP: "var(--color-stop)",
  ERR: "var(--color-err)",
  SYM: "var(--color-sym)",
};

export const GRAPH_WIDTH = 1000;
export const GRAPH_HEIGHT = 760;

/** Editorial seed for the single bridged component in this snapshot. */
const CLUSTER_SEED: Record<string, { x: number; y: number }> = {
  "UPI<quantum_information,1,finite_dimensional,hilbert_state_space>": { x: 0, y: -24 },
  "UPI<quantum_information,1,measurement,born_probability_rule>": { x: 10, y: -168 },
  "UPI<quantum_information,1,multi_qudit,tensor_product_register>": { x: -168, y: 42 },
  "UPI<quantum_information,1,qudit,generalized_weyl_gates>": { x: 18, y: 132 },
  "UPI<quantum_information,1,qudit,fourier_dual_basis>": { x: 168, y: 34 },
  "UPI<information_physics,3,qudit_torus,digital_multi_state_search>": { x: 0, y: 248 },
  "UPI<quantum_algorithms,1,amplitude_amplification,phase_oracle_diffusion>": { x: -200, y: 338 },
  "UPI<computational_physics,2,state_vector,classical_resource_boundary>": { x: 210, y: 324 },
  "UPI<coding_theory,1,root_system,e8_lattice>": { x: -360, y: -90 },
  "UPI<coding_theory,1,sphere_packing,leech_lattice>": { x: -220, y: 50 },
  "UPI<coding_theory,1,binary_code,extended_golay>": { x: -350, y: 140 },
  "UPI<quantum_information,1,error_correction,syndrome_measurement>": { x: -168, y: -40 },
  "UPI<information_physics,1,inertia,frequency_mass_equivalent>": { x: 280, y: -200 },
  "UPI<information_physics,1,inertia,information_mass>": { x: 420, y: -140 },
  "UPI<information_physics,1,measure,universal_information_measure>": { x: 520, y: -40 },
  "UPI<gravity,1,horizon,bekenstein_hawking_entropy>": { x: 640, y: -160 },
  "UPI<theories,1,m_theory,eleven_d_brane>": { x: 560, y: 80 },
  "UPI<theories,1,holography,ads_cft>": { x: 480, y: 180 },
  "UPI<theories,1,holography,ryu_takayanagi>": { x: 680, y: -40 },
  "UPI<gravity,1,spacetime,anti_de_sitter>": { x: 760, y: -180 },
  "UPI<quantum_field,1,symmetry,conformal_field_theory>": { x: 640, y: 200 },
  "UPI<theories,1,holography,not_our_sky>": { x: 800, y: 80 },
  "UPI<information_physics,1,measure,sub_planck_horizon>": { x: 700, y: 20 },
  "UPI<QUANTUM_MECHANICS,1,QUANTA,PLANCK_EINSTEIN_RELATION>": { x: 170, y: -280 },
  "UPI<RELATIVITY,1,T_ENERGY,N_MASS_ENERGY>": { x: 390, y: -270 },
  "UPI<physics,1,fundamental,planck_constant>": { x: 260, y: -360 },
};

const ISOLATE_DOMAIN_ORDER = [
  "established",
  "constants",
  "theories",
  "mechanics",
  "biology",
  "open-problems",
  "examples",
  "information_physics",
  "quantum_information",
  "coding_theory",
];

export type GraphPoint = {
  x: number;
  y: number;
  node: UpiNode;
  degree: number;
};

export type DomainAnchor = {
  domain: string;
  x: number;
  y: number;
};

export type GraphLayout = {
  width: number;
  height: number;
  cx: number;
  cy: number;
  points: GraphPoint[];
  byAddress: Map<string, GraphPoint>;
  domainAnchors: DomainAnchor[];
  bridgedCount: number;
  isolatedCount: number;
};

export function isRelation(value: string): value is Relation {
  return (RELATIONS as string[]).includes(value);
}

export function nodeRadius(degree: number) {
  return 7 + Math.min(degree, 5) * 2.35;
}

export function wrapTitle(title: string, max = 18, maxLines = 2): string[] {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > max && cur) {
      lines.push(cur);
      cur = word;
      if (lines.length >= maxLines - 1) {
        const rest = [cur, ...words.slice(i + 1)].join(" ");
        lines.push(rest.length > max ? `${rest.slice(0, max - 1)}…` : rest);
        return lines;
      }
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

export function shortTitle(title: string, max = 28) {
  if (title.length <= max) return title;
  const cut = title.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return `${(at > 12 ? cut.slice(0, at) : cut).trimEnd()}…`;
}

export function degreeMap(nodes: UpiNode[], bridges: UpiBridge[]) {
  const map = new Map<string, number>();
  for (const n of nodes) map.set(n.address, 0);
  for (const b of bridges) {
    if (map.has(b.source)) map.set(b.source, (map.get(b.source) ?? 0) + 1);
    if (map.has(b.target)) map.set(b.target, (map.get(b.target) ?? 0) + 1);
  }
  return map;
}

export function neighborAddresses(address: string, bridges: UpiBridge[] = getLiveCatalog().bridges) {
  const out = new Set<string>();
  for (const b of bridges) {
    if (b.source === address) out.add(b.target);
    if (b.target === address) out.add(b.source);
  }
  return out;
}

export function incidentBridges(address: string, bridges: UpiBridge[] = getLiveCatalog().bridges) {
  return bridges.filter((b) => b.source === address || b.target === address);
}

function fallbackSeed(index: number, total: number) {
  const angle = (Math.PI * 2 * index) / Math.max(total, 1) - Math.PI / 2;
  return { x: Math.cos(angle) * 110, y: Math.sin(angle) * 110 };
}

export function layoutGraph(
  nodes: UpiNode[] = getLiveCatalog().nodes,
  bridges: UpiBridge[] = getLiveCatalog().bridges,
  width = GRAPH_WIDTH,
  height = GRAPH_HEIGHT,
): GraphLayout {
  const cx = width / 2;
  const cy = height * 0.49;
  const degrees = degreeMap(nodes, bridges);
  const connected = nodes.filter((n) => (degrees.get(n.address) ?? 0) > 0);
  const isolated = nodes.filter((n) => (degrees.get(n.address) ?? 0) === 0);

  const byAddress = new Map<string, GraphPoint>();

  connected.forEach((node, i) => {
    const seed = CLUSTER_SEED[node.address] ?? fallbackSeed(i, connected.length);
    byAddress.set(node.address, {
      x: cx + seed.x,
      y: cy + seed.y,
      node,
      degree: degrees.get(node.address) ?? 0,
    });
  });

  const groups = new Map<string, UpiNode[]>();
  for (const node of isolated) {
    const list = groups.get(node.domain) ?? [];
    list.push(node);
    groups.set(node.domain, list);
  }
  for (const list of groups.values()) {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }

  const orderedDomains = [
    ...ISOLATE_DOMAIN_ORDER.filter((d) => groups.has(d)),
    ...[...groups.keys()].filter((d) => !ISOLATE_DOMAIN_ORDER.includes(d)).sort(),
  ];

  const total = isolated.length || 1;
  const gap = 0.14;
  const usable = Math.PI * 2 - gap * orderedDomains.length;
  let theta = -Math.PI / 2;
  const rx = width * 0.42;
  const ry = height * 0.4;
  const domainAnchors: DomainAnchor[] = [];

  for (const domain of orderedDomains) {
    const group = groups.get(domain) ?? [];
    const groupSpan = (group.length / total) * usable;
    const mids: { x: number; y: number }[] = [];
    group.forEach((node, i) => {
      const angle = theta + ((i + 0.5) / group.length) * groupSpan;
      const jitter = ((i % 3) - 1) * 10;
      const px = cx + Math.cos(angle) * (rx + jitter);
      const py = cy + Math.sin(angle) * (ry + jitter * 0.6);
      mids.push({ x: px, y: py });
      byAddress.set(node.address, {
        x: px,
        y: py,
        node,
        degree: 0,
      });
    });
    if (mids.length) {
      const mx = mids.reduce((s, p) => s + p.x, 0) / mids.length;
      const my = mids.reduce((s, p) => s + p.y, 0) / mids.length;
      const dx = mx - cx;
      const dy = my - cy;
      const len = Math.hypot(dx, dy) || 1;
      domainAnchors.push({
        domain,
        x: cx + (dx / len) * (len + 26),
        y: cy + (dy / len) * (len + 22),
      });
    }
    theta += groupSpan + gap;
  }

  return {
    width,
    height,
    cx,
    cy,
    points: [...byAddress.values()],
    byAddress,
    domainAnchors,
    bridgedCount: connected.length,
    isolatedCount: isolated.length,
  };
}

export function edgeTips(a: GraphPoint, b: GraphPoint) {
  const r1 = nodeRadius(a.degree);
  const r2 = nodeRadius(b.degree);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.hypot(dx, dy) || 1;
  const ux = dx / d;
  const uy = dy / d;
  return {
    x1: a.x + ux * (r1 + 1.5),
    y1: a.y + uy * (r1 + 1.5),
    x2: b.x - ux * (r2 + 9),
    y2: b.y - uy * (r2 + 9),
    mx: (a.x + b.x) / 2,
    my: (a.y + b.y) / 2,
    nx: -uy,
    ny: ux,
  };
}
