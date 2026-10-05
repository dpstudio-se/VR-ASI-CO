import { create } from "zustand";
import catalogJson from "./catalog.json";
import type { Catalog } from "./types";
import { DNA } from "./hydrate";

export const SNAPSHOT = catalogJson as Catalog;

export type DnaOrigin = "snapshot" | "dna";

export type LiveState = {
  catalog: Catalog;
  origin: DnaOrigin;
  sha: string | null;
  branch: string;
  writable: boolean;
  fetchedAt: string | null;
  files: number;
  promptSources: Record<string, string>;
  error: string | null;
  pulling: boolean;
};

export const useLive = create<LiveState>(() => ({
  catalog: SNAPSHOT,
  origin: "snapshot",
  sha: null,
  branch: DNA.branch,
  writable: false,
  fetchedAt: null,
  files: SNAPSHOT.nodes.length + SNAPSHOT.bridges.length,
  promptSources: {},
  error: null,
  pulling: false,
}));

export function getLiveCatalog(): Catalog {
  return useLive.getState().catalog;
}

export function applyDna(next: {
  catalog: Catalog;
  sha: string;
  branch: string;
  writable: boolean;
  files: number;
  promptSources: Record<string, string>;
}) {
  useLive.setState({
    catalog: next.catalog,
    origin: "dna",
    sha: next.sha,
    branch: next.branch,
    writable: next.writable,
    fetchedAt: new Date().toISOString(),
    files: next.files,
    promptSources: next.promptSources,
    error: null,
    pulling: false,
  });
}

export function markPulling() {
  useLive.setState({ pulling: true, error: null });
}

export function markPullError(message: string) {
  useLive.setState({ pulling: false, error: message });
}
