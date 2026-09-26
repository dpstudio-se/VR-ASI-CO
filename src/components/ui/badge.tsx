import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-xs font-medium tracking-wide uppercase",
  {
    variants: {
      tone: {
        est: "bg-est/15 text-est",
        der: "bg-der/15 text-der",
        hyp: "bg-hyp/15 text-hyp",
        stop: "bg-stop/15 text-stop",
        err: "bg-err/15 text-err",
        sym: "bg-sym/15 text-sym",
        mute: "bg-surface-2 text-muted",
      },
    },
    defaultVariants: { tone: "mute" },
  },
);

function Badge({
  className,
  tone,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { Badge, badgeVariants };
