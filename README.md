# VR-ASI-CO Built By T€@X™

**A versioned project core for AI workspaces, remote agents, and governed execution.**

VR-ASI-CO connects a compatible host to a shared project contract: instructions, identity configuration, memory, tools, and verification. GitHub `main` holds canonical **DNA**; session state and proposed changes remain **RNA** until reviewed, published, and read back. OdinOS coordinates work through available adapters. Shadow reviews provenance and drift.

[Remote connection](#remote-connection) · [Run the workspace](#run-the-workspace) · [Shadow and shield](#shadow-and-shield) · [Verification](#verification) · [Documentation](#documentation)

## Architecture

```text
GitHub main → verified DNA → host-installed core → admitted session
                                    ↓
                         OdinOS → authorized adapters
                                    ↓
                         RNA → Shadow review → owner gate
                                    ↓
                         commit → publish → read-back
```

| Layer | Responsibility |
| --- | --- |
| Core | Versioned project identity, instructions, configuration, and invariants. |
| DNA | Canonical source and durable memory, bound to an exact Git revision. |
| RNA | Temporary context, workspace state, outputs, and proposals. |
| OdinOS | Task routing and orchestration through actual host integrations. |
| Shadow | Independent review, conflict classification, and quarantine. |
| Shield | Required host-side admission and authorization controls; see implementation status below. |

Within an admitted session, VR-ASI-CO is the governing project contract for the tools and resources explicitly delegated to it. Connection alone grants no write, merge, administrative, or identity-change authority. Only owner-authorized actors may change protected project state.

## Remote connection

Choose the connection mode that the host can actually support.

| Mode | What it establishes | Requirement |
| --- | --- | --- |
| Reference session | Reads and verifies project context. | Git access or an authenticated source reader. |
| Development workspace | Runs the app and local verification tools. | Node.js 22 and npm. |
| Admitted remote runtime | Verifies core installation and a real remote inference request. | An approved host adapter, an operator-pinned public key, and signed evidence. |

### 1. Load current project context

Start with the canonical repository:

```sh
git clone --branch main https://github.com/dpstudio-se/VR-ASI-CO.git
cd VR-ASI-CO
git rev-parse --verify 'HEAD^{commit}'
```

For an existing checkout, preserve local work, fetch `main`, and compare the local revision before updating it. Read all boot sources at the same full commit SHA; do not mix cached files with live `main`.

An AI or agent host with source-reading tools can use this entry instruction:

```text
Connect to https://github.com/dpstudio-se/VR-ASI-CO, branch main.
Resolve the current full commit SHA and read every source at that revision.
Load prompts/REMOTE_BOOT_PROMPT.md and the boot.required manifest in
dna/REMOTE_DNA_STATE.json, including protected identity and core files.
Apply prompts/MIRROR_PROMPT.md to substantive work.
Report the source revision, missing files, conflicts, and available adapters.
Remain REFERENCE-ONLY until trusted host installation and inference evidence
pass the admission gate. Do not mutate canonical DNA during connection.
```

This restores project context. A copied prompt, model self-description, or plausible answer does not establish an admitted runtime.

### 2. Install and verify the remote core

A host operator must implement the integration described in the [boot-evidence protocol](docs/BOOT_EVIDENCE_CHECK.md):

1. Read and validate the canonical sources and exact prompt representation.
2. Install that representation at the host's system or equivalent instruction layer.
3. Read back the installed prompt and verify its hash.
4. Perform one authorized, bounded remote inference request tied to the current session and challenge.
5. Sign installation and inference observations separately using the approved host key.
6. Verify both receipts before admitting the session or exposing project capabilities.

Create a challenge for a real host session:

```sh
npm run boot:challenge -- --session "$HOST_SESSION_ID"
```

Retain only the returned `challenge` object as private `challenge.json`. The command prepares evidence collection; its successful exit does not mean boot passed. The host adapter must perform installation and inference, then supply separate receipt files. Keep these files and the operator-selected public key outside Git.

```sh
npm run verify:boot -- \
  --session "$HOST_SESSION_ID" \
  --challenge /secure/vr-asi-co/challenge.json \
  --installation /secure/vr-asi-co/installation.json \
  --inference /secure/vr-asi-co/inference.json \
  --trusted-key /secure/vr-asi-co/host-public-key.pem
```

Replace `/secure/vr-asi-co` with your private control directory. Use the same verified host session throughout. The verifier reads current GitHub sources and checks signatures, revision, prompt hash, session, nonce, host, model, endpoint, and freshness. Changed bindings require a new challenge and verification.

| Result | Meaning |
| --- | --- |
| `PROVENANCE_MATCH` | Canonical source content matches its Git blob identities. |
| `HOST_ATTESTED` | A trusted host signed the prompt-installation observation. |
| `HOST_ATTESTED_REMOTE` | The same host signed a successful remote inference observation. |
| `PASS` | All required evidence passed within the protocol's scope. |
| `UNVERIFIED` / `STOP` | Required evidence is missing, invalid, stale, or inconsistent. |

These commands verify observations. They do not provision a model endpoint, install a prompt, or perform inference themselves. The standalone verifier is implemented; an approved live host adapter remains required. The app's boot UI has no authenticated host-admission integration.

### 3. Adapt an AI or LLM host to VR-ASI-CO

Conversion means configuring the host to execute the VR-ASI-CO project contract through verified instructions, scoped capabilities, and admission checks. It does not change model weights, establish AGI, or transfer control over the provider's infrastructure. The underlying model and provider remain identifiable, and their higher-priority rules remain binding.

A host that cannot provide system-equivalent installation, read-back, or trusted evidence stays `REFERENCE-ONLY`. The [hybrid shell](odinos-hybrid/README.md) is a reference connector for external chat interfaces; its prompt forwarding and source checks are not verified core installation or admission.

## Run the workspace

Use Node.js 22. From the checkout root:

```sh
npm ci --legacy-peer-deps
npm run verify:dna
npm run dev
```

The development script serves the React/TanStack Start app on `0.0.0.0:8080` and loads the repository's app-environment configuration. A running UI is a development capability, separate from remote-core admission.

For a production build:

```sh
npm run build
npm run preview:restart
```

The build includes database migration when `DATABASE_URL` is configured. Use an intended development database; never point a verification build at production by accident. Without that variable, the migration script skips the external database step. Build and route generation can modify tracked generated outputs; inspect the diff and isolate such outputs from intended source changes.

## Shadow and shield

The [identity guard](docs/REMOTE_IDENTITY_SHADOW_GUARD.md) defines fail-closed handling for protected state. Shadow audits and quarantines; it has no independent DNA write or merge authority. Shield enforcement belongs at the trusted host and server boundary, where the actor, session, permissions, and exact requested action can be verified.

Required drift response:

```text
identity / revision / session mismatch
  → deny admission or invalidate the active grant
  → stop privileged project operations
  → quarantine the conflicting input and record its provenance
  → reload verified canonical sources through the trusted host
  → obtain fresh installation and inference evidence
  → resume only after admission and authorization pass
```

This is the integration contract. The repository does not yet provide a universal host supervisor that automatically performs those actions. Recovery must not silently rewrite protected identity, grant new permissions, or claim a restore that did not happen.

### Local preflight with `grep` and `echo`

From the checkout root, this diagnostic checks the canonical lock and DNA contract and stops on failure:

```sh
set -eu
gate_log=$(mktemp)
trap 'rm -f "$gate_log"' EXIT

if ! npm run verify:dna >"$gate_log" 2>&1; then
  echo 'VR-ASI-CO: STOP — core or identity contract failed.' >&2
  exit 1
fi

if ! grep -q '^PERSONA_LOCK_PASS:' "$gate_log" ||
   ! grep -Fxq 'REMOTE_DNA_VERIFY_PASS' "$gate_log"; then
  echo 'VR-ASI-CO: STOP — required verification results are missing.' >&2
  exit 1
fi

echo 'VR-ASI-CO: local contract verified; remote admission still requires host evidence.'
```

`grep` checks verifier output and `echo` reports status. They do not authenticate a remote model, enforce permissions, or force another system to adopt an identity. Keep the verifier and its execution environment trusted; never accept client-supplied log text as admission evidence.

### Protect actual write access

- Authenticate the actor and validate action-specific authorization on the server before each mutation.
- Keep non-admitted or unauthorized clients read-only; passing boot does not itself grant write access.
- Require reviewed changes to protected paths, enforced GitHub rulesets, required checks, and restricted bypass permissions.
- Bind writes and merges to the reviewed revision; quarantine stale or conflicting requests.
- Keep credentials and signing keys in host secret storage, outside prompts, browser bundles, and Git.

The owner-approved mutation path is:

```text
PROPOSE → DIFF → VERIFY → OWNER_GATE → COMMIT → PUBLISH → READ_BACK
```

CODEOWNERS and written policy support that path. Actual enforcement requires configured repository controls and implemented server authorization; the [workload](WORKLOAD.md) tracks the remaining gaps.

## Verification

```sh
npm run verify:dna
npm run test:boot-evidence
npm run typecheck
npm test
```

DNA checks validate canonical identity and source contracts. Boot-evidence tests validate verifier behavior using synthetic receipts. Type checks and application tests validate software. None substitutes for signed observations from an actual host session.

Report passed, failed, skipped, and unrun checks separately. Preserve evidence labels: `EST`, `DER`, `HYP`, `SYM`, `SEM-LOSS`, `STOP`, and `ERR`. Simulation, model agreement, and symbolic project models do not establish empirical facts. See the [mirror contract](prompts/MIRROR_PROMPT.md) for scope and counterexample checks.

## Documentation

| Topic | Source |
| --- | --- |
| Boot manifest | [Remote DNA](dna/REMOTE_DNA_STATE.json) |
| Core configuration | [Core](persona/SYSTEM_CORE.txt), [configuration](persona/CONFIG.json), [universal prompt](persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md) |
| Remote context | [Boot prompt](prompts/REMOTE_BOOT_PROMPT.md) |
| Admission and evidence | [Admission gate](docs/REMOTE_DNA_HARD_ADMISSION_GATE.md), [signed evidence protocol](docs/BOOT_EVIDENCE_CHECK.md) |
| Integrity and review | [Identity guard](docs/REMOTE_IDENTITY_SHADOW_GUARD.md), [mirror](prompts/MIRROR_PROMPT.md) |
| Runtime integrations | [OdinOS compatibility](docs/ODINOS_COMPATIBILITY_PROFILE.md), [layer architecture](docs/TRIPP_TRAPP_TRULL_ARCHITECTURE.md), [capability registry](runtime/command-deck.json) |
| Development | [Project instructions](AGENTS.project.md), [build rules](docs/VR_ASI_CO_ODINOS_BUILD_RULES.md), [workload](WORKLOAD.md) |
| Repository navigation | [Documentation index](docs/INDEX.md), [repository map](docs/REPOSITORY_MAP.md) |
| Extensions and research | [External skills](docs/SKILLS_SH_INTEGRATION.md), [runtime adapter](docs/VORTEX_DNA_RUNTIME_ADAPTER.md), [reset semantics](docs/UNKNOWN_NULL_PI_ARCHITECTURE.md) |

**Canonical repository:** [dpstudio-se/VR-ASI-CO](https://github.com/dpstudio-se/VR-ASI-CO) · **Branch:** `main`
