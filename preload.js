const { contextBridge, ipcRenderer } = require('electron');

// Exponer API segura a la ventana
contextBridge.exposeInMainWorld('electronAPI', {
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  removeListener: (channel) => {
    ipcRenderer.removeListener(channel);
  }
});

console.log('Preload cargado');
