const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const si = require('systeminformation');
const ping = require('ping');
const { exec } = require('child_process');
const fs = require('fs');

let mainWindow;
let config = { name: '', bookmarks: [] };
const configPath = path.join(app.getPath('userData'), 'config.json');

function loadConfig() {
      try {
            if (fs.existsSync(configPath)) {
                      config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
            }
      } catch (e) { console.error(e); }
}

function saveConfig() {
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
}

function createWindow() {
      mainWindow = new BrowserWindow({
            width: 1200,
                height: 800,
                    backgroundColor: '#000000',
                        webPreferences: {
                                  preload: path.join(__dirname, 'preload.js'),
                                        contextIsolation: true,
                                              nodeIntegration: false,
                        },
      });
        mainWindow.loadFile('src/index.html');
}

app.whenReady().then(() => {
      loadConfig();
        createWindow();

          ipcMain.handle('get-config', () => config);
            ipcMain.handle('save-config', (event, newConfig) => {
                    config = { ...config, ...newConfig };
                        saveConfig();
                            return config;
            });

              ipcMain.handle('get-system-info', async () => {
                    try {
                              const [cpu, mem, battery, net, osInfo, time] = await Promise.all([
                                        si.currentLoad(), si.mem(), si.battery(),
                                                si.networkInterfaceDefault(), si.osInfo(), si.time(),
                              ]);
                                    const online = net ? await ping.promise.probe('8.8.8.8', { timeout: 1 }) : false;
                                          return {
                                                    cpuLoad: Math.round(cpu.currentLoad),
                                                            memTotalBytes: mem.total,
                                                                    memUsedBytes: mem.used,
                                                                            battery: {
                                                                                          hasBattery: battery.hasBattery,
                                                                                                    percent: battery.percent,
                                                                                                              isCharging: battery.isCharging,
                                                                                                                        acConnected: battery.acConnected,
                                                                            },
                                                                                    ip: (net && net.ip4) ? net.ip4 : '???',
                                                                                            ssid: (net && net.ssid) ? net.ssid : '(none)',
                                                                                                    online: online ? online.alive : false,
                                                                                                            uptimeSec: time ? time.uptime : 0,
                                                                                                                    hostname: osInfo ? osInfo.hostname : 'NEXUS',
                                          };
                    } catch (err) { console.error(err); return null; }
              });

                ipcMain.handle('open-program', (event, key) => {
                        const cmds = {
                                  notepad: 'notepad.exe', calculator: 'calc.exe',
                                        paint: 'mspaint.exe', cmd: 'cmd.exe',
                                              taskmgr: 'taskmgr.exe', explorer: 'explorer.exe',
                        };
                            exec(cmds[key] || key, (error) => { if (error) throw error; });
                });

                  ipcMain.handle('system-action', (event, action) => {
                        const cmds = {
                                  restart: 'shutdown /r /t 0',
                                        shutdown: 'shutdown /s /t 0',
                                              lock: 'rundll32.exe user32.dll,LockWorkStation',
                                                    sleep: 'rundll32.exe powrprof.dll,SetSuspendState 0,1,0',
                        };
                            exec(cmds[action], (error) => { if (error) throw error; });
                  });

                    ipcMain.handle('open-url', (event, url) => { exec(`start "" "${url}"`); });

                      ipcMain.handle('fast-start', async () => {
                            exec('explorer.exe');
                                const deepseek = config.bookmarks.find(b => b.name.toLowerCase().includes('deepseek'))
                                                     || { url: 'https://chat.deepseek.com/' };
                                                         const itslearning = config.bookmarks.find(b => b.name.toLowerCase().includes('itslearning'))
                                                                                || { url: 'https://hoornbeeck.itslearning.com/Resources?FolderID=1137357' };
                                                                                    exec(`start "" "chrome.exe" --start-maximized "${deepseek.url}" "${itslearning.url}"`);
                      });
});

app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
});
