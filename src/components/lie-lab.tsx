import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/status-badge";
import {
  E8_CARTAN,
  E8_DIM,
  E8_EDGES,
  E8_RANK,
  E8_ROOTS,
  LIE_APPLICATIONS,
  LIE_COPY,
  LIE_MODES,
  type LieMode,
  type Vec3,
  boostExp,
  boostLog,
  cross,
  e8DimensionCheck,
  jacobiResidual,
  rotateVec,
  so11RoundTrip,
  so3RoundTrip,
  u1RoundTripLie,
} from "@/lib/upi/lie";
import { cn } from "@/lib/utils";

function Closed({ ok }: { ok: boolean }) {
  return (
    <span className={cn("font-mono text-xs uppercase tracking-widest", ok ? "text-est" : "text-stop")}>
      {ok ? "loop closed" : "loop broken"}
    </span>
  );
}

function U1LiePanel({ theta, setTheta }: { theta: number; setTheta: (n: number) => void }) {
  const trip = u1RoundTripLie(theta);
  const R = 88;
  const t = theta - Math.PI / 2;
  const x = 120 + R * Math.cos(t);
  const y = 120 + R * Math.sin(t);
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <svg viewBox="0 0 240 240" className="mx-auto aspect-square w-full max-w-56" aria-hidden>
        <circle cx="120" cy="120" r={R} fill="none" stroke="var(--color-fg)" strokeOpacity={0.18} />
        <line x1="120" y1="120" x2={x} y2={y} stroke="var(--color-der)" />
        <circle cx={x} cy={y} r="6" fill="var(--color-der)" />
      </svg>
      <div>
        <label className="grid gap-2 text-sm font-medium">
          Generator coefficient θ
          <input
            className="upi-range w-full"
            type="range"
            min={-3.1416}
            max={3.1416}
            step={0.01}
            value={theta}
            onChange={(e) => setTheta(Number(e.target.value))}
          />
        </label>
        <dl className="mt-4 grid gap-2 font-mono text-xs text-muted">
          <div className="flex justify-between gap-3">
            <dt>exp(iθ)</dt>
            <dd className="tabular-nums text-fg">
              {Math.cos(theta).toFixed(4)} + i {Math.sin(theta).toFixed(4)}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>[X, X]</dt>
            <dd className="tabular-nums text-fg">0</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>log residual</dt>
            <dd className="tabular-nums text-fg">{trip.residual.toExponential(2)}</dd>
          </div>
        </dl>
        <p className="mt-4">
          <Closed ok={trip.closed} />
        </p>
      </div>
    </div>
  );
}

function So11Panel({ phi, setPhi }: { phi: number; setPhi: (n: number) => void }) {
  const g = boostExp(phi);
  const back = boostLog(g);
  const trip = so11RoundTrip(phi);
  return (
    <div>
      <label className="grid gap-2 text-sm font-medium">
        Rapidity φ (algebra coordinate)
        <input
          className="upi-range w-full"
          type="range"
          min={-1.2}
          max={1.2}
          step={0.01}
          value={phi}
          onChange={(e) => setPhi(Number(e.target.value))}
        />
      </label>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-subtle">K² = I · exp(φK)</p>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-56 text-center font-mono text-sm tabular-nums">
          <tbody>
            {g.map((row, i) => (
              <tr key={i}>
                {row.map((v, j) => (
                  <td key={j} className="border-t border-border py-2">
                    {v.toFixed(4)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dl className="mt-4 grid gap-2 font-mono text-xs text-muted">
        <div className="flex justify-between gap-3">
          <dt>log(Λ)</dt>
          <dd className="tabular-nums text-fg">{back.toFixed(6)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>|log − φ|</dt>
          <dd className="tabular-nums text-fg">{trip.residual.toExponential(2)}</dd>
        </div>
      </dl>
      <p className="mt-4">
        <Closed ok={trip.closed} />
      </p>
    </div>
  );
}

const AXIS_CHOICE: { id: string; axis: Vec3; label: string }[] = [
  { id: "x", axis: [1, 0, 0], label: "Jx" },
  { id: "y", axis: [0, 1, 0], label: "Jy" },
  { id: "z", axis: [0, 0, 1], label: "Jz" },
];

function So3Panel({
  axisId,
  theta,
  setAxisId,
  setTheta,
}: {
  axisId: string;
  theta: number;
  setAxisId: (id: string) => void;
  setTheta: (n: number) => void;
}) {
  const axis = AXIS_CHOICE.find((a) => a.id === axisId)?.axis ?? [0, 0, 1];
  const trip = so3RoundTrip(axis, theta);
  const v0: Vec3 = [1, 0.2, 0.1];
  const v1 = rotateVec(axis, theta, v0);
  const jx: Vec3 = [1, 0, 0];
  const jy: Vec3 = [0, 1, 0];
  const jz: Vec3 = [0, 0, 1];
  const bracket = cross(jx, jy);
  const jacobi = jacobiResidual(jx, jy, jz);
  const scale = 70;
  const to = (v: Vec3) => [120 + v[0] * scale, 120 - v[1] * scale] as const;
  const [x0, y0] = to(v0);
  const [x1, y1] = to(v1);
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <svg viewBox="0 0 240 240" className="mx-auto aspect-square w-full max-w-56" aria-hidden>
        <circle cx="120" cy="120" r="90" fill="none" stroke="var(--color-fg)" strokeOpacity={0.18} />
        <line x1="30" y1="120" x2="210" y2="120" stroke="var(--color-subtle)" />
        <line x1="120" y1="30" x2="120" y2="210" stroke="var(--color-subtle)" />
        <line x1="120" y1="120" x2={x0} y2={y0} stroke="var(--color-est)" />
        <line x1="120" y1="120" x2={x1} y2={y1} stroke="var(--color-der)" />
        <circle cx={x0} cy={y0} r="5" fill="var(--color-est)" />
        <circle cx={x1} cy={y1} r="6" fill="var(--color-der)" />
      </svg>
      <div>
        <div className="chip-row">
          {AXIS_CHOICE.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAxisId(a.id)}
              className={cn(
                "h-11 shrink-0 rounded-md px-3 text-sm",
                axisId === a.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
        <label className="mt-4 grid gap-2 text-sm font-medium">
          Angle θ
          <input
            className="upi-range w-full"
            type="range"
            min={0}
            max={3.1416}
            step={0.01}
            value={theta}
            onChange={(e) => setTheta(Number(e.target.value))}
          />
        </label>
        <dl className="mt-4 grid gap-2 font-mono text-xs text-muted">
          <div className="flex justify-between gap-3">
            <dt>[Jx, Jy]</dt>
            <dd className="tabular-nums text-fg">
              ({bracket.map((c) => c.toFixed(0)).join(", ")}) = Jz
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>Jacobi ‖∑[X,[Y,Z]]‖</dt>
            <dd className="tabular-nums text-fg">{jacobi.toExponential(2)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>log residual</dt>
            <dd className="tabular-nums text-fg">{trip.residual.toExponential(2)}</dd>
          </div>
        </dl>
        <p className="mt-4">
          <Closed ok={trip.closed && jacobi < 1e-12} />
        </p>
      </div>
    </div>
  );
}

const DYNKIN_POS: [number, number][] = [
  [18, 70],
  [48, 70],
  [78, 70],
  [108, 70],
  [138, 70],
  [168, 70],
  [198, 70],
  [138, 118],
];

function E8Panel({ root, setRoot }: { root: number; setRoot: (n: number) => void }) {
  const dim = e8DimensionCheck();
  const row = E8_CARTAN[root] ?? [];
  return (
    <div>
      <svg viewBox="0 0 220 150" className="mx-auto w-full max-w-md" aria-hidden>
        {E8_EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={DYNKIN_POS[a]![0]}
            y1={DYNKIN_POS[a]![1]}
            x2={DYNKIN_POS[b]![0]}
            y2={DYNKIN_POS[b]![1]}
            stroke="var(--color-fg)"
            strokeOpacity={0.35}
          />
        ))}
        {DYNKIN_POS.map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r="11"
              className="cursor-pointer"
              fill={i === root ? "var(--color-der)" : "var(--color-surface-2)"}
              stroke="var(--color-fg)"
              strokeOpacity={0.35}
              onClick={() => setRoot(i)}
            />
          </g>
        ))}
      </svg>
      <div className="chip-row mt-3">
        {DYNKIN_POS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setRoot(i)}
            className={cn(
              "h-11 shrink-0 rounded-md px-3 font-mono text-sm",
              root === i ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
            )}
          >
            α{i + 1}
          </button>
        ))}
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-subtle">
        Cartan row 〈α{root + 1}, α∨〉
      </p>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full text-center font-mono text-xs tabular-nums">
          <tbody>
            <tr>
              {row.map((v, j) => (
                <td key={j} className="border-t border-border py-2">
                  {v}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <dl className="mt-4 grid gap-2 font-mono text-xs text-muted">
        <div className="flex justify-between gap-3">
          <dt>rank</dt>
          <dd className="tabular-nums text-fg">{E8_RANK}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>roots |Φ|</dt>
          <dd className="tabular-nums text-fg">{E8_ROOTS}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>dim = rank + |Φ|</dt>
          <dd className="tabular-nums text-fg">{E8_DIM}</dd>
        </div>
      </dl>
      <p className="mt-4">
        <Closed ok={dim.closed} />
      </p>
      <p className="mt-3 text-sm">
        <Link
          to="/n/$slug"
          params={{ slug: "upi-coding-theory-1-root-system-e8-lattice" }}
          className="text-fg underline-offset-4 hover:underline"
        >
          E8 root lattice in the index
        </Link>
      </p>
    </div>
  );
}

export function LieLab({ mode, onMode }: { mode: LieMode; onMode: (m: LieMode) => void }) {
  const [theta, setTheta] = useState(1.1);
  const [phi, setPhi] = useState(0.6);
  const [axisId, setAxisId] = useState("z");
  const [so3theta, setSo3theta] = useState(0.9);
  const [root, setRoot] = useState(4);
  const copy = LIE_COPY[mode];

  return (
    <section>
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">Exponential map</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Algebra, then group</h1>
      <p className="mt-3 max-w-2xl text-muted">
        A Lie algebra is the group linearized at the identity. The exponential map sends a generator
        to a finite symmetry; the logarithm walks back. Same mirror. Infinitesimal.
      </p>

      <div className="chip-row mt-6">
        {LIE_MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onMode(m.id)}
            className={cn(
              "h-11 shrink-0 rounded-md px-3 text-sm",
              mode === m.id ? "bg-surface-2 text-fg" : "bg-surface text-muted hover:text-fg",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-3xl tracking-tight">{copy.title}</h2>
          <StatusBadge status="EST" />
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted">{copy.meaning}</p>
        <div className="mt-6">
          {mode === "u1" ? <U1LiePanel theta={theta} setTheta={setTheta} /> : null}
          {mode === "so11" ? <So11Panel phi={phi} setPhi={setPhi} /> : null}
          {mode === "so3" ? (
            <So3Panel axisId={axisId} theta={so3theta} setAxisId={setAxisId} setTheta={setSo3theta} />
          ) : null}
          {mode === "e8" ? <E8Panel root={root} setRoot={setRoot} /> : null}
        </div>
        <p className="mt-6 text-xs text-muted">{copy.guard}</p>
      </div>

      <h2 className="mt-12 font-display text-3xl tracking-tight">Where this sits in the index</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        The exponential map is the dictionary. Status stays on the record, not on the bracket.
      </p>
      <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
        {LIE_APPLICATIONS.map((row) => (
          <Link
            key={row.algebra}
            to="/n/$slug"
            params={{ slug: row.slug }}
            className="grid gap-2 bg-surface p-5 transition-colors hover:bg-surface-2"
          >
            <div className="flex items-center justify-between gap-3">
              <dt className="font-mono text-xs uppercase tracking-widest text-subtle">{row.algebra}</dt>
              <StatusBadge status={row.status} />
            </div>
            <dd className="text-sm text-muted">{row.usedFor}</dd>
          </Link>
        ))}
      </dl>
    </section>
  );
}
