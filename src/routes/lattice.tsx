import { createFileRoute, Link } from "@tanstack/react-router";
import { E8Portrait } from "@/components/e8-portrait";
import { GolayBench } from "@/components/golay-bench";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { getNode, useLive } from "@/lib/upi";

export const Route = createFileRoute("/lattice")({ component: LatticePage });

const RECORDS = [
  "upi-coding-theory-1-root-system-e8-lattice",
  "upi-coding-theory-1-sphere-packing-leech-lattice",
  "upi-coding-theory-1-binary-code-extended-golay",
  "upi-quantum-information-1-error-correction-syndrome-measurement",
] as const;

const PLATES = [
  {
    src: "/figures/lattice-cloud.jpg",
    alt: "Filament portrait of E8, Leech Λ24, Golay G24, and a quantum-error-correction ripple",
    title: "Four named objects, one picture",
    body: "The plate labels E8 (240 roots), Leech Λ24, Golay G24,12,8, and syndrome repair. Those are four ledger records — not a single physical field.",
  },
  {
    src: "/figures/lattice-lens.jpg",
    alt: "Lens-shaped E8 root projection with Golay correction callouts",
    title: "Coxeter plane, not spacetime",
    body: "The live portrait above is the 12° Coxeter plane of E8: 240 distinct projected roots. Beauty here is representation theory, not a hidden dimension of the vacuum.",
  },
  {
    src: "/figures/mass-frequency.jpg",
    alt: "Observatory plate of m equals h f over c squared",
    title: "Einstein on Planck, T€@X on Einstein",
    body: "E = mc² is derived. m = hf / c² is derived. T€@X (2026) names that kilogram information mass m_I under a frequency-encoding assumption. Status HYP. Same number as the DER record — a named referent, not a second law.",
  },
] as const;

function LatticePage() {
  const catalog = useLive((s) => s.catalog);
  const nodes = RECORDS.map((slug) => getNode(slug, catalog)).filter((n) => n != null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">Coding theory</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Root lattice</h1>
      <p className="mt-3 max-w-2xl text-muted">
        E8, the Leech lattice Λ24, and the Golay code that builds them — drawn the way the
        observatory plates draw them, indexed the way this ledger indexes them.
      </p>

      <div className="mt-8">
        <E8Portrait />
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {nodes.map((n) => (
          <li key={n.slug}>
            <Link
              to="/n/$slug"
              params={{ slug: n.slug }}
              className="flex h-full flex-col gap-2 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] transition-colors duration-150 hover:bg-surface-2"
            >
              <StatusBadge status={n.status} />
              <span className="font-display text-xl leading-snug">{n.title}</span>
              <span className="text-sm text-muted">{n.confusion_guard}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <GolayBench />
      </div>

      <section className="mt-10 grid gap-6">
        <h2 className="font-display text-3xl tracking-tight">Observatory plates</h2>
        {PLATES.map((p) => (
          <figure key={p.src} className="grid gap-4 lg:grid-cols-2 lg:items-center">
            <img
              src={p.src}
              alt={p.alt}
              className="w-full rounded-2xl outline outline-1 -outline-offset-1 outline-white/10"
            />
            <figcaption className="grid gap-3">
              <p className="font-display text-2xl">{p.title}</p>
              <p className="text-muted">{p.body}</p>
              {p.src.includes("mass") ? (
                <Button asChild variant="outline">
                  <Link to="/lab">Open the frequency lab</Link>
                </Button>
              ) : (
                <Button asChild variant="outline">
                  <Link to="/graph">See them on the graph</Link>
                </Button>
              )}
            </figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
}
