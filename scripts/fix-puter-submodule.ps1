# Repair GitHub Desktop / git submodule fetch for puter.
# Cause: HeyPuter/puter has a broken dependabot ref. Fetching all refs fails.
# Fix: fetch only main, drop the bad local remote ref, then pull the parent without recurse.
# Run from the VR-ASI-CO checkout root.

$ErrorActionPreference = "Stop"
$root = (git rev-parse --show-toplevel)
Set-Location $root

git config submodule.puter.url "https://github.com/HeyPuter/puter.git"
git config submodule.puter.fetch "+refs/heads/main:refs/remotes/origin/main"

if (-not (Test-Path "puter\.git")) {
  git submodule update --init --depth 1 puter
}

Push-Location puter
git config remote.origin.fetch "+refs/heads/main:refs/remotes/origin/main"
$bad = Join-Path (git rev-parse --git-dir) "refs\remotes\origin\dependabot"
if (Test-Path $bad) { Remove-Item -Recurse -Force $bad }
git fetch origin main --depth=1
Pop-Location

git -c submodule.recurse=false pull
Write-Host "puter fetch restricted to main. Parent pull done without recurse."
