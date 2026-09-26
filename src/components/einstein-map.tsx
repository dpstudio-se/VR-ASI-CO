import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  MASS_PRESETS,
  einsteinRoundTrip,
  type MassPreset,
} from "@/lib/upi/einstein";
import { formatScientific } from "@/lib/upi/physics";
import { cn } from "@/lib/utils";

const PHI_MAX = 1.6;

function r3(n: number) {
  return Math.round(n * 1000) / 1000;
}

function hyperbolaPath(ox: number, oy: number, s: number, steps = 48) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const phi = -PHI_MAX + (2 * PHI_MAX * i) / steps;
    const x = r3(ox + Math.sinh(phi) * s);
    const y = r3(oy - Math.cosh(phi) * s);
    d += `${i === 0 ? "M" : "L"}${x} ${y}`;
  }
  return d;
}

export function EinsteinMap() {
  const [preset, setPreset] = useState<MassPreset>("electron");
  const [phi, setPhi] = useState(0.7);
  const massKg = MASS_PRESETS.find((p) => p.id === preset)!.kg;
  const trip = useMemo(() => einsteinRoundTrip(massKg, phi), [massKg, phi]);

  const ox = 120;
  const oy = 208;
  const s = 52;
  const toPx = (x: number, y: number) => [r3(ox + x * s), r3(oy - y * s)] as const;
  const rest = toPx(0, trip.lightlike ? 0 : 1);
  const now = trip.lightlike
    ? toPx(Math.sign(phi || 1) * 1.6, 1.6)
    : toPx(Math.sinh(phi), Math.cosh(phi));
  const inv = trip.lightlike ? now : toPx(Math.sinh(-phi), Math.cosh(-phi));
  const d = hyperbolaPath(ox, oy, s);

  return (
    <div className="rounded-xl bg-bg p-4 shadow-[var(--shadow-border)] sm:p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
        Einstein map · four-momentum · verification_type: software_test
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h3 className="font-display text-2xl tracking-tight">m = E₀ / c²</h3>
        <StatusBadge status={trip.lightlike ? "STOP" : "EST"} />
      </div>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Rest energy is the intercept of the mass shell. Lorentz slides you along the hyperbola.
        E/c² in a moving frame is γm, not m. The invariant √(E² − p²c²)/c² is the map that
        closes. Photons have no rest frame.
      </p>

      <div className="chip-row mt-4">
        {MASS_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPreset(p.id)}
            className={cn(
              "h-11 shrink-0 rounded-full px-4 text-sm",
              preset === p.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,240px)_1fr]">
        <svg viewBox="0 0 240 240" className="mx-auto aspect-square w-full max-w-56 text-fg" aria-hidden>
          <line x1="24" y1={oy} x2="216" y2={oy} stroke="var(--color-subtle)" />
          <line x1={ox} y1="16" x2={ox} y2="224" stroke="var(--color-subtle)" />
          <line x1={ox} y1={oy} x2={ox + 1.8 * s} y2={oy - 1.8 * s} stroke="var(--color-border-strong)" />
          <line x1={ox} y1={oy} x2={ox - 1.8 * s} y2={oy - 1.8 * s} stroke="var(--color-border-strong)" />
          {trip.lightlike ? null : <path d={d} fill="none" stroke="var(--color-est)" strokeOpacity={0.85} />}
          {trip.lightlike ? null : <circle cx={rest[0]} cy={rest[1]} r="6" fill="var(--color-est)" />}
          <circle cx={now[0]} cy={now[1]} r="6" fill="var(--color-der)" />
          {trip.lightlike || Math.abs(phi) < 0.02 ? null : (
            <circle cx={inv[0]} cy={inv[1]} r="5" fill="var(--color-hyp)" />
          )}
          <text x="196" y={oy + 14} fontSize="9" fontFamily="var(--font-mono)" className="fill-subtle">
            pc
          </text>
          <text x={ox + 6} y="22" fontSize="9" fontFamily="var(--font-mono)" className="fill-subtle">
            E
          </text>
        </svg>

        <div>
          <label className="grid gap-2 text-sm font-medium">
            Rapidity φ
            <input
              className="upi-range w-full"
              type="range"
              min={-PHI_MAX}
              max={PHI_MAX}
              step={0.01}
              value={phi}
              disabled={trip.lightlike}
              onChange={(e) => setPhi(Number(e.target.value))}
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" variant="secondary" disabled={trip.lightlike} onClick={() => setPhi(0)}>
              Rest
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={trip.lightlike}
              onClick={() => setPhi((v) => -v)}
            >
              Apply inverse
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={trip.lightlike}
              onClick={() => setPhi(0.7)}
            >
              Boost
            </Button>
          </div>
          <dl className="mt-4 grid gap-0 text-sm">
            {[
              ["v/c", trip.lightlike ? "1" : trip.vOverC.toFixed(4)],
              ["γ", trip.lightlike ? "∞" : trip.gamma.toFixed(4)],
              ["E", `${formatScientific(trip.E)} J`],
              ["E/c² (frame)", `${formatScientific(trip.mNaive)} kg`],
              ["√(E²/c⁴ − p²/c²)", `${formatScientific(trip.mInv)} kg`],
              ["m rest", trip.lightlike ? "0" : `${formatScientific(massKg)} kg`],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-t border-border py-2">
                <dt className="font-mono text-xs text-muted">{k}</dt>
                <dd className="font-mono text-xs tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest">
            <span className={trip.closed ? "text-est" : "text-stop"}>
              {trip.lightlike ? "no rest frame" : trip.closed ? "loop closed" : "loop broken"}
            </span>
            {trip.lightlike ? null : (
              <span className="ml-2 text-subtle">
                |m′ − m| = {trip.residual.toExponential(2)}
              </span>
            )}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        {trip.lightlike ? (
          <>
            Photon: E = pc. The intercept is the origin. m = E/c² would assign a false rest mass.
            Status STOP for a rest-frame reading.
          </>
        ) : Math.abs(phi) < 0.02 ? (
          <>Rest: E = E₀, p = 0, so m = E/c². That is the Einstein map. Status EST.</>
        ) : (
          <>
            Moving: E/c² is γm. Naive residual {trip.naiveResidual.toExponential(2)} kg. The
            invariant recovers m.
          </>
        )}{" "}
        <Link
          to="/symmetry"
          search={{ layer: "group", g: "lorentz" }}
          className="text-fg underline-offset-4 hover:underline"
        >
          Open Lorentz
        </Link>
        .{" "}
        <Link
          to="/n/$slug"
          params={{ slug: "upi-relativity-1-t-energy-n-mass-energy" }}
          className="text-fg underline-offset-4 hover:underline"
        >
          Open E = mc²
        </Link>
        .
      </p>
    </div>
  );
}
