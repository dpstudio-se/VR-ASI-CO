$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $repoRoot

$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
try {
    $readBytes = New-Object byte[] 32
    $writeBytes = New-Object byte[] 32
    $rng.GetBytes($readBytes)
    $rng.GetBytes($writeBytes)

    $readToken = [BitConverter]::ToString($readBytes).Replace("-", "").ToLowerInvariant()
    $writeToken = [BitConverter]::ToString($writeBytes).Replace("-", "").ToLowerInvariant()
}
finally {
    $rng.Dispose()
}

$env:VR_ASI_ROUTER_READ_TOKEN = $readToken
$env:VR_ASI_ROUTER_WRITE_TOKEN = $writeToken

Write-Host "VR_ASI_ROUTER_READ_TOKEN=$readToken"
Write-Host "VR_ASI_ROUTER_WRITE_TOKEN=$writeToken"
Write-Host "Starting the router on 127.0.0.1:8766. Keep these tokens private."

python server/remote_router.py
