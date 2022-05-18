const { contextBridge, ipcRenderer } = require('electron')

// exposes node.js api to renderer process
contextBridge.exposeInMainWorld('api', {
    openFile: () => ipcRenderer.invoke('dialog:openFile')
})