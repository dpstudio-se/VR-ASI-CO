# Local cleanup after the puter gitlink was removed from main.
# Run from the VR-ASI-CO checkout root. Then Pull origin in GitHub Desktop.

$ErrorActionPreference = "Stop"
Set-Location (git rev-parse --show-toplevel)

git config --unset-all submodule.puter.url 2>$null
git config --unset-all submodule.puter.fetch 2>$null
git config submodule.recurse false
git config fetch.recurseSubmodules false

if (Test-Path "puter") {
  if (Test-Path "puter\.git") { git submodule deinit -f puter 2>$null }
  Remove-Item -Recurse -Force puter
}

if (Test-Path ".git\modules\puter") {
  Remove-Item -Recurse -Force ".git\modules\puter"
}

git -c submodule.recurse=false pull
Write-Host "puter gitlink removed locally. Desktop should no longer fetch it."
