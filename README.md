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
