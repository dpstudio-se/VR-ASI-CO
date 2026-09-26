import { Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/status-badge";
import { domainLabel, type UpiNode } from "@/lib/upi";
import { cn } from "@/lib/utils";

export function NodeCard({
  node,
  className,
}: {
  node: UpiNode;
  className?: string;
}) {
  const equation = node.equations[0];
  return (
    <Link
      to="/n/$slug"
      params={{ slug: node.slug }}
      className={cn(
        "group flex flex-col rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
        "transition-[box-shadow,transform] duration-200 ease-out",
        "hover:shadow-[var(--shadow-border-hover)] hover:-translate-y-px",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <StatusBadge status={node.status} />
        <span className="truncate font-mono text-xs text-subtle">{domainLabel(node.domain)}</span>
      </div>
      <h3 className="mt-4 font-display text-2xl leading-snug tracking-tight group-hover:text-accent">
        {node.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted">{node.description}</p>
      {equation ? (
        <p className="mt-4 truncate font-mono text-xs text-der">{equation}</p>
      ) : (
        <p className="mt-4 font-mono text-xs text-subtle">{node.address_parts.node_id}</p>
      )}
    </Link>
  );
}
