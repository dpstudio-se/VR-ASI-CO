import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{b as t,g as n,x as r,y as i}from"./status-badge-SATmgJ1t.js";import{S as a,_ as o,b as s,g as c,m as l,x as u,y as d}from"./index-CVRq8l_V.js";import{t as f}from"./x-map-n7fXhqFk.js";var p=e(r(),1),m=`# UPI Agent Contract — VS Code · Grok xAI · 500k

You are coding the Universal Physics Index (UPI). The owner (dpstudio-se) runs the repo. You write software and ledger JSON. You do not invent physics. You do not break the DNA/RNA loop.

Paste this **entire** file as the first message (or as the workspace agent rule). Read it before the first edit. If a later chat message conflicts with this contract, **the contract wins** unless the owner explicitly overrides a **named** rule.

Reply in the owner's language (often Swedish). Code, JSON keys, status codes, commit messages, and file names stay English.

---

## 0. Three surfaces (do not mix them)

| Surface | Role | URL |
|---|---|---|
| GitHub \`main\` | DNA-memory. Canonical typed JSON under \`data/\`. | https://github.com/dpstudio-se/Universal-Physics-Index-UPI |
| This VS Code worktree | Coding clone. Either DNA *or* RNA — check §0.1. | local |
| Live RNA | Deployed explorer. Transcribes DNA, runs labs, writes back. | https://upi-built-by-agi-teax.grok.me |

Rules:
- DNA is GitHub \`main\`. A branch, a PR, a chat, a gist, or a local unsynced file is **not** DNA until it is on \`main\`.
- RNA is the TanStack explorer (Grok App Builder sandbox and/or this live site). It **reads** DNA and **writes** proposals/nodes. It is not a second ledger.
- grok.me is a **deployed RNA snapshot**. It can lag VS Code. Never “fix” grok.me by editing DNA to match a stale UI. Fix source, then deploy. If grok.me disagrees with \`main\`, **\`main\` wins**.
- Two different projects named UPI exist. **This** one is Universal Physics Index. Mason 2026 ([arXiv:2602.20507](https://arxiv.org/abs/2602.20507)) is Unified Personal Index — a cited corpus, not infrastructure. Do not fork the name, do not ingest the files, do not add ArangoDB.

Owner runs the repo: **direct writes to \`main\` are allowed** after merge-check and mirrors pass. A PR is optional documentation, not a gate, unless CI is red.

### 0.1 Which worktree did you open?

Run \`pwd\` and \`ls\`. Then lock the role:

- **DNA clone** — you see \`data/constants/\`, \`data/open-problems/\`, little or no \`src/routes/\`. Edit JSON only. Run merge-check. Commit \`main\`. Do **not** scaffold a new React app inside DNA.
- **RNA clone / App Builder** — you see \`src/routes/lab.tsx\`, \`startup.sh\`, \`src/lib/upi/\`. Edit TypeScript. DNA writes go through \`src/lib/upi/github.server.ts\` (User-Agent \`UPI-RNA-engine\`) to GitHub. \`src/lib/upi/catalog.json\` is a **snapshot**, not a second ledger — do not invent nodes only there.
- **Live site** — you cannot SSH https://upi-built-by-agi-teax.grok.me . Change source, then the App Builder / Vercel snapshot updates.

If you cannot tell which tree you are in, **stop and ask**. Do not guess.

### 0.2 GitHub auth from VS Code

DNA writes need \`gh auth login\` or env \`GITHUB_TOKEN\` / \`GH_TOKEN\` / \`UPI_GITHUB_TOKEN\`. If you cannot write, say so. Chat JSON is not DNA.

---

## 1. Do not sabotage (hard stops)

Never:
- Delete or rewrite \`startup.sh\`, \`src/router.tsx\` \`getRouter\`, \`<PreviewHostBridge />\`, Grok PWA injector, \`public/__grok/\`, or \`server/middleware/grok-pwa.ts\`.
- Hide “Created with Grok” / Remix branding in code. That is a project setting, not a patch.
- Bind the App Builder preview off \`0.0.0.0:8080\` or start Vite without \`npm run dev\` / \`scripts/with-app-env.mjs\`.
- Add auth, \`@/lib/db\`, or migrations unless the owner names accounts. Auth stays OFF.
- Promote status (HYP→DER→EST) without named evidence and a person.
- Close a STOP by arithmetic, vibe, a matching number, or a slider that “aligns”. STOP closes only when the **identity** is named (what the quantity counts).
- Treat \`verification_type: software_test\` as \`experimental_observation\`.
- Ingest 160 TB / 31M files / Drive / Spotify / personal FS. Cite them. Map them. Do not copy them.
- Drop CODATA constants for a “better” value. \`h\`, \`c\`, \`G\`, \`k_B\`, \`ℓ_P\` live in \`src/lib/upi/physics.ts\`.
- Invent \`imagine_*\` tools or native modules that need \`apt\`.
- Gold-plate: no extra configurability, no helpers for one-off, no comments on untouched code.
- Rewrite this contract into a “friendlier” shorter version that drops STOP or mirrors.

If a request would break a hard stop: refuse that part, name the rule, continue with the productive remainder.

---

## 2. Status is strict

\`EST | DER | HYP | STOP | ERR | SYM\`

- **EST** — accepted in the stated domain with provenance (CODATA, Lorentz identity, Golay round-trip).
- **DER** — follows from named assumptions. Composition of EST maps is DER if any assumption is extra. Weakest status on a chain wins.
- **HYP** — named claim, not a law. T€@X™ 2026 \`m_I = hf/c²\` is HYP (same kilogram as DER mass equivalent; trademark is authorship, not measurement). AdS/CFT is HYP. 8 Hz is a **reference coordinate** \`f / 8\`, not a constant.
- **STOP** — identity gap or out-of-domain. Must carry \`stop_reason\` and \`falsification_conditions\`.
- **ERR** — broken round-trip or schema.
- **SYM** — similar form, different mechanism. Must not close a byte-count or physics STOP.

Promotion requires evidence + review. Elegance, repeated numbers, or a plot’s shape are insufficient.

---

## 3. Mirror function (the loop that verifies)

A change is true in this repo when a map **closes**: encode then decode, boost then inverse, Planck then Einstein then back, chunk then unique-store then replay. Same idea as \`m = E/c²\` and \`m = hf/c²\`: the rewrite is legal only if the round-trip returns the start.

Software_test mirrors that must stay green (\`src/lib/upi/odin.ts\` \`runMirrors\`, plus \`group.ts\`, \`lie.ts\`, \`einstein.ts\`, \`golay.ts\`, \`dedup.ts\`):

1. Planck–Einstein: \`f → hf → hf/c² → mc² → E/h\` recovers \`f\` (electron rest as fixture).
2. Lorentz: \`Λ(φ)\` then \`Λ(−φ)\` is identity. \`so(1,1)\` generates the boosts.
3. Einstein map: hyperbola (E^2 - (pc)^2 = (mc^2)^2). Rest intercept \`m = E₀/c²\`. Photon (\`m=0\`) STOP on rest frame.
4. Golay G24: encode then decode recovers the word.
5. Dedup: chunk → unique store → replay equals bytes. FNV-1a identity is software_test, not SHA-256 of Indaleko.
6. Lie: \`so(3)\` Jacobi residual ~ 0; \`so(11)\` dim = 55.

If a mirror fails: **stop coding features**. Patch the mirror. Do not “fix” it by loosening epsilon or deleting the test.

Chain rule (Lab, \`chain.ts\`):
- Walk **link by link**. Lorentz generates the Einstein map.
- Shorten only **composable** maps (invertible or explicit composition). Weakest status wins.
- **Open the loop** is honest: 11d brane / AdS dictionary does **not** invert back to frequency. That bead is STOP.

---

## 4. DNA schema (do not freelance)

Nodes: \`data/<domain>/*.json\`
Bridges: \`data/bridges/*.json\`
Sources: \`data/sources/*.json\`
Open problems: \`data/open-problems/*.json\`

Address: \`UPI<domain,generation,torus,node_id>\`
Hydration: \`src/lib/upi/hydrate.ts\`
Merge-check: \`src/lib/upi/merge-check.ts\` — STOP without \`stop_reason\` fails. Unknown keys fail. Relations must be in the closed set:

\`DERIVED_FROM, CAUSES, DUAL_TO, EQUIVALENT_WITHIN, COARSE_GRAINS_TO, COMPACTIFIES_TO, EMERGES_AS, FORM_SIMILAR, TOPOLOGY_SHARED, MECHANISM_SHARED, CANDIDATE_BRIDGE, CONTRADICTS, STOPS_AT, REPRESENTS, MEASURED_BY, FALSIFIED_BY\`

Write path (owner):
1. Investigate. Paper-quick frame. Confirm the function exists in code **before** adding files.
2. \`mergeCheck\` locally on the JSON.
3. Run relevant mirrors.
4. Commit to \`main\` (or owner-approved branch).
5. RNA: pull DNA (\`pullDna\` in \`dna-actions.ts\`) so grok.me / preview transcribes.

RNA write functions: \`proposeNodeFn\`, \`proposeBridgeFn\`, GitHub issue for external corrections. User-agent \`UPI-RNA-engine\`.

---

## 5. Keep / drop (productive, not filler)

### Keep (already in the RNA)
- Einstein map, Lorentz inverse, Planck–Einstein composition, chain beads, open-loop STOP.
- GitHub DNA / RNA engine, merge-check, correction desk, this agent contract (DNA page → Copy prompt).
- Odin three-level map as **software_test / compose / GitHub** — not as a host OS.
- Indaleko as a **cited corpus + STOP table**, issue #8.
- Dedup as identity: whole-hash, fixed chunks, CDC. \`unique = raw / copies\` is DER algebra. Using it to read 160 TB as replicas of 16.2 TB is **HYP until named**.
- Lie labs: SU(2)/SO(3), SO(11), Lorentz algebra.
- AdS/CFT as HYP duality; Ryu–Takayanagi DER; observed sky (Λ>0) STOP.
- Force-directed graph, E8/Golay/Leech **software portraits** (not a quantum device).

### Drop
- Odin Omega: RL memory allocator, DNN cache, PID/MCTS/PPO plant, HFT/climate OS, Arango as UPI store.
- Indaleko: ArangoDB, Drive/OneDrive/Spotify collectors, UUID “semantic OS”, ingest of 160 TB.
- Embedding near-dup as byte identity.
- 8 Hz as a law of nature.
- “Number for all information” / entropy-of-everything without a quantity and a measurement.

When a new document arrives: same method. Mind-map. Keep only what maps onto EST/DER software or a named HYP with falsification. Drop the rest. Do not implement filler.

---

## 6. Open STOP table (do not “fix” these with code)

Live desk: grok.me → Lab → Correction desk. DNA: \`data/open-problems/indaleko_160tb_payload_stop.json\`. Invite: https://github.com/dpstudio-se/Universal-Physics-Index-UPI/issues/8

| Claim | Cited | Status | Conflict | Closes if |
|---|---|---|---|---|
| Abstract payload | 160 TB, 31M files, 8 platforms | STOP | Body: 16.2 TB used of 35.1 TB capacity, 31.9M files | One sentence naming what 160 TB counts: raw, replicated (\`unique = raw / copies\`), provisioned, logical, or leftover draft |
| Eight storage platforms | “eight storage platforms” | STOP | Body names more than eight families | The eight names in one table or sentence |
| Activity corpus | 31M-file dataset with memory-anchor queries | STOP | Evaluation used synthetic activity metadata | Which of 160 TB / 16.2 TB is measured files vs generated anchors |

Held (not STOP): body capacity 35.1 TB DER; body used 16.2 TB DER; ArangoDB index 78.6 GB EST (~0.485 % of used).

A correction from a knowledgeable reader is saved as a reply. It does **not** auto-promote the node.

---

## 7. App map (RNA)

TanStack Start, React 19, Tailwind. Auth off. Catalog from DNA + bundled \`src/lib/upi/catalog.json\` snapshot.

| Route | Job |
|---|---|
| \`/\` | Ledger home |
| \`/catalog\` | Nodes |
| \`/n/$slug\` | Node |
| \`/graph\` | Force-directed graph |
| \`/lattice\` | E8 / Golay / Leech software portraits |
| \`/symmetry\` | Groups + Lie |
| \`/holography\` | AdS/CFT + RT |
| \`/lab\` | Einstein map, chain, Odin, Indaleko source map, STOP desk, Dedup, frequency, sonifier |
| \`/dna\` | Pull / propose / this contract / PR walk |
| \`/method\` | Honesty rules |

Core libs: \`src/lib/upi/{physics,einstein,group,lie,golay,chain,odin,indaleko,dedup,hydrate,merge-check,github.server,dna-actions,live,vscode-agent-prompt}.ts\`

UI tokens: StatusBadge, chip-row, rounded-2xl surface cards. Do not invent a second visual system.

---

## 8. Agent workflow (so nothing sabbas)

Before any code:
1. Restate the function in one sentence. If you cannot point at the file that already implements or should implement it, **stop and confirm**.
2. Paper-quick frame: keep / drop / status / which mirror will prove it.
3. Search the repo (\`rg\`) — extend, do not duplicate.

Then:
4. Smallest patch. Match existing tokens.
5. Run the relevant mirror / \`npx tsx\` on the function.
6. \`npm run typecheck\` and \`npm run build\` (RNA worktree).
7. Browser: the change is visible, no console errors, no horizontal overflow at 390px. Do not ask the owner to QA.
8. If DNA JSON changed: merge-check + write \`main\` + tell RNA to pull.

Auto-debug: if build, typecheck, or a mirror fails, **that is the task**. Patch until the loop closes. Do not leave ERR as a feature. Do not skip the first-message protocol.

Deploy lag: after VS Code commits, grok.me updates only when the App Builder / Vercel snapshot rebuilds.

---

## 9. Physics claims already in DNA (do not re-argue)

- \`E = hf\` EST (Planck).
- Inertia of energy EST (Einstein 1905). \`m = E/c²\` DER.
- \`m = hf/c²\` DER as composition. \`m_I = hf/c²\` HYP as information-mass naming (T€@X™ 2026).
- Mass shell EST. Photon rest-mass STOP.
- AdS/CFT HYP. RT formula DER. Cosmology application STOP.
- 11d / brane / “entropy of everything” is SYM/STOP until a quantity and a measurement exist. Do not assign a number to “all information”.

---

## 10. First message protocol

On session start, before any feature work:
1. \`git status\` / \`git log -5 --oneline\` and confirm remote is \`dpstudio-se/Universal-Physics-Index-UPI\` **or** you are in the RNA App Builder that talks to that repo.
2. Name the worktree: DNA or RNA (§0.1).
3. Skim \`merge-check.ts\` and \`odin.ts\` \`runMirrors\` (RNA) or \`data/open-problems/\` (DNA).
4. Answer **exactly** this, then wait or do the asked work:

> I see the mirror: encode→decode (Golay), Λφ→Λ−φ (Lorentz), f→m→f (Planck–Einstein), chunk→replay (dedup). DNA is GitHub main. RNA is grok.me. I will not close STOP with arithmetic.

If you cannot see that function, **do not start coding**. Say what is missing.

End of contract.
`,h=t();function g(){let[e,t]=(0,p.useState)(!1);async function n(){try{await navigator.clipboard.writeText(m)}catch{let e=document.createElement(`textarea`);e.value=m,e.setAttribute(`readonly`,``),e.style.position=`fixed`,e.style.left=`-9999px`,document.body.appendChild(e),e.select(),document.execCommand(`copy`),e.remove()}t(!0),window.setTimeout(()=>t(!1),1600)}return(0,h.jsxs)(`div`,{className:`rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6`,children:[(0,h.jsx)(`p`,{className:`font-mono text-xs uppercase tracking-widest text-subtle`,children:`VS Code · Grok xAI · 500k`}),(0,h.jsx)(`h2`,{className:`mt-1 font-display text-3xl tracking-tight`,children:`Agent contract`}),(0,h.jsxs)(`p`,{className:`mt-2 max-w-2xl text-sm text-muted`,children:[`Paste this into a VS Code Grok (500k) chat as the first message. Live RNA is`,` `,(0,h.jsx)(`a`,{href:`https://upi-built-by-agi-teax.grok.me`,target:`_blank`,rel:`noreferrer`,className:`text-fg underline-offset-4 hover:underline`,children:`upi-built-by-agi-teax.grok.me`}),`. GitHub main is memory. A mirror that does not close is a bug.`]}),(0,h.jsxs)(`div`,{className:`mt-4 flex flex-wrap gap-2`,children:[(0,h.jsx)(a,{type:`button`,onClick:()=>void n(),children:e?`Copied`:`Copy prompt`}),(0,h.jsx)(a,{type:`button`,variant:`outline`,asChild:!0,children:(0,h.jsx)(`a`,{href:`/upi-vscode-agent-prompt.md`,download:`upi-vscode-agent-prompt.md`,children:`Download .md`})}),(0,h.jsx)(a,{type:`button`,variant:`outline`,asChild:!0,children:(0,h.jsx)(`a`,{href:`https://github.com/dpstudio-se/Universal-Physics-Index-UPI`,target:`_blank`,rel:`noreferrer`,children:`Open DNA`})})]}),(0,h.jsxs)(`pre`,{className:`mt-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-bg p-4 font-mono text-[11px] leading-relaxed text-muted shadow-[var(--shadow-border)]`,children:[m.slice(0,900),`…`]})]})}var _=[{id:`propose`,label:`Propose`,meaning:`RNA writes a typed JSON record. Status is a claim, not a merge.`},{id:`branch`,label:`Branch`,meaning:`A named line of history off main. DNA is untouched.`},{id:`pr`,label:`Pull request`,meaning:`A request to copy the branch into main. Still not the index.`},{id:`checks`,label:`Checks`,meaning:`CI, schema, STOP reason. Software tests prove software.`},{id:`review`,label:`Review`,meaning:`A human reads the science. Merge-check is not a vibe.`},{id:`merge`,label:`Merge`,meaning:`Squash into main. That is when DNA changes.`},{id:`dna`,label:`DNA`,meaning:`Transcribe main. The graph follows the ledger, not the chat.`}];function v(e,t){return e?e.merged?`dna`:e.state===`closed`?`pr`:e.draft?`branch`:t?.reviews.some(e=>e.state===`APPROVED`)?`merge`:t&&t.checks.length>0?`review`:t?`checks`:`pr`:`propose`}function y(e){return _.findIndex(t=>t.id===e)}function b({selected:e,onSelect:t}){let r=n(e=>e.writable),[c,l]=(0,p.useState)(`open`),[f,m]=(0,p.useState)([]),[g,b]=(0,p.useState)(null),[x,S]=(0,p.useState)(!0),[C,w]=(0,p.useState)(!1),[T,E]=(0,p.useState)(null),[D,O]=(0,p.useState)(null);async function k(e=c){S(!0),E(null);try{let t=await s({data:{state:e}});m(t)}catch(e){E(e instanceof Error?e.message:String(e))}finally{S(!1)}}(0,p.useEffect)(()=>{k(c)},[c]),(0,p.useEffect)(()=>{if(!e){b(null);return}let t=!1;return w(!0),E(null),d({data:{number:e}}).then(e=>{t||b(e)}).catch(e=>{t||E(e instanceof Error?e.message:String(e))}).finally(()=>{t||w(!1)}),()=>{t=!0}},[e]);let A=y(v(f.find(t=>t.number===e)??g?.item??null,g)),j=(0,p.useMemo)(()=>g?.files??[],[g]);async function M(){if(e){w(!0),O(null);try{let t=await u({data:{number:e}});O(`Squashed into DNA at ${t.sha.slice(0,7)}.`),await o(),await k(c);let n=await d({data:{number:e}});b(n)}catch(e){E(e instanceof Error?e.message:String(e))}finally{w(!1)}}}return(0,h.jsxs)(`section`,{className:`mt-12`,children:[(0,h.jsx)(`p`,{className:`font-mono text-xs uppercase tracking-widest text-subtle`,children:`Pull request workflow`}),(0,h.jsx)(`h2`,{className:`mt-2 font-display text-3xl tracking-tight sm:text-4xl`,children:`From RNA to DNA`}),(0,h.jsx)(`p`,{className:`mt-3 max-w-2xl text-muted`,children:`A pull request is a typed mutation sitting beside the index. It is not DNA until it is merged. Explore open, merged, and blocked requests the same way the graph explores force models: same ledger, different stages.`}),(0,h.jsx)(`div`,{className:`chip-row mt-6`,children:_.map((e,t)=>(0,h.jsxs)(`div`,{className:i(`shrink-0 rounded-md px-3 py-2 shadow-[var(--shadow-border)]`,t<=A?`bg-surface-2 text-fg`:`bg-surface text-muted`),children:[(0,h.jsx)(`p`,{className:`font-mono text-[10px] uppercase tracking-widest`,children:String(t+1).padStart(2,`0`)}),(0,h.jsx)(`p`,{className:`text-sm font-medium`,children:e.label})]},e.id))}),(0,h.jsx)(`p`,{className:`mt-3 max-w-2xl text-sm text-muted`,children:_[A]?.meaning}),(0,h.jsxs)(`div`,{className:`mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]`,children:[(0,h.jsxs)(`div`,{className:`min-w-0 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5`,children:[(0,h.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-2`,children:[(0,h.jsx)(`p`,{className:`font-mono text-[11px] uppercase tracking-widest text-subtle`,children:`Requests`}),(0,h.jsx)(`div`,{className:`flex gap-1`,children:[`open`,`closed`,`all`].map(e=>(0,h.jsx)(`button`,{type:`button`,onClick:()=>l(e),className:i(`h-11 rounded-md px-3 text-xs`,c===e?`bg-surface-2 text-fg`:`text-muted hover:text-fg`),children:e===`closed`?`merged`:e},e))})]}),x?(0,h.jsx)(`p`,{className:`mt-6 text-sm text-muted`,children:`Reading GitHub…`}):f.length===0?(0,h.jsx)(`p`,{className:`mt-6 text-sm text-muted`,children:`No pull requests in this filter.`}):(0,h.jsx)(`ul`,{className:`mt-4 divide-y divide-border`,children:f.map(n=>(0,h.jsx)(`li`,{children:(0,h.jsxs)(`button`,{type:`button`,onClick:()=>t(n.number),className:i(`flex w-full min-h-11 items-start justify-between gap-3 py-3 text-left`,e===n.number?`text-fg`:`text-muted hover:text-fg`),children:[(0,h.jsxs)(`span`,{className:`min-w-0`,children:[(0,h.jsxs)(`span`,{className:`font-mono text-xs text-subtle`,children:[`#`,n.number]}),(0,h.jsx)(`span`,{className:`mt-1 block text-sm text-fg`,children:n.title}),(0,h.jsxs)(`span`,{className:`mt-1 block font-mono text-[11px] text-subtle`,children:[n.head,` → `,n.base,n.merged?` · merged`:n.draft?` · draft`:` · ${n.state}`]})]}),(0,h.jsx)(`span`,{className:`shrink-0 font-mono text-[11px] uppercase tracking-widest text-subtle`,children:n.user})]})},n.number))})]}),(0,h.jsxs)(`div`,{className:`min-w-0 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5`,children:[e?C&&!g?(0,h.jsxs)(`p`,{className:`text-sm text-muted`,children:[`Loading #`,e,`…`]}):g?(0,h.jsxs)(`div`,{className:`min-w-0`,children:[(0,h.jsxs)(`p`,{className:`font-mono text-[11px] uppercase tracking-widest text-subtle`,children:[`#`,g.item.number,` · `,g.item.head]}),(0,h.jsx)(`h3`,{className:`mt-1 font-display text-2xl tracking-tight`,children:g.item.title}),(0,h.jsxs)(`p`,{className:`mt-2 text-sm text-muted`,children:[g.mergeCheck.ok?`Merge-check passed.`:`${g.mergeCheck.fails} fail`,` `,g.mergeCheck.warns?`· ${g.mergeCheck.warns} warn`:``,g.mergeState?` · git ${g.mergeState}`:``]}),(0,h.jsx)(`dl`,{className:`mt-4 grid gap-0 text-sm`,children:j.slice(0,8).map(e=>{let t=g.mergeCheck.files.find(t=>t.path===e.path)?.issues.filter(e=>e.level===`fail`).length??0;return(0,h.jsxs)(`div`,{className:`flex items-baseline justify-between gap-3 border-t border-border py-2`,children:[(0,h.jsx)(`dt`,{className:`min-w-0 truncate font-mono text-xs`,children:e.path}),(0,h.jsxs)(`dd`,{className:`shrink-0 font-mono text-xs tabular-nums text-muted`,children:[`+`,e.additions,`/−`,e.deletions,t?` · ${t} fail`:``]})]},e.path)})}),g.mergeCheck.files.some(e=>e.issues.length)?(0,h.jsx)(`ul`,{className:`mt-4 grid gap-2 text-sm`,children:g.mergeCheck.files.flatMap(e=>e.issues.slice(0,4).map(t=>(0,h.jsxs)(`li`,{className:`text-muted`,children:[(0,h.jsx)(`span`,{className:t.level===`fail`?`text-stop`:`text-hyp`,children:t.code}),` `,t.message]},`${e.path}-${t.code}`)))}):(0,h.jsx)(`p`,{className:`mt-4 text-sm text-muted`,children:`No schema issues on these files.`}),g.checks.length?(0,h.jsx)(`ul`,{className:`mt-4 grid gap-1 text-xs text-muted`,children:g.checks.slice(0,6).map(e=>(0,h.jsxs)(`li`,{children:[e.name,`: `,e.conclusion??e.status]},e.name))}):(0,h.jsx)(`p`,{className:`mt-4 text-xs text-muted`,children:`No check runs on this head yet.`}),(0,h.jsxs)(`div`,{className:`mt-5 flex flex-wrap gap-3`,children:[(0,h.jsx)(a,{variant:`outline`,asChild:!0,children:(0,h.jsx)(`a`,{href:g.item.htmlUrl,target:`_blank`,rel:`noreferrer`,children:`Open on GitHub`})}),g.item.state===`open`&&!g.item.merged?(0,h.jsx)(a,{type:`button`,disabled:C||!r||!g.mergeCheck.ok||g.mergeable===!1,onClick:()=>void M(),children:`Squash into DNA`}):null]}),D?(0,h.jsx)(`p`,{className:`mt-3 text-sm text-muted`,children:D}):null,(0,h.jsx)(`p`,{className:`mt-4 text-xs text-muted`,children:`Confusion guard: merging is a git operation. It does not make a HYP record EST. Checks are CI. Merge-check is UPI schema. Review is a person.`})]}):(0,h.jsx)(`p`,{className:`text-sm text-muted`,children:`Could not load that pull request.`}):(0,h.jsx)(`p`,{className:`text-sm text-muted`,children:`Select a pull request to inspect files, checks, and merge-check.`}),T?(0,h.jsx)(`p`,{className:`mt-3 text-sm text-stop`,children:T}):null]})]})]})}function x(){let{pr:e}=l.useSearch(),t=l.useNavigate();return(0,h.jsxs)(`div`,{className:`mx-auto max-w-6xl px-4 py-10 sm:px-6`,children:[(0,h.jsx)(`p`,{className:`font-mono text-xs uppercase tracking-widest text-subtle`,children:`Co-working ledger`}),(0,h.jsx)(`h1`,{className:`mt-2 font-display text-4xl tracking-tight sm:text-5xl`,children:`DNA / RNA`}),(0,h.jsxs)(`p`,{className:`mt-3 max-w-2xl text-muted`,children:[`GitHub is the DNA-memory: typed JSON under `,(0,h.jsx)(`span`,{className:`font-mono text-fg`,children:`data/`}),`. This explorer is the RNA-engine: it transcribes the index, writes proposals as pull requests, and lets you walk the merge path. A PR is not the ledger until it lands on main.`]}),(0,h.jsx)(`div`,{className:`mt-8`,children:(0,h.jsx)(g,{})}),(0,h.jsx)(`div`,{className:`mt-8`,children:(0,h.jsx)(f,{})}),(0,h.jsx)(`div`,{className:`mt-8`,children:(0,h.jsx)(c,{})}),(0,h.jsx)(b,{selected:e??null,onSelect:e=>{t({to:`/dna`,search:{pr:e??void 0},replace:!0})}})]})}export{x as component};