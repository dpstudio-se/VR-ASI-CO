import type { Catalog, Status, UpiBridge, UpiNode } from "./types";
import { DNA } from "./hydrate";
import { HELD_ROWS, OPEN_STOPS } from "./indaleko";
import { X_OPEN_STOPS } from "./x-graph";

export type StopGroup = "open" | "indaleko" | "ledger" | "held" | "x";
export type StopKind = "desk" | "node" | "bridge";
export type SolutionKind = "counting-rule" | "evidence" | "close-proposal";

export type StopItem = {
  id: string;
  kind: StopKind;
  group: Exclude<StopGroup, "open">;
  title: string;
  cited: string;
  conflict: string;
  closesIf: string;
  status: Status;
  issue?: number;
  slug?: string;
  file?: string;
};

export type StopSolution = {
  id: string;
  stopId: string;
  kind: SolutionKind;
  text: string;
  at: string;
};

export const STORAGE_KEY = "upi-stop-solutions-v1";
export const LEGACY_REPLIES = "upi-stop-replies-v1";
export const ISSUE_8 = 8;
export const ISSUE_8_URL = `${DNA.html}/issues/${ISSUE_8}`;
export const PINNED_ID = "abstract-payload";

export const SOLUTION_KINDS: { id: SolutionKind; label: string }[] = [
  { id: "counting-rule", label: "Counting rule" },
  { id: "evidence", label: "Evidence" },
  { id: "close-proposal", label: "Close proposal" },
];

export function deskStops(): StopItem[] {
  return OPEN_STOPS.map((r) => ({
    id: r.id,
    kind: "desk" as const,
    group: "indaleko" as const,
    title: r.claim,
    cited: r.cited,
    conflict: r.conflict,
    closesIf: r.closesIf,
    status: r.status,
    issue: ISSUE_8,
  }));
}

export function heldStops(): StopItem[] {
  return HELD_ROWS.map((r) => ({
    id: r.id,
    kind: "desk" as const,
    group: "held" as const,
    title: r.claim,
    cited: r.cited,
    conflict: r.conflict,
    closesIf: r.closesIf,
    status: r.status,
    issue: ISSUE_8,
  }));
}

export function ledgerStops(catalog: Catalog): StopItem[] {
  const nodes: StopItem[] = catalog.nodes
    .filter((n) => n.status === "STOP")
    .map((n) => nodeToStop(n));
  const bridges: StopItem[] = catalog.bridges
    .filter((b) => b.status === "STOP")
    .map((b) => bridgeToStop(b));
  return [...nodes, ...bridges];
}

function nodeToStop(n: UpiNode): StopItem {
  return {
    id: `node:${n.slug}`,
    kind: "node",
    group: n.file.includes("indaleko") ? "indaleko" : "ledger",
    title: n.title,
    cited: n.address,
    conflict: n.stop_reason || n.description,
    closesIf:
      n.falsification_conditions[0] ??
      "Name the missing identity. STOP stays until that sentence exists.",
    status: "STOP",
    issue: n.file.includes("indaleko") ? ISSUE_8 : undefined,
    slug: n.slug,
    file: n.file,
  };
}

function bridgeToStop(b: UpiBridge): StopItem {
  return {
    id: `bridge:${b.slug}`,
    kind: "bridge",
    group: "ledger",
    title: `${shortAddr(b.source)} ${b.relation} ${shortAddr(b.target)}`,
    cited: b.relation,
    conflict: b.stop_reason || b.mechanism || "Bridge stops.",
    closesIf: "Name why the relation holds in-domain, or leave it STOP.",
    status: "STOP",
    slug: b.slug,
    file: b.file,
  };
}

function shortAddr(address: string) {
  const inner = address.replace(/^UPI</, "").replace(/>$/, "");
  const parts = inner.split(",");
  return parts[parts.length - 1] ?? address;
}

export function xDeskStops(): StopItem[] {
  return X_OPEN_STOPS.map((r) => ({
    id: r.id,
    kind: "desk" as const,
    group: "x" as const,
    title: r.title,
    cited: r.cited,
    conflict: r.conflict,
    closesIf: r.closesIf,
    status: r.status,
  }));
}

export function allStops(catalog: Catalog): StopItem[] {
  return [...deskStops(), ...xDeskStops(), ...ledgerStops(catalog), ...heldStops()];
}

export function filterStops(items: StopItem[], group: StopGroup, q: string) {
  const query = q.trim().toLowerCase();
  return items.filter((item) => {
    if (group === "open") {
      if (item.status !== "STOP") return false;
    } else if (item.group !== group) {
      return false;
    }
    if (!query) return true;
    const hay = [item.title, item.cited, item.conflict, item.closesIf, item.file ?? "", item.id]
      .join(" ")
      .toLowerCase();
    return hay.includes(query);
  });
}

export function loadSolutions(): StopSolution[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StopSolution[];
    const legacy = localStorage.getItem(LEGACY_REPLIES);
    if (!legacy) return [];
    const map = JSON.parse(legacy) as Record<string, string>;
    return Object.entries(map)
      .filter(([, text]) => text.trim())
      .map(([stopId, text]) => ({
        id: `legacy-${stopId}`,
        stopId,
        kind: "counting-rule" as const,
        text,
        at: new Date(0).toISOString(),
      }));
  } catch {
    return [];
  }
}

export function saveSolutions(rows: StopSolution[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

export function addSolution(
  rows: StopSolution[],
  stopId: string,
  kind: SolutionKind,
  text: string,
): StopSolution[] {
  const next: StopSolution = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    stopId,
    kind,
    text: text.trim(),
    at: new Date().toISOString(),
  };
  if (!next.text) return rows;
  const all = [...rows, next];
  saveSolutions(all);
  return all;
}

export function solutionsFor(rows: StopSolution[], stopId: string) {
  return rows.filter((s) => s.stopId === stopId);
}

export function issueCommentMarkdown(item: StopItem, solutions: StopSolution[]) {
  const body = solutions
    .map((s) => `- **${s.kind}** (${s.at.slice(0, 10)}): ${s.text}`)
    .join("\n");
  return [
    `### Solution · ${item.id}`,
    "",
    `**Claim:** ${item.title}`,
    `**Cited:** ${item.cited}`,
    `**Status:** ${item.status} — a reply does not auto-promote.`,
    "",
    item.conflict,
    "",
    `Closes if: ${item.closesIf}`,
    "",
    body || "_No local solutions yet._",
  ].join("\n");
}
