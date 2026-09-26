import type { Status } from "./types";

/** Decimal bytes, matching the dissertation’s TB/GB figures. */
const TB = 1e12;
const GB = 1e9;

export const INDALEKO_PAPER = {
  arxiv: "2602.20507",
  title: "Indaleko: the unified personal index",
  author: "William Anthony Mason",
  affiliation: "University of British Columbia",
  year: 2026,
  abs: "https://arxiv.org/abs/2602.20507",
  pdf: "https://arxiv.org/pdf/2602.20507",
  code: "https://github.com/ubc-systopia/Indaleko",
} as const;

/**
 * Two number sets in the same paper. Abstract and body are not the same corpus claim.
 * That gap is the audit, not a bug in this file.
 */
export const CORPUS = {
  abstract: { files: 31_000_000, bytes: 160 * TB, platforms: 8 },
  body: {
    files: 31_900_000,
    capacityBytes: 35.1 * TB,
    usedBytes: 16.2 * TB,
    indexBytes: 78.6 * GB,
  },
} as const;

export type CorpusRow = {
  id: string;
  label: string;
  bytes: number;
  note: string;
  status: Status;
};

export const CORPUS_ROWS: CorpusRow[] = [
  {
    id: "abstract",
    label: "Abstract payload",
    bytes: CORPUS.abstract.bytes,
    note: "“31-million file dataset spanning 160TB across eight storage platforms.”",
    status: "STOP",
  },
  {
    id: "capacity",
    label: "Body capacity",
    bytes: CORPUS.body.capacityBytes,
    note: "Chapter 5/6: 35.1 TB total capacity on the measured machines.",
    status: "DER",
  },
  {
    id: "used",
    label: "Body used",
    bytes: CORPUS.body.usedBytes,
    note: "16.2 TB used. This is the figure the index actually sat on.",
    status: "DER",
  },
  {
    id: "index",
    label: "ArangoDB index",
    bytes: CORPUS.body.indexBytes,
    note: "78.6 GB of metadata. Not the files. ≈ 0.5 % of used payload.",
    status: "EST",
  },
];

export type OpenStop = {
  id: string;
  claim: string;
  cited: string;
  status: Status;
  conflict: string;
  closesIf: string;
};

/** Open claims a knowledgeable reader can close. STOP stays until the identity is named. */
export const OPEN_STOPS: OpenStop[] = [
  {
    id: "abstract-payload",
    claim: "Abstract payload",
    cited: "160 TB, 31M files, 8 platforms",
    status: "STOP",
    conflict: "Body: 16.2 TB used of 35.1 TB capacity, 31.9M files. log₁₀ gap ≈ 0.995.",
    closesIf:
      "One sentence naming what 160 TB counts: raw, replicated (unique = raw / copies), provisioned, logical, or a leftover draft.",
  },
  {
    id: "eight-platforms",
    claim: "Eight storage platforms",
    cited: "“eight storage platforms” in the abstract",
    status: "STOP",
    conflict: "Body names NTFS, APFS, ext4, Drive, OneDrive, Dropbox, iCloud, mobile, plus activity extras. No single list of eight.",
    closesIf: "The eight names in one table or sentence.",
  },
  {
    id: "synthetic-anchors",
    claim: "Activity corpus",
    cited: "31M-file dataset with memory-anchor queries",
    status: "STOP",
    conflict: "Evaluation used synthetic activity metadata. Payload bytes ≠ measured episodes.",
    closesIf: "Which of 160 TB / 16.2 TB is measured files vs generated anchors.",
  },
];

export const HELD_ROWS: OpenStop[] = [
  {
    id: "capacity",
    claim: "Body capacity",
    cited: "35.1 TB",
    status: "DER",
    conflict: "Reported in ch. 5/6 as machine capacity.",
    closesIf: "Already a body figure. No identity gap.",
  },
  {
    id: "used",
    claim: "Body used",
    cited: "16.2 TB",
    status: "DER",
    conflict: "The payload the index sat on.",
    closesIf: "Already a body figure. No identity gap.",
  },
  {
    id: "index",
    claim: "ArangoDB index",
    cited: "78.6 GB ≈ 0.485 % of used",
    status: "EST",
    conflict: "Metadata, not blobs. Matches the paper’s ~0.5 % overhead.",
    closesIf: "Arithmetic already closes.",
  },
];

export function stopTableMarkdown() {
  const header = "| Claim | Cited | Status | Conflict | Closes if |";
  const rule = "| --- | --- | --- | --- | --- |";
  const rows = [...OPEN_STOPS, ...HELD_ROWS].map(
    (r) => `| ${r.claim} | ${r.cited} | ${r.status} | ${r.conflict} | ${r.closesIf} |`,
  );
  return [header, rule, ...rows].join("\n");
}

export const STOP_REPLY_HINT =
  "If you have the right number: name the claim id, the quantity, the unit, and the counting rule (raw / used / capacity / index / draft).";

export type PlatformKind = "storage" | "activity";

export type Platform = {
  id: string;
  title: string;
  kind: PlatformKind;
  keep: "cite" | "drop";
  meaning: string;
};

/** Abstract says eight storage platforms. Body lists these plus extra activity collectors. */
export const PLATFORMS: Platform[] = [
  { id: "ntfs", title: "NTFS / Windows", kind: "storage", keep: "cite", meaning: "Local filesystem collector. Cited, not ingested." },
  { id: "apfs", title: "APFS / macOS", kind: "storage", keep: "cite", meaning: "Local filesystem collector. Cited, not ingested." },
  { id: "ext4", title: "ext4 / Linux", kind: "storage", keep: "cite", meaning: "Local filesystem collector. Cited, not ingested." },
  { id: "gdrive", title: "Google Drive", kind: "storage", keep: "drop", meaning: "Personal cloud silo. Out of domain for a public physics ledger." },
  { id: "onedrive", title: "OneDrive", kind: "storage", keep: "drop", meaning: "Personal cloud silo. Out of domain." },
  { id: "dropbox", title: "Dropbox", kind: "storage", keep: "drop", meaning: "Personal cloud silo. Out of domain." },
  { id: "icloud", title: "iCloud", kind: "storage", keep: "drop", meaning: "Personal cloud silo. Out of domain." },
  { id: "mobile", title: "iOS / Android", kind: "storage", keep: "drop", meaning: "Personal device store. Out of domain." },
  { id: "discord", title: "Discord", kind: "activity", keep: "drop", meaning: "Activity stream, not storage. Not one of the eight." },
  { id: "spotify", title: "Spotify", kind: "activity", keep: "drop", meaning: "Ambient/environmental collector. Not physics provenance." },
  { id: "youtube", title: "YouTube", kind: "activity", keep: "drop", meaning: "Ambient collector. Dropped." },
  { id: "outlook", title: "Outlook", kind: "activity", keep: "drop", meaning: "Mail silo. Dropped." },
  { id: "ecobee", title: "Ecobee / Nest", kind: "activity", keep: "drop", meaning: "Thermostat stream. Dropped." },
];

export type IndalekoLayer = "identity" | "anchors" | "corpus" | "stack";
export type IndalekoKeep = "keep" | "drop";

export type IndalekoNode = {
  id: string;
  layer: IndalekoLayer;
  keep: IndalekoKeep;
  title: string;
  status: Status;
  meaning: string;
  href?: "/lab" | "/dna" | "/method";
};

export const INDALEKO_NODES: IndalekoNode[] = [
  {
    id: "two-names",
    layer: "identity",
    keep: "keep",
    title: "Two UPIs",
    status: "STOP",
    meaning:
      "Mason’s UPI is the Unified Personal Index. This ledger is the Universal Physics Index. Same letters, different object. Do not fork the name.",
    href: "/method",
  },
  {
    id: "three-layer",
    layer: "identity",
    keep: "keep",
    title: "Three-layer metadata",
    status: "SYM",
    meaning:
      "Storage / semantic / memory-anchor in the paper. Here: GitHub file, node meaning, chain position and status. Mapping only.",
    href: "/dna",
  },
  {
    id: "anchors",
    layer: "anchors",
    keep: "keep",
    title: "W5H → provenance",
    status: "SYM",
    meaning:
      "When, where, who, what, how become paper date, laboratory, author, experiment, apparatus. Not GPS, not Spotify.",
    href: "/lab",
  },
  {
    id: "metadata-not-blobs",
    layer: "corpus",
    keep: "keep",
    title: "Index metadata, not blobs",
    status: "EST",
    meaning:
      "The 160TB never entered ArangoDB. 78.6 GB of metadata did. This catalog is the same idea at physics scale: cite, don’t copy the payload.",
    href: "/dna",
  },
  {
    id: "paper-source",
    layer: "corpus",
    keep: "keep",
    title: "Paper as a source",
    status: "DER",
    meaning:
      "arXiv:2602.20507 is a typed source. The 160TB is a cited dataset, not a disk we mount.",
    href: "/lab",
  },
  {
    id: "collectors",
    layer: "anchors",
    keep: "keep",
    title: "Collectors we already have",
    status: "DER",
    meaning:
      "GitHub DNA, arXiv metadata, CODATA/SI, Sunet. Ten minutes to ten hours per provider is their claim. Ours are already wired.",
    href: "/dna",
  },
  {
    id: "arangodb",
    layer: "stack",
    keep: "drop",
    title: "ArangoDB / AQL",
    status: "STOP",
    meaning: "Graph store and LLM-to-AQL translation for personal files. This app is JSON on GitHub.",
  },
  {
    id: "privacy-uuid",
    layer: "stack",
    keep: "drop",
    title: "UUID privacy obfuscation",
    status: "STOP",
    meaning: "A personal-index defence. This ledger is public. Stable slugs, not hidden UUIDs.",
  },
  {
    id: "ingest",
    layer: "stack",
    keep: "drop",
    title: "Ingest the 160TB",
    status: "STOP",
    meaning: "We do not have the files, the platforms, or a reason. Evaluation also used synthetic activity metadata.",
  },
  {
    id: "llm-aql",
    layer: "stack",
    keep: "drop",
    title: "GPT-4o → AQL",
    status: "SYM",
    meaning: "Natural-language to database query is their retrieval UI. Not a physics result.",
  },
];

export const INDALEKO_LAYERS: { id: IndalekoLayer; title: string; kicker: string }[] = [
  { id: "identity", title: "Identity", kicker: "name / metadata" },
  { id: "anchors", title: "Anchors", kicker: "W5H → provenance" },
  { id: "corpus", title: "Corpus", kicker: "160 TB cited" },
];

export type AnchorMap = {
  id: string;
  paper: string;
  paperCue: string;
  physics: string;
  keep: IndalekoKeep;
  status: Status;
};

export const ANCHOR_MAP: AnchorMap[] = [
  {
    id: "temporal",
    paper: "Temporal",
    paperCue: "when the file was touched",
    physics: "CODATA year, SI brochure, paper date",
    keep: "keep",
    status: "SYM",
  },
  {
    id: "spatial",
    paper: "Spatial",
    paperCue: "GPS, Wi-Fi, “near home”",
    physics: "Laboratory or observatory, not a person’s location",
    keep: "keep",
    status: "SYM",
  },
  {
    id: "social",
    paper: "Social",
    paperCue: "shared with, Discord, Outlook",
    physics: "Authors and collaborations (Planck, Einstein)",
    keep: "keep",
    status: "SYM",
  },
  {
    id: "task",
    paper: "Task",
    paperCue: "active app, workflow stage",
    physics: "Measurement vs derivation vs software_test",
    keep: "keep",
    status: "DER",
  },
  {
    id: "environmental",
    paper: "Environmental",
    paperCue: "Spotify, thermostat, device",
    physics: "Apparatus only if it is the experiment. Personal ambient dropped.",
    keep: "drop",
    status: "STOP",
  },
];

export type SourceRelation = "cited_dataset" | "preprint" | "carrier" | "constant" | "ledger";

export type MappedSource = {
  id: string;
  title: string;
  url: string;
  relation: SourceRelation;
  bytesHeld: number | null;
  onto160: string;
  status: Status;
};

export const PHYSICS_SOURCES: MappedSource[] = [
  {
    id: "indaleko",
    title: "Indaleko BIG CORPUS",
    url: INDALEKO_PAPER.abs,
    relation: "cited_dataset",
    bytesHeld: 0,
    onto160: "This is the 160TB claim. Cited. Zero bytes loaded.",
    status: "STOP",
  },
  {
    id: "arxiv",
    title: "arXiv",
    url: "https://arxiv.org/",
    relation: "preprint",
    bytesHeld: null,
    onto160: "Holds the PDF, not the personal files. Provenance collector.",
    status: "DER",
  },
  {
    id: "github",
    title: "GitHub DNA",
    url: "https://github.com/dpstudio-se/Universal-Physics-Index-UPI",
    relation: "ledger",
    bytesHeld: null,
    onto160: "Parallel corpus: typed physics JSON. Not a slice of the 160TB.",
    status: "EST",
  },
  {
    id: "codata",
    title: "CODATA / SI",
    url: "https://physics.nist.gov/cuu/Constants/",
    relation: "constant",
    bytesHeld: null,
    onto160: "Constants, not files. No mapping onto personal payload.",
    status: "EST",
  },
  {
    id: "sunet",
    title: "Sunet",
    url: "https://www.sunet.se/",
    relation: "carrier",
    bytesHeld: 0,
    onto160: "A network that could carry 160TB. We index the service, not the bytes.",
    status: "DER",
  },
];

export type AuditResult = {
  id: string;
  title: string;
  closed: boolean;
  residual: number;
  status: Status;
  note: string;
};

function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

/** Index / used ≈ 0.485 %. Paper rounds this to “0.5 % overhead”. */
export function indexOverhead() {
  return CORPUS.body.indexBytes / CORPUS.body.usedBytes;
}

export function abstractVsUsedLog() {
  return Math.log10(CORPUS.abstract.bytes) - Math.log10(CORPUS.body.usedBytes);
}

export function runCorpusAudit(
  sources: { slug: string; canonical_url: string }[] = [],
  catalogBytes = 0,
): AuditResult[] {
  const overhead = indexOverhead();
  const gap = abstractVsUsedLog();
  const urlsOk = PHYSICS_SOURCES.filter((s) => s.url).every((s) => isHttpUrl(s.url));
  const liveUrls = sources.filter((s) => s.canonical_url.length > 0);
  const liveOk = liveUrls.length === 0 || liveUrls.every((s) => isHttpUrl(s.canonical_url));
  const arxivOk = /^\d{4}\.\d{4,5}(v\d+)?$/.test(INDALEKO_PAPER.arxiv);
  const storageEight = PLATFORMS.filter((p) => p.kind === "storage").length === 8;
  return [
    {
      id: "arxiv-id",
      title: "arXiv 2602.20507 parses",
      closed: arxivOk,
      residual: arxivOk ? 0 : 1,
      status: "EST",
      note: INDALEKO_PAPER.arxiv,
    },
    {
      id: "eight-storage",
      title: "Eight storage platforms named",
      closed: storageEight,
      residual: Math.abs(PLATFORMS.filter((p) => p.kind === "storage").length - 8),
      status: "DER",
      note: "Abstract’s eight, reconstructed from the body.",
    },
    {
      id: "index-overhead",
      title: "Index / used ≈ 0.5 %",
      closed: Math.abs(overhead - 0.00485) < 5e-4,
      residual: Math.abs(overhead - 0.00485),
      status: "EST",
      note: `${(overhead * 100).toFixed(3)} %`,
    },
    {
      id: "abstract-body",
      title: "Abstract 160TB = body used",
      closed: false,
      residual: gap,
      status: "STOP",
      note: `log₁₀ gap ${gap.toFixed(3)}. 160TB vs 16.2TB used. Left open.`,
    },
    {
      id: "source-urls",
      title: "Mapped source URLs",
      closed: urlsOk && liveOk,
      residual: urlsOk && liveOk ? 0 : 1,
      status: "DER",
      note: `${PHYSICS_SOURCES.length} mapped, ${liveUrls.length} live`,
    },
    {
      id: "not-ingested",
      title: "160TB bytes held here",
      closed: catalogBytes > 0 && catalogBytes < GB,
      residual: catalogBytes,
      status: "EST",
      note: catalogBytes ? `${catalogBytes} B of catalog JSON, not terabytes of files.` : "catalog size unknown",
    },
  ];
}

export function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes === 0) return "0 B";
  const units = ["B", "kB", "MB", "GB", "TB", "PB"] as const;
  let i = 0;
  let n = bytes;
  while (n >= 1000 && i < units.length - 1) {
    n /= 1000;
    i += 1;
  }
  const digits = n >= 100 ? 0 : n >= 10 ? 1 : 2;
  return `${n.toFixed(digits)} ${units[i]}`;
}

export function logBarPct(bytes: number, maxBytes: number) {
  if (bytes <= 0 || maxBytes <= 0) return 0;
  const t = Math.log10(bytes) / Math.log10(maxBytes);
  return Math.max(2, Math.min(100, t * 100));
}
