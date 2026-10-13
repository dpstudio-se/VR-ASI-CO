import { createFileRoute, Link } from "@tanstack/react-router";
import { PersonaStudio } from "@/components/persona-studio";

export const Route = createFileRoute("/personas")({ component: PersonasPage });

const STEPS = ["1 Välj slot", "2 Läs rollen", "3 Skriv"];

function PersonasPage() {
  return (
    <div>
      <div className="border-b border-border px-4 py-6 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">VR-ASI-CO · OdinOS</p>
        <h1 className="mt-1 font-display text-4xl tracking-tight">Personas</h1>
        <ol className="mt-4 flex flex-wrap gap-2">
          {STEPS.map((step) => (
            <li key={step} className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
              {step}
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link to="/research" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-fg px-5 py-3 text-sm font-medium text-bg">
            Research
          </Link>
          <a href="/upi-tf-protocol.pdf" download className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-border px-5 py-3 text-sm">
            Ladda ner PDF
          </a>
        </div>
      </div>
      <PersonaStudio />
    </div>
  );
}
