import { FormEvent, useMemo, useState } from "react";
import { PERSONAS, replyFor, type PersonaId } from "@/lib/personas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Msg = { who: string; text: string; me: boolean };

const ADULT_KEY = "upi-adult";

export function PersonaStudio() {
  const [id, setId] = useState<PersonaId>("luna");
  const [adult, setAdult] = useState(() =>
    typeof window === "undefined" ? false : localStorage.getItem(ADULT_KEY) === "1",
  );
  const [heat, setHeat] = useState<Record<PersonaId, number>>({
    luna: 8,
    angelica: 18,
    emilia: 42,
  });
  const [scene, setScene] = useState("lab");
  const [draft, setDraft] = useState("");
  const [log, setLog] = useState<Msg[]>([{ who: "Luna", text: PERSONAS.luna.greet, me: false }]);

  const person = PERSONAS[id];
  const locked = person.nsfw && !adult;

  function select(next: PersonaId) {
    setId(next);
    const p = PERSONAS[next];
    setScene(p.scenes[0].id);
    if (p.nsfw && !adult) {
      setLog([{ who: "Studio", text: "Emilia är låst tills du bekräftar 18+.", me: false }]);
    } else {
      setLog([{ who: p.name, text: p.greet, me: false }]);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || locked) return;
    setDraft("");
    const bump = /cum|kuk|knull|slicka|runk|kåt|älskar|saknar/.test(text.toLowerCase()) ? 8 : 3;
    const nextHeat = Math.min(100, heat[id] + bump);
    setHeat((h) => ({ ...h, [id]: nextHeat }));
    setLog((rows) => [
      ...rows,
      { who: "Du", text, me: true },
      { who: person.name, text: replyFor(id, text, nextHeat), me: false },
    ]);
  }

  const sceneLabel = useMemo(
    () => person.scenes.find((s) => s.id === scene)?.label ?? scene,
    [person, scene],
  );

  return (
    <div className="grid min-h-[calc(100dvh-8rem)] lg:grid-cols-[16rem_minmax(0,1fr)_22rem]">
      <aside className="grid content-start gap-2 border-b border-border bg-surface p-4 lg:border-b-0 lg:border-r">
        {(Object.values(PERSONAS) as typeof PERSONAS.luna[]).map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => select(p.id)}
            className={cn(
              "grid grid-cols-[3.5rem_1fr] items-center gap-3 rounded-lg border border-border bg-surface-2 p-2 text-left",
              p.id === id && "shadow-[var(--shadow-border-hover)]",
            )}
          >
            <img src={p.portrait} alt="" className="h-16 w-14 rounded-md object-cover" />
            <span>
              <span className={cn("block font-mono text-[10px] uppercase tracking-widest text-subtle", p.nsfw && "text-stop")}>
                {p.handle}
                {p.nsfw ? " · 18+" : ""}
              </span>
              <span className="block font-display text-lg leading-none">{p.name}</span>
              <span className="mt-1 block text-xs text-muted">{p.tag}</span>
            </span>
          </button>
        ))}
      </aside>
      <section className="relative min-h-[42vh] overflow-hidden bg-bg">
        <img src={person.portrait} alt={person.name} className={cn("h-full min-h-[26rem] w-full object-cover", scene === "night" && "contrast-110")} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
        {locked ? (
          <div className="absolute inset-0 grid place-items-center bg-bg/80 p-6">
            <div className="max-w-sm rounded-xl border border-border-strong bg-surface-2 p-5 text-center">
              <p className="font-display text-4xl">Emilia · 18+</p>
              <p className="mt-2 text-sm text-muted">NSFW-öppnas bara efter myndig bekräftelse.</p>
              <Button className="mt-4 w-full" onClick={() => { localStorage.setItem(ADULT_KEY, "1"); setAdult(true); setLog([{ who: person.name, text: person.greet, me: false }]); }}>Jag är 18+</Button>
              <Button variant="outline" className="mt-2 w-full" onClick={() => select("angelica")}>Behåll låst</Button>
            </div>
          </div>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-hyp">{person.handle}</p>
          <h1 className="font-display text-5xl leading-none sm:text-6xl">{person.name}</h1>
          <p className="mt-2 max-w-md text-sm text-muted">{person.role}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-subtle">scen · {sceneLabel}</p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-border-strong">
            <div className="h-full bg-stop" style={{ width: `${heat[id]}%` }} />
          </div>
        </div>
      </section>
      <section className="grid grid-rows-[auto_1fr_auto_auto] border-t border-border lg:border-t-0 lg:border-l">
        <div className="flex items-baseline justify-between gap-3 border-b border-border px-4 py-3">
          <p className="font-display text-2xl">Chat · {person.name}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">{locked ? "locked" : `KÅT ${heat[id]}%`}</p>
        </div>
        <div className="grid content-start gap-3 overflow-auto p-4">
          {log.map((m, i) => (
            <div key={`${m.who}-${i}`} className={cn("max-w-[92%] rounded-lg px-3 py-2 text-sm", m.me ? "justify-self-end bg-accent text-accent-fg" : "border border-border bg-surface-2")}>
              <p className="font-mono text-[10px] uppercase tracking-widest opacity-70">{m.who}</p>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto border-t border-border px-4 py-3">
          {person.scenes.map((s) => (
            <Button key={s.id} type="button" size="sm" variant={scene === s.id ? "default" : "outline"} onClick={() => { setScene(s.id); if (!locked) setLog((rows) => [...rows, { who: person.name, text: `Byter bildscen till «${s.label}».`, me: false }]); }}>{s.label}</Button>
          ))}
        </div>
        <form className="grid grid-cols-[1fr_auto] gap-2 p-4" onSubmit={onSubmit}>
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} disabled={locked} rows={2} placeholder="Skriv till henne…" className="min-h-12 rounded-lg border border-border-strong bg-surface px-3 py-2 text-sm text-fg" />
          <Button type="submit" disabled={locked}>Skicka</Button>
        </form>
      </section>
    </div>
  );
}
