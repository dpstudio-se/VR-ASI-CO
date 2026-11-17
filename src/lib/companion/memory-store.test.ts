import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  addCompanionMemory,
  clearCompanionMemory,
  COMPANION_MEMORY_KEY,
  exportCompanionMemory,
  readCompanionMemory,
  type CompanionStorage,
} from "./memory-store.ts";
import type { CompanionMemoryEntry } from "./companion-types.ts";

class MemoryStorage implements CompanionStorage {
  private values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
  removeItem(key: string) { this.values.delete(key); }
}

const entry: CompanionMemoryEntry = {
  id: "pref-1",
  content: "Svara gärna kortfattat.",
  category: "preference",
  createdAt: "2026-11-17T00:00:00.000Z",
  updatedAt: "2026-11-17T00:00:00.000Z",
};

describe("Companion memory store", () => {
  it("starts empty and does not persist until explicitly enabled", () => {
    const storage = new MemoryStorage();
    assert.equal(readCompanionMemory(storage).status, "EMPTY");
    assert.throws(() => addCompanionMemory(storage, entry, { enabled: false }), /disabled/i);
    assert.equal(storage.getItem(COMPANION_MEMORY_KEY), null);
  });

  it("stores, exports and clears an opted-in entry", () => {
    const storage = new MemoryStorage();
    const saved = addCompanionMemory(storage, entry, { enabled: true });
    assert.equal(saved.entries.length, 1);
    assert.equal(readCompanionMemory(storage).status, "OK");
    assert.match(exportCompanionMemory(storage), /Svara gärna kortfattat/);
    clearCompanionMemory(storage);
    assert.equal(readCompanionMemory(storage).status, "EMPTY");
  });

  it("rejects corrupt or unknown schema without silently overwriting it", () => {
    const storage = new MemoryStorage();
    storage.setItem(COMPANION_MEMORY_KEY, JSON.stringify({ schemaVersion: 99, entries: [] }));
    assert.equal(readCompanionMemory(storage).status, "INVALID");
    assert.throws(() => addCompanionMemory(storage, entry, { enabled: true }), /ogiltigt/i);
    assert.throws(() => exportCompanionMemory(storage), /ogiltigt/i);
  });

  it("rejects invalid entries", () => {
    const storage = new MemoryStorage();
    assert.throws(
      () => addCompanionMemory(storage, { ...entry, content: "" }, { enabled: true }),
      /invalid/i,
    );
    assert.equal(storage.getItem(COMPANION_MEMORY_KEY), null);
  });

  it("replaces an entry with the same id instead of duplicating it", () => {
    const storage = new MemoryStorage();
    addCompanionMemory(storage, entry, { enabled: true });
    addCompanionMemory(storage, { ...entry, content: "Uppdaterad preferens." }, { enabled: true });
    const result = readCompanionMemory(storage);
    assert.equal(result.status, "OK");
    if (result.status === "OK") {
      assert.equal(result.document.entries.length, 1);
      assert.equal(result.document.entries[0]?.content, "Uppdaterad preferens.");
    }
  });
});
