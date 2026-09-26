import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { StopBoard } from "@/components/stop-board";
import { PINNED_ID, type StopGroup } from "@/lib/upi/stops";

const searchSchema = z.object({
  id: z.string().optional().catch(PINNED_ID),
  q: z.string().optional().catch(""),
  group: z.enum(["open", "indaleko", "ledger", "held", "x"]).optional().catch("open"),
});

export const Route = createFileRoute("/stop")({
  validateSearch: searchSchema,
  component: StopPage,
});

function StopPage() {
  const { id = PINNED_ID, q = "", group = "open" } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <StopBoard
        selectedId={id}
        group={group as StopGroup}
        q={q}
        onSelect={(next) => {
          void navigate({ search: (prev) => ({ ...prev, id: next }) });
        }}
        onGroup={(next) => {
          void navigate({ search: (prev) => ({ ...prev, group: next }) });
        }}
        onQuery={(next) => {
          void navigate({ search: (prev) => ({ ...prev, q: next }) });
        }}
      />
    </div>
  );
}
