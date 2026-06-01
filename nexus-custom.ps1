# nexus-custom.ps1 - optionele persoonlijke PowerShell tweaks for Nexus Terminal
# Plaats dit bestand naast je PowerShell-profiel en laad het vanaf je $PROFILE met:
#   if (Test-Path "$PSScriptRoot\nexus-custom.ps1") { . "$PSScriptRoot\nexus-custom.ps1" }

# Kleuren helper
function Write-Green($text) { Write-Host $text -ForegroundColor Green }

# Snelle projectopeners
function open-repo { param([string]$path = '.') Start-Process -FilePath 'explorer.exe' -ArgumentList (Resolve-Path $path) }
function cd-repo { param([string]$path = '.') Set-Location (Resolve-Path $path) }

# Git helpers (vereist git in PATH)
function gs { git status }
function ga { param([string]$args) git add $args }
function gc { param([string]$msg) git commit -m $msg }
function gp { git push }

# Start de Nexus Terminal executable uit de repo (indien aanwezig)
function start-nexus { 
    $exe = Join-Path (Resolve-Path (Split-Path -Parent $MyInvocation.MyCommand.Definition)) 'dist\win-unpacked\Nexus Terminal.exe'
    if (Test-Path $exe) { Start-Process -FilePath $exe } else { Write-Host "Nexus Terminal executable niet gevonden in: $exe" -ForegroundColor Yellow }
}

# Kleine prompt tweak
function prompt {
    $cwd = $(Get-Location).Path
    Write-Host("NEXUS ") -NoNewline -ForegroundColor Cyan
    Write-Host("$cwd> ") -NoNewline -ForegroundColor Green
    return ' '
}

# Export voor makkelijk laden
Export-ModuleMember -Function open-repo,cd-repo,gs,ga,gc,gp,start-nexus,Write-Green
