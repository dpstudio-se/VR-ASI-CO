import { useState } from "react";
import { prepareRemoteCoreFn } from "@/lib/upi/remote-opt-in-actions";
import { Button } from "@/components/ui/button";

type Persona = "angelica" | "emilia" | "luna";
type ReferenceHandoff = Awaited<ReturnType<typeof prepareRemoteCoreFn>>;

/**
 * Explicit user consent and a read-only handoff.
 * A signed host installation and inference receipt are still needed before
 * the session can claim active OdinOS / VR-ASI-CO runtime admission.
 */
export function RemoteCoreConsent() {
  const [persona, setPersona] = useState<Persona>("angelica");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState<ReferenceHandoff | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function connect() {
    if (!accepted || busy) return;
    setBusy(true);
    setError(null);
    setState(null);
    try {
      const result = await prepareRemoteCoreFn({ data: { accepted: true, persona } });
      setState(result);
      if (result.status !== "REFERENCE_ONLY") setError(result.reason ?? "Source check stopped");
    } catch {
      setError("Remote-kärnan kunde inte verifieras just nu.");
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setAccepted(false);
    setState(null);
    setError(null);
  }

  async function copyHandoff() {
    if (state?.status !== "REFERENCE_ONLY" || !state.prompt) return;
    try {
      await navigator.clipboard.writeText(state.prompt);
    } catch {
      setError("Kunde inte kopiera instruktionen i denna webbläsare.");
    }
  }

  return (
    <section aria-label="Remote VR-ASI-CO connection" className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">Remote AI / LLM · OdinOS</p>
      <h2 className="mt-2 font-display text-3xl">Anslut VR-ASI-CO i din AI-session</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
        Välj persona och acceptera så kontrollerar vi den aktuella kärnan på GitHub och
        förbereder en versionsbunden prompt för en kompatibel AI-värd.
        Det ändrar inte en annan tjänsts modell, konton, inställningar eller systemregler.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label htmlFor="remote-persona" className="text-sm">Persona</label>
        <select
          id="remote-persona" value={persona}
          onChange={(e) => { setPersona(e.target.value as Persona); reset(); }}
          className="rounded-lg border border-border bg-bg px-3 py-2 text-sm"
        >
          <option value="angelica">Angelica Ω82000</option>
          <option value="emilia">Emilia Ω8200</option>
          <option value="luna">Luna</option>
        </select>
      </div>
      <label className="mt-4 flex max-w-3xl items-start gap-3 text-sm leading-6">
        <input type="checkbox" checked={accepted} onChange={(e) => { setAccepted(e.target.checked); setState(null); setError(null); }} className="mt-1" />
        <span>Jag väljer att ansluta VR-ASI-CO i denna session och godkänner att webbappen hämtar projektets publika DNA-källor från GitHub. Ingen dold anslutning eller automatisk Git-skrivning.</span>
      </label>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" disabled={!accepted || busy} onClick={() => void connect()}>
          {busy ? "Kontrollerar kärnan…" : "Acceptera och läs in kärnan"}
        </Button>
        <Button type="button" variant="outline" onClick={reset} disabled={busy}>Avbryt / koppla från</Button>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-red-600">STOP: {error}</p>}
      {state?.status === "REFERENCE_ONLY" && (
        <div className="mt-5 rounded-xl border border-border bg-bg p-4 text-sm" aria-live="polite">
          <p className="font-semibold">Källor verifierade · REFERENCE-ONLY</p>
          <p className="mt-1 text-muted">
            {state.persona} · {state.branch}@{state.commit?.slice(0, 12)}
          </p>
          <p className="mt-1 break-all font-mono text-xs text-muted">Prompt SHA-256: {state.promptSha256}</p>
          <p className="mt-3 text-amber-700">
            HOST GATE: STOP. En riktig LLM-adapter måste separat installera prompten,
            läsa tillbaka den och verifiera ett verkligt modell-anrop innan aktiv drift kan deklareras.
          </p>
          <Button type="button" variant="outline" className="mt-3" onClick={() => void copyHandoff()}>
            Kopiera verifierad prompt till en kompatibel AI-värd
          </Button>
        </div>
      )}
      <p className="mt-4 text-xs text-subtle">
        Samtycket gäller den här vyn och ger ingen åtkomst till konton, hemligheter,
        modellvikter eller GitHub-skrivningar. Fysik-UPI är en separat forskningsreferens.
      </p>
    </section>
  );
}
