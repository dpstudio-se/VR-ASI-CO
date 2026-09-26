import type { MergeCheck } from "./merge-check";

export type PrListItem = {
  number: number;
  title: string;
  state: "open" | "closed";
  draft: boolean;
  merged: boolean;
  htmlUrl: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  head: string;
  base: string;
  sha: string;
  additions: number | null;
  deletions: number | null;
  changedFiles: number | null;
};

export type PrFile = {
  path: string;
  status: string;
  additions: number;
  deletions: number;
  raw: string;
  patch: string;
};

export type PrReview = {
  user: string;
  state: string;
  body: string;
};

export type PrCheck = {
  name: string;
  status: string;
  conclusion: string | null;
};

export type PrDetail = {
  item: PrListItem;
  body: string;
  mergeable: boolean | null;
  mergeState: string | null;
  files: PrFile[];
  reviews: PrReview[];
  checks: PrCheck[];
  mergeCheck: MergeCheck;
};
