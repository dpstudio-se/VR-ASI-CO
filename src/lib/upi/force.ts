import type { UpiBridge } from "./types";
import { GRAPH_HEIGHT, GRAPH_WIDTH, nodeRadius, type GraphPoint } from "./graph";

export type ForceAlgo = "editorial" | "fruchterman" | "atlas" | "spring";

export const FORCE_ALGOS: ForceAlgo[] = ["editorial", "fruchterman", "atlas", "spring"];

export const FORCE_COPY: Record<
  ForceAlgo,
  { label: string; title: string; year: string; meaning: string }
> = {
  editorial: {
    label: "Editorial",
    title: "Editorial",
    year: "seed",
    meaning:
      "Hand-placed cluster and domain ring. A reading order, not a physical model.",
  },
  fruchterman: {
    label: "F–R",
    title: "Fruchterman–Reingold",
    year: "1991",
    meaning:
      "Edge springs attract, every pair of nodes repels, and a falling temperature caps how far a node may move each step. Unlinked records have no springs, so they migrate to the periphery as the system cools.",
  },
  atlas: {
    label: "Atlas2",
    title: "ForceAtlas2",
    year: "2014",
    meaning:
      "Gephi’s model: degree-weighted repulsion and lin-log attraction. Hubs claim space; chains stretch. Gravity stops the cloud from expanding without bound.",
  },
  spring: {
    label: "Spring",
    title: "Spring–Coulomb",
    year: "1984",
    meaning:
      "Eades / d3-force: 1/r² electrostatic repulsion, Hooke springs on bridges, hard-sphere collision, and a weak centering force. Closest to a particle system.",
  },
};

export type ForceParams = {
  repulsion: number;
  link: number;
  gravity: number;
};

export const DEFAULT_FORCE_PARAMS: ForceParams = {
  repulsion: 1,
  link: 1,
  gravity: 1,
};

export type SimNode = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
  mass: number;
  r: number;
  isolated: boolean;
};

export type SimState = {
  nodes: SimNode[];
  byId: Map<string, SimNode>;
  links: { source: string; target: string }[];
  alpha: number;
  temp: number;
  cx: number;
  cy: number;
  width: number;
  height: number;
};

const MIN_D = 0.35;

export function createSim(
  points: GraphPoint[],
  bridges: UpiBridge[],
  width = GRAPH_WIDTH,
  height = GRAPH_HEIGHT,
): SimState {
  const nodes: SimNode[] = points.map((p) => ({
    id: p.node.address,
    x: p.x,
    y: p.y,
    vx: 0,
    vy: 0,
    fx: null,
    fy: null,
    mass: 1 + p.degree,
    r: nodeRadius(p.degree),
    isolated: p.degree === 0,
  }));
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const links: SimState["links"] = [];
  for (const b of bridges) {
    if (byId.has(b.source) && byId.has(b.target)) {
      links.push({ source: b.source, target: b.target });
    }
  }
  return {
    nodes,
    byId,
    links,
    alpha: 1,
    temp: 42,
    cx: width / 2,
    cy: height * 0.49,
    width,
    height,
  };
}

export function reheat(state: SimState, amount = 1) {
  state.alpha = Math.min(1, Math.max(state.alpha, amount));
  state.temp = Math.max(state.temp, 12 + 24 * amount);
}

export function pinNode(state: SimState, id: string, x: number, y: number) {
  const n = state.byId.get(id);
  if (!n) return;
  n.fx = x;
  n.fy = y;
  n.x = x;
  n.y = y;
  n.vx = 0;
  n.vy = 0;
}

export function unpinNode(state: SimState, id: string) {
  const n = state.byId.get(id);
  if (!n) return;
  n.fx = null;
  n.fy = null;
}

function applyPinAndBounds(state: SimState) {
  const m = 40;
  for (const n of state.nodes) {
    if (n.fx != null && n.fy != null) {
      n.x = n.fx;
      n.y = n.fy;
      n.vx = 0;
      n.vy = 0;
      continue;
    }
    n.x = Math.min(state.width - m, Math.max(m, n.x));
    n.y = Math.min(state.height - m, Math.max(m, n.y));
  }
}

function collide(state: SimState, strength: number) {
  const nodes = state.nodes;
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || MIN_D;
      const min = a.r + b.r + 10;
      if (d >= min) continue;
      const push = ((min - d) / d) * 0.5 * strength;
      const ux = dx * push;
      const uy = dy * push;
      if (a.fx == null) {
        a.x -= ux;
        a.y -= uy;
      }
      if (b.fx == null) {
        b.x += ux;
        b.y += uy;
      }
    }
  }
}

export function kineticEnergy(state: SimState) {
  let e = 0;
  for (const n of state.nodes) e += 0.5 * n.mass * (n.vx * n.vx + n.vy * n.vy);
  return e;
}

/** Fruchterman & Reingold 1991 — displacement clamped by a cooling temperature. */
export function stepFruchterman(state: SimState, params: ForceParams) {
  const n = Math.max(state.nodes.length, 1);
  const k = (0.42 * Math.sqrt((state.width * state.height) / n)) / Math.max(params.link, 0.2);
  const kr = k * k * params.repulsion;
  const kg = 0.004 * params.gravity;

  const disp = new Map<string, { x: number; y: number }>();
  for (const node of state.nodes) disp.set(node.id, { x: 0, y: 0 });

  for (let i = 0; i < state.nodes.length; i++) {
    const a = state.nodes[i];
    for (let j = i + 1; j < state.nodes.length; j++) {
      const b = state.nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.hypot(dx, dy) || MIN_D;
      const f = kr / d;
      const ux = (dx / d) * f;
      const uy = (dy / d) * f;
      const da = disp.get(a.id)!;
      const db = disp.get(b.id)!;
      da.x += ux;
      da.y += uy;
      db.x -= ux;
      db.y -= uy;
    }
  }

  for (const link of state.links) {
    const a = state.byId.get(link.source);
    const b = state.byId.get(link.target);
    if (!a || !b) continue;
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const d = Math.hypot(dx, dy) || MIN_D;
    const f = (d * d) / k;
    const ux = (dx / d) * f;
    const uy = (dy / d) * f;
    const da = disp.get(a.id)!;
    const db = disp.get(b.id)!;
    da.x -= ux;
    da.y -= uy;
    db.x += ux;
    db.y += uy;
  }

  for (const node of state.nodes) {
    const da = disp.get(node.id)!;
    da.x += (state.cx - node.x) * kg * (node.isolated ? 0.18 : 1) * node.mass;
    da.y += (state.cy - node.y) * kg * (node.isolated ? 0.18 : 1) * node.mass;
    const len = Math.hypot(da.x, da.y) || MIN_D;
    const limited = Math.min(len, state.temp);
    if (node.fx == null) {
      node.x += (da.x / len) * limited;
      node.y += (da.y / len) * limited;
      node.vx = (da.x / len) * limited;
      node.vy = (da.y / len) * limited;
    }
  }

  collide(state, 0.85);
  applyPinAndBounds(state);
  state.temp *= 0.978;
  state.alpha = Math.min(1, state.temp / 42);
  return kineticEnergy(state);
}

/** ForceAtlas2 (Jacomy et al., 2014) — lin-log attraction, degree-weighted repulsion. */
export function stepAtlas(state: SimState, params: ForceParams) {
  const kr = 160 * params.repulsion;
  const ka = 2.1 * params.link;
  const kg = 0.01 * params.gravity;
  const damping = 0.82;

  const fx = new Map<string, { x: number; y: number }>();
  for (const node of state.nodes) fx.set(node.id, { x: 0, y: 0 });

  for (let i = 0; i < state.nodes.length; i++) {
    const a = state.nodes[i];
    for (let j = i + 1; j < state.nodes.length; j++) {
      const b = state.nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.hypot(dx, dy) || MIN_D;
      const f = (kr * a.mass * b.mass) / d;
      const ux = (dx / d) * f;
      const uy = (dy / d) * f;
      const fa = fx.get(a.id)!;
      const fb = fx.get(b.id)!;
      fa.x += ux;
      fa.y += uy;
      fb.x -= ux;
      fb.y -= uy;
    }
  }

  for (const link of state.links) {
    const a = state.byId.get(link.source);
    const b = state.byId.get(link.target);
    if (!a || !b) continue;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.hypot(dx, dy) || MIN_D;
    const f = ka * Math.log(1 + d);
    const ux = (dx / d) * f;
    const uy = (dy / d) * f;
    const fa = fx.get(a.id)!;
    const fb = fx.get(b.id)!;
    fa.x += ux;
    fa.y += uy;
    fb.x -= ux;
    fb.y -= uy;
  }

  for (const node of state.nodes) {
    const f = fx.get(node.id)!;
    f.x += (state.cx - node.x) * kg * (node.isolated ? 0.2 : 1) * node.mass;
    f.y += (state.cy - node.y) * kg * (node.isolated ? 0.2 : 1) * node.mass;
    if (node.fx != null) continue;
    node.vx = (node.vx + f.x / node.mass) * damping;
    node.vy = (node.vy + f.y / node.mass) * damping;
    node.x += node.vx;
    node.y += node.vy;
  }

  collide(state, 1);
  applyPinAndBounds(state);
  state.alpha *= 0.988;
  state.temp = 8 + 36 * state.alpha;
  return kineticEnergy(state);
}

/** Eades 1984 / d3-force — Coulomb charge, Hooke springs, collision, centering. */
export function stepSpring(state: SimState, params: ForceParams) {
  const charge = -2200 * params.repulsion;
  const rest = 88 * params.link;
  const stiffness = 0.065;
  const kg = 0.008 * params.gravity;
  const decay = 0.38;
  const alpha = state.alpha;

  const fx = new Map<string, { x: number; y: number }>();
  for (const node of state.nodes) fx.set(node.id, { x: 0, y: 0 });

  for (let i = 0; i < state.nodes.length; i++) {
    const a = state.nodes[i];
    for (let j = i + 1; j < state.nodes.length; j++) {
      const b = state.nodes[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d2 = dx * dx + dy * dy || MIN_D;
      const d = Math.sqrt(d2);
      const f = (charge * alpha) / d2;
      const ux = (dx / d) * f;
      const uy = (dy / d) * f;
      const fa = fx.get(a.id)!;
      const fb = fx.get(b.id)!;
      fa.x += ux;
      fa.y += uy;
      fb.x -= ux;
      fb.y -= uy;
    }
  }

  for (const link of state.links) {
    const a = state.byId.get(link.source);
    const b = state.byId.get(link.target);
    if (!a || !b) continue;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.hypot(dx, dy) || MIN_D;
    const f = (d - rest) * stiffness * alpha;
    const ux = (dx / d) * f;
    const uy = (dy / d) * f;
    const fa = fx.get(a.id)!;
    const fb = fx.get(b.id)!;
    fa.x += ux;
    fa.y += uy;
    fb.x -= ux;
    fb.y -= uy;
  }

  for (const node of state.nodes) {
    const f = fx.get(node.id)!;
    f.x += (state.cx - node.x) * kg * (node.isolated ? 0.2 : 1) * alpha;
    f.y += (state.cy - node.y) * kg * (node.isolated ? 0.2 : 1) * alpha;
    if (node.fx != null) continue;
    node.vx = (node.vx + f.x) * (1 - decay);
    node.vy = (node.vy + f.y) * (1 - decay);
    node.x += node.vx;
    node.y += node.vy;
  }

  collide(state, 1.1);
  applyPinAndBounds(state);
  state.alpha += (0 - state.alpha) * 0.0228;
  state.temp = 6 + 40 * state.alpha;
  return kineticEnergy(state);
}

export function stepForce(state: SimState, algo: ForceAlgo, params: ForceParams) {
  if (algo === "fruchterman") return stepFruchterman(state, params);
  if (algo === "atlas") return stepAtlas(state, params);
  if (algo === "spring") return stepSpring(state, params);
  return 0;
}

export function settle(state: SimState, algo: ForceAlgo, params: ForceParams, steps = 420) {
  reheat(state, 1);
  for (let i = 0; i < steps; i++) stepForce(state, algo, params);
}

export function livePoint(p: GraphPoint, state: SimState | null, algo: ForceAlgo): GraphPoint {
  if (!state || algo === "editorial") return p;
  const n = state.byId.get(p.node.address);
  if (!n) return p;
  return { ...p, x: n.x, y: n.y };
}
