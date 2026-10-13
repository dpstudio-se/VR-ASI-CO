import { FormEvent, useEffect, useMemo, useState } from "react";
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

const LEADS: PersonaId[] = ["angelica", "emilia"];
const LOOK: Record<string, string> = {
  angelica: "25 · honung · fräknar · knut · sjö",
  emilia: "25 · kort svart · gröna ögon · neon",
};

function loadId(): PersonaId {
  if (typeof window === "undefined") return "angelica";
  const saved = window.localStorage.getItem("vr-asi-co-lead");
  return saved && saved in PERSONAS ? (saved as PersonaId) : "angelica";
}

export function PersonaStudio() {
  const live = useLive();
  const [id, setId] = useState<PersonaId>("angelica");
  const [draft, setDraft] = useState("");
  const [log, setLog] = useState<Msg[]>([
    { who: PERSONAS.angelica.name, text: PERSONAS.angelica.greet, me: false },
  ]);

  useEffect(() => {
    const next = loadId();
    setId(next);
    setLog([{ who: PERSONAS[next].name, text: PERSONAS[next].greet, me: false }]);
  }, []);

  const person = PERSONAS[id];
  const personas = Object.values(PERSONAS);
  const leads = LEADS.map((key) => PERSONAS[key]);
  const rest = personas.filter((p) => !LEADS.includes(p.id));

  function select(next: PersonaId) {
    setId(next);
    window.localStorage.setItem("vr-asi-co-lead", next);
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
      ["Huvudperson", person.name],
      ["Slot", person.handle],
      ["DNA SHA", live.sha?.slice(0, 12) ?? "—"],
    ],
    [live, person],
  );

  return (
    <div className="grid min-h-[calc(100dvh-4rem)] xl:grid-cols-[22rem_minmax(0,1fr)_22rem]">
      <aside className="border-b border-border bg-surface/70 p-4 xl:border-b-0 xl:border-r">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">Huvudperson</p>
        <h2 className="mt-1 font-display text-2xl">Välj slot</h2>
        <div className="mt-4 grid gap-3">
          {leads.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => select(p.id)}
              className={cn(
                "rounded-2xl border p-4 text-left",
                p.id === id ? "border-fg bg-fg text-bg" : "border-border bg-surface-2",
              )}
            >
              <span className="block font-display text-2xl">{p.name}</span>
              <span className="mt-1 block text-sm opacity-80">{LOOK[p.id]}</span>
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest opacity-70">
                {p.id === id ? "aktiv" : "välj"} · {p.handle}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">Moduler</p>
        <div className="mt-3 grid gap-2">
          {rest.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => select(p.id)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left text-sm",
                p.id === id ? "border-fg" : "border-border",
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
        <dl className="mt-6 grid gap-2 text-xs">
          {statusRows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 border-t border-border pt-2">
              <dt className="text-muted">{k}</dt>
              <dd className="font-mono">{v}</dd>
            </div>
          ))}
        </dl>
      </aside>

      <main className="min-w-0">
        <section className="border-b border-border px-5 py-6 sm:px-7">
          <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Aktiv huvudperson</p>
          <h1 className="mt-2 font-display text-5xl tracking-tight">{person.name}</h1>
          <p className="mt-2 text-sm text-muted">{LOOK[person.id] ?? person.tag}</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{person.role}</p>
        </section>
        <section className="grid min-h-[34rem] grid-rows-[1fr_auto_auto]">
          <div className="grid content-start gap-3 overflow-auto p-5 sm:p-7">
            {log.map((m, i) => (
              <div
                key={`${m.who}-${i}`}
                className={cn(
                  "max-w-[88%] rounded-xl px-4 py-3 text-sm leading-6",
                  m.me ? "justify-self-end bg-accent text-accent-fg" : "border border-border bg-surface-2",
                )}
              >
                <p className="mb-1 font-mono text-[9px] uppercase tracking-widest opacity-65">{m.who}</p>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
          <form className="grid grid-cols-[1fr_auto] gap-2 border-t border-border p-4 sm:px-7" onSubmit={onSubmit}>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              placeholder={`Skriv till ${person.name}…`}
              className="min-h-14 resize-none rounded-xl border border-border-strong bg-surface px-3 py-2 text-sm"
            />
            <Button type="submit" size="lg">
              <Send className="h-4 w-4" />
              Skicka
            </Button>
          </form>
        </section>
      </main>

      <aside className="border-t border-border bg-surface/60 p-4 xl:border-l xl:border-t-0">
        <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Status</p>
        <p className="mt-2 text-sm text-muted">
          Angelica och Emilia är slot. Fel hår på fel namn är ett fel. Moduler byter inte look.
        </p>
      </aside>
    </div>
  );
}
