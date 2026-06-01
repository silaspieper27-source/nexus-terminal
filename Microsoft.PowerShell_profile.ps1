# Example PowerShell profile for Nexus Terminal
# Save this as $PROFILE (Microsoft.PowerShell_profile.ps1) or import it from your profile.

# Load Oh My Posh if available
if (Get-Module -ListAvailable -Name oh-my-posh) {
    Import-Module oh-my-posh
    try {
        Set-PoshPrompt -Theme paradox
    } catch {
        # If theme isn't available, fall back silently
    }
}

# Ensure PSReadLine is available and configured
if (-not (Get-Module -ListAvailable -Name PSReadLine)) {
    try {
        Install-Module PSReadLine -Scope CurrentUser -Force -ErrorAction SilentlyContinue
    } catch {
        Write-Verbose "PSReadLine install failed: $_"
    }
}
if (Get-Module -ListAvailable -Name PSReadLine) {
    Import-Module PSReadLine -ErrorAction SilentlyContinue
    Set-PSReadLineOption -PredictionSource History
    Set-PSReadLineOption -EditMode Windows
    Set-PSReadLineOption -HistorySaveStyle SaveIncrementally
}

# Useful aliases and helpers
Set-Alias ll Get-ChildItem
Set-Alias la "Get-ChildItem -Force"
function o { param([string]$path) Start-Process -FilePath "explorer.exe" -ArgumentList $path }

# Prompt tweaks
$Host.UI.RawUI.WindowTitle = "Nexus Terminal - PowerShell"

# Optional: source additional custom script if present
$custom = Join-Path (Split-Path -Parent $PROFILE) "nexus-custom.ps1"
if (Test-Path $custom) { . $custom }

# End of profile
