import { useEffect, useMemo, useState } from "react";
import { getPrFn, listPrsFn, mergePrFn } from "@/lib/upi/dna-actions";
import { transcribeDna } from "@/components/dna-engine";
import { PR_STAGES, type PrStageId } from "@/lib/upi/merge-check";
import { useLive } from "@/lib/upi/live";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PrDetail, PrListItem } from "@/lib/upi/pr-types";

function inferStage(item: PrListItem | null, detail: PrDetail | null): PrStageId {
  if (!item) return "propose";
  if (item.merged) return "dna";
  if (item.state === "closed") return "pr";
  if (item.draft) return "branch";
  if (detail?.reviews.some((r) => r.state === "APPROVED")) return "merge";
  if (detail && detail.checks.length > 0) return "review";
  if (detail) return "checks";
  return "pr";
}

function stageIndex(id: PrStageId) {
  return PR_STAGES.findIndex((s) => s.id === id);
}

export function PrWorkflow({
  selected,
  onSelect,
}: {
  selected: number | null;
  onSelect: (n: number | null) => void;
}) {
  const writable = useLive((s) => s.writable);
  const [filter, setFilter] = useState<"open" | "closed" | "all">("open");
  const [list, setList] = useState<PrListItem[]>([]);
  const [detail, setDetail] = useState<PrDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  async function refreshList(state = filter) {
    setLoading(true);
    setError(null);
    try {
      const items = await listPrsFn({ data: { state } });
      setList(items);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshList(filter);
    // list filter
  }, [filter]);

  useEffect(() => {
    if (!selected) {
      setDetail(null);
      return;
    }
    let cancelled = false;
    setBusy(true);
    setError(null);
    void getPrFn({ data: { number: selected } })
      .then((d) => {
        if (!cancelled) setDetail(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => {
        if (!cancelled) setBusy(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selected]);

  const current = list.find((p) => p.number === selected) ?? detail?.item ?? null;
  const active = inferStage(current, detail);
  const activeIdx = stageIndex(active);

  const files = useMemo(() => detail?.files ?? [], [detail]);

  async function onMerge() {
    if (!selected) return;
    setBusy(true);
    setNote(null);
    try {
      const result = await mergePrFn({ data: { number: selected } });
      setNote(`Squashed into DNA at ${result.sha.slice(0, 7)}.`);
      await transcribeDna();
      await refreshList(filter);
      const next = await getPrFn({ data: { number: selected } });
      setDetail(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-12">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">Pull request workflow</p>
      <h2 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">From RNA to DNA</h2>
      <p className="mt-3 max-w-2xl text-muted">
        A pull request is a typed mutation sitting beside the index. It is not DNA until it is
        merged. Explore open, merged, and blocked requests the same way the graph explores force
        models: same ledger, different stages.
      </p>

      <div className="chip-row mt-6">
        {PR_STAGES.map((stage, i) => (
          <div
            key={stage.id}
            className={cn(
              "shrink-0 rounded-md px-3 py-2 shadow-[var(--shadow-border)]",
              i <= activeIdx ? "bg-surface-2 text-fg" : "bg-surface text-muted",
            )}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="text-sm font-medium">{stage.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        {PR_STAGES[activeIdx]?.meaning}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-w-0 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">Requests</p>
            <div className="flex gap-1">
              {(["open", "closed", "all"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    className={cn(
                      "h-11 rounded-md px-3 text-xs",
                      filter === key ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {key === "closed" ? "merged" : key}
                  </button>
                ))}
            </div>
          </div>
          {loading ? (
            <p className="mt-6 text-sm text-muted">Reading GitHub…</p>
          ) : list.length === 0 ? (
            <p className="mt-6 text-sm text-muted">No pull requests in this filter.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {list.map((item) => (
                <li key={item.number}>
                  <button
                    type="button"
                    onClick={() => onSelect(item.number)}
                    className={cn(
                      "flex w-full min-h-11 items-start justify-between gap-3 py-3 text-left",
                      selected === item.number ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    <span className="min-w-0">
                      <span className="font-mono text-xs text-subtle">#{item.number}</span>
                      <span className="mt-1 block text-sm text-fg">{item.title}</span>
                      <span className="mt-1 block font-mono text-[11px] text-subtle">
                        {item.head} → {item.base}
                        {item.merged ? " · merged" : item.draft ? " · draft" : ` · ${item.state}`}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-subtle">
                      {item.user}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="min-w-0 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
          {!selected ? (
            <p className="text-sm text-muted">Select a pull request to inspect files, checks, and merge-check.</p>
          ) : busy && !detail ? (
            <p className="text-sm text-muted">Loading #{selected}…</p>
          ) : detail ? (
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                #{detail.item.number} · {detail.item.head}
              </p>
              <h3 className="mt-1 font-display text-2xl tracking-tight">{detail.item.title}</h3>
              <p className="mt-2 text-sm text-muted">
                {detail.mergeCheck.ok ? "Merge-check passed." : `${detail.mergeCheck.fails} fail`}{" "}
                {detail.mergeCheck.warns ? `· ${detail.mergeCheck.warns} warn` : ""}
                {detail.mergeState ? ` · git ${detail.mergeState}` : ""}
              </p>
              <dl className="mt-4 grid gap-0 text-sm">
                {files.slice(0, 8).map((f) => {
                  const check = detail.mergeCheck.files.find((c) => c.path === f.path);
                  const fails = check?.issues.filter((i) => i.level === "fail").length ?? 0;
                  return (
                    <div key={f.path} className="flex items-baseline justify-between gap-3 border-t border-border py-2">
                      <dt className="min-w-0 truncate font-mono text-xs">{f.path}</dt>
                      <dd className="shrink-0 font-mono text-xs tabular-nums text-muted">
                        +{f.additions}/−{f.deletions}
                        {fails ? ` · ${fails} fail` : ""}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              {detail.mergeCheck.files.some((f) => f.issues.length) ? (
                <ul className="mt-4 grid gap-2 text-sm">
                  {detail.mergeCheck.files.flatMap((f) =>
                    f.issues.slice(0, 4).map((issue) => (
                      <li key={`${f.path}-${issue.code}`} className="text-muted">
                        <span className={issue.level === "fail" ? "text-stop" : "text-hyp"}>
                          {issue.code}
                        </span>{" "}
                        {issue.message}
                      </li>
                    )),
                  )}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-muted">No schema issues on these files.</p>
              )}
              {detail.checks.length ? (
                <ul className="mt-4 grid gap-1 text-xs text-muted">
                  {detail.checks.slice(0, 6).map((c) => (
                    <li key={c.name}>
                      {c.name}: {c.conclusion ?? c.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-xs text-muted">No check runs on this head yet.</p>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <a href={detail.item.htmlUrl} target="_blank" rel="noreferrer">
                    Open on GitHub
                  </a>
                </Button>
                {detail.item.state === "open" && !detail.item.merged ? (
                  <Button
                    type="button"
                    disabled={busy || !writable || !detail.mergeCheck.ok || detail.mergeable === false}
                    onClick={() => void onMerge()}
                  >
                    Squash into DNA
                  </Button>
                ) : null}
              </div>
              {note ? <p className="mt-3 text-sm text-muted">{note}</p> : null}
              <p className="mt-4 text-xs text-muted">
                Confusion guard: merging is a git operation. It does not make a HYP record EST.
                Checks are CI. Merge-check is UPI schema. Review is a person.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted">Could not load that pull request.</p>
          )}
          {error ? <p className="mt-3 text-sm text-stop">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}
