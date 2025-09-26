// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getAppData: (key) => ipcRenderer.invoke("get-app-data", key),
  setAppData: (key, value) => ipcRenderer.invoke("set-app-data", key, value),
  onShowCompose: (callback) => ipcRenderer.on("show-compose", callback),
  onNavigateTo: (callback) => ipcRenderer.on("navigate-to", (event, page) => callback(page)),
});
