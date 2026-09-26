/** AdS3 / Poincaré disk utilities. Software geometry, not a proof of Maldacena. */

export const ADS = {
  /** AdS radius in pedagogical units. */
  L: 1,
  /** 4 G_N = 1 so Ryu–Takayanagi entropy equals hyperbolic length. */
  fourG: 1,
  /** Radial cutoff of the geodesic endpoints. */
  rho: 0.92,
} as const;

/** Brown–Henneaux central charge c = 3L / (2 G_N), with 4G_N = 1 ⇒ G_N = 1/4. */
export function brownHenneauxC(L = ADS.L, fourG = ADS.fourG) {
  const G = fourG / 4;
  return (3 * L) / (2 * G);
}

export type Pt = { x: number; y: number };

export function mag2(p: Pt) {
  return p.x * p.x + p.y * p.y;
}

export function mag(p: Pt) {
  return Math.hypot(p.x, p.y);
}

export function cis(theta: number, r = 1): Pt {
  return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
}

export function wrapPi(theta: number) {
  let t = theta;
  while (t <= -Math.PI) t += 2 * Math.PI;
  while (t > Math.PI) t -= 2 * Math.PI;
  return t;
}

export function angDiff(a: number, b: number) {
  return wrapPi(a - b);
}

/** Poincaré disk hyperbolic distance (curvature −1). */
export function poincareDistance(z: Pt, w: Pt) {
  const num = (z.x - w.x) ** 2 + (z.y - w.y) ** 2;
  const den = (1 - mag2(z)) * (1 - mag2(w));
  if (den <= 0) return Number.POSITIVE_INFINITY;
  const arg = 1 + (2 * num) / den;
  return Math.acosh(Math.max(1, arg));
}

export type Geodesic = {
  kind: "diameter" | "arc";
  z1: Pt;
  z2: Pt;
  center?: Pt;
  radius?: number;
  length: number;
};

/** Geodesic through two cutoff-surface points at angles a, b. */
export function geodesicOnCutoff(a: number, b: number, rho = ADS.rho): Geodesic {
  const z1 = cis(a, rho);
  const z2 = cis(b, rho);
  const length = poincareDistance(z1, z2);
  const sx = z1.x + z2.x;
  const sy = z1.y + z2.y;
  const s = Math.hypot(sx, sy);
  if (s < 1e-8) {
    return { kind: "diameter", z1, z2, length };
  }
  const lambda = (rho * rho + 1) / s;
  if (lambda < 1 + 1e-6) {
    return { kind: "diameter", z1, z2, length };
  }
  const center = { x: (lambda * sx) / s, y: (lambda * sy) / s };
  const radius = Math.sqrt(Math.max(0, lambda * lambda - 1));
  return { kind: "arc", z1, z2, center, radius, length };
}

/** Sample an interior geodesic arc for drawing (points in the disk). */
export function sampleGeodesic(g: Geodesic, steps = 64): Pt[] {
  if (g.kind === "diameter" || !g.center || g.radius == null) {
    const pts: Pt[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      pts.push({
        x: g.z1.x * (1 - t) + g.z2.x * t,
        y: g.z1.y * (1 - t) + g.z2.y * t,
      });
    }
    return pts;
  }
  const c = g.center;
  const r = g.radius;
  let a1 = Math.atan2(g.z1.y - c.y, g.z1.x - c.x);
  let a2 = Math.atan2(g.z2.y - c.y, g.z2.x - c.x);
  let delta = wrapPi(a2 - a1);
  const mid = {
    x: c.x + r * Math.cos(a1 + delta / 2),
    y: c.y + r * Math.sin(a1 + delta / 2),
  };
  if (mag2(mid) > 1) delta -= Math.sign(delta) * 2 * Math.PI;
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ang = a1 + delta * t;
    pts.push({ x: c.x + r * Math.cos(ang), y: c.y + r * Math.sin(ang) });
  }
  return pts;
}

export function ryuTakayanagi(length: number, fourG = ADS.fourG) {
  return length / fourG;
}

/**
 * CFT2 interval entropy on a circle, UV-cutoff matched to radial ρ as ε ≈ 1 − ρ.
 * Pedagogical: S = (c/3) ln((2/ε) sin(φ/2)).
 */
export function cftIntervalEntropy(phi: number, rho = ADS.rho) {
  const c = brownHenneauxC();
  const eps = Math.max(1e-9, 1 - rho);
  const s = Math.max(1e-9, Math.sin(Math.abs(phi) / 2));
  return (c / 3) * Math.log((2 / eps) * s);
}

export function clampOpening(phi: number) {
  return Math.min(2.9, Math.max(0.28, phi));
}
