import { cn } from "@/lib/utils";

export function OrbitalMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-9 place-items-center overflow-hidden rounded-full bg-surface-2 shadow-[var(--shadow-border)]",
        className,
      )}
      aria-hidden="true"
    >
      <span className="orbit-spin absolute inset-1 rounded-full border border-border-strong" />
      <span className="orbit-spin-rev absolute inset-2.5 rounded-full border border-accent/40" />
      <span className="size-1.5 rounded-full bg-fg" />
    </span>
  );
}
