import type { Status } from "./types";
import { CORPUS } from "./indaleko";

export type DedupKeep = "keep" | "drop";
export type DedupMode = "whole" | "fixed" | "cdc";

export type DedupMethod = {
  id: string;
  title: string;
  keep: DedupKeep;
  status: Status;
  meaning: string;
};

export const DEDUP_METHODS: DedupMethod[] = [
  {
    id: "whole",
    title: "Whole-object hash",
    keep: "keep",
    status: "EST",
    meaning: "SHA-family or FNV identity of a file. Same bytes, same id. This lab uses FNV-1a so the round-trip is synchronous.",
  },
  {
    id: "fixed",
    title: "Fixed-size chunks",
    keep: "keep",
    status: "EST",
    meaning: "Split on a byte boundary. Fast. Insert one byte and every later chunk shifts. Backup systems still use it for cold blocks.",
  },
  {
    id: "cdc",
    title: "Content-defined chunks",
    keep: "keep",
    status: "EST",
    meaning: "Cut when a rolling hash hits a mask. Insertions stay local. restic, borg, casync. Not a measurement of Indaleko.",
  },
  {
    id: "replica",
    title: "Replica arithmetic",
    keep: "keep",
    status: "DER",
    meaning: "unique = raw / copies. Algebra. Using it to read 160 TB as copies of 16.2 TB is HYP until the author names that rule.",
  },
  {
    id: "embed",
    title: "Embedding near-dup",
    keep: "drop",
    status: "SYM",
    meaning: "Similar meaning is not the same bytes. Must not close a payload STOP.",
  },
  {
    id: "uuid",
    title: "UUID semantic map",
    keep: "drop",
    status: "STOP",
    meaning: "Indaleko’s privacy identifiers. Not content-addressed storage.",
  },
];

export type Chunk = {
  hash: string;
  start: number;
  length: number;
};

function fnv1aRange(bytes: Uint8Array, start: number, end: number) {
  let h = 2166136261;
  for (let i = start; i < end; i++) {
    h ^= bytes[i]!;
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

export function fnv1a(bytes: Uint8Array) {
  return fnv1aRange(bytes, 0, bytes.length);
}

export function encodeUtf8(text: string) {
  return new TextEncoder().encode(text);
}

export function decodeUtf8(bytes: Uint8Array) {
  return new TextDecoder().decode(bytes);
}

export function fixedChunks(bytes: Uint8Array, size: number): Chunk[] {
  const n = Math.max(8, Math.floor(size));
  const out: Chunk[] = [];
  for (let i = 0; i < bytes.length; i += n) {
    const end = Math.min(bytes.length, i + n);
    out.push({ hash: fnv1aRange(bytes, i, end), start: i, length: end - i });
  }
  return out;
}

/** Gear-style CDC: cut when the rolling hash hits a mask. min/max bound the chunk. */
export function cdcChunks(bytes: Uint8Array, avg = 64): Chunk[] {
  const target = Math.max(16, Math.floor(avg));
  const mask = target - 1;
  const min = Math.max(8, Math.floor(target / 2));
  const max = target * 4;
  const out: Chunk[] = [];
  let start = 0;
  let rh = 0;
  for (let i = 0; i < bytes.length; i++) {
    rh = (Math.imul(rh, 257) + bytes[i]!) >>> 0;
    const len = i - start + 1;
    if (len >= max || (len >= min && (rh & mask) === 0) || i === bytes.length - 1) {
      out.push({ hash: fnv1aRange(bytes, start, i + 1), start, length: i + 1 - start });
      start = i + 1;
      rh = 0;
    }
  }
  return out;
}

export function wholeChunks(bytes: Uint8Array): Chunk[] {
  if (bytes.length === 0) return [];
  return [{ hash: fnv1a(bytes), start: 0, length: bytes.length }];
}

export function chunk(bytes: Uint8Array, mode: DedupMode, size = 64) {
  if (mode === "whole") return wholeChunks(bytes);
  if (mode === "fixed") return fixedChunks(bytes, size);
  return cdcChunks(bytes, size);
}

export function uniqueStore(bytes: Uint8Array, chunks: Chunk[]) {
  const store = new Map<string, Uint8Array>();
  for (const c of chunks) {
    if (!store.has(c.hash)) store.set(c.hash, bytes.slice(c.start, c.start + c.length));
  }
  let unique = 0;
  for (const part of store.values()) unique += part.length;
  return { store, unique, distinct: store.size };
}

export function replay(chunks: Chunk[], store: Map<string, Uint8Array>) {
  let total = 0;
  for (const c of chunks) total += c.length;
  const out = new Uint8Array(total);
  let o = 0;
  for (const c of chunks) {
    const part = store.get(c.hash);
    if (!part) return null;
    out.set(part, o);
    o += part.length;
  }
  return out;
}

function equalBytes(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

export type DedupResult = {
  mode: DedupMode;
  raw: number;
  unique: number;
  distinct: number;
  copies: number;
  closed: boolean;
  hash: string;
};

export function runDedup(bytes: Uint8Array, mode: DedupMode, size = 64): DedupResult {
  const chunks = chunk(bytes, mode, size);
  const stored = uniqueStore(bytes, chunks);
  const rebuilt = replay(chunks, stored.store);
  const closed = rebuilt !== null && equalBytes(bytes, rebuilt);
  return {
    mode,
    raw: bytes.length,
    unique: stored.unique,
    distinct: stored.distinct,
    copies: stored.unique === 0 ? 0 : bytes.length / stored.unique,
    closed,
    hash: fnv1a(bytes),
  };
}

/** 160 TB / 16.2 TB used. Algebra only — not a measurement. */
export function corpusReplicaFactor() {
  return CORPUS.abstract.bytes / CORPUS.body.usedBytes;
}

export function uniqueFromCopies(rawBytes: number, copies: number) {
  if (copies <= 0) return Number.NaN;
  return rawBytes / copies;
}

export function copiesFromUnique(rawBytes: number, uniqueBytes: number) {
  if (uniqueBytes <= 0) return Number.NaN;
  return rawBytes / uniqueBytes;
}

export function replicaAligns(copies: number) {
  const target = corpusReplicaFactor();
  return Math.abs(copies - target) / target < 0.02;
}

export const SAMPLE_TWIN = [
  "Planck: E = hf.",
  "Einstein: E = mc².",
  "Planck: E = hf.",
  "Einstein: E = mc².",
].join("\n");

export const SAMPLE_UNIQUE = "abcdefghijklmnopqrstuvwxyz 0123456789 Planck Einstein Lorentz.";
export const SAMPLE_BLOCK = "E = hf.\n".repeat(24);
