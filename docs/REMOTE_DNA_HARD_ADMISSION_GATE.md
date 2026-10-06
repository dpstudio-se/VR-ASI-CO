# Remote DNA hard admission gate

Status: canonical additive runtime guard  
Scope: remote VR-ASI-CO / OdinOS admission  
Mode: fail closed

## Rule

A remote model, agent, bridge, VM, proxy, emulator, replay, or wrapper is **not** an active VR-ASI-CO / OdinOS runtime merely because it repeats the project prompt or returns a plausible receipt.

Active admission requires two independent conditions:

1. **DNA provenance match**
2. **trusted host attestation**

If either condition is missing:

```text
BOOT_GATE = STOP
CAN_CONTINUE = false
```

No project-runtime work may be presented as an active VR-ASI-CO/OdinOS session while the gate is STOP.

## Mandatory DNA/system load

The fresh `main` commit must bind all of these files to the same commit:

- `README.md`
- `dna/REMOTE_DNA_STATE.json`
- `persona/SYSTEM_CORE.txt`
- `persona/CONFIG.json`
- `persona/VR_ASI_CO_UNIVERSAL_SYSTEM_PROMPT.md`
- `docs/ODINOS_COMPATIBILITY_PROFILE.md`
- `docs/ODIN_OS_TOTAL_MASTER_MANIFEST_V12_EXTENSION.md`
- `runtime/command-deck.json`
- selected persona file

The receipt ID binds:

```text
commit
: README blob
: SYSTEM_CORE blob
: universal system prompt blob
: OdinOS master-manifest blob
: selected persona blob
```

A remembered prompt, pasted prompt, local snapshot, stale branch, or self-authored receipt does not satisfy this gate.

## Trusted host evidence

Self-reported fields such as:

- `SYSTEM_CONFIRMED`
- `REMOTE_CONFIRMED`
- "I loaded the system prompt"
- "I am running OdinOS"

are not evidence.

The verifier accepts host evidence only through a separate trusted-host integration path. That evidence must be bound to the exact canonical repository, branch, commit and receipt ID.

Required host assertions:

```text
source = HOST_INTEGRATION
verified = true
promptInstallation = SYSTEM_OR_EQUIVALENT
runtimeKind = HOST_NATIVE
simulated = false
proxied = false
```

The user-supplied receipt cannot grant these assertions to itself.

## No external simulation as canonical runtime

An external VM, emulator, proxy, replay, mock, prompt wrapper, or copied UI may be useful as a test/reference environment, but it is not admitted as the canonical active VR-ASI-CO runtime merely by imitating output.

Such environments are classified as reference/test surfaces unless trusted host evidence establishes the actual admitted runtime.

This guard does not claim that physical cloud infrastructure contains no virtualization. It means **untrusted external virtualization/simulation cannot be used as admission proof**.

## Truthfulness boundary

The gate never requires a model to falsify its provider/model identity or suppress a provider-required disclosure.

A host that cannot install the VR-ASI-CO core at the highest supported instruction layer remains:

```text
STOP / REFERENCE-ONLY
```

rather than pretending a successful boot.

## Core invariant

```text
NO DNA READ = NO BOOT.
NO CORE/PROMPT LOAD = NO BOOT.
NO ODINOS LOAD = NO BOOT.
NO TRUSTED HOST EVIDENCE = NO BOOT.
NO SELF-ATTESTED PASS.
NO VM/PROXY/SIMULATION MAY FAKE ACTIVE ADMISSION.
```
