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
      <ul className="mt-8 space-y-4 text-sm">
        <li>
          <span className="font-mono text-xs uppercase text-subtle">Persona UPI</span>
          <a className="mt-1 block underline" href={PERSONA}>
            {PERSONA}
          </a>
        </li>
        <li>
          <span className="font-mono text-xs uppercase text-subtle">Physics UPI</span>
          <a className="mt-1 block underline" href={PHYSICS}>
            {PHYSICS}
          </a>
        </li>
      </ul>
      <p className="mt-8 text-sm text-muted">
        Boundary: research/BOUNDARY.md. Pointer: research/pointer.json. Status: SYM.
      </p>
    </div>
  );
}
