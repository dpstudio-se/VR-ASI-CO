import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  HELD_ROWS,
  INDALEKO_PAPER,
  OPEN_STOPS,
  STOP_REPLY_HINT,
  stopTableMarkdown,
} from "@/lib/upi/indaleko";
import { DNA } from "@/lib/upi/hydrate";
import { cn } from "@/lib/utils";

const STORAGE = "upi-stop-replies-v1";
const ISSUE_URL = `${DNA.html}/issues/8`;

type Replies = Record<string, string>;

function loadReplies(): Replies {
  try {
    const raw = localStorage.getItem(STORAGE);
    return raw ? (JSON.parse(raw) as Replies) : {};
  } catch {
    return {};
  }
}

export function StopDesk() {
  const [copied, setCopied] = useState(false);
  const [sel, setSel] = useState(OPEN_STOPS[0]!.id);
  const [replies, setReplies] = useState<Replies>({});
  const [draft, setDraft] = useState("");
  const row = [...OPEN_STOPS, ...HELD_ROWS].find((r) => r.id === sel) ?? OPEN_STOPS[0]!;
  const open = OPEN_STOPS.length;

  useEffect(() => {
    setReplies(loadReplies());
  }, []);

  useEffect(() => {
    setDraft(replies[sel] ?? "");
  }, [sel, replies]);

  function saveReply() {
    const next = { ...replies, [sel]: draft.trim() };
    setReplies(next);
    localStorage.setItem(STORAGE, JSON.stringify(next));
  }

  async function copyTable() {
    const extra = Object.entries(replies)
      .filter(([, v]) => v)
      .map(([id, v]) => `\n\n### Reply · ${id}\n${v}`)
      .join("");
    const text = `${stopTableMarkdown()}\n\n${STOP_REPLY_HINT}${extra}\n`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
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
    <div className="rounded-xl bg-bg p-4 shadow-[var(--shadow-border)]">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">
        open STOP · {open} waiting for a counting rule
      </p>
      <h3 className="mt-1 font-display text-2xl tracking-tight">Correction desk</h3>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        If you know what 160 TB counts, write it. STOP stays until the identity is named. Paper:{" "}
        <a
          href={INDALEKO_PAPER.abs}
          target="_blank"
          rel="noreferrer"
          className="text-fg underline-offset-4 hover:underline"
        >
          arXiv:{INDALEKO_PAPER.arxiv}
        </a>
        .
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="font-mono text-xs uppercase tracking-widest text-subtle">
              <th className="py-2 pr-3 font-medium">Claim</th>
              <th className="py-2 pr-3 font-medium">Cited</th>
              <th className="py-2 pr-3 font-medium">Status</th>
              <th className="py-2 font-medium">Closes if</th>
            </tr>
          </thead>
          <tbody>
            {[...OPEN_STOPS, ...HELD_ROWS].map((r) => (
              <tr
                key={r.id}
                className={cn(
                  "cursor-pointer border-t border-border",
                  sel === r.id ? "bg-surface-2" : "hover:bg-surface",
                )}
                onClick={() => setSel(r.id)}
              >
                <td className="py-3 pr-3 align-top">
                  <button type="button" className="text-left">
                    {r.claim}
                  </button>
                </td>
                <td className="py-3 pr-3 align-top font-mono text-xs text-muted">{r.cited}</td>
                <td className="py-3 pr-3 align-top">
                  <StatusBadge status={r.status} />
                </td>
                <td className="py-3 align-top text-muted">{r.closesIf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">{row.id}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <h4 className="font-display text-xl tracking-tight">{row.claim}</h4>
          <StatusBadge status={row.status} />
        </div>
        <p className="mt-2 text-sm text-muted">{row.conflict}</p>
        {row.status === "STOP" ? (
          <form
            className="mt-3 grid gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              saveReply();
            }}
          >
            <label className="grid gap-1.5 text-sm font-medium">
              Your counting rule
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="160 TB is … (raw / replicated / provisioned / draft leftover). Source: …"
                rows={4}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" size="sm">
                Save reply
              </Button>
              {replies[row.id] ? (
                <span className="self-center font-mono text-xs uppercase tracking-widest text-est">
                  saved locally
                </span>
              ) : null}
            </div>
          </form>
        ) : (
          <p className="mt-3 text-sm text-muted">Not waiting. This row already holds.</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={() => void copyTable()}>
          {copied ? "Copied" : "Copy table"}
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to="/stop" search={{ id: sel, group: "indaleko" }}>
            All STOP
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href={ISSUE_URL} target="_blank" rel="noreferrer">
            Open DNA issue
          </a>
        </Button>
      </div>
    </div>
  );
}
