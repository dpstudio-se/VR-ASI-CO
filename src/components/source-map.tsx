import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { StopDesk } from "@/components/stop-desk";
import {
  ANCHOR_MAP,
  CORPUS,
  CORPUS_ROWS,
  INDALEKO_LAYERS,
  INDALEKO_NODES,
  INDALEKO_PAPER,
  PHYSICS_SOURCES,
  PLATFORMS,
  formatBytes,
  logBarPct,
  runCorpusAudit,
  type AuditResult,
  type IndalekoNode,
} from "@/lib/upi/indaleko";
import { useLive } from "@/lib/upi/live";
import { cn } from "@/lib/utils";

export function SourceMap() {
  const catalog = useLive((s) => s.catalog);
  const [sel, setSel] = useState<string>("two-names");
  const [audit, setAudit] = useState<AuditResult[] | null>(null);
  const node = INDALEKO_NODES.find((n) => n.id === sel) ?? INDALEKO_NODES[0]!;
  const drop = INDALEKO_NODES.filter((n) => n.keep === "drop");
  const catalogBytes = useMemo(() => JSON.stringify(catalog).length, [catalog]);
  const maxBytes = CORPUS.abstract.bytes;
  const closed = audit ? audit.filter((a) => a.id !== "abstract-body").every((a) => a.closed) : null;

  const byLayer = useMemo(
    () =>
      INDALEKO_LAYERS.map((layer) => ({
        ...layer,
        nodes: INDALEKO_NODES.filter((n) => n.keep === "keep" && n.layer === layer.id),
      })),
    [],
  );

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">
        source map · arXiv:{INDALEKO_PAPER.arxiv} · 160 TB cited, not loaded
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h2 className="font-display text-3xl tracking-tight">Indaleko corpus</h2>
        <StatusBadge status="STOP" />
      </div>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        {INDALEKO_PAPER.author}, {INDALEKO_PAPER.affiliation}. Unified Personal Index — a different
        UPI. Abstract: {CORPUS.abstract.files.toLocaleString()} files, 160 TB, eight platforms.
        Body: {formatBytes(CORPUS.body.usedBytes)} used of {formatBytes(CORPUS.body.capacityBytes)},
        index {formatBytes(CORPUS.body.indexBytes)}. This catalog is {formatBytes(catalogBytes)}.
      </p>
      <p className="mt-2 text-sm">
        <a
          href={INDALEKO_PAPER.abs}
          target="_blank"
          rel="noreferrer"
          className="text-fg underline-offset-4 hover:underline"
        >
          arXiv:{INDALEKO_PAPER.arxiv}
        </a>
        <span className="text-subtle"> · </span>
        <a
          href={INDALEKO_PAPER.code}
          target="_blank"
          rel="noreferrer"
          className="text-fg underline-offset-4 hover:underline"
        >
          ubc-systopia/Indaleko
        </a>
      </p>

      <div className="mt-6">
        <StopDesk />
      </div>

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">
          log₁₀ scale · payload vs index vs this ledger
        </p>
        <ul className="mt-3 grid gap-3">
          {CORPUS_ROWS.map((row) => (
            <li key={row.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm">{row.label}</span>
                <span className="font-mono text-xs tabular-nums text-muted">
                  {formatBytes(row.bytes)}
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-bg">
                <div
                  className={cn(
                    "h-2 rounded-full",
                    row.status === "STOP" ? "bg-stop" : row.status === "EST" ? "bg-est" : "bg-der",
                  )}
                  style={{ width: `${logBarPct(row.bytes, maxBytes)}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-subtle">{row.note}</p>
            </li>
          ))}
          <li>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm">This catalog (RNA)</span>
              <span className="font-mono text-xs tabular-nums text-muted">
                {formatBytes(catalogBytes)}
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-bg">
              <div
                className="h-2 rounded-full bg-accent"
                style={{ width: `${logBarPct(catalogBytes, maxBytes)}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-subtle">
              {catalog.nodes.length} nodes, {catalog.bridges.length} bridges, {catalog.sources.length}{" "}
              sources. Not a slice of the personal-file corpus.
            </p>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">
          eight storage platforms · activity extras
        </p>
        <ul className="chip-row mt-2">
          {PLATFORMS.map((p) => (
            <li key={p.id} className="shrink-0">
              <span
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm",
                  p.keep === "cite" ? "bg-bg text-fg" : "bg-bg text-muted",
                )}
                title={p.meaning}
              >
                {p.title}
                <span className="font-mono text-xs uppercase tracking-widest text-subtle">
                  {p.keep}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {byLayer.map((layer) => (
          <div key={layer.id} className="rounded-xl bg-bg p-3 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs uppercase tracking-widest text-subtle">{layer.kicker}</p>
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
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">dropped from the stack</p>
        <ul className="chip-row mt-2">
          {drop.map((n) => (
            <li key={n.id} className="shrink-0">
              <NodeChip node={n} active={sel === n.id} onSelect={setSel} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl bg-bg p-4 shadow-[var(--shadow-border)]">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">
          {node.keep === "keep" ? "keep" : "drop"} · {node.layer}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h3 className="font-display text-2xl tracking-tight">{node.title}</h3>
          <StatusBadge status={node.status} />
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted">{node.meaning}</p>
        {node.href ? (
          <p className="mt-3 text-sm">
            <Link to={node.href} className="text-fg underline-offset-4 hover:underline">
              Open in the index
            </Link>
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted">No implementation. Left as a document claim.</p>
        )}
      </div>

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">
          memory anchors → physics provenance
        </p>
        <dl className="mt-2 grid gap-0 text-sm">
          {ANCHOR_MAP.map((a) => (
            <div key={a.id} className="border-t border-border py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <dt className="font-medium">{a.paper}</dt>
                <StatusBadge status={a.status} />
              </div>
              <dd className="mt-1 text-muted">
                <span className="text-subtle">{a.paperCue}</span>
                <span className="text-subtle"> → </span>
                {a.physics}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">
          our sources mapped onto the 160 TB
        </p>
        <ul className="mt-2 grid gap-0">
          {PHYSICS_SOURCES.map((s) => {
            const live = catalog.sources.find(
              (c) => c.slug === s.id || c.source_id === s.id || c.slug.endsWith(s.id),
            );
            return (
              <li key={s.id} className="border-t border-border py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={live?.canonical_url || s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-fg underline-offset-4 hover:underline"
                  >
                    {s.title}
                  </a>
                  <StatusBadge status={s.status} />
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-subtle">
                  {s.relation.replaceAll("_", " ")}
                  {s.bytesHeld === 0 ? " · 0 B held" : null}
                </p>
                <p className="mt-1 text-sm text-muted">{s.onto160}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={() =>
            setAudit(
              runCorpusAudit(
                catalog.sources.map((s) => ({ slug: s.slug, canonical_url: s.canonical_url })),
                catalogBytes,
              ),
            )
          }
        >
          Audit the corpus
        </Button>
        {closed === null ? null : (
          <span
            className={cn(
              "font-mono text-xs uppercase tracking-widest",
              closed ? "text-est" : "text-stop",
            )}
          >
            {closed ? "audits hold · 160 TB gap stays open" : "an audit failed"}
          </span>
        )}
      </div>

      {audit ? (
        <dl className="mt-4 grid gap-0 text-sm">
          {audit.map((m) => (
            <div key={m.id} className="flex items-baseline justify-between gap-3 border-t border-border py-2">
              <dt className="min-w-0">
                <span className="font-mono text-xs text-muted">{m.title}</span>
                <span className="mt-0.5 block text-xs text-subtle">{m.note}</span>
              </dt>
              <dd className="shrink-0 font-mono text-xs tabular-nums">
                <span className={m.closed ? "text-est" : "text-stop"}>
                  {m.closed ? "closed" : "open"}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}

function NodeChip({
  node,
  active,
  onSelect,
}: {
  node: IndalekoNode;
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
