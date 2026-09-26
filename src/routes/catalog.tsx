import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { z } from "zod";
import { NodeCard } from "@/components/node-card";
import { Input } from "@/components/ui/input";
import {
  domainsOf,
  domainLabel,
  searchNodes,
  STATUSES,
  type Status,
  useLive,
} from "@/lib/upi";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  q: z.string().optional().catch(""),
  status: z.enum(["ALL", "EST", "DER", "HYP", "STOP", "ERR", "SYM"]).optional().catch("ALL"),
  domain: z.string().optional().catch("all"),
});

export const Route = createFileRoute("/catalog")({
  validateSearch: searchSchema,
  component: CatalogPage,
});

function CatalogPage() {
  const catalog = useLive((s) => s.catalog);
  const origin = useLive((s) => s.origin);
  const { q = "", status = "ALL", domain = "all" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const results = searchNodes(q, status as Status | "ALL", domain, catalog);
  const domains = domainsOf(catalog);

  function patch(next: { q?: string; status?: string; domain?: string }) {
    void navigate({
      search: (prev) => ({
        q: next.q ?? prev.q ?? "",
        status: (next.status ?? prev.status ?? "ALL") as typeof status,
        domain: next.domain ?? prev.domain ?? "all",
      }),
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">Catalog</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Every typed node</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Filter by scientific status and domain. Addresses follow the form{" "}
        {"UPI<Domain, Generation, Torus, Node>"}.
      </p>

      <div className="relative mt-8 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
        <Input
          value={q}
          onChange={(e) => patch({ q: e.target.value })}
          placeholder="Search titles, equations, tags…"
          className="pl-10"
          aria-label="Search nodes"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["ALL", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => patch({ status: s })}
            className={cn(
              "h-11 rounded-md px-3 font-mono text-xs uppercase tracking-wide transition-colors",
              status === s ? "bg-accent text-accent-fg" : "bg-surface text-muted hover:text-fg",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {["all", ...domains].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => patch({ domain: d })}
            className={cn(
              "h-11 rounded-md px-3 text-xs transition-colors",
              domain === d ? "bg-surface-2 text-fg shadow-[var(--shadow-border)]" : "text-muted hover:text-fg",
            )}
          >
            {d === "all" ? "All domains" : domainLabel(d)}
          </button>
        ))}
      </div>

      <p className="mt-6 font-mono text-xs tabular-nums text-subtle">
        {results.length} record{results.length === 1 ? "" : "s"}
        {origin === "dna" ? " · DNA" : " · snapshot"}
      </p>

      {results.length === 0 ? (
        <p className="mt-10 text-muted">No nodes match those filters.</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((node) => (
            <NodeCard key={node.slug} node={node} />
          ))}
        </div>
      )}
    </div>
  );
}
