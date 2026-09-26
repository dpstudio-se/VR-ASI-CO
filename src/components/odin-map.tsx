import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  CONSTANT_CACHE,
  ODIN_LAYERS,
  ODIN_NODES,
  runMirrors,
  type MirrorResult,
  type OdinNode,
} from "@/lib/upi/odin";
import { formatScientific } from "@/lib/upi/physics";
import { cn } from "@/lib/utils";

export function OdinMap() {
  const [sel, setSel] = useState<string>("planck-einstein");
  const [mirrors, setMirrors] = useState<MirrorResult[] | null>(null);
  const node = ODIN_NODES.find((n) => n.id === sel) ?? ODIN_NODES[0]!;
  const keep = ODIN_NODES.filter((n) => n.keep === "keep");
  const drop = ODIN_NODES.filter((n) => n.keep === "drop");
  const closed = mirrors?.every((m) => m.closed) ?? null;

  const byLayer = useMemo(() => {
    return ODIN_LAYERS.map((layer) => ({
      ...layer,
      nodes: keep.filter((n) => n.layer === layer.id),
    }));
  }, []);

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
        mind map · keep / drop · verification_type: software_test
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h2 className="font-display text-3xl tracking-tight">Knotted loops</h2>
        <StatusBadge status="HYP" />
      </div>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Odin Omega is a document about order in chaos. Three loop levels survive: micro tests,
        meso composition, macro DNA. Reinforcement learning, HFT, and a different UPI named
        Indaleko do not. Click a node. Run the mirrors.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {byLayer.map((layer) => (
          <div key={layer.id} className="rounded-xl bg-bg p-3 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">{layer.kicker}</p>
            <h3 className="mt-1 font-display text-xl tracking-tight">{layer.title}</h3>
            <ul className="mt-3 grid gap-2">
              {layer.nodes.map((n) => (
                <li key={n.id}>
                  <NodeChip node={n} active={sel === n.id} onSelect={setSel} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">dropped from the document</p>
        <ul className="chip-row mt-2">
          {drop.map((n) => (
            <li key={n.id} className="shrink-0">
              <NodeChip node={n} active={sel === n.id} onSelect={setSel} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl bg-bg p-4 shadow-[var(--shadow-border)]">
        <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
          {node.keep === "keep" ? "keep" : "drop"} · {node.layer}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h3 className="font-display text-2xl tracking-tight">{node.title}</h3>
          <StatusBadge status={node.status} />
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted">{node.meaning}</p>
        {node.href ? (
          <p className="mt-3 text-sm">
            <Link
              to={node.href}
              search={node.href === "/symmetry" ? { layer: "group", g: "lorentz" } : undefined}
              className="text-fg underline-offset-4 hover:underline"
            >
              Open in the index
            </Link>
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted">No implementation. Left as a document claim.</p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button type="button" onClick={() => setMirrors(runMirrors())}>
          Run mirrors
        </Button>
        {closed === null ? null : (
          <span className={cn("font-mono text-xs uppercase tracking-widest", closed ? "text-est" : "text-stop")}>
            {closed ? "all loops closed" : "a loop is broken"}
          </span>
        )}
      </div>

      {mirrors ? (
        <dl className="mt-4 grid gap-0 text-sm">
          {mirrors.map((m) => (
            <div key={m.id} className="flex items-baseline justify-between gap-3 border-t border-border py-2">
              <dt className="font-mono text-xs text-muted">{m.title}</dt>
              <dd className="font-mono text-xs tabular-nums">
                <span className={m.closed ? "text-est" : "text-stop"}>{m.closed ? "closed" : "broken"}</span>
                <span className="ml-2 text-subtle">{m.residual.toExponential(2)}</span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">constant cache · CODATA / SI</p>
        <dl className="mt-2 grid gap-0 text-sm">
          {CONSTANT_CACHE.map((c) => (
            <div key={c.name} className="flex items-baseline justify-between gap-3 border-t border-border py-2">
              <dt className="font-mono text-xs text-muted">
                {c.name} · {c.source}
              </dt>
              <dd className="font-mono text-xs tabular-nums">
                {formatScientific(c.value)} {c.unit}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-muted">
          Constants are not predicted by a cache model. They are exact or recommended values.
          The productive “cache” is this table plus the mirrors above.
        </p>
      </div>
    </div>
  );
}

function NodeChip({
  node,
  active,
  onSelect,
}: {
  node: OdinNode;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(node.id)}
      className={cn(
        "flex h-11 items-center justify-between gap-2 rounded-md px-3 text-left text-sm",
        node.keep === "drop" ? "w-auto min-w-44" : "w-full",
        active ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
        node.keep === "drop" && !active ? "opacity-70" : null,
      )}
    >
      <span className="truncate">{node.title}</span>
      <StatusBadge status={node.status} />
    </button>
  );
}
