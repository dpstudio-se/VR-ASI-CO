import { createFileRoute, Link } from "@tanstack/react-router";
import { NodeDetail } from "@/components/node-detail";
import { getNode, useLive } from "@/lib/upi";

export const Route = createFileRoute("/n/$slug")({
  component: NodePage,
});

function NodePage() {
  const catalog = useLive((s) => s.catalog);
  const { slug } = Route.useParams();
  const node = getNode(slug, catalog);

  if (!node) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">STOP</p>
        <h1 className="mt-3 font-display text-4xl">Record not in this snapshot</h1>
        <p className="mt-3 text-muted">The address is unknown in the transcribed index.</p>
        <Link to="/catalog" className="mt-6 inline-block text-sm text-accent hover:underline">
          Return to catalog
        </Link>
      </div>
    );
  }

  return <NodeDetail node={node} />;
}
