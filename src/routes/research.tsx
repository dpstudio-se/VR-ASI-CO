import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/research")({ component: ResearchPage });

const PHYSICS = "https://github.com/dpstudio-se/Universal-Physics-Index-UPI";
const PERSONA = "https://github.com/dpstudio-se/VR-ASI-CO";

function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">
        Manual module · not a merge
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Research</h1>
      <p className="mt-3 text-muted">
        Persona UPI is this repo. Physics UPI is a different repo. Pick it by hand.
        Nothing here writes the other index.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          className="inline-flex items-center justify-center rounded-md border border-border bg-fg px-4 py-2 text-sm text-bg"
          href={PERSONA}
        >
          Persona UPI
        </a>
        <a
          className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm"
          href={PHYSICS}
        >
          Physics UPI
        </a>
      </div>
      <p className="mt-8 text-sm text-muted">
        Boundary: research/BOUNDARY.md. Pointer: research/pointer.json. Status: SYM.
      </p>
    </div>
  );
}
