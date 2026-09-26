import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { INDALEKO_PAPER } from "@/lib/upi/indaleko";
import {
  ISSUE_8,
  ISSUE_8_URL,
  PINNED_ID,
  SOLUTION_KINDS,
  addSolution,
  allStops,
  filterStops,
  issueCommentMarkdown,
  loadSolutions,
  solutionsFor,
  type SolutionKind,
  type StopGroup,
  type StopItem,
  type StopSolution,
} from "@/lib/upi/stops";
import { useLive } from "@/lib/upi/live";
import { cn } from "@/lib/utils";

const GROUPS: { id: StopGroup; label: string }[] = [
  { id: "open", label: "Open" },
  { id: "indaleko", label: "Indaleko #8" },
  { id: "ledger", label: "Ledger" },
  { id: "x", label: "X feed" },
  { id: "held", label: "Held" },
];

type BoardProps = {
  selectedId?: string;
  group: StopGroup;
  q: string;
  onSelect: (id: string) => void;
  onGroup: (group: StopGroup) => void;
  onQuery: (q: string) => void;
};

export function StopBoard({ selectedId, group, q, onSelect, onGroup, onQuery }: BoardProps) {
  const catalog = useLive((s) => s.catalog);
  const items = useMemo(() => allStops(catalog), [catalog]);
  const visible = useMemo(() => filterStops(items, group, q), [items, group, q]);
  const openCount = useMemo(() => items.filter((i) => i.status === "STOP").length, [items]);
  const selected =
    visible.find((i) => i.id === selectedId) ??
    items.find((i) => i.id === selectedId) ??
    visible[0] ??
    items.find((i) => i.id === PINNED_ID) ??
    items[0]!;

  const [solutions, setSolutions] = useState<StopSolution[]>([]);
  const [kind, setKind] = useState<SolutionKind>("counting-rule");
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const mine = solutionsFor(solutions, selected.id);

  useEffect(() => {
    setSolutions(loadSolutions());
  }, []);

  function save() {
    setSolutions(addSolution(solutions, selected.id, kind, draft));
    setDraft("");
  }

  async function copy() {
    const text = issueCommentMarkdown(selected, mine);
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
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-stop">
        open STOP · {openCount} waiting
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">STOP desk</h1>
        <StatusBadge status="STOP" />
      </div>
      <p className="mt-3 max-w-2xl text-muted">
        Every unresolved identity in one place. A solution is a counting rule or a named
        measurement. Saving it here does not close the node. Issue{" "}
        <a href={ISSUE_8_URL} target="_blank" rel="noreferrer" className="text-fg underline-offset-4 hover:underline">
          #{ISSUE_8}
        </a>
        : Indaleko abstract 160 TB vs body 16.2 TB used.
      </p>

      <div className="mt-8 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">pinned · GitHub #8</p>
        <h2 className="mt-1 font-display text-3xl tracking-tight">Indaleko 160 TB</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Abstract: 160 TB, 31M files, 8 platforms. Body: 16.2 TB used of 35.1 TB capacity.
          Paper{" "}
          <a
            href={INDALEKO_PAPER.abs}
            target="_blank"
            rel="noreferrer"
            className="text-fg underline-offset-4 hover:underline"
          >
            arXiv:{INDALEKO_PAPER.arxiv}
          </a>
          . If you know what 160 TB counts, add a counting rule below.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={() => onSelect(PINNED_ID)}>
            Open 160 TB claim
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={ISSUE_8_URL} target="_blank" rel="noreferrer">
              Open issue #8
            </a>
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => onGroup(g.id)}
            className={cn(
              "h-11 rounded-md px-3 text-sm",
              group === g.id ? "bg-accent text-accent-fg" : "bg-surface text-muted hover:text-fg",
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="mt-4 max-w-xl">
        <Input
          value={q}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Filter claims…"
          aria-label="Filter STOP claims"
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl bg-surface shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="font-mono text-xs uppercase tracking-widest text-subtle">
              <th className="px-4 py-3 font-medium">Claim</th>
              <th className="px-3 py-3 font-medium">Cited</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Closes if</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-muted">
                  No STOP in this filter.
                </td>
              </tr>
            ) : (
              visible.map((item) => (
                <tr
                  key={item.id}
                  className={cn(
                    "cursor-pointer border-t border-border",
                    selected.id === item.id ? "bg-surface-2" : "hover:bg-bg/60",
                  )}
                  onClick={() => onSelect(item.id)}
                >
                  <td className="px-4 py-3 align-top">
                    <button type="button" className="text-left">
                      {item.title}
                    </button>
                    {item.issue ? (
                      <span className="mt-1 block font-mono text-[11px] uppercase tracking-widest text-subtle">
                        issue #{item.issue}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-3 align-top font-mono text-xs text-muted">{item.cited}</td>
                  <td className="px-3 py-3 align-top">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 align-top text-muted">{item.closesIf}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected ? <Detail item={selected} solutions={mine} /> : null}

      {selected?.status === "STOP" ? (
        <form
          className="mt-6 grid gap-3 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-subtle">add a solution</p>
          <h2 className="font-display text-2xl tracking-tight">Does not close STOP</h2>
          <p className="text-sm text-muted">
            Name the quantity, the unit, and the counting rule. A matching number is not an identity.
          </p>
          <div className="flex flex-wrap gap-2">
            {SOLUTION_KINDS.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setKind(k.id)}
                className={cn(
                  "h-11 rounded-md px-3 text-sm",
                  kind === k.id ? "bg-accent text-accent-fg" : "bg-bg text-muted hover:text-fg",
                )}
              >
                {k.label}
              </button>
            ))}
          </div>
          <label className="grid gap-1.5 text-sm font-medium">
            Solution
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="160 TB is … (raw / replicated / provisioned / draft leftover). Source: …"
              rows={5}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={!draft.trim()}>
              Save solution
            </Button>
            <Button type="button" variant="secondary" onClick={() => void copy()}>
              {copied ? "Copied" : "Copy for issue"}
            </Button>
            {selected.issue ? (
              <Button variant="outline" asChild>
                <a href={ISSUE_8_URL} target="_blank" rel="noreferrer">
                  Paste on #8
                </a>
              </Button>
            ) : null}
          </div>
        </form>
      ) : (
        <p className="mt-6 text-sm text-muted">Held rows are not waiting. No solution box.</p>
      )}
    </div>
  );
}

function Detail({ item, solutions }: { item: StopItem; solutions: StopSolution[] }) {
  return (
    <div className="mt-6 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">{item.id}</p>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <h2 className="font-display text-3xl tracking-tight">{item.title}</h2>
        <StatusBadge status={item.status} />
      </div>
      <p className="mt-3 text-sm text-muted">{item.conflict}</p>
      <dl className="mt-4 grid gap-0 text-sm">
        <Row label="Cited" value={item.cited} />
        <Row label="Closes if" value={item.closesIf} />
        {item.file ? <Row label="DNA" value={item.file} /> : null}
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.slug && item.kind === "node" ? (
          <Button size="sm" variant="outline" asChild>
            <Link to="/n/$slug" params={{ slug: item.slug }}>
              Open node
            </Link>
          </Button>
        ) : null}
        {item.issue ? (
          <Button size="sm" variant="outline" asChild>
            <a href={ISSUE_8_URL} target="_blank" rel="noreferrer">
              Issue #{item.issue}
            </a>
          </Button>
        ) : null}
      </div>
      <div className="mt-6 border-t border-border pt-4">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">
          solutions · {solutions.length} local
        </p>
        {solutions.length === 0 ? (
          <p className="mt-2 text-sm text-muted">None yet. Add one below.</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {solutions.map((s) => (
              <li key={s.id} className="rounded-xl bg-bg p-4 shadow-[var(--shadow-border)]">
                <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                  {s.kind} · {s.at.slice(0, 10)}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm">{s.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-border py-2">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="text-right font-mono text-xs">{value}</dd>
    </div>
  );
}
