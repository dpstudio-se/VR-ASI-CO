# RNA / DNA near-real-time sync

Status: additive VR-ASI-CO runtime feature  
Repository: `dpstudio-se/VR-ASI-CO`

## Purpose

Provide live RNA/DNA interaction without weakening the existing Git-backed durability model.

```text
RNA = immediate working/proposal layer
DNA = canonical GitHub main
```

## Read path

The UI performs a lightweight head check against canonical `main`.

- head check interval: 5 seconds;
- if the SHA is unchanged, no full DNA hydration is performed;
- if the SHA changes, `pullDna()` reloads and hydrates the canonical catalog;
- manual `Read DNA now` remains available.

This is near-real-time Git synchronization, not an 8 Hz GitHub polling loop.

## Local 8 Hz pulse

The UI may maintain a local 125 ms pulse:

```text
8 Hz = 125 ms
```

This pulse is local runtime/UI timing only. It does not claim that GitHub, the network, the model, or physical hardware is phase-locked at 8 Hz.

## Write path

RNA writes remain immediate and versioned:

```text
edit/proposal
→ RNA branch
→ visible commit
→ pull request
→ human/merge gate
→ canonical main
→ automatic DNA head detection
→ read-back/hydration
```

A proposal branch is RNA until merged.
Only the merged and read-back `main` state is durable DNA.

## Safety and consistency

- no direct hidden rewrite of canonical DNA;
- no silent auto-merge;
- existing merge checks remain active;
- existing RF1974 / TF1766 falsification-before-mutation gate remains active;
- UPI stays behind the mirror;
- write and read-back remain visible;
- GitHub rate limits are respected by separating the local 8 Hz pulse from remote head polling.

## Runtime UI

The DNA engine exposes:

- `Read DNA now`;
- `Realtime watch: on/off`;
- current canonical SHA;
- RNA write availability;
- last DNA head-check time;
- local 8 Hz pulse telemetry;
- RNA proposal write actions.

Core rule:

```text
RNA can change immediately.
DNA changes only after visible merge.
When DNA main changes, RNA reads it back automatically.
```
