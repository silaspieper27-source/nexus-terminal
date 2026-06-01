# nexus-terminal
Korte omschrijving

Nexus Terminal is een desktop dashboard / controlepaneel gebouwd als Electron-app. Deze repository bevat de broncode, een Windows build en een set voorgestelde Windows Terminal-instellingen.

Snelle stappen

- Development (lokaal):
	- `npm install`
	- `npm start`

- Windows build (gemaakt in deze repo):
	- Downloadable artifact: [dist/Nexus-Terminal-win.zip](dist/Nexus-Terminal-win.zip)
	- De zip bevat `Nexus Terminal.exe` in de `win-unpacked` map — dit is een Windows build.

- Windows Terminal instellingen (optioneel):
	- Importeer de JSON via Settings → Import en gebruik `windows-terminal-settings.json` in de repo root: [windows-terminal-settings.json](windows-terminal-settings.json)

Aanbevolen snelinstall (PowerShell als Administrator):
```
winget install --id Microsoft.WindowsTerminal -e
winget install --id Microsoft.PowerShell -e
wsl --install -d Ubuntu
winget install JanDeDobbeleer.OhMyPosh -e
Install-Module PSReadLine -Scope CurrentUser -Force
```

Extra info

- View de UI bron: [src/index.html](src/index.html)
- Release met build is aangemaakt: https://github.com/silaspieper27-source/nexus-terminal/releases/tag/v1.0.0

Als je wilt kan ik nog extra releases maken, de build signeren, of de installer (NSIS) afmaken — laat maar weten wat je wil.

Fonts & Oh My Posh (snelle setup)

1. Fonts
	- Installeer een patched Nerd Font voor iconen (bijv. "Cascadia Code PL Nerd" of "MesloLGS Nerd"). Download van https://www.nerdfonts.com/ en installeer het op Windows (dubbelklik → Install).
	- Stel het font in Windows Terminal via Settings → Profiles → Defaults → `Font face` → "Cascadia Code PL".

2. Oh My Posh + PSReadLine
	- Open PowerShell als Administrator en voer uit:
```
winget install JanDeDobbeleer.OhMyPosh -e
Install-Module PSReadLine -Scope CurrentUser -Force
```
	- Voeg de volgende regels toe aan je PowerShell-profiel (`notepad $PROFILE`):
```
Import-Module oh-my-posh
Set-PoshPrompt -Theme paradox
Import-Module PSReadLine
Set-PSReadLineOption -PredictionSource History
```

3. Tips
	- Als je WSL gebruikt: installeer Nerd Font ook in Windows zodat Windows Terminal de glyphs correct toont.
	- Voor thema's en extra prompts: zie https://ohmyposh.dev/.

Gebruik `windows-terminal-settings.json` uit de repo om snel je Windows Terminal-profielen en kleuren te importeren.
