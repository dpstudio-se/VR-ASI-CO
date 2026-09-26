import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { GroupLab } from "@/components/group-lab";
import { LieLab } from "@/components/lie-lab";
import type { GroupMode } from "@/lib/upi/group";
import { GROUP_MODES } from "@/lib/upi/group";
import type { LieMode } from "@/lib/upi/lie";
import { LIE_MODES } from "@/lib/upi/lie";
import { cn } from "@/lib/utils";

const groupModes = GROUP_MODES.map((m) => m.id) as [GroupMode, ...GroupMode[]];
const lieModes = LIE_MODES.map((m) => m.id) as [LieMode, ...LieMode[]];

const searchSchema = z.object({
  layer: z.enum(["group", "algebra"]).optional().catch(undefined),
  g: z.enum(groupModes).optional().catch(undefined),
  a: z.enum(lieModes).optional().catch(undefined),
});

export const Route = createFileRoute("/symmetry")({
  validateSearch: searchSchema,
  component: SymmetryPage,
});

function SymmetryPage() {
  const { layer: layerQ, g, a } = Route.useSearch();
  const navigate = Route.useNavigate();
  const layer = layerQ ?? (a ? "algebra" : "group");
  const groupMode: GroupMode = g ?? "planck";
  const lieMode: LieMode = a ?? "so11";

  function setLayer(next: "group" | "algebra") {
    void navigate({
      to: "/symmetry",
      search: next === "algebra" ? { layer: next, a: lieMode } : { layer: next, g: groupMode },
      replace: true,
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="chip-row">
        {(
          [
            ["group", "Group"],
            ["algebra", "Algebra"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setLayer(id)}
            className={cn(
              "h-11 shrink-0 rounded-md px-4 text-sm",
              layer === id ? "bg-surface-2 text-fg" : "bg-surface text-muted hover:text-fg",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {layer === "algebra" ? (
          <LieLab
            mode={lieMode}
            onMode={(next) => {
              void navigate({ to: "/symmetry", search: { layer: "algebra", a: next }, replace: true });
            }}
          />
        ) : (
          <GroupLab
            mode={groupMode}
            onMode={(next) => {
              void navigate({ to: "/symmetry", search: { layer: "group", g: next }, replace: true });
            }}
          />
        )}
      </div>
    </div>
  );
}
