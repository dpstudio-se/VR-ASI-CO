import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Copy, Check, Waypoints } from "lucide-react";
import { useState, type ReactNode } from "react";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  bridgesFor,
  domainLabel,
  getNodeByAddress,
  STATUS_COPY,
  type UpiNode,
} from "@/lib/upi";
import { formatScientific } from "@/lib/upi/physics";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-3">
      <h2 className="font-mono text-xs uppercase tracking-widest text-subtle">{title}</h2>
      {children}
    </section>
  );
}

export function NodeDetail({ node }: { node: UpiNode }) {
  const [copied, setCopied] = useState(false);
  const bridges = bridgesFor(node.address);

  async function copyAddress() {
    await navigator.clipboard.writeText(node.address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        to="/catalog"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        Catalog
      </Link>

      <header className="mt-8 grid gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={node.status} withLabel />
          <span className="font-mono text-xs text-subtle">{domainLabel(node.domain)}</span>
          {node.verification_type ? (
            <span className="font-mono text-xs text-subtle">
              verification_type: {node.verification_type}
            </span>
          ) : null}
        </div>
        <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">
          {node.title}
        </h1>
        <p className="max-w-2xl text-base text-muted">{node.description}</p>
        <div className="flex flex-wrap items-center gap-2">
          <code className="max-w-full truncate rounded-md bg-surface-2 px-2.5 py-1.5 font-mono text-xs text-muted">
            {node.address}
          </code>
          <Button variant="ghost" size="sm" onClick={copyAddress} aria-label="Copy address">
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/graph" search={{ node: node.slug }}>
              <Waypoints className="size-3.5" />
              View in graph
            </Link>
          </Button>
        </div>
        <p className="text-sm text-muted">{STATUS_COPY[node.status].meaning}</p>
      </header>

      {node.confusion_guard ? (
        <aside className="mt-8 rounded-xl border border-hyp/30 bg-hyp/10 p-4 text-sm text-fg">
          <p className="font-mono text-xs uppercase tracking-widest text-hyp">Confusion guard</p>
          <p className="mt-2 text-muted">{node.confusion_guard}</p>
        </aside>
      ) : null}

      {node.stop_reason ? (
        <aside className="mt-4 rounded-xl border border-stop/30 bg-stop/10 p-4 text-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-stop">Stop reason</p>
          <p className="mt-2 text-muted">{node.stop_reason}</p>
        </aside>
      ) : null}

      <div className="mt-10 grid gap-10">
        {node.equations.length > 0 ? (
          <Section title="Equations">
            <ul className="grid gap-2">
              {node.equations.map((eq) => (
                <li
                  key={eq}
                  className="rounded-lg bg-surface px-4 py-3 font-mono text-sm text-der shadow-[var(--shadow-border)]"
                >
                  {eq}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {node.quantities.length > 0 ? (
          <Section title="Quantities">
            <div className="overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]">
              <table className="w-full min-w-80 text-left text-sm">
                <thead className="border-b border-border text-xs uppercase tracking-wide text-subtle">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Name</th>
                    <th className="px-4 py-2.5 font-medium">Value</th>
                    <th className="px-4 py-2.5 font-medium">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {node.quantities.map((q) => (
                    <tr key={q.name} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5">{q.name}</td>
                      <td className="px-4 py-2.5 font-mono tabular-nums">
                        {formatScientific(q.value, 8)}
                        {q.uncertainty != null ? (
                          <span className="text-subtle"> ± {formatScientific(q.uncertainty, 2)}</span>
                        ) : null}
                      </td>
                      <td className="px-4 py-2.5 text-muted">{q.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        ) : null}

        {node.definitions.length > 0 ? (
          <Section title="Definitions">
            <ul className="grid gap-2 text-sm text-muted">
              {node.definitions.map((item) => (
                <li key={item} className="border-l border-border-strong pl-3">
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {node.assumptions.length > 0 ? (
          <Section title="Assumptions">
            <ul className="grid gap-2 text-sm text-muted">
              {node.assumptions.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {node.mechanism ? (
          <Section title="Mechanism">
            <p className="text-sm text-muted">{node.mechanism}</p>
          </Section>
        ) : null}

        {node.evidence.length > 0 ? (
          <Section title="Evidence">
            <ul className="grid gap-3">
              {node.evidence.map((ev) => (
                <li key={ev.source} className="rounded-lg bg-surface p-4 text-sm shadow-[var(--shadow-border)]">
                  <p className="font-mono text-xs uppercase tracking-wide text-subtle">{ev.type}</p>
                  <p className="mt-1">{ev.source}</p>
                  {ev.notes ? <p className="mt-1 text-muted">{ev.notes}</p> : null}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {node.primary_sources.length > 0 ? (
          <Section title="Primary sources">
            <ul className="grid gap-1.5 text-sm text-muted">
              {node.primary_sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {node.predictions.length > 0 ? (
          <Section title="Predictions">
            <ul className="grid gap-1.5 text-sm text-muted">
              {node.predictions.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {node.falsification_conditions.length > 0 ? (
          <Section title="Falsification">
            <ul className="grid gap-1.5 text-sm text-muted">
              {node.falsification_conditions.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {node.key_concepts.length > 0 ? (
          <Section title="Key concepts">
            <div className="flex flex-wrap gap-2">
              {node.key_concepts.map((c) => (
                <span key={c} className="rounded-sm bg-surface-2 px-2 py-1 text-xs text-muted">
                  {c}
                </span>
              ))}
            </div>
          </Section>
        ) : null}

        {node.tags.length > 0 ? (
          <Section title="Tags">
            <div className="flex flex-wrap gap-2">
              {node.tags.map((c) => (
                <span key={c} className="rounded-sm bg-surface-2 px-2 py-1 font-mono text-xs text-muted">
                  {c}
                </span>
              ))}
            </div>
          </Section>
        ) : null}

        {bridges.length > 0 ? (
          <Section title="Bridges">
            <ul className="grid gap-2">
              {bridges.map((b) => {
                const other = b.source === node.address ? b.target : b.source;
                const otherNode = getNodeByAddress(other);
                const outbound = b.source === node.address;
                return (
                  <li key={b.slug}>
                    {otherNode ? (
                      <Link
                        to="/n/$slug"
                        params={{ slug: otherNode.slug }}
                        className="flex items-start justify-between gap-3 rounded-lg bg-surface p-4 text-sm shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
                      >
                        <span>
                          <span className="font-mono text-xs text-subtle">
                            {outbound ? "out" : "in"} · {b.relation}
                          </span>
                          <span className="mt-1 block">{otherNode.title}</span>
                        </span>
                        <ArrowRight className="mt-0.5 size-4 shrink-0 text-subtle" />
                      </Link>
                    ) : (
                      <div className="rounded-lg bg-surface p-4 text-sm shadow-[var(--shadow-border)]">
                        <p className="font-mono text-xs text-subtle">{b.relation}</p>
                        <p className="mt-1 break-all font-mono text-xs text-muted">{other}</p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Section>
        ) : null}
      </div>

      <Separator className="my-10" />
      <p className="font-mono text-xs text-subtle">{node.file}</p>
    </article>
  );
}
