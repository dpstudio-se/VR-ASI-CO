import { n as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { a as string, i as object, r as number, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dna-actions-Bp8Df-0a.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var status = _enum([
	"EST",
	"DER",
	"HYP",
	"STOP",
	"ERR",
	"SYM"
]);
var address = string().regex(/^UPI<[^,]+,[0-9]+,[^,]+,[^,>]+>$/);
var lines = string().optional().transform((s) => (s ?? "").split("\n").map((x) => x.trim()).filter(Boolean));
var pullDna_createServerFn_handler = createServerRpc({
	id: "c340042f7d894c831469b785285e60ac013fc1869bcf8c7ead29a1a148c6f969",
	name: "pullDna",
	filename: "src/lib/upi/dna-actions.ts"
}, (opts) => pullDna.__executeServer(opts));
var pullDna = createServerFn({ method: "POST" }).handler(pullDna_createServerFn_handler, async () => {
	const { pullDnaCatalog } = await import("./github.server-ypupuukl.mjs");
	const pulled = await pullDnaCatalog();
	return {
		sha: pulled.sha,
		branch: pulled.branch,
		writable: pulled.writable,
		files: pulled.files,
		skipped: pulled.skipped,
		catalog: pulled.catalog
	};
});
var proposeNodeFn_createServerFn_handler = createServerRpc({
	id: "071fd21109d1532f3e2910ac3470da7bc771512ea0c8de68833432fd6fd2b8c3",
	name: "proposeNodeFn",
	filename: "src/lib/upi/dna-actions.ts"
}, (opts) => proposeNodeFn.__executeServer(opts));
var proposeNodeFn = createServerFn({ method: "POST" }).validator(object({
	domain: string().min(1),
	filename: string().min(1),
	address,
	title: string().min(1),
	description: string().min(1),
	status,
	definitions: lines,
	equations: lines,
	assumptions: lines,
	mechanism: string().optional(),
	confusion_guard: string().optional(),
	stop_reason: string().optional(),
	tags: string().optional()
})).handler(proposeNodeFn_createServerFn_handler, async ({ data }) => {
	const { proposeNode } = await import("./github.server-ypupuukl.mjs");
	return proposeNode({
		...data,
		tags: (data.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean)
	});
});
var proposeBridgeFn_createServerFn_handler = createServerRpc({
	id: "364ceb68b160d2c6d69168ecee5495cdadcbcdeaaee06dcf9beb938bf7da13d8",
	name: "proposeBridgeFn",
	filename: "src/lib/upi/dna-actions.ts"
}, (opts) => proposeBridgeFn.__executeServer(opts));
var proposeBridgeFn = createServerFn({ method: "POST" }).validator(object({
	filename: string().min(1),
	source: address,
	target: address,
	relation: string().min(1),
	status,
	equations: lines,
	assumptions: lines,
	mechanism: string().optional(),
	confusion_guard: string().optional(),
	stop_reason: string().optional()
})).handler(proposeBridgeFn_createServerFn_handler, async ({ data }) => {
	const { proposeBridge } = await import("./github.server-ypupuukl.mjs");
	return proposeBridge(data);
});
var listPrsFn_createServerFn_handler = createServerRpc({
	id: "a2094a1b12ce6357180ce71e2311db9fba9d48092b5a70f63957c9b3a1c0201e",
	name: "listPrsFn",
	filename: "src/lib/upi/dna-actions.ts"
}, (opts) => listPrsFn.__executeServer(opts));
var listPrsFn = createServerFn({ method: "POST" }).validator(object({ state: _enum([
	"open",
	"closed",
	"all"
]).default("all") })).handler(listPrsFn_createServerFn_handler, async ({ data }) => {
	const { listPullRequests } = await import("./github.server-ypupuukl.mjs");
	return listPullRequests(data.state);
});
var getPrFn_createServerFn_handler = createServerRpc({
	id: "4359b0ac9ad03bb19f40ef2e62096f31b10db701e7d428b5512ba0a1b47a5832",
	name: "getPrFn",
	filename: "src/lib/upi/dna-actions.ts"
}, (opts) => getPrFn.__executeServer(opts));
var getPrFn = createServerFn({ method: "POST" }).validator(object({ number: number().int().positive() })).handler(getPrFn_createServerFn_handler, async ({ data }) => {
	const { getPullRequest } = await import("./github.server-ypupuukl.mjs");
	return getPullRequest(data.number);
});
var mergePrFn_createServerFn_handler = createServerRpc({
	id: "d2b6437db626a7d24488f086be9fa78a173639541ad95523eca56444e020ec61",
	name: "mergePrFn",
	filename: "src/lib/upi/dna-actions.ts"
}, (opts) => mergePrFn.__executeServer(opts));
var mergePrFn = createServerFn({ method: "POST" }).validator(object({ number: number().int().positive() })).handler(mergePrFn_createServerFn_handler, async ({ data }) => {
	const { mergePullRequest } = await import("./github.server-ypupuukl.mjs");
	return mergePullRequest(data.number);
});
//#endregion
export { getPrFn_createServerFn_handler, listPrsFn_createServerFn_handler, mergePrFn_createServerFn_handler, proposeBridgeFn_createServerFn_handler, proposeNodeFn_createServerFn_handler, pullDna_createServerFn_handler };
