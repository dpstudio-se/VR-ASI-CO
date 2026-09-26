import { Badge } from "@/components/ui/badge";
import { STATUS_COPY, type Status } from "@/lib/upi";
import { cn } from "@/lib/utils";

const TONE: Record<Status, "est" | "der" | "hyp" | "stop" | "err" | "sym"> = {
  EST: "est",
  DER: "der",
  HYP: "hyp",
  STOP: "stop",
  ERR: "err",
  SYM: "sym",
};

export function StatusBadge({
  status,
  withLabel = false,
  className,
}: {
  status: Status | string;
  withLabel?: boolean;
  className?: string;
}) {
  const key = (status in TONE ? status : "SYM") as Status;
  return (
    <Badge tone={TONE[key]} className={cn("gap-1.5", className)} title={STATUS_COPY[key].meaning}>
      {key}
      {withLabel ? <span className="font-sans font-normal normal-case tracking-normal">{STATUS_COPY[key].label}</span> : null}
    </Badge>
  );
}
