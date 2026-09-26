import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { formatScientific, N8_REFERENCE_HZ } from "@/lib/upi/physics";
import {
  GROUP_APPLICATIONS,
  GROUP_COPY,
  GROUP_MODES,
  boost,
  composeVelocity,
  lorentzRoundTrip,
  minkowskiOmega,
  planckEinsteinRoundTrip,
  type GroupMode,
  u1RoundTrip,
  velocityFromRapidity,
  wrapTau,
  znAdd,
  znInv,
  znRoundTrip,
} from "@/lib/upi/group";
import { SPEED_OF_LIGHT } from "@/lib/upi/physics";
import { cn } from "@/lib/utils";

const N = 8;
const EVENT = { t: 1, x: 0 };

function Closed({ ok }: { ok: boolean }) {
  return (
    <span className={cn("font-mono text-xs uppercase tracking-widest", ok ? "text-est" : "text-stop")}>
      {ok ? "loop closed" : "loop broken"}
    </span>
  );
}

function CyclicPanel({ g, setG }: { g: number; setG: (n: number) => void }) {
  const inv = znInv(N, g);
  const trip = znRoundTrip(N, g);
  const cx = 120;
  const cy = 120;
  const r = 88;
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <svg viewBox="0 0 240 240" className="mx-auto aspect-square w-full max-w-56 text-fg" aria-hidden>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeOpacity={0.18} />
        {Array.from({ length: N }, (_, k) => {
          const a = (k / N) * Math.PI * 2 - Math.PI / 2;
          const x = cx + r * Math.cos(a);
          const y = cy + r * Math.sin(a);
          const isG = k === g;
          const isInv = k === inv && k !== 0;
          const isE = k === 0;
          return (
            <g key={k}>
              <circle
                cx={x}
                cy={y}
                r={isG || isE ? 8 : 5}
                fill={isG ? "var(--color-der)" : isInv ? "var(--color-hyp)" : isE ? "var(--color-est)" : "var(--color-subtle)"}
              />
              <text
                x={x}
                y={y - 14}
                textAnchor="middle"
                className="fill-muted"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {k}
              </text>
            </g>
          );
        })}
      </svg>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">element g = {g}</p>
        <p className="mt-2 text-sm text-muted">
          Inverse g⁻¹ = {inv}. Identity e = 0. {trip.forward} = {trip.back}.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={() => setG(znAdd(N, g, 1))}>
            Add 1
          </Button>
          <Button type="button" variant="outline" onClick={() => setG(inv)}>
            Apply inverse
          </Button>
          <Button type="button" variant="ghost" onClick={() => setG(0)}>
            Identity
          </Button>
        </div>
        <p className="mt-4">
          <Closed ok={trip.closed} />
        </p>
      </div>
    </div>
  );
}

function U1Panel({ theta, setTheta }: { theta: number; setTheta: (n: number) => void }) {
  const inv = wrapTau(-theta);
  const trip = u1RoundTrip(theta);
  const R = 88;
  const toXY = (a: number) => {
    const t = a - Math.PI / 2;
    return [120 + R * Math.cos(t), 120 + R * Math.sin(t)] as const;
  };
  const [gx, gy] = toXY(theta);
  const [ix, iy] = toXY(inv);
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <svg viewBox="0 0 240 240" className="mx-auto aspect-square w-full max-w-56" aria-hidden>
        <circle cx="120" cy="120" r={R} fill="none" stroke="var(--color-fg)" strokeOpacity={0.18} />
        <line x1="120" y1="120" x2={gx} y2={gy} stroke="var(--color-der)" />
        <line x1="120" y1="120" x2={ix} y2={iy} stroke="var(--color-hyp)" strokeDasharray="4 4" />
        <circle cx={gx} cy={gy} r="6" fill="var(--color-der)" />
        <circle cx={ix} cy={iy} r="5" fill="var(--color-hyp)" />
      </svg>
      <div>
        <label className="grid gap-2 text-sm font-medium">
          Phase θ
          <input
            className="upi-range w-full"
            type="range"
            min={0}
            max={6.283185}
            step={0.01}
            value={theta}
            onChange={(e) => setTheta(Number(e.target.value))}
          />
        </label>
        <dl className="mt-4 grid gap-2 font-mono text-xs text-muted">
          <div className="flex justify-between gap-3">
            <dt>θ</dt>
            <dd className="tabular-nums text-fg">{theta.toFixed(3)} rad</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>θ⁻¹</dt>
            <dd className="tabular-nums text-fg">{(-theta).toFixed(3)} rad</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>θ · θ⁻¹</dt>
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

function LorentzPanel({ phi, setPhi }: { phi: number; setPhi: (n: number) => void }) {
  const v = velocityFromRapidity(phi);
  const boosted = boost(EVENT, phi);
  const back = boost(boosted, -phi);
  const trip = lorentzRoundTrip(EVENT, phi);
  const omega0 = minkowskiOmega(EVENT);
  const omega1 = minkowskiOmega(boosted);
  const composed = composeVelocity(v, velocityFromRapidity(-phi));
  const scale = 48;
  const toPx = (tSec: number, xLightSec: number) =>
    [120 + xLightSec * scale, 200 - tSec * scale] as const;
  const [e0x, e0y] = toPx(EVENT.t, 0);
  const [bpx, bpy] = toPx(boosted.t, boosted.x / SPEED_OF_LIGHT);
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <svg viewBox="0 0 240 240" className="mx-auto aspect-square w-full max-w-56" aria-hidden>
        <line x1="30" y1="200" x2="210" y2="200" stroke="var(--color-subtle)" />
        <line x1="120" y1="20" x2="120" y2="220" stroke="var(--color-subtle)" />
        <line x1="30" y1="200" x2="210" y2="20" stroke="var(--color-border-strong)" />
        <line x1="210" y1="200" x2="30" y2="20" stroke="var(--color-border-strong)" />
        <circle cx={e0x} cy={e0y} r="6" fill="var(--color-est)" />
        <circle cx={bpx} cy={bpy} r="6" fill="var(--color-der)" />
        <line x1={e0x} y1={e0y} x2={bpx} y2={bpy} stroke="var(--color-hyp)" strokeDasharray="3 3" />
      </svg>
      <div>
        <label className="grid gap-2 text-sm font-medium">
          Rapidity φ
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
        <dl className="mt-4 grid gap-2 font-mono text-xs text-muted">
          <div className="flex justify-between gap-3">
            <dt>v/c = tanh φ</dt>
            <dd className="tabular-nums text-fg">{Math.tanh(phi).toFixed(4)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>Ω rest</dt>
            <dd className="tabular-nums text-fg">{formatScientific(omega0, 4)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>Ω boosted</dt>
            <dd className="tabular-nums text-fg">{formatScientific(omega1, 4)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>v ⊕ (−v)</dt>
            <dd className="tabular-nums text-fg">{formatScientific(composed, 3)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>inverse residual</dt>
            <dd className="tabular-nums text-fg">{trip.residual.toExponential(2)}</dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-subtle">
          Rest event (t=1, x=0) → Λ(φ) → Λ(−φ) lands at t={back.t.toFixed(6)}, x={back.x.toExponential(2)}.
        </p>
        <p className="mt-3">
          <Closed ok={trip.closed} />
        </p>
      </div>
    </div>
  );
}

function PlanckPanel({ hz, setHz }: { hz: string; setHz: (v: string) => void }) {
  const f = Number(hz);
  const valid = Number.isFinite(f) && f >= 0;
  const trip = useMemo(() => (valid ? planckEinsteinRoundTrip(f) : null), [f, valid]);
  return (
    <div>
      <label className="grid gap-2 text-sm font-medium">
        Frequency f
        <span className="relative">
          <input
            className="h-11 w-full rounded-md bg-bg px-3 pr-12 font-mono text-sm shadow-[var(--shadow-border)] outline-none focus-visible:shadow-[var(--shadow-border-hover)]"
            value={hz}
            inputMode="decimal"
            onChange={(e) => setHz(e.target.value)}
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-xs text-subtle">
            Hz
          </span>
        </span>
      </label>
      {trip ? (
        <dl className="mt-5 grid gap-0 text-sm">
          {[
            ["E = hf", `${formatScientific(trip.E)} J`],
            ["m = E/c²", `${formatScientific(trip.m)} kg`],
            ["E' = mc²", `${formatScientific(trip.E2)} J`],
            ["f' = E'/h", `${formatScientific(trip.f2)} Hz`],
            ["|f' − f|", formatScientific(trip.residual)],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 border-t border-border py-2">
              <dt className="font-mono text-xs text-muted">{k}</dt>
              <dd className="font-mono text-xs tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-4 text-sm text-muted">Enter a non-negative frequency.</p>
      )}
      <p className="mt-4">
        <Closed ok={Boolean(trip?.closed)} />
      </p>
      <p className="mt-3 text-sm text-muted">
        {trip?.forward} then {trip?.back}. Same f. That is the verification. Naming m information
        mass is a separate HYP.
      </p>
    </div>
  );
}

export function GroupLab({
  mode,
  onMode,
}: {
  mode: GroupMode;
  onMode: (m: GroupMode) => void;
}) {
  const [g, setG] = useState(3);
  const [theta, setTheta] = useState(1.2);
  const [phi, setPhi] = useState(0.6);
  const [hz, setHz] = useState(String(N8_REFERENCE_HZ));
  const copy = GROUP_COPY[mode];

  return (
    <section>
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">Inverse axiom</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Group, then mirror</h1>
      <p className="mt-3 max-w-2xl text-muted">
        A group is a set that always has a way back: g · g⁻¹ = e. That is the named form of the
        Planck–Einstein loop. Walk it. If you land on the start, the map is consistent.
      </p>

      <div className="chip-row mt-6">
        {GROUP_MODES.map((m) => (
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
          <StatusBadge status={GROUP_MODES.find((m) => m.id === mode)?.status ?? "EST"} />
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted">{copy.meaning}</p>
        <div className="mt-6">
          {mode === "cyclic" ? <CyclicPanel g={g} setG={setG} /> : null}
          {mode === "u1" ? <U1Panel theta={theta} setTheta={setTheta} /> : null}
          {mode === "lorentz" ? <LorentzPanel phi={phi} setPhi={setPhi} /> : null}
          {mode === "planck" ? <PlanckPanel hz={hz} setHz={setHz} /> : null}
        </div>
        <p className="mt-6 text-xs text-muted">{copy.guard}</p>
      </div>

      <h2 className="mt-12 font-display text-3xl tracking-tight">Where this sits in the index</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Same inverse axiom, different groups. Status is per record, not inherited from the algebra.
      </p>
      <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
        {GROUP_APPLICATIONS.map((row) => (
          <Link
            key={row.group}
            to="/n/$slug"
            params={{ slug: row.slug }}
            className="grid gap-2 bg-surface p-5 transition-colors hover:bg-surface-2"
          >
            <div className="flex items-center justify-between gap-3">
              <dt className="font-mono text-xs uppercase tracking-widest text-subtle">{row.group}</dt>
              <StatusBadge status={row.status} />
            </div>
            <dd className="text-sm text-muted">{row.usedFor}</dd>
          </Link>
        ))}
      </dl>
    </section>
  );
}
