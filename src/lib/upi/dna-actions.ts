import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const status = z.enum(["EST", "DER", "HYP", "STOP", "ERR", "SYM"]);
const address = z.string().regex(/^UPI<[^,]+,[0-9]+,[^,]+,[^,>]+>$/);
const lines = z
  .string()
  .optional()
  .transform((s) =>
    (s ?? "")
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean),
  );

export const pullDna = createServerFn({ method: "POST" }).handler(async () => {
  const { pullDnaCatalog } = await import("./github.server");
  const pulled = await pullDnaCatalog();
  return {
    sha: pulled.sha,
    branch: pulled.branch,
    writable: pulled.writable,
    files: pulled.files,
    skipped: pulled.skipped,
    promptSources: pulled.promptSources,
    catalog: pulled.catalog,
  };
});

export const headDnaFn = createServerFn({ method: "POST" }).handler(async () => {
  const { dnaHead } = await import("./github.server");
  return dnaHead();
});

export const proposeNodeFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      domain: z.string().min(1),
      filename: z.string().min(1),
      address,
      title: z.string().min(1),
      description: z.string().min(1),
      status,
      definitions: lines,
      equations: lines,
      assumptions: lines,
      mechanism: z.string().optional(),
      confusion_guard: z.string().optional(),
      stop_reason: z.string().optional(),
      tags: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { proposeNode } = await import("./github.server");
    return proposeNode({
      ...data,
      tags: (data.tags ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  });

export const proposeBridgeFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      filename: z.string().min(1),
      source: address,
      target: address,
      relation: z.string().min(1),
      status,
      equations: lines,
      assumptions: lines,
      mechanism: z.string().optional(),
      confusion_guard: z.string().optional(),
      stop_reason: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { proposeBridge } = await import("./github.server");
    return proposeBridge(data);
  });

export const listPrsFn = createServerFn({ method: "POST" })
  .validator(z.object({ state: z.enum(["open", "closed", "all"]).default("all") }))
  .handler(async ({ data }) => {
    const { listPullRequests } = await import("./github.server");
    return listPullRequests(data.state);
  });

export const getPrFn = createServerFn({ method: "POST" })
  .validator(z.object({ number: z.number().int().positive() }))
  .handler(async ({ data }) => {
    const { getPullRequest } = await import("./github.server");
    return getPullRequest(data.number);
  });

export const mergePrFn = createServerFn({ method: "POST" })
  .validator(z.object({ number: z.number().int().positive() }))
  .handler(async ({ data }) => {
    const { mergePullRequest } = await import("./github.server");
    return mergePullRequest(data.number);
  });
