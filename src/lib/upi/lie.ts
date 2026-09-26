import { nearlyEqual, type RoundTrip } from "./group";

/** Software tests of Lie algebras. Infinitesimal groups, not a new force. */

export type LieMode = "u1" | "so11" | "so3" | "e8";

export const LIE_MODES: { id: LieMode; label: string; status: "EST" }[] = [
  { id: "u1", label: "u(1)", status: "EST" },
  { id: "so11", label: "so(1,1)", status: "EST" },
  { id: "so3", label: "so(3)", status: "EST" },
  { id: "e8", label: "e₈", status: "EST" },
];

export const LIE_COPY: Record<LieMode, { title: string; meaning: string; guard: string }> = {
  u1: {
    title: "u(1) — one generator",
    meaning:
      "The Lie algebra of U(1) is a line. Bracket vanishes. Exponential is e^{iθ}. Logarithm is the angle. Abelian: the group of the photon phase, linearized.",
    guard: "A vanishing bracket is EST for u(1). It does not make frequency a Lie algebra of mass.",
  },
  so11: {
    title: "so(1,1) — boost generator",
    meaning:
      "One generator K. exp(φK) is the Lorentz boost you already walked. Logarithm returns φ. The algebra is the tangent at rest; the group is finite rapidity.",
    guard: "so(1,1) is the 1+1 Lorentz algebra. A closed residual is a software test, not a new relativity.",
  },
  so3: {
    title: "so(3) ≅ su(2) — angular momentum",
    meaning:
      "Three generators. [Jx, Jy] = Jz and cyclic. The bracket is the cross product. Exponential is Rodrigues: a finite rotation. Jacobi is associativity at first order.",
    guard: "so(3) is EST as rotations of R³. su(2) is its double cover’s algebra. Neither is E8, neither is a ToE.",
  },
  e8: {
    title: "e₈ — exceptional, rank 8",
    meaning:
      "dim e₈ = 248 = 8 Cartan + 240 roots. The E8 lattice is the root lattice of this algebra. Dynkin and Cartan encode the simple-root brackets. Math EST. Extra-dimensional physics SYM.",
    guard: "The lattice in the index is EST as Euclidean geometry. Promoting e₈ to a gauge group of the sky is a different claim and stays SYM until evidence says otherwise.",
  },
};

export type Vec3 = [number, number, number];
export type Mat2 = [[number, number], [number, number]];
export type Mat3 = [[number, number, number], [number, number, number], [number, number, number]];

export function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

export function add3(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

export function scale3(a: Vec3, s: number): Vec3 {
  return [a[0] * s, a[1] * s, a[2] * s];
}

export function dot3(a: Vec3, b: Vec3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export function norm3(a: Vec3) {
  return Math.hypot(a[0], a[1], a[2]);
}

export function jacobiResidual(a: Vec3, b: Vec3, c: Vec3) {
  const s = add3(add3(cross(a, cross(b, c)), cross(b, cross(c, a))), cross(c, cross(a, b)));
  return norm3(s);
}

/** Boost generator K in (ct, x). K² = I. */
export const BOOST_K: Mat2 = [
  [0, 1],
  [1, 0],
];

export function boostExp(phi: number): Mat2 {
  const ch = Math.cosh(phi);
  const sh = Math.sinh(phi);
  return [
    [ch, sh],
    [sh, ch],
  ];
}

export function boostLog(m: Mat2) {
  return Math.asinh(m[0][1]);
}

export function so11RoundTrip(phi: number): RoundTrip {
  const g = boostExp(phi);
  const back = boostLog(g);
  const residual = Math.abs(back - phi);
  return {
    closed: nearlyEqual(back, phi, 1e-10),
    residual,
    forward: "exp(φK)",
    back: "log(Λ) = φ",
  };
}

export function hat(w: Vec3): Mat3 {
  return [
    [0, -w[2], w[1]],
    [w[2], 0, -w[0]],
    [-w[1], w[0], 0],
  ];
}

export function mul3(a: Mat3, b: Mat3): Mat3 {
  const out: Mat3 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      out[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j];
    }
  }
  return out;
}

function apply3(m: Mat3, v: Vec3): Vec3 {
  return [
    m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
    m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
    m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
  ];
}

/** Rodrigues: exp(θ n̂·L) in SO(3). */
export function so3Exp(axis: Vec3, theta: number): Mat3 {
  const n0 = norm3(axis);
  if (n0 < 1e-15 || Math.abs(theta) < 1e-15) {
    return [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
  }
  const n = scale3(axis, 1 / n0);
  const k = hat(n);
  const k2 = mul3(k, k);
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const I: Mat3 = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  const out: Mat3 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      out[i][j] = I[i][j] + s * k[i][j] + (1 - c) * k2[i][j];
    }
  }
  return out;
}

export function so3Log(m: Mat3): { axis: Vec3; theta: number } {
  const tr = m[0][0] + m[1][1] + m[2][2];
  const cos = Math.min(1, Math.max(-1, (tr - 1) / 2));
  const theta = Math.acos(cos);
  if (theta < 1e-12) return { axis: [1, 0, 0], theta: 0 };
  const s = 2 * Math.sin(theta);
  const axis: Vec3 = [(m[2][1] - m[1][2]) / s, (m[0][2] - m[2][0]) / s, (m[1][0] - m[0][1]) / s];
  const n = norm3(axis);
  return { axis: n > 0 ? scale3(axis, 1 / n) : [1, 0, 0], theta };
}

export function so3RoundTrip(axis: Vec3, theta: number): RoundTrip {
  const R = so3Exp(axis, theta);
  const back = so3Log(R);
  const n = norm3(axis) || 1;
  const a = scale3(axis, 1 / n);
  const recovered = scale3(back.axis, back.theta);
  const original = scale3(a, theta);
  const residual = norm3(add3(recovered, scale3(original, -1)));
  return {
    closed: residual < 1e-8,
    residual,
    forward: "exp(θ n̂)",
    back: "log(R)",
  };
}

export function rotateVec(axis: Vec3, theta: number, v: Vec3) {
  return apply3(so3Exp(axis, theta), v);
}

export function u1RoundTripLie(theta: number): RoundTrip {
  const zRe = Math.cos(theta);
  const zIm = Math.sin(theta);
  const back = Math.atan2(zIm, zRe);
  let d = back - theta;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return {
    closed: Math.abs(d) < 1e-12,
    residual: Math.abs(d),
    forward: "exp(iθ)",
    back: "arg(z)",
  };
}

/** E8 Cartan matrix. Linear Dynkin with branch at α5 (0-indexed 4). */
export const E8_CARTAN: number[][] = [
  [2, -1, 0, 0, 0, 0, 0, 0],
  [-1, 2, -1, 0, 0, 0, 0, 0],
  [0, -1, 2, -1, 0, 0, 0, 0],
  [0, 0, -1, 2, -1, 0, 0, 0],
  [0, 0, 0, -1, 2, -1, 0, -1],
  [0, 0, 0, 0, -1, 2, -1, 0],
  [0, 0, 0, 0, 0, -1, 2, 0],
  [0, 0, 0, 0, -1, 0, 0, 2],
];

export const E8_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [4, 7],
];

export const E8_DIM = 248;
export const E8_RANK = 8;
export const E8_ROOTS = 240;

export function e8DimensionCheck() {
  const ok = E8_RANK + E8_ROOTS === E8_DIM;
  return {
    closed: ok,
    residual: Math.abs(E8_RANK + E8_ROOTS - E8_DIM),
    forward: "rank + |Φ|",
    back: "248",
  };
}

export const LIE_APPLICATIONS = [
  {
    algebra: "u(1)",
    usedFor: "Generator of phase. E = hf is how fast that generator winds, not a second algebra.",
    slug: "upi-quantum-mechanics-1-quanta-planck-einstein-relation",
    status: "EST" as const,
  },
  {
    algebra: "so(1,1) ⊂ so(1,3)",
    usedFor: "Boosts. Finite element is the Lorentz group. Interval Ω is the invariant.",
    slug: "upi-relativity-1-spacetime-lorentz-interval",
    status: "EST" as const,
  },
  {
    algebra: "so(3) ≅ su(2)",
    usedFor: "Rotations and spin. Bracket is angular-momentum algebra. Double cover is EST.",
    slug: "upi-classical-mechanics-1-symmetry-linear-momentum-conservation",
    status: "EST" as const,
  },
  {
    algebra: "e₈",
    usedFor: "Exceptional simple algebra. The 240-root lattice in this index is its root lattice.",
    slug: "upi-coding-theory-1-root-system-e8-lattice",
    status: "EST" as const,
  },
  {
    algebra: "conformal 𝔰𝔬(2,d)",
    usedFor: "Isometries of AdS / conformal symmetries of the boundary theory.",
    slug: "upi-quantum-field-1-symmetry-conformal-field-theory",
    status: "EST" as const,
  },
  {
    algebra: "exp: 𝔤 → G",
    usedFor: "The algebra–group mirror. Planck–Einstein invertibility is GL, not a spacetime algebra.",
    slug: "upi-information-physics-1-inertia-frequency-mass-equivalent",
    status: "DER" as const,
  },
] as const;
