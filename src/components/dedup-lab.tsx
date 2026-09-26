import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CORPUS,
  formatBytes,
} from "@/lib/upi/indaleko";
import {
  DEDUP_METHODS,
  SAMPLE_BLOCK,
  SAMPLE_TWIN,
  SAMPLE_UNIQUE,
  corpusReplicaFactor,
  encodeUtf8,
  replicaAligns,
  runDedup,
  uniqueFromCopies,
  type DedupMethod,
  type DedupMode,
} from "@/lib/upi/dedup";
import { cn } from "@/lib/utils";

const MODES: { id: DedupMode; label: string }[] = [
  { id: "whole", label: "Whole" },
  { id: "fixed", label: "Fixed" },
  { id: "cdc", label: "CDC" },
];

export function DedupLab() {
  const [text, setText] = useState(SAMPLE_BLOCK);
  const [mode, setMode] = useState<DedupMode>("cdc");
  const [size, setSize] = useState(32);
  const [copies, setCopies] = useState(corpusReplicaFactor());
  const [sel, setSel] = useState("cdc");
  const method = DEDUP_METHODS.find((m) => m.id === sel) ?? DEDUP_METHODS[0]!;
  const keep = DEDUP_METHODS.filter((m) => m.keep === "keep");
  const drop = DEDUP_METHODS.filter((m) => m.keep === "drop");

  const bytes = useMemo(() => encodeUtf8(text), [text]);
  const result = useMemo(() => runDedup(bytes, mode, size), [bytes, mode, size]);
  const uniqueAtCopies = uniqueFromCopies(CORPUS.abstract.bytes, copies);
  const aligns = replicaAligns(copies);
  const factor = corpusReplicaFactor();

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">
        unique vs copies · verification_type: software_test
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h2 className="font-display text-3xl tracking-tight">Dedup</h2>
        <StatusBadge status={result.closed ? "EST" : "ERR"} />
      </div>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Same bytes, same id. Reconstruct from unique chunks. That loop is EST. Reading 160 TB as
        replicas of 16.2 TB used is HYP until a counting rule is named.
      </p>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {keep.map((m) => (
          <MethodChip key={m.id} method={m} active={sel === m.id} onSelect={setSel} />
        ))}
      </div>
      <ul className="chip-row mt-3">
        {drop.map((m) => (
          <li key={m.id} className="shrink-0">
            <MethodChip method={m} active={sel === m.id} onSelect={setSel} wide />
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-xl bg-bg p-4 shadow-[var(--shadow-border)]">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">
          {method.keep} · {method.id}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <h3 className="font-display text-2xl tracking-tight">{method.title}</h3>
          <StatusBadge status={method.status} />
        </div>
        <p className="mt-2 text-sm text-muted">{method.meaning}</p>
      </div>

      <div className="mt-5">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">byte identity on this text</p>
        <div className="chip-row mt-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={cn(
                "h-11 shrink-0 rounded-md px-3 text-sm",
                mode === m.id ? "bg-accent text-accent-fg" : "bg-bg text-muted hover:text-fg",
              )}
            >
              {m.label}
            </button>
          ))}
          <button type="button" className="h-11 shrink-0 rounded-md bg-bg px-3 text-sm text-muted hover:text-fg" onClick={() => setText(SAMPLE_TWIN)}>
            Twin
          </button>
          <button type="button" className="h-11 shrink-0 rounded-md bg-bg px-3 text-sm text-muted hover:text-fg" onClick={() => setText(SAMPLE_BLOCK)}>
            Block
          </button>
          <button type="button" className="h-11 shrink-0 rounded-md bg-bg px-3 text-sm text-muted hover:text-fg" onClick={() => setText(SAMPLE_UNIQUE)}>
            Unique
          </button>
        </div>
        <label className="mt-3 grid gap-1.5 text-sm font-medium">
          Sample
          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} />
        </label>
        {mode !== "whole" ? (
          <label className="mt-3 grid gap-2 text-sm font-medium">
            Target chunk {size} B
            <input
              type="range"
              min={16}
              max={128}
              step={8}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="upi-range w-full"
            />
          </label>
        ) : null}
        <dl className="mt-4 grid gap-0 text-sm">
          <Row label="Raw" value={`${result.raw} B`} />
          <Row label="Unique" value={`${result.unique} B`} />
          <Row label="Distinct chunks" value={String(result.distinct)} />
          <Row label="Copies" value={result.copies.toFixed(3)} />
          <Row
            label="Round-trip"
            value={result.closed ? "closed" : "broken"}
            tone={result.closed ? "est" : "stop"}
          />
          <Row label="FNV-1a" value={result.hash} />
        </dl>
      </div>

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">
          160 TB as replicas · HYP counting rule
        </p>
        <label className="mt-3 grid gap-2 text-sm font-medium">
          Copies {copies.toFixed(2)}
          <input
            type="range"
            min={1}
            max={16}
            step={0.01}
            value={copies}
            onChange={(e) => setCopies(Number(e.target.value))}
            className="upi-range w-full"
          />
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={() => setCopies(factor)}>
            Align to 16.2 TB
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setCopies(8)}>
            One copy / platform
          </Button>
        </div>
        <dl className="mt-4 grid gap-0 text-sm">
          <Row label="Raw (abstract)" value={formatBytes(CORPUS.abstract.bytes)} />
          <Row label="Unique at this copies" value={formatBytes(uniqueAtCopies)} />
          <Row label="Body used" value={formatBytes(CORPUS.body.usedBytes)} />
          <Row label="160 / 16.2" value={factor.toFixed(3)} />
        </dl>
        <p className={cn("mt-3 text-sm", aligns ? "text-hyp" : "text-muted")}>
          {aligns
            ? "Aligns with body used. That is a candidate counting rule, not a closed STOP. Someone still has to name replication."
            : "Move copies until unique meets 16.2 TB, or leave it. Arithmetic does not promote the claim."}
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "est" | "stop";
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-t border-border py-2">
      <dt className="text-muted">{label}</dt>
      <dd className={cn("font-mono text-xs tabular-nums", tone === "est" && "text-est", tone === "stop" && "text-stop")}>
        {value}
      </dd>
    </div>
  );
}

function MethodChip({
  method,
  active,
  onSelect,
  wide,
}: {
  method: DedupMethod;
  active: boolean;
  onSelect: (id: string) => void;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method.id)}
      className={cn(
        "flex h-11 items-center justify-between gap-2 rounded-md px-3 text-left text-sm",
        wide ? "w-auto min-w-44" : "w-full",
        active ? "bg-surface-2 text-fg" : "bg-bg text-muted hover:text-fg",
        method.keep === "drop" && !active ? "opacity-70" : null,
      )}
    >
      <span className="truncate">{method.title}</span>
      <StatusBadge status={method.status} />
    </button>
  );
}
