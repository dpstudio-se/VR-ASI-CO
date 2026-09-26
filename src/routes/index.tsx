import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroOrbit } from "@/components/constellation";
import { NodeCard } from "@/components/node-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  featuredNodes,
  STATUS_COPY,
  statusCounts,
  STATUSES,
  useLive,
} from "@/lib/upi";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const catalog = useLive((s) => s.catalog);
  const featured = featuredNodes(catalog);
  const counts = statusCounts(catalog);

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div className="stagger-in">
          <p className="font-mono text-xs uppercase tracking-widest text-der">
            Open scientific ledger · v{catalog.version}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            A ledger for what physics actually knows.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Universal Physics Index stores typed nodes — quantities, equations, hypotheses, and
            sources — with strict status labels. Metaphor never becomes evidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/catalog">
                Browse the catalog
                <ArrowRight />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/graph">Open the graph</Link>
            </Button>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              [String(catalog.nodes.length), "Nodes"],
              [String(catalog.bridges.length), "Bridges"],
              [String(catalog.sources.length), "Sources"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-mono text-xs uppercase tracking-widest text-subtle">{l}</dt>
                <dd className="mt-1 font-display text-3xl tabular-nums">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
        <HeroOrbit />
      </section>

      <section className="border-y border-border bg-surface/60">
        <div className="mx-auto grid max-w-6xl gap-px sm:grid-cols-2 lg:grid-cols-3">
          {STATUSES.map((status) => (
            <Link
              key={status}
              to="/catalog"
              search={{ status, domain: "all", q: "" }}
              className="grid gap-2 px-5 py-6 transition-colors hover:bg-surface-2"
            >
              <div className="flex items-center justify-between">
                <StatusBadge status={status} />
                <span className="font-mono text-sm tabular-nums text-muted">
                  {counts[status]}
                </span>
              </div>
              <p className="text-sm text-muted">{STATUS_COPY[status].meaning}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <img
            src="/figures/lattice-cloud.jpg"
            alt="Filament portrait labelling E8, Leech Λ24, Golay G24, and syndrome repair"
            className="w-full rounded-2xl outline outline-1 -outline-offset-1 outline-white/10"
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-subtle">Coding theory</p>
            <h2 className="mt-2 font-display text-4xl tracking-tight">E8, Leech, Golay</h2>
            <p className="mt-4 text-muted">
              240 roots, a 24-dimensional packing lattice, and a perfect [24,12,8] code that
              repairs three bit flips. The plates are pictures. The records are mathematics.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/lattice">
                  Open the lattice
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-subtle">Holography</p>
            <h2 className="mt-2 font-display text-4xl tracking-tight">AdS/CFT</h2>
            <p className="mt-4 text-muted">
              A bulk geodesic whose length is the entanglement of a boundary interval. Maldacena is
              still a conjecture. Ryu–Takayanagi is the dictionary’s entropy. Not our sky: observed
              Λ has the wrong sign.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/holography">
                  Open the Poincaré disk
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl bg-surface p-6 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">Dictionary</p>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              <li>Bulk · Einstein gravity in AdS</li>
              <li>Boundary · CFT generating functional</li>
              <li>S_A = Area(γ_A) / 4G_N</li>
              <li>AdS4 × S7 · M2 / ABJM</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface/60">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-subtle">Co-working</p>
            <h2 className="mt-2 font-display text-4xl tracking-tight">DNA-memory, RNA-engine</h2>
            <p className="mt-4 text-muted">
              GitHub holds the typed JSON. This UI transcribes it into a graph and writes proposals
              back as pull requests. Co-working means merging into the ledger.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/dna">
                  Open the RNA engine
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
          <dl className="grid gap-0 text-sm">
            <div className="border-t border-border py-3">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-subtle">DNA</dt>
              <dd className="mt-1 text-muted">data/ on GitHub main — canonical records</dd>
            </div>
            <div className="border-t border-border py-3">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-subtle">RNA</dt>
              <dd className="mt-1 text-muted">This explorer — read, filter, propose</dd>
            </div>
            <div className="border-t border-border py-3">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-subtle">Guard</dt>
              <dd className="mt-1 text-muted">A metaphor for memory vs transcription. Not biology.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-subtle">Featured records</p>
            <h2 className="mt-2 font-display text-4xl tracking-tight">Established core</h2>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/catalog">
              All nodes
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((node) => (
            <NodeCard key={node.slug} node={node} />
          ))}
        </div>
      </section>
    </div>
  );
}
