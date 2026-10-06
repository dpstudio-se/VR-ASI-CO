#!/bin/sh
set -eu
VR_ASI_CO_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$VR_ASI_CO_ROOT"
for tool in node npm curl flock nohup; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    printf '[startup] missing required tool: %s\n' "$tool" >&2
    exit 1
  fi
done
# :8081 is QA-only — a revive must never inherit a stale built-output preview.
node scripts/preview.mjs stop || true
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
if [ ! -d node_modules ]; then
  printf '[startup] dependencies missing; run npm run workspace:setup\n' >&2
  exit 1
fi
if [ "${CODESPACES:-}" = "true" ] && [ -n "${CODESPACE_NAME:-}" ] && [ -n "${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-}" ]; then
  export __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS="${CODESPACE_NAME}-8080.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
fi
mkdir -p .cache/vr-asi-co
# The lock belongs to the dev process and releases on exit. Repeated starts
# cannot create a second npm/Vite process while the first is still warming up.
nohup flock -n .cache/vr-asi-co/dev.lock npm run dev >>.cache/vr-asi-co/dev.log 2>&1 </dev/null &
printf '[startup] start requested; readiness is pending (log: .cache/vr-asi-co/dev.log)\n'
