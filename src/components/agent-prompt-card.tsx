import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VSCODE_AGENT_PROMPT } from "@/lib/upi/vscode-agent-prompt";

export function AgentPromptCard() {
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">
        VS Code · Grok xAI · 500k
      </p>
      <h2 className="mt-1 font-display text-3xl tracking-tight">Agent contract</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Paste this into a VS Code Grok (500k) chat as the first message. Live RNA is{" "}
        <a
          href="https://upi-built-by-agi-teax.grok.me"
          target="_blank"
          rel="noreferrer"
          className="text-fg underline-offset-4 hover:underline"
        >
          upi-built-by-agi-teax.grok.me
        </a>
        . GitHub main is memory. A mirror that does not close is a bug.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" onClick={() => void copy()}>
          {copied ? "Copied" : "Copy prompt"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <a href="/upi-vscode-agent-prompt.md" download="upi-vscode-agent-prompt.md">
            Download .md
          </a>
        </Button>
        <Button type="button" variant="outline" asChild>
          <a href="https://github.com/dpstudio-se/Universal-Physics-Index-UPI" target="_blank" rel="noreferrer">
            Open DNA
          </a>
        </Button>
      </div>
      <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-bg p-4 font-mono text-[11px] leading-relaxed text-muted shadow-[var(--shadow-border)]">
        {VSCODE_AGENT_PROMPT.slice(0, 900)}…
      </pre>
    </div>
  );
}
