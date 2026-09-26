import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Constellation } from "@/components/constellation";
import { useLive } from "@/lib/upi";

const searchSchema = z.object({
  node: z.string().optional(),
});

export const Route = createFileRoute("/graph")({
  validateSearch: searchSchema,
  component: GraphPage,
});

function GraphPage() {
  const nodes = useLive((s) => s.catalog.nodes.length);
  const { node } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <div className="mx-auto min-w-0 max-w-6xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">Relations</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Force graph</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Compare how Fruchterman–Reingold, ForceAtlas2, and a spring–Coulomb field arrange the same
        {` ${nodes} `}
        records. Drag a node, reheat, or switch models.
      </p>
      <div className="mt-8">
        <Constellation
          focusSlug={node}
          onFocusSlug={(slug) => {
            void navigate({
              to: "/graph",
              search: { node: slug ?? undefined },
              replace: true,
            });
          }}
        />
      </div>
    </div>
  );
}
