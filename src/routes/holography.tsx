import { createFileRoute, Link } from "@tanstack/react-router";
import { AdsPortrait } from "@/components/ads-portrait";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { getNode, useLive } from "@/lib/upi";

export const Route = createFileRoute("/holography")({ component: HolographyPage });

const RECORDS = [
  "upi-gravity-1-spacetime-anti-de-sitter",
  "upi-quantum-field-1-symmetry-conformal-field-theory",
  "upi-theories-1-holography-ads-cft",
  "upi-theories-1-holography-ryu-takayanagi",
  "upi-theories-1-holography-not-our-sky",
] as const;

function HolographyPage() {
  const catalog = useLive((s) => s.catalog);
  const nodes = RECORDS.map((slug) => getNode(slug, catalog)).filter((n) => n != null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">Holography</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">AdS/CFT</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Gravity in an asymptotically anti-de Sitter bulk is dual to a conformal field theory on the
        boundary. Maldacena (1997) is still a conjecture — status HYP — and it is the most tightly
        tested duality in string theory. The geodesic on this page is the Ryu–Takayanagi formula in
        AdS3: bulk length equals boundary entanglement entropy.
      </p>

      <div className="mt-8">
        <AdsPortrait />
      </div>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2">
        {nodes.map((n) => (
          <li key={n.slug} className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
            <div className="flex items-center justify-between gap-3">
              <StatusBadge status={n.status} />
              <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                {n.domain}
              </span>
            </div>
            <Link
              to="/n/$slug"
              params={{ slug: n.slug }}
              className="mt-3 block font-display text-2xl tracking-tight hover:underline"
            >
              {n.title}
            </Link>
            <p className="mt-2 text-sm text-muted">{n.description}</p>
          </li>
        ))}
      </ol>

      <section className="mt-10 border-t border-border pt-8">
        <h2 className="font-display text-3xl tracking-tight">The dictionary</h2>
        <dl className="mt-4 grid gap-0 sm:grid-cols-2">
          {[
            ["Bulk", "Einstein gravity (plus strings / M-theory) in AdS"],
            ["Boundary", "CFT generating functional"],
            ["GKP–Witten", "Z_bulk[φ₀] = ⟨exp ∫ φ₀ O⟩_CFT"],
            ["Ryu–Takayanagi", "S_A = Area(γ_A) / 4G_N"],
            ["AdS5 × S5", "Type IIB  ↔  4d N=4 SYM"],
            ["AdS4 × S7", "M-theory on the 11D Freund–Rubin vacuum  ↔  ABJM"],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-border py-3">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-subtle">{k}</dt>
              <dd className="mt-1 text-sm text-muted">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-2xl text-sm text-muted">
          This is the in-domain holographic entropy — entanglement of a boundary region, dual to a
          bulk area. It is not S_BH of a laboratory frequency quantum, and it is not a photograph of
          de Sitter sky.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/lab">Open the measure lab</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              to="/n/$slug"
              params={{ slug: "upi-theories-1-holography-ads-cft" }}
            >
              Open the correspondence
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
