import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/research")({ component: ResearchPage });

const PHYSICS = "https://github.com/dpstudio-se/Universal-Physics-Index-UPI";
const PERSONA = "https://github.com/dpstudio-se/VR-ASI-CO";

function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">Manuell modul · inte en merge</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Research</h1>
      <p className="mt-3 max-w-xl text-muted">
        Två register. Välj ett. Inget här skriver det andra.
      </p>
      <div className="mt-8 grid gap-4">
        <a className="rounded-2xl border border-border bg-surface p-5 transition hover:border-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" href={PERSONA}>
          <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Persona UPI</p>
          <p className="mt-2 font-display text-2xl">VR-ASI-CO</p>
          <p className="mt-1 text-sm text-muted">Identitet, slot, DNA. Det här repot.</p>
        </a>
        <a className="rounded-2xl border border-border bg-surface p-5 transition hover:border-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" href={PHYSICS}>
          <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Physics UPI</p>
          <p className="mt-2 font-display text-2xl">Universal Physics Index</p>
          <p className="mt-1 text-sm text-muted">Vetenskapligt index. Läs och föreslå. Inte auktoritet här.</p>
        </a>
        <a className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-border px-6 py-4 text-base font-medium hover:border-border-strong" href="/upi-tf-protocol.pdf" download>
          Ladda ner protokoll (PDF)
        </a>
        <Link to="/personas" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-fg px-6 py-4 text-base font-medium text-bg">
          Tillbaka till personas
        </Link>
      </div>
    </div>
  );
}
