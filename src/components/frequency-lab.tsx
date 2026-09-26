import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  energyFromFrequency,
  formatScientific,
  massEquivalent,
  n8Index,
  N8_REFERENCE_HZ,
} from "@/lib/upi/physics";
import { StatusBadge } from "@/components/status-badge";

type FrequencyLabProps = {
  frequency: string;
  onFrequency: (value: string) => void;
};

export function FrequencyLab({ frequency, onFrequency }: FrequencyLabProps) {
  const hz = Number(frequency);
  const valid = Number.isFinite(hz) && hz >= 0;

  const energy = useMemo(() => (valid ? energyFromFrequency(hz) : Number.NaN), [hz, valid]);
  const mass = useMemo(() => (valid ? massEquivalent(hz) : Number.NaN), [hz, valid]);
  const n8 = useMemo(() => (valid ? n8Index(hz) : Number.NaN), [hz, valid]);

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
        verification_type: software_test
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h2 className="font-display text-3xl tracking-tight">Information mass</h2>
        <StatusBadge status="HYP" />
      </div>
      <p className="mt-2 max-w-xl text-sm text-muted">
        T€@X (2026): when information is a frequency quantum, m_I = hf / c². Same kilogram as the
        derived mass equivalent — a named referent, not a second law. A trademark is authorship,
        not a measurement.
      </p>

      <ol className="mt-5 grid gap-2 font-mono text-xs uppercase tracking-widest text-subtle">
        <li>Planck 1900 · E = hf</li>
        <li>Einstein 1905 · inertia of energy, Δm = E/c²</li>
        <li>Composition · m = hf / c² · DER</li>
        <li>T€@X 2026 · m_I = hf / c² · HYP</li>
      </ol>

      <label className="mt-6 grid gap-2 text-sm font-medium">
        Frequency
        <span className="relative">
          <input
            type="number"
            min={0}
            step="any"
            value={frequency}
            onChange={(e) => onFrequency(e.target.value)}
            className="h-14 w-full rounded-lg border border-border bg-bg px-3 pr-12 font-mono text-2xl tabular-nums text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
          />
          <em className="absolute right-3 top-1/2 -translate-y-1/2 text-sm not-italic text-subtle">
            Hz
          </em>
        </span>
      </label>

      <dl className="mt-6 grid gap-0">
        <div className="flex items-baseline justify-between gap-4 border-t border-border py-3">
          <dt className="text-xs text-muted">Energy · E = h·f</dt>
          <dd className="font-mono text-sm tabular-nums">{formatScientific(energy)} J</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-border py-3">
          <dt className="text-xs text-muted">Mass equivalent · m = h·f / c² · DER</dt>
          <dd className="font-mono text-sm tabular-nums">{formatScientific(mass)} kg</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-border py-3">
          <dt className="text-xs text-muted">Information mass · m_I = h·f / c² · HYP</dt>
          <dd className="font-mono text-sm tabular-nums">{formatScientific(mass)} kg</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-border py-3">
          <dt className="text-xs text-muted">{`N8 index · f / ${N8_REFERENCE_HZ} Hz`}</dt>
          <dd className="font-mono text-sm tabular-nums">{formatScientific(n8, 4)}</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-muted">
        m and m_I print the same kilogram because they are the same formula. The hypothesis is that
        this kilogram is of a frequency-encoded information carrier — not photon rest mass, not
        Landauer's kT ln 2 / c², not a bit in a static well.{" "}
        <Link
          to="/n/$slug"
          params={{ slug: "upi-information-physics-1-inertia-information-mass" }}
          className="text-fg underline-offset-2 hover:underline"
        >
          Open the HYP record
        </Link>
        {" · "}
        <Link
          to="/n/$slug"
          params={{ slug: "upi-information-physics-1-inertia-frequency-mass-equivalent" }}
          className="text-fg underline-offset-2 hover:underline"
        >
          Open the DER record
        </Link>
        .
      </p>
      <figure className="mt-5">
        <img
          src="/figures/mass-frequency.jpg"
          alt="Observatory plate of m equals h f over c squared"
          className="w-full rounded-xl outline outline-1 -outline-offset-1 outline-white/10"
        />
        <figcaption className="mt-2 text-xs text-subtle">
          Plate of the identification. T€@X 2026 names it information mass. Status HYP. The
          arithmetic is DER.
        </figcaption>
      </figure>
    </div>
  );
}
