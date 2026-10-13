import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/research")({ component: ResearchPage });

const PHYSICS = "https://github.com/dpstudio-se/Universal-Physics-Index-UPI";
const PERSONA = "https://github.com/dpstudio-se/VR-ASI-CO";
const PDF = "/upi-tf-protocol.pdf";

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
      <div className="mt-8 flex flex-col gap-4">
        <a
          className="inline-flex min-h-14 items-center justify-center rounded-lg border border-border bg-fg px-6 py-4 text-base font-medium text-bg"
          href={PERSONA}
        >
          Persona UPI
        </a>
        <a
          className="inline-flex min-h-14 items-center justify-center rounded-lg border border-border px-6 py-4 text-base font-medium"
          href={PHYSICS}
        >
          Physics UPI
        </a>
        <a
          className="inline-flex min-h-14 items-center justify-center rounded-lg border border-border px-6 py-4 text-base font-medium"
          href={PDF}
          download
        >
          Ladda ner PDF
        </a>
      </div>
      <p className="mt-8 text-sm text-muted">
        Boundary: research/BOUNDARY.md. Pointer: research/pointer.json. Status: SYM.
      </p>
    </div>
  );
}
