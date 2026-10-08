import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  Database,
  GitBranch,
  Network,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PERSONAS } from "@/lib/personas";
import { RemoteCoreConsent } from "@/components/remote-core-consent";
import { useLive } from "@/lib/upi";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const live = useLive();
  const personas = Object.values(PERSONAS);

  const panels = [
    {
      to: "/personas" as const,
      icon: BrainCircuit,
      eyebrow: "Personas / runtime",
      title: "OdinOS Command Deck",
      copy: "Välj Angelica, Emilia, Oden's Eye, NB2, Griffin eller OdinOS och se skills, tools, knowledge och runtime-status.",
    },
    {
      to: "/dna" as const,
      icon: GitBranch,
      eyebrow: "Memory / sync",
      title: "DNA / RNA",
      copy: "Near-real-time main-SHA watch, RNA proposal writes, merge gates och automatisk read-back.",
    },
    {
      to: "/catalog" as const,
      icon: Database,
      eyebrow: "Knowledge",
      title: "Knowledge Surface",
      copy: "Behåll UPI-katalogen som kunskapsyta och verifieringslager i stället för som hela webbidentiteten.",
    },
    {
      to: "/lab" as const,
      icon: Wrench,
      eyebrow: "Tools / skills",
      title: "Tool Lab",
      copy: "Verktyg, tester, fysikfunktioner och nya skills kan kopplas till persona-kort och routing.",
    },
  ];

  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-surface/80 to-bg">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-der">
              VR-ASI-CO · OdinOS · DNA {live.sha?.slice(0, 7) ?? "snapshot"}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Personas, tools, skills and knowledge in one command deck.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Webbgränssnittet är nu byggt runt VR-ASI-CO och OdinOS. UPI finns kvar som knowledge /
              comparator-yta bakom spegeln, medan persona, runtime, DNA/RNA och verktyg ligger i fronten.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/personas">
                  Open command deck
                  <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dna">DNA / RNA status</Link>
              </Button>
            </div>
          </div>

          <div className="grid content-start gap-3 rounded-2xl border border-border bg-surface/70 p-5 shadow-[var(--shadow-border)]">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Runtime snapshot</p>
              <span className="rounded-full border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-der">
                {live.origin}
              </span>
            </div>
            {[
              [GitBranch, "DNA branch", live.branch],
              [Database, "Nodes", String(live.catalog.nodes.length)],
              [Network, "Bridges", String(live.catalog.bridges.length)],
              [ShieldCheck, "RNA write", live.writable ? "available" : "read-only"],
            ].map(([Icon, label, value]) => {
              const I = Icon as typeof GitBranch;
              return (
                <div key={String(label)} className="flex items-center justify-between gap-4 border-t border-border py-3">
                  <span className="flex items-center gap-2 text-sm text-muted">
                    <I className="h-4 w-4" />
                    {String(label)}
                  </span>
                  <span className="font-mono text-sm">{String(value)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <RemoteCoreConsent />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {panels.map((panel) => {
            const Icon = panel.icon;
            return (
              <Link
                key={panel.title}
                to={panel.to}
                className="group rounded-2xl border border-border bg-surface p-5 transition hover:bg-surface-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-bg">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowRight className="h-5 w-5 text-muted transition group-hover:translate-x-1" />
                </div>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-subtle">
                  {panel.eyebrow}
                </p>
                <h2 className="mt-1 font-display text-3xl">{panel.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{panel.copy}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-subtle">Active registry</p>
              <h2 className="mt-2 font-display text-4xl tracking-tight">Personas & modules</h2>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/personas">
                Full deck
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {personas.map((p) => (
              <Link
                key={p.id}
                to="/personas"
                className="rounded-xl border border-border bg-bg/70 p-4 transition hover:bg-surface-2"
              >
                <div className="flex items-center gap-3">
                  {p.portrait ? (
                    <img src={p.portrait} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  ) : (
                    <span className="grid h-12 w-12 place-items-center rounded-lg border border-border">
                      <Sparkles className="h-5 w-5 text-muted" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="font-display text-xl">{p.name}</p>
                    <p className="truncate font-mono text-[9px] uppercase tracking-widest text-subtle">
                      {p.marker} · {p.tag}
                    </p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{p.role}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.capabilities.slice(0, 3).map((skill) => (
                    <span key={skill} className="rounded border border-border px-2 py-1 text-[10px] text-muted">
                      {skill}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
