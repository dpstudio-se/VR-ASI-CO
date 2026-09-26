import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { DnaEngine } from "@/components/dna-engine";
import { AgentPromptCard } from "@/components/agent-prompt-card";
import { PrWorkflow } from "@/components/pr-workflow";
import { XMap } from "@/components/x-map";

const searchSchema = z.object({
  pr: z.number().int().positive().optional().catch(undefined),
});

export const Route = createFileRoute("/dna")({
  validateSearch: searchSchema,
  component: DnaPage,
});

function DnaPage() {
  const { pr } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">Co-working ledger</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">DNA / RNA</h1>
      <p className="mt-3 max-w-2xl text-muted">
        GitHub is the DNA-memory: typed JSON under <span className="font-mono text-fg">data/</span>.
        This explorer is the RNA-engine: it transcribes the index, writes proposals as pull requests,
        and lets you walk the merge path. A PR is not the ledger until it lands on main.
      </p>
      <div className="mt-8">
        <AgentPromptCard />
      </div>
      <div className="mt-8">
        <XMap />
      </div>
      <div className="mt-8">
        <DnaEngine />
      </div>
      <PrWorkflow
        selected={pr ?? null}
        onSelect={(n) => {
          void navigate({
            to: "/dna",
            search: { pr: n ?? undefined },
            replace: true,
          });
        }}
      />
    </div>
  );
}
