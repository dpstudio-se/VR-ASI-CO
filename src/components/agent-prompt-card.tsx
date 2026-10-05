import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { verifyAgentBootMirror, type AgentBootMirrorResult } from "@/lib/upi/agent-boot-mirror";
import { pullDna } from "@/lib/upi/dna-actions";
import { DNA } from "@/lib/upi/hydrate";
import { applyDna, markPullError, markPulling, useLive } from "@/lib/upi/live";
import { VSCODE_AGENT_PROMPT } from "@/lib/upi/vscode-agent-prompt";

export function AgentPromptCard() {
  const live = useLive();
  const [copied, setCopied] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [checking, setChecking] = useState(false);
  const [mirrorResult, setMirrorResult] = useState<AgentBootMirrorResult | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(VSCODE_AGENT_PROMPT);
    } catch {
      const area = document.createElement("textarea");
      area.value = VSCODE_AGENT_PROMPT;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function verifyReceipt() {
    setChecking(true);
    setMirrorResult(null);
    markPulling();
    try {
      const pulled = await pullDna();
      applyDna(pulled);
      setMirrorResult(
        verifyAgentBootMirror(receipt, {
          repository: `${DNA.owner}/${DNA.repo}`,
          branch: pulled.branch,
          commit: pulled.sha,
          files: pulled.promptSources,
        }),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      markPullError(message);
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">
        VR-ASI-CO · remote DNA boot mirror
      </p>
      <h2 className="mt-1 font-display text-3xl tracking-tight">OdinOS agent contract</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        The contract requires a fresh remote DNA and persona receipt before work. A copied chat message
        is not proof of a system prompt, and a GitHub fetch is not proof of remote model hosting. Live explorer:{" "}
        <a
          href="https://upi-built-by-agi-teax.grok.me"
          target="_blank"
          rel="noreferrer"
          className="text-fg underline-offset-4 hover:underline"
        >
          upi-built-by-agi-teax.grok.me
        </a>
        . If host evidence is missing, the boot gate must say STOP.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" onClick={() => void copy()}>
          {copied ? "Copied" : "Copy boot contract"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <a href="/upi-vscode-agent-prompt.md" download="vr-asi-co-agent-contract.md">
            Download .md
          </a>
        </Button>
        <Button type="button" variant="outline" asChild>
          <a href={DNA.html} target="_blank" rel="noreferrer">
            Open DNA
          </a>
        </Button>
      </div>
      <div className="mt-5 grid gap-3">
        <label htmlFor="agent-boot-receipt" className="text-sm font-medium">
          Verify agent boot receipt against a fresh GitHub pull
        </label>
        <Textarea
          id="agent-boot-receipt"
          value={receipt}
          onChange={(event) => setReceipt(event.target.value)}
          placeholder='Paste the agent JSON receipt here, e.g. {"repository":"…","commit":"…"}'
          aria-describedby="agent-boot-limit"
          className="min-h-36 font-mono text-xs"
        />
        <p id="agent-boot-limit" className="text-xs text-muted">
          This checks remote repository, branch, commit, universal-prompt, and persona blob SHAs.
          System-prompt installation and remote inference are reported as unverified: this app cannot
          inspect the host or prove where the model runs.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            onClick={() => void verifyReceipt()}
            disabled={checking || !receipt.trim()}
          >
            {checking ? "Pulling and verifying…" : "Pull DNA and verify"}
          </Button>
          {live.sha && (
            <span className="font-mono text-xs text-muted">
              Current pull: {live.branch}@{live.sha.slice(0, 7)}
            </span>
          )}
        </div>
        {live.error && (
          <p role="alert" className="text-sm text-red-600">
            Remote DNA pull failed: {live.error}
          </p>
        )}
        {mirrorResult && (
          <section
            aria-live="polite"
            className={`rounded-xl p-4 text-sm shadow-[var(--shadow-border)] ${
              mirrorResult.provenanceGate === "PROVENANCE_MATCH"
                ? "bg-emerald-500/10"
                : "bg-amber-500/10"
            }`}
          >
            <p className="font-semibold">
              {mirrorResult.provenanceGate === "PROVENANCE_MATCH"
                ? "SOURCE PROVENANCE MATCH"
                : "SOURCE GATE: STOP — provenance mismatch"}
            </p>
            <p className="mt-1 text-muted">
              {mirrorResult.provenanceGate === "PROVENANCE_MATCH"
                ? "The submitted source identifiers match the fresh pull. This does not verify the agent’s actual prompt layer or inference location."
                : "The receipt did not match the fresh Remote DNA state; do not treat the agent as verified."}
            </p>
            <p className="mt-2 font-semibold text-amber-700">
              OVERALL BOOT GATE: {mirrorResult.bootGate}
            </p>
            <p className="mt-2 text-xs text-muted">
              Prompt layer: {mirrorResult.promptLayerClaim} · Inference runtime:{" "}
              {mirrorResult.inferenceRuntimeClaim}
            </p>
            {mirrorResult.errors.length > 0 && (
              <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-muted">
                {mirrorResult.errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
      <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-bg p-4 font-mono text-[11px] leading-relaxed text-muted shadow-[var(--shadow-border)]">
        {VSCODE_AGENT_PROMPT.slice(0, 900)}…
      </pre>
    </div>
  );
}
