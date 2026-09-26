import { createFileRoute } from "@tanstack/react-router";
import { PersonaStudio } from "@/components/persona-studio";

export const Route = createFileRoute("/personas")({ component: PersonasPage });

function PersonasPage() {
  return (
    <div>
      <div className="border-b border-border px-4 py-6 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">RNA · interaction identity</p>
        <h1 className="mt-1 font-display text-4xl tracking-tight">Luna · Angelica · Emilia</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Tre vuxna profiler. Chat och bildscen körs i UI:t. Emilia kräver 18+-bekräftelse. KÅT är
          en simulerad variabel och inte evidens. Ingen live-modell är inkopplad i den här ytan.
        </p>
      </div>
      <PersonaStudio />
    </div>
  );
}
