const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('nexus', {
      getConfig: () => ipcRenderer.invoke('get-config'),
        saveConfig: (config) => ipcRenderer.invoke('save-config', config),
          getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
            openProgram: (key) => ipcRenderer.invoke('open-program', key),
              systemAction: (action) => ipcRenderer.invoke('system-action', action),
                openUrl: (url) => ipcRenderer.invoke('open-url', url),
                  fastStart: () => ipcRenderer.invoke('fast-start'),
});
