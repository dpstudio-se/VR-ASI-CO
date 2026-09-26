import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { X_ACCOUNT, X_CLAIMS, X_PEERS, xCounts, type XClaim } from "@/lib/upi/x-graph";
import { cn } from "@/lib/utils";

export function XMap() {
  const counts = xCounts();
  const [sel, setSel] = useState("sm-close");
  const claim = X_CLAIMS.find((c) => c.id === sel) ?? X_CLAIMS[0]!;
  const layers = useMemo(() => {
    const ids = [...new Set(X_CLAIMS.map((c) => c.layer))];
    return ids.map((id) => ({
      id,
      rows: X_CLAIMS.filter((c) => c.layer === id),
    }));
  }, []);

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">
        X graph · @{X_ACCOUNT.handle} · {counts.already} already DNA · {counts.cite} unmapped · {counts.drop} drop
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h2 className="font-display text-3xl tracking-tight">Feed map</h2>
        <StatusBadge status="STOP" />
      </div>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Public posts from{" "}
        <a href={X_ACCOUNT.url} target="_blank" rel="noreferrer" className="text-fg underline-offset-4 hover:underline">
          @{X_ACCOUNT.handle}
        </a>
        . Follower and following lists are not in this search surface — replies and critiques are.
        A tweet is a source, not DNA, until it lands as a typed node.
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <Stat label="Claims" value={String(counts.claims)} />
        <Stat label="Already" value={String(counts.already)} />
        <Stat label="Cite" value={String(counts.cite)} />
        <Stat label="STOP" value={String(counts.stop)} />
      </dl>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4">
          {layers.map((layer) => (
            <section key={layer.id}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">{layer.id}</p>
              <ul className="mt-2 grid gap-1">
                {layer.rows.map((row) => (
                  <li key={row.id}>
                    <button
                      type="button"
                      onClick={() => setSel(row.id)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm",
                        sel === row.id ? "bg-bg shadow-[var(--shadow-border)]" : "hover:bg-bg/60",
                      )}
                    >
                      <span className="min-w-0 truncate">{row.title}</span>
                      <span className="flex shrink-0 items-center gap-2">
                        <KeepChip keep={row.keep} />
                        <StatusBadge status={row.status} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <Detail claim={claim} />
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">interaction graph</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {X_PEERS.map((p) => (
            <li key={p.handle} className="rounded-xl bg-bg p-3 shadow-[var(--shadow-border)]">
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`https://x.com/${p.handle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm hover:underline"
                >
                  @{p.handle}
                </a>
                <KeepChip keep={p.keep} />
              </div>
              <p className="mt-1 text-xs text-muted">{p.role} · {p.note}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" asChild>
          <Link to="/stop" search={{ group: "x", id: "x-sm-close" }}>
            Open X STOP
          </Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <a href={X_ACCOUNT.url} target="_blank" rel="noreferrer">
            @{X_ACCOUNT.handle}
          </a>
        </Button>
      </div>
    </div>
  );
}

function Detail({ claim }: { claim: XClaim }) {
  return (
    <div className="rounded-xl bg-bg p-4 shadow-[var(--shadow-border)]">
      <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">{claim.id}</p>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <h3 className="font-display text-2xl tracking-tight">{claim.title}</h3>
        <StatusBadge status={claim.status} />
      </div>
      <p className="mt-2 text-sm text-muted">{claim.meaning}</p>
      <p className="mt-3 font-mono text-xs text-subtle">{claim.cited}</p>
      {claim.mapsTo ? (
        <p className="mt-3">
          <Link
            to="/n/$slug"
            params={{ slug: claim.mapsTo }}
            className="text-sm text-fg underline-offset-4 hover:underline"
          >
            Open DNA node
          </Link>
        </p>
      ) : (
        <p className="mt-3 text-sm text-muted">No DNA node. Cite only, or drop.</p>
      )}
      {claim.post ? (
        <p className="mt-2">
          <a
            href={`https://x.com/${X_ACCOUNT.handle}/status/${claim.post}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted underline-offset-4 hover:underline"
          >
            post {claim.post}
          </a>
        </p>
      ) : null}
    </div>
  );
}

function KeepChip({ keep }: { keep: "cite" | "already" | "drop" }) {
  const label = keep === "already" ? "DNA" : keep;
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-widest",
        keep === "drop" ? "text-subtle" : keep === "already" ? "text-est" : "text-der",
      )}
    >
      {label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-bg px-3 py-2 shadow-[var(--shadow-border)]">
      <dt className="font-mono text-[11px] uppercase tracking-widest text-subtle">{label}</dt>
      <dd className="font-display text-2xl tracking-tight">{value}</dd>
    </div>
  );
}
