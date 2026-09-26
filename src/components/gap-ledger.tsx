import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/status-badge";

type GapNode = {
  id: string;
  topic: string;
  scale: string;
  gap: string;
  status: "STOP";
  revisits: number;
};

const STORAGE_KEY = "upi-gap-ledger-v1";

function containsSensitive(value: string) {
  return /(https?:\/\/|(?:\d{1,3}\.){3}\d{1,3}|\b(?:api[-_ ]?key|password|secret|token)\b|\S+@\S+)/i.test(
    value,
  );
}

async function hashText(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function GapLedger() {
  const [nodes, setNodes] = useState<GapNode[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setNodes(JSON.parse(raw) as GapNode[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function persist(next: GapNode[]) {
    setNodes(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const topic = String(form.get("topic") ?? "").trim();
    const scale = String(form.get("scale") ?? "").trim();
    const gap = String(form.get("gap") ?? "").trim();
    if (!topic || !scale || !gap) return;
    if (containsSensitive(`${topic} ${scale} ${gap}`)) {
      setError("Remove URLs, addresses, credentials, and personal identifiers.");
      return;
    }
    const id = (await hashText(`${topic.toLowerCase()}|${scale.toLowerCase()}`)).slice(0, 16);
    const existing = nodes.find((n) => n.id === id);
    const next = existing
      ? nodes.map((n) => (n.id === id ? { ...n, revisits: n.revisits + 1, gap } : n))
      : [...nodes, { id, topic, scale, gap, status: "STOP" as const, revisits: 1 }];
    persist(next);
    setError("");
    event.currentTarget.reset();
  }

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
        local only · no account
      </p>
      <h2 className="mt-2 font-display text-3xl tracking-tight">Knowledge-gap ledger</h2>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Map missing public physics — not people or networks. Repeating a topic and scale increments
        its revisit count via a content hash.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-1.5 text-sm font-medium">
          Public physics topic
          <Input name="topic" required placeholder="e.g. decoherence timescale" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Declared scale
          <Input name="scale" required placeholder="e.g. mesoscopic · 10⁻⁶ m" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          What is missing?
          <Textarea name="gap" required placeholder="Missing observation or mechanism. No private data." />
        </label>
        {error ? (
          <p className="text-sm text-err" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="justify-self-start">
          Add or revisit gap
        </Button>
      </form>

      <div className="mt-8 grid gap-3">
        {nodes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border-strong px-4 py-8 text-center">
            <StatusBadge status="STOP" />
            <p className="mt-3 font-display text-xl">No local gaps yet</p>
            <p className="mt-1 text-sm text-muted">Add a public physics question to begin.</p>
          </div>
        ) : (
          nodes.map((node) => (
            <article key={node.id} className="rounded-lg bg-bg p-4 shadow-[var(--shadow-border)]">
              <div className="flex items-center justify-between gap-2">
                <StatusBadge status={node.status} />
                <code className="font-mono text-[11px] text-subtle">{node.id.slice(0, 8)}</code>
              </div>
              <h3 className="mt-3 font-display text-xl">{node.topic}</h3>
              <p className="mt-1 text-sm text-muted">{node.gap}</p>
              <p className="mt-3 flex justify-between font-mono text-[11px] text-subtle">
                <span>{node.scale}</span>
                <span>revisits {node.revisits}</span>
              </p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
