import { useEffect, useRef, useState } from "react";
import { Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DNA_NOTES, formatScientific, n8Index, parseDnaSequence, type DnaBase } from "@/lib/upi/physics";

export function Sonifier() {
  const [sequence, setSequence] = useState("ATGCGATACGA");
  const [playing, setPlaying] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const stopRef = useRef(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const bases = parseDnaSequence(sequence);

  useEffect(() => {
    return () => {
      stopRef.current = true;
      void ctxRef.current?.close();
    };
  }, []);

  function stop() {
    stopRef.current = true;
    setPlaying(false);
    setCursor(-1);
  }

  async function play() {
    if (bases.length === 0) return;
    stopRef.current = false;
    setPlaying(true);
    const ctx = ctxRef.current ?? new AudioContext();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    for (let i = 0; i < bases.length; i += 1) {
      if (stopRef.current) break;
      setCursor(i);
      const spec = DNA_NOTES[bases[i]];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = spec.hz;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
      await new Promise((r) => window.setTimeout(r, 320));
    }
    setPlaying(false);
    setCursor(-1);
  }

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
        status DER · software_test
      </p>
      <h2 className="mt-2 font-display text-3xl tracking-tight">DNA sonifier</h2>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Maps A→A4, C→C4, G→G4, T/U→E4. The mapping is derived acoustics for pattern reading — DNA
        strands do not emit these pitches.
      </p>

      <label className="mt-6 grid gap-2 text-sm font-medium">
        Nucleotide sequence
        <Textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          spellCheck={false}
          className="min-h-24 font-mono uppercase"
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={playing ? stop : play} disabled={!playing && bases.length === 0}>
          {playing ? <Square /> : <Play />}
          {playing ? "Stop" : "Play sequence"}
        </Button>
        <span className="self-center font-mono text-xs text-subtle">{bases.length} bases</span>
      </div>

      <ol className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6">
        {bases.map((b, i) => (
          <li
            key={`${b}-${i}`}
            className={`rounded-md px-2 py-2 text-center font-mono text-xs ${
              i === cursor ? "bg-accent text-accent-fg" : "bg-bg text-muted"
            }`}
          >
            <span className="block text-sm font-medium">{b}</span>
            <span className="block opacity-80">{DNA_NOTES[b].note}</span>
          </li>
        ))}
      </ol>

      {cursor >= 0 && bases[cursor] ? (
        <p className="mt-4 font-mono text-xs tabular-nums text-der">
          {DNA_NOTES[bases[cursor] as DnaBase].hz.toFixed(2)} Hz · N8{" "}
          {formatScientific(n8Index(DNA_NOTES[bases[cursor] as DnaBase].hz), 3)}
        </p>
      ) : null}
    </div>
  );
}
