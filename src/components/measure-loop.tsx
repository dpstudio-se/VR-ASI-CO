import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  CHAIN_BEADS,
  beadById,
  canShorten,
  defaultMerges,
  expandAt,
  mergeView,
  shortenAt,
  walk,
  type Merge,
} from "@/lib/upi/chain";
import { EinsteinMap } from "@/components/einstein-map";
import { cn } from "@/lib/utils";

type Sel = { kind: "bead"; id: string } | { kind: "link"; index: number };

export function MeasureLoop({ frequencyHz }: { frequencyHz: number }) {
  const [merges, setMerges] = useState<Merge[]>(defaultMerges);
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<Sel>({ kind: "link", index: 1 });
  const data = walk(frequencyHz);

  const visible = useMemo(
    () => (open ? merges.filter((m) => !m.ids.includes("close")) : merges),
    [merges, open],
  );
  const views = visible.map(mergeView);

  const selectedView = sel.kind === "link" ? views[sel.index] : null;
  const selectedBead = sel.kind === "bead" ? beadById(sel.id) : null;
  const shortenOk = sel.kind === "link" && canShorten(visible, sel.index);
  const expandOk = Boolean(selectedView && selectedView.ids.length > 1);

  function onShorten() {
    if (sel.kind !== "link" || !shortenOk) return;
    const next = shortenAt(visible, sel.index);
    setMerges(open ? [...next, { ids: ["close"] }] : next);
  }

  function onExpand() {
    if (sel.kind !== "link" || !expandOk) return;
    const next = expandAt(visible, sel.index);
    setMerges(open ? [...next, { ids: ["close"] }] : next);
  }

  function reset() {
    setMerges(defaultMerges());
    setSel({ kind: "link", index: 0 });
  }

  const readout = (id: string) => {
    if (id === "f") return data.readout.f;
    if (id === "E") return data.readout.E;
    if (id === "m") return data.readout.m;
    if (id === "mI") return data.readout.mI;
    if (id === "S") return data.readout.S;
    return data.readout.B;
  };

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
        chain · walk link by link · verification_type: software_test
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h2 className="font-display text-3xl tracking-tight">Planck–Einstein–T€@X loop</h2>
        <StatusBadge status="HYP" />
      </div>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Lorentz generates the Einstein map. Planck then Einstein is m = hf/c². T€@X™ names that
        kilogram. Horizon and 11d are later stations. Click a link. Shorten only what composes.
        Open the loop to see that 11d does not invert back to f.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button type="button" variant={open ? "secondary" : "outline"} onClick={() => setOpen((v) => !v)}>
          {open ? "Close the loop" : "Open the loop"}
        </Button>
        <Button type="button" variant="outline" disabled={!shortenOk} onClick={onShorten}>
          Shorten
        </Button>
        <Button type="button" variant="outline" disabled={!expandOk} onClick={onExpand}>
          Expand
        </Button>
        <Button type="button" variant="ghost" onClick={reset}>
          Full chain
        </Button>
      </div>

      <div className="chip-row mt-6 items-center pb-2">
        {views.map((view, i) => {
          const from = beadById(view.from);
          const to = beadById(view.to);
          const showFrom = i === 0 || views[i - 1]?.to !== view.from;
          const isReturn = view.ids.includes("close");
          return (
            <div key={view.id} className="flex shrink-0 items-center gap-1">
              {showFrom && from ? (
                <BeadButton
                  bead={from}
                  active={sel.kind === "bead" && sel.id === from.id}
                  value={readout(from.id)}
                  onClick={() => setSel({ kind: "bead", id: from.id })}
                />
              ) : null}
              <button
                type="button"
                onClick={() => setSel({ kind: "link", index: i })}
                className={cn(
                  "flex h-11 min-w-16 max-w-40 shrink-0 flex-col items-center justify-center rounded-md px-2",
                  sel.kind === "link" && sel.index === i
                    ? "bg-surface-2 text-fg"
                    : "text-muted hover:text-fg",
                )}
              >
                <span className="max-w-36 truncate font-mono text-[10px] uppercase tracking-widest">
                  {isReturn ? "not an inverse" : view.formula}
                </span>
                <span
                  className="mt-0.5 block h-px w-12"
                  style={{ background: `var(--color-${view.status.toLowerCase()})` }}
                />
              </button>
              {to && !isReturn ? (
                <BeadButton
                  bead={to}
                  active={sel.kind === "bead" && sel.id === to.id}
                  value={readout(to.id)}
                  onClick={() => setSel({ kind: "bead", id: to.id })}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl bg-bg p-4 shadow-[var(--shadow-border)] sm:p-5">
        {selectedBead ? (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
              {selectedBead.kicker} · bead
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h3 className="font-display text-2xl tracking-tight">{selectedBead.title}</h3>
              <StatusBadge status={selectedBead.status} />
            </div>
            <p className="mt-2 font-mono text-sm tabular-nums">{readout(selectedBead.id)}</p>
            <p className="mt-3 text-sm">
              <Link
                to="/n/$slug"
                params={{ slug: selectedBead.slug }}
                className="text-fg underline-offset-4 hover:underline"
              >
                Open the record
              </Link>
            </p>
            {selectedBead.id === "m" || selectedBead.id === "E" ? (
              <div className="mt-5">
                <EinsteinMap />
              </div>
            ) : null}
          </div>
        ) : selectedView ? (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
              {selectedView.relation} · {selectedView.ids.length > 1 ? "composed" : "one link"}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h3 className="font-display text-2xl tracking-tight">{selectedView.formula}</h3>
              <StatusBadge status={selectedView.status} />
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted">{selectedView.meaning}</p>
            {selectedView.generator ? (
              <p className="mt-3 text-sm">
                Generator:{" "}
                <Link
                  to={selectedView.generator.href}
                  search={selectedView.generator.search}
                  className="text-fg underline-offset-4 hover:underline"
                >
                  {selectedView.generator.label}
                </Link>
              </p>
            ) : null}
            {selectedView.ids.includes("planck") && selectedView.ids.includes("einstein") && data.trip ? (
              <p className="mt-3 font-mono text-xs uppercase tracking-widest">
                <span className={data.trip.closed ? "text-est" : "text-stop"}>
                  {data.trip.closed ? "loop closed" : "loop broken"}
                </span>
                <span className="ml-2 text-subtle">|f′ − f| = {data.trip.residual.toExponential(2)}</span>
              </p>
            ) : null}
            {selectedView.ids.includes("horizon") ? (
              <p className="mt-3 text-sm text-muted">
                {data.inDomain ? (
                  "R_s ≥ ℓ_P. Geometric station in-domain."
                ) : (
                  <>
                    Geometric station STOPS: R_s below ℓ_P.{" "}
                    <Link
                      to="/n/$slug"
                      params={{ slug: "upi-information-physics-1-measure-sub-planck-horizon" }}
                      className="text-fg underline-offset-4 hover:underline"
                    >
                      Open the STOP
                    </Link>
                    .
                  </>
                )}
              </p>
            ) : null}
            {selectedView.ids.includes("close") ? (
              <p className="mt-3 text-sm text-muted">
                Open the loop. The return is a claim, not an inverse. AdS/CFT is a different
                dictionary.{" "}
                <Link to="/holography" className="text-fg underline-offset-4 hover:underline">
                  Open AdS/CFT
                </Link>
                .
              </p>
            ) : null}
            {selectedView.ids.includes("einstein") || selectedView.ids.includes("planck") && selectedView.ids.includes("einstein") ? (
              <div className="mt-5">
                <EinsteinMap />
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-muted">Select a bead or a link.</p>
        )}
      </div>

      <p className="mt-4 text-xs text-muted">
        Shorten composes maps. Weakest status wins, except Planck+Einstein which is the named DER
        step. A trademark is authorship. Photon rest mass remains 0.{" "}
        <Link
          to="/n/$slug"
          params={{ slug: "upi-information-physics-1-measure-universal-information-measure" }}
          className="text-fg underline-offset-4 hover:underline"
        >
          Open the measure
        </Link>
        .
      </p>
    </div>
  );
}

function BeadButton({
  bead,
  active,
  value,
  onClick,
}: {
  bead: (typeof CHAIN_BEADS)[number];
  active: boolean;
  value: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-14 min-w-16 shrink-0 flex-col items-center justify-center rounded-full px-3 shadow-[var(--shadow-border)]",
        active ? "bg-surface-2 text-fg" : "bg-bg text-muted hover:text-fg",
      )}
    >
      <span className="font-mono text-xs text-fg">{bead.symbol}</span>
      <span className="max-w-20 truncate font-mono text-[10px] tabular-nums text-subtle">{value}</span>
    </button>
  );
}
