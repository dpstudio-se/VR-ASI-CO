#!/usr/bin/env node
/**
 * Local, bounded VORTEX command adapter. No host inference, DNA mutation,
 * credentials, external network access or implied permission grants.
 *
 * node scripts/vortex-audit.mjs <r0|exo-f|scale-lock|soft-eos|vortex-read|vortex-write> [input.json]
 */
import fs from "node:fs";
import { evaluateR0, evaluateExoF, evaluateScaleLock, routeSoftEos, createOpenNoiseLedger } from "../src/lib/upi/vortex-audit.mjs";

const command = process.argv[2];
const path = process.argv[3];
const commands = new Set(["r0", "exo-f", "scale-lock", "soft-eos", "vortex-read", "vortex-write"]);
if (!commands.has(command) || (command !== "vortex-read" && !path)) {
  console.error("Usage: node scripts/vortex-audit.mjs <r0|exo-f|scale-lock|soft-eos|vortex-read|vortex-write> [input.json]");
  process.exit(2);
}
if (path && fs.statSync(path).size > 65536) throw new RangeError("Input JSON exceeds 64 KiB");
const input = path ? JSON.parse(fs.readFileSync(path, "utf8")) : {};
let result;
switch (command) {
  case "r0": result = evaluateR0(input); break;
  case "exo-f": result = evaluateExoF(input); break;
  case "scale-lock": result = evaluateScaleLock(input); break;
  case "soft-eos": result = routeSoftEos(input); break;
  case "vortex-read":
    // Persistent ledger is deliberately not claimed: this is a local snapshot reader.
    result = { status: "DER", entries: [], persisted: false, reason: "NO_PERSISTENT_LEDGER_CONFIGURED" };
    break;
  case "vortex-write": {
    // Writes ONLY to the bounded in-memory ledger for this invocation.
    const ledger = createOpenNoiseLedger();
    const append = ledger.append(input);
    result = { ...append, ledger: ledger.read(), durableWritePerformed: false };
    break;
  }
}
console.log(JSON.stringify({ command, result, hostInferencePerformed: false, dnaWritePerformed: false, remoteAdmission: false }, null, 2));
if (result?.status === "STOP") process.exitCode = 1;
