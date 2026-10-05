import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { headDnaFn, proposeBridgeFn, proposeNodeFn, pullDna } from "@/lib/upi/dna-actions";
import { applyDna, markPullError, markPulling, useLive } from "@/lib/upi/live";
import { DNA } from "@/lib/upi/hydrate";
import { STATUSES, STATUS_COPY, type Status } from "@/lib/upi";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const RELATIONS = [
  "DERIVED_FROM",
  "DUAL_TO",
  "MEASURED_BY",
  "STOPS_AT",
  "EQUIVALENT_WITHIN",
  "CANDIDATE_BRIDGE",
  "REPRESENTS",
];

export async function transcribeDna() {
  markPulling();
  try {
    const pulled = await pullDna();
    applyDna(pulled);
    return pulled;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    markPullError(message);
    throw e;
  }
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      {children}
    </label>
  );
}

export function DnaEngine() {
  const live = useLive();
  const [kind, setKind] = useState<"node" | "bridge">("node");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [prUrl, setPrUrl] = useState<string | null>(null);
  const [autoSync, setAutoSync] = useState(true);
  const [lastHeadCheck, setLastHeadCheck] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setPulse((value) => (value + 1) % 8), 125);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!autoSync) return;
    let cancelled = false;
    let checking = false;

    const check = async () => {
      if (checking) return;
      checking = true;
      try {
        const head = await headDnaFn();
        if (cancelled) return;
        setLastHeadCheck(head.checkedAt);
        setSyncError(null);
        const current = useLive.getState();
        if (head.sha !== current.sha && !current.pulling) {
          await transcribeDna();
        }
      } catch (e) {
        if (!cancelled) setSyncError(e instanceof Error ? e.message : String(e));
      } finally {
        checking = false;
      }
    };

    void check();
    const id = window.setInterval(() => void check(), 5000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [autoSync]);

  async function onPull() {
    setBusy(true);
    setNote(null);
    try {
      const pulled = await transcribeDna();
      setNote(
        `Transcribed ${pulled.catalog.nodes.length} nodes, ${pulled.catalog.bridges.length} bridges from ${pulled.sha.slice(0, 7)}.`,
      );
    } catch (e) {
      setNote(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function onNode(form: FormData) {
    setBusy(true);
    setNote(null);
    setPrUrl(null);
    try {
      const result = await proposeNodeFn({
        data: {
          domain: String(form.get("domain") ?? ""),
          filename: String(form.get("filename") ?? ""),
          address: String(form.get("address") ?? ""),
          title: String(form.get("title") ?? ""),
          description: String(form.get("description") ?? ""),
          status: String(form.get("status") ?? "HYP") as Status,
          definitions: String(form.get("definitions") ?? ""),
          equations: String(form.get("equations") ?? ""),
          assumptions: String(form.get("assumptions") ?? ""),
          mechanism: String(form.get("mechanism") ?? ""),
          confusion_guard: String(form.get("confusion_guard") ?? ""),
          stop_reason: String(form.get("stop_reason") ?? ""),
          tags: String(form.get("tags") ?? ""),
        },
      });
      setPrUrl(result.prUrl);
      setNote(`Wrote ${result.path} on ${result.branch}.`);
      await transcribeDna();
    } catch (e) {
      setNote(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function onBridge(form: FormData) {
    setBusy(true);
    setNote(null);
    setPrUrl(null);
    try {
      const result = await proposeBridgeFn({
        data: {
          filename: String(form.get("filename") ?? ""),
          source: String(form.get("source") ?? ""),
          target: String(form.get("target") ?? ""),
          relation: String(form.get("relation") ?? "DERIVED_FROM"),
          status: String(form.get("status") ?? "HYP") as Status,
          equations: String(form.get("equations") ?? ""),
          assumptions: String(form.get("assumptions") ?? ""),
          mechanism: String(form.get("mechanism") ?? ""),
          confusion_guard: String(form.get("confusion_guard") ?? ""),
          stop_reason: String(form.get("stop_reason") ?? ""),
        },
      });
      setPrUrl(result.prUrl);
      setNote(`Wrote ${result.path} on ${result.branch}.`);
      await transcribeDna();
    } catch (e) {
      setNote(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
          DNA-memory · GitHub main
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-tight">Canonical ledger</h2>
        <p className="mt-2 text-sm text-muted">
          The repository is the durable index. This UI transcribes it, then reverse-transcribes
          proposals as pull requests. Merge-check stays human.
        </p>
        <dl className="mt-5 grid gap-0">
          {[
            ["Origin", live.origin === "dna" ? "DNA (GitHub)" : "Local snapshot"],
            ["SHA", live.sha ? live.sha.slice(0, 12) : "—"],
            ["Nodes", String(live.catalog.nodes.length)],
            ["Bridges", String(live.catalog.bridges.length)],
            ["Write", live.writable ? "RNA proposal branch enabled" : "Read-only until GitHub is connected"],
            ["Sync", autoSync ? "Near-real-time DNA watch" : "Manual"],
            ["8 Hz pulse", `local ${pulse + 1}/8 · 125 ms`],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 border-t border-border py-3">
              <dt className="text-xs text-muted">{k}</dt>
              <dd className="font-mono text-sm tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button type="button" onClick={() => void onPull()} disabled={busy || live.pulling}>
            {live.pulling ? "Transcribing…" : "Read DNA now"}
          </Button>
          <Button type="button" variant="outline" onClick={() => setAutoSync((value) => !value)}>
            {autoSync ? "Realtime watch: on" : "Realtime watch: off"}
          </Button>
          <Button variant="outline" asChild>
            <a href={DNA.html} target="_blank" rel="noreferrer">
              Open the ledger
            </a>
          </Button>
        </div>
        {live.error ? <p className="mt-4 text-sm text-stop">{live.error}</p> : null}
        {syncError ? <p className="mt-2 text-xs text-stop">Realtime sync: {syncError}</p> : null}
        {lastHeadCheck ? (
          <p className="mt-2 text-xs text-muted">Last DNA head check: {new Date(lastHeadCheck).toLocaleTimeString()}</p>
        ) : null}
        {note ? <p className="mt-4 text-sm text-muted">{note}</p> : null}
        {prUrl ? (
          <p className="mt-2 text-sm">
            <a href={prUrl} className="text-fg underline-offset-2 hover:underline" target="_blank" rel="noreferrer">
              Open pull request
            </a>
          </p>
        ) : null}
        <p className="mt-6 text-xs text-muted">
          Realtime path: RNA writes immediately to a proposal branch. DNA stays canonical on GitHub main and is
          refreshed when the lightweight head watcher detects a new main SHA. The local 8 Hz pulse is UI/runtime
          timing only; GitHub is not polled at 8 Hz.
        </p>
        <p className="mt-2 text-xs text-muted">
          Confusion guard: DNA and RNA here are a working metaphor for canonical memory versus transcription.
          They are not a biological claim. GitHub is git.
        </p>
      </section>

      <section className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
          RNA-engine · propose
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            className={`rounded-md px-3 py-2 text-sm ${kind === "node" ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"}`}
            onClick={() => setKind("node")}
          >
            Node
          </button>
          <button
            type="button"
            className={`rounded-md px-3 py-2 text-sm ${kind === "bridge" ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"}`}
            onClick={() => setKind("bridge")}
          >
            Bridge
          </button>
        </div>

        {kind === "node" ? (
          <form
            className="mt-5 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              void onNode(new FormData(e.currentTarget));
            }}
          >
            <Field label="Address">
              <Input
                name="address"
                required
                placeholder="UPI<theories,1,holography,example>"
                className="font-mono"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title">
                <Input name="title" required placeholder="Short scientific title" />
              </Field>
              <Field label="Status">
                <select
                  name="status"
                  defaultValue="HYP"
                  className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s} · {STATUS_COPY[s].label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Domain folder">
                <Input name="domain" required placeholder="theories" />
              </Field>
              <Field label="Filename">
                <Input name="filename" required placeholder="example" />
              </Field>
            </div>
            <Field label="Description">
              <Textarea name="description" required rows={4} />
            </Field>
            <Field label="Equations (one per line)">
              <Textarea name="equations" rows={3} className="font-mono" />
            </Field>
            <Field label="Confusion guard">
              <Textarea name="confusion_guard" rows={2} />
            </Field>
            <Field label="STOP reason (required if STOP)">
              <Textarea name="stop_reason" rows={2} />
            </Field>
            <Field label="Tags (comma)">
              <Input name="tags" placeholder="holography, entropy" />
            </Field>
            <Button type="submit" disabled={busy}>
              Write RNA proposal
            </Button>
          </form>
        ) : (
          <form
            className="mt-5 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              void onBridge(new FormData(e.currentTarget));
            }}
          >
            <Field label="Source address">
              <Input name="source" required className="font-mono" placeholder="UPI<…>" />
            </Field>
            <Field label="Target address">
              <Input name="target" required className="font-mono" placeholder="UPI<…>" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Relation">
                <select
                  name="relation"
                  className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
                  defaultValue="DERIVED_FROM"
                >
                  {RELATIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Status">
                <select
                  name="status"
                  defaultValue="HYP"
                  className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Filename">
              <Input name="filename" required placeholder="example_from_source" />
            </Field>
            <Field label="Mechanism">
              <Textarea name="mechanism" rows={3} />
            </Field>
            <Field label="Confusion guard">
              <Textarea name="confusion_guard" rows={2} />
            </Field>
            <Button type="submit" disabled={busy}>
              Write RNA bridge proposal
            </Button>
          </form>
        )}
        <p className="mt-4 text-xs text-muted">
          EST still requires evidence. HYP stays HYP until a measurement.{" "}
          <Link to="/method" className="text-fg underline-offset-2 hover:underline">
            Method
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
