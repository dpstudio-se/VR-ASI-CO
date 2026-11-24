#!/usr/bin/env sh
set -eu
: "\${ODINOS_BRAIN_HOME:?Set ODINOS_BRAIN_HOME to the shared vault directory}"
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
node "$SCRIPT_DIR/../brain.mjs" status
node "$SCRIPT_DIR/../brain.mjs" index
node "$SCRIPT_DIR/../brain.mjs" lint
