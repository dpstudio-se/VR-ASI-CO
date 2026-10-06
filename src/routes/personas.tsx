import { createFileRoute } from "@tanstack/react-router";
import { PersonaStudio } from "@/components/persona-studio";

export const Route = createFileRoute("/personas")({ component: PersonasPage });

function PersonasPage() {
  return (
    <div>
      <div className="border-b border-border px-4 py-6 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">
          VR-ASI-CO · OdinOS command deck
        </p>
        <h1 className="mt-1 font-display text-4xl tracking-tight">
          Personas · modules · skills · tools
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          Välj Angelica, Emilia, Oden&apos;s Eye, NB2, Griffin, VisualSynthesizer eller OdinOS. Kort, capabilities,
          knowledge surfaces och DNA-status visas i samma panel och kan växa med nya färdigheter,
          verktyg och runtime-moduler.
        </p>
      </div>
      <PersonaStudio />
    </div>
  );
}
