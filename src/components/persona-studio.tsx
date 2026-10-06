import { FormEvent, useMemo, useState } from "react";
import {
  BrainCircuit,
  Boxes,
  Database,
  Eye,
  GitBranch,
  Network,
  Send,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { PERSONAS, replyFor, type PersonaId } from "@/lib/personas";
import { Button } from "@/components/ui/button";
import { useLive } from "@/lib/upi/live";
import { cn } from "@/lib/utils";

type Msg = { who: string; text: string; me: boolean };

type RuntimeRegistry = {
  personas?: Array<{
    id?: string;
    status?: string;
    capabilities?: string[];
    knowledge?: string[];
  }>;
  tools?: Array<{ id?: string; label?: string; status?: string }>;
  skills?: string[];
};

function asRuntimeRegistry(value: unknown): RuntimeRegistry {
  return value && typeof value === "object" ? (value as RuntimeRegistry) : {};
}

const ICONS: Record<PersonaId, typeof Sparkles> = {
  angelica: Sparkles,
  emilia: Wrench,
  "odins-eye": Eye,
  nb2: Network,
  griffin: ShieldCheck,
  visualsynthesizer: Sparkles,
  odinos: BrainCircuit,
};

const QUICK: Record<PersonaId, string[]> = {
  angelica: ["Bygg en research-plan", "Gör en kodpatch", "Skapa en visuell modell"],
  emilia: ["Bryt ner kraven", "Validera en patch", "Gör en release-checklista"],
  "odins-eye": ["Kör motexempel", "Bedöm r0", "Visa osäkerheter"],
  nb2: ["Bygg ett VR-rum", "Gör en nodgraf", "Planera WebXR-lager"],
  griffin: ["Kontrollera enheter", "Kör Scale Lock", "Klassificera status"],
  visualsynthesizer: ["Generera en bild", "Redigera en bild", "Skapa en modulvisualisering"],
  odinos: ["Visa systemstatus", "Routa ett projekt", "Kontrollera DNA/RNA"],
};

export function PersonaStudio() {
  const live = useLive();
  const [id, setId] = useState<PersonaId>("odinos");
  const [draft, setDraft] = useState("");
  const [log, setLog] = useState<Msg[]>([
    { who: PERSONAS.odinos.name, text: PERSONAS.odinos.greet, me: false },
  ]);

  const person = PERSONAS[id];
  const personas = Object.values(PERSONAS);
  const runtimeRegistry = asRuntimeRegistry(live.runtimeRegistry);
  const dynamicPersona = runtimeRegistry.personas?.find((entry) => entry.id === id);
  const displayCapabilities = dynamicPersona?.capabilities ?? person.capabilities;
  const displayKnowledge = dynamicPersona?.knowledge ?? person.knowledge;
  const displayStatus = dynamicPersona?.status ?? person.status;

  function select(next: PersonaId) {
    setId(next);
    const p = PERSONAS[next];
    setLog([{ who: p.name, text: p.greet, me: false }]);
  }

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setLog((rows) => [
      ...rows,
      { who: "Du", text: clean, me: true },
      { who: person.name, text: replyFor(id, clean), me: false },
    ]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = draft;
    setDraft("");
    send(text);
  }

  const statusRows = useMemo(
    () => [
      ["Runtime", "OdinOS / VR-ASI-CO"],
      ["DNA origin", live.origin === "dna" ? "GitHub main" : "local snapshot"],
      ["DNA SHA", live.sha?.slice(0, 12) ?? "—"],
      ["Branch", live.branch],
      ["RNA write", live.writable ? "available" : "read-only"],
      ["Records", String(live.catalog.nodes.length + live.catalog.bridges.length)],
    ],
    [live],
  );

  return (
    <div className="grid min-h-[calc(100dvh-4rem)] xl:grid-cols-[18rem_minmax(0,1fr)_22rem]">
      <aside className="border-b border-border bg-surface/70 p-4 xl:border-b-0 xl:border-r">
        <div className="mb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
            Persona / module deck
          </p>
          <h2 className="mt-1 font-display text-2xl">Välj kärna</h2>
        </div>

        <div className="grid gap-2">
          {personas.map((p) => {
            const Icon = ICONS[p.id];
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => select(p.id)}
                className={cn(
                  "grid grid-cols-[2.5rem_1fr] items-center gap-3 rounded-xl border border-border bg-surface-2 p-3 text-left transition",
                  p.id === id && "border-border-strong shadow-[var(--shadow-border-hover)]",
                )}
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-bg">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-lg leading-none">{p.name}</span>
                  <span className="mt-1 block truncate font-mono text-[9px] uppercase tracking-widest text-subtle">
                    {p.marker} · {p.tag}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-border bg-bg/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Live DNA</p>
          <dl className="mt-2 grid gap-2 text-xs">
            {statusRows.map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-3 border-t border-border pt-2">
                <dt className="text-muted">{k}</dt>
                <dd className="max-w-[10rem] break-all text-right font-mono text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      <main className="min-w-0">
        <section className="border-b border-border bg-gradient-to-b from-surface/70 to-bg px-5 py-6 sm:px-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-subtle">
                  {displayStatus}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-der">
                  {person.handle}
                </span>
              </div>
              <h1 className="mt-3 font-display text-5xl tracking-tight">{person.name}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{person.role}</p>
            </div>

            {person.portrait ? (
              <img
                src={person.portrait}
                alt={person.name}
                className="h-28 w-24 rounded-xl border border-border object-cover"
              />
            ) : (
              <div className="grid h-28 w-24 place-items-center rounded-xl border border-border bg-surface-2">
                {(() => {
                  const Icon = ICONS[person.id];
                  return <Icon className="h-9 w-9 text-muted" />;
                })()}
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface/70 p-4">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-subtle">
                <Wrench className="h-4 w-4" /> Skills / tools
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {displayCapabilities.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border bg-bg px-2.5 py-1.5 text-xs text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface/70 p-4">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-subtle">
                <Database className="h-4 w-4" /> Knowledge surfaces
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {displayKnowledge.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-bg px-2.5 py-1.5 text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid min-h-[34rem] grid-rows-[1fr_auto_auto]">
          <div className="grid content-start gap-3 overflow-auto p-5 sm:p-7">
            {log.map((m, i) => (
              <div
                key={`${m.who}-${i}`}
                className={cn(
                  "max-w-[88%] rounded-xl px-4 py-3 text-sm leading-6",
                  m.me
                    ? "justify-self-end bg-accent text-accent-fg"
                    : "border border-border bg-surface-2",
                )}
              >
                <p className="mb-1 font-mono text-[9px] uppercase tracking-widest opacity-65">
                  {m.who}
                </p>
                <p>{m.text}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto border-t border-border px-5 py-3 sm:px-7">
            {QUICK[id].map((q) => (
              <Button key={q} type="button" size="sm" variant="outline" onClick={() => send(q)}>
                {q}
              </Button>
            ))}
          </div>

          <form className="grid grid-cols-[1fr_auto] gap-2 border-t border-border p-4 sm:px-7" onSubmit={onSubmit}>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              placeholder={`Skriv till ${person.name}…`}
              className="min-h-14 resize-none rounded-xl border border-border-strong bg-surface px-3 py-2 text-sm text-fg"
            />
            <Button type="submit" className="self-stretch">
              <Send className="h-4 w-4" />
              Skicka
            </Button>
          </form>
        </section>
      </main>

      <aside className="border-t border-border bg-surface/60 p-4 xl:border-l xl:border-t-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">OdinOS status</p>
        <h2 className="mt-1 font-display text-2xl">Command panel</h2>

        <div className="mt-4 grid gap-3">
          {[
            [Boxes, "Personas / modules", String(personas.length)],
            [GitBranch, "DNA sync", live.origin === "dna" ? "live" : "snapshot"],
            [Database, "Canonical records", String(live.catalog.nodes.length)],
            [Network, "Bridges", String(live.catalog.bridges.length)],
            [Wrench, "Registered tools", String(runtimeRegistry.tools?.length ?? 0)],
            [Sparkles, "Registered skills", String(runtimeRegistry.skills?.length ?? 0)],
          ].map(([Icon, label, value]) => {
            const I = Icon as typeof Boxes;
            return (
              <div key={String(label)} className="rounded-xl border border-border bg-bg/60 p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm">
                    <I className="h-4 w-4 text-muted" />
                    {String(label)}
                  </span>
                  <span className="font-mono text-xs text-der">{String(value)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-xl border border-border bg-bg/60 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Dynamic adaptation</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Kort och paneler hämtar live DNA-status och <code>runtime/command-deck.json</code>.
            När skills, verktyg, kunskap eller roller uppdateras i DNA-registret läses de tillbaka
            dynamiskt utan att UPI-katalogen behöver vara huvudgränssnittet.
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-border bg-bg/60 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Chat boundary</p>
          <p className="mt-2 text-xs leading-5 text-muted">
            Den här ytan routar persona och visar lokala runtime-svar. Den är inte i sig en extern
            modellanslutning. En riktig modell/provider kan kopplas in bakom samma persona-router senare.
          </p>
        </div>
      </aside>
    </div>
  );
}
