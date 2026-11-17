import type { CompanionMemoryEntry } from "./companion-types";

export const COMPANION_MEMORY_SCHEMA = 1 as const;
export const COMPANION_MEMORY_KEY = "vr-asi-co.companion-memory.v1";
export const MAX_MEMORY_ENTRIES = 100;
export const MAX_MEMORY_CONTENT_LENGTH = 2_000;

export type CompanionMemoryDocument = {
  schemaVersion: typeof COMPANION_MEMORY_SCHEMA;
  entries: CompanionMemoryEntry[];
};

export interface CompanionStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export type MemoryReadResult =
  | { status: "OK"; document: CompanionMemoryDocument }
  | { status: "EMPTY"; document: CompanionMemoryDocument }
  | { status: "INVALID"; reason: string; document: CompanionMemoryDocument };

const emptyDocument = (): CompanionMemoryDocument => ({
  schemaVersion: COMPANION_MEMORY_SCHEMA,
  entries: [],
});

function isEntry(value: unknown): value is CompanionMemoryEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.id === "string" &&
    typeof entry.content === "string" &&
    entry.content.length > 0 &&
    entry.content.length <= MAX_MEMORY_CONTENT_LENGTH &&
    ["preference", "project-context", "conversation-summary"].includes(String(entry.category)) &&
    typeof entry.createdAt === "string" &&
    typeof entry.updatedAt === "string"
  );
}

function parseDocument(raw: string): CompanionMemoryDocument | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const value = parsed as Record<string, unknown>;
    if (value.schemaVersion !== COMPANION_MEMORY_SCHEMA || !Array.isArray(value.entries)) return null;
    if (value.entries.length > MAX_MEMORY_ENTRIES || !value.entries.every(isEntry)) return null;
    return { schemaVersion: COMPANION_MEMORY_SCHEMA, entries: value.entries };
  } catch {
    return null;
  }
}

/** Read only. The caller must explicitly enable memory before writing entries. */
export function readCompanionMemory(storage: CompanionStorage): MemoryReadResult {
  const raw = storage.getItem(COMPANION_MEMORY_KEY);
  if (raw === null) return { status: "EMPTY", document: emptyDocument() };
  const document = parseDocument(raw);
  return document
    ? { status: "OK", document }
    : { status: "INVALID", reason: "Minnesformatet är ogiltigt eller har en okänd version.", document: emptyDocument() };
}

export function addCompanionMemory(
  storage: CompanionStorage,
  entry: CompanionMemoryEntry,
  options: { enabled: boolean },
): CompanionMemoryDocument {
  if (!options.enabled) throw new Error("Companion memory is disabled.");
  if (!isEntry(entry)) throw new TypeError("Invalid companion memory entry.");
  const current = readCompanionMemory(storage);
  if (current.status === "INVALID") throw new Error(current.reason);
  const entries = [entry, ...current.document.entries.filter((item) => item.id !== entry.id)]
    .slice(0, MAX_MEMORY_ENTRIES);
  const document: CompanionMemoryDocument = { schemaVersion: COMPANION_MEMORY_SCHEMA, entries };
  storage.setItem(COMPANION_MEMORY_KEY, JSON.stringify(document));
  return document;
}

export function exportCompanionMemory(storage: CompanionStorage): string {
  const result = readCompanionMemory(storage);
  if (result.status === "INVALID") throw new Error(result.reason);
  return JSON.stringify(result.document, null, 2);
}

export function clearCompanionMemory(storage: CompanionStorage): void {
  storage.removeItem(COMPANION_MEMORY_KEY);
}
