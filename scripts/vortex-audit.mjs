#!/usr/bin/env node
/**
 * Bounded local VORTEX assessment: no network, host inference, DNA mutation,
 * actual ledger persistence or permission grants.
 */
import fs from "node:fs";
import {
  evaluateR0, evaluateExoF, evaluateScaleLock, routeSoftEos, createOpenNoiseLedger,
} from "../src/lib/upi/vortex-audit.mjs";

const command = process.argv[2];
const inputPath = process.argv[3];
const commands = new Set(["r0", "exo-f", "scale-lock", "soft-eos", "vortex-read", "vortex-write"]);
function stop(reason, exitCode = 1) {
  console.log(JSON.stringify({
    command: command || null,
    result: { status: "STOP", reason },
    hostInferencePerformed: false,
    dnaWritePerformed: false,
    remoteAdmission: false,
  }, null, 2));
  process.exit(exitCode);
}
if (!commands.has(command) ||
    (command !== "vortex-read" && !inputPath) ||
    (command === "vortex-read" && inputPath) ||
    process.argv.length > (command === "vortex-read" ? 3 : 4)) {
  stop("INVALID_COMMAND_OR_ARGUMENTS", 2);
}
let input = {};
if (inputPath) {
  let data;
  try {
    const info = fs.statSync(inputPath);
    if (!info.isFile() || info.size > 65536) stop("INVALID_INPUT_FILE_OR_SIZE", 2);
    data = fs.readFileSync(inputPath, "utf8");
  } catch {
    stop("INPUT_FILE_UNAVAILABLE", 2);
  }
  try {
    input = JSON.parse(data);
  } catch {
    stop("MALFORMED_JSON", 2);
  }
}
let result;
switch (command) {
  case "r0": result = evaluateR0(input); break;
  case "exo-f": result = evaluateExoF(input); break;
  case "scale-lock": result = evaluateScaleLock(input); break;
  case "soft-eos": result = routeSoftEos(input); break;
  case "vortex-read":
    result = { status: "DER", entries: [], persisted: false,
      reason: "NO_PERSISTENT_LEDGER_CONFIGURED" };
    break;
  case "vortex-write": {
    // Limited to an in-memory invocation snapshot; never a filesystem operation.
    const ledger = createOpenNoiseLedger();
    const added = ledger.append(input);
    result = { ...added, ledger: ledger.read(), durableWritePerformed: false };
    break;
  }
}
console.log(JSON.stringify({
  command, result,
  hostInferencePerformed: false, dnaWritePerformed: false, remoteAdmission: false,
}, null, 2));
if (result?.status === "STOP") process.exitCode = 1;
