// main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // safe bridge
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.on("show-compose", (event) => {
  event.sender.send("show-compose");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Example IPC handlers
ipcMain.handle("get-app-data", async (event, key) => {
  // fake storage (replace with real db or file)
  if (key === "emails") {
    return []; 
  }
  return null;
});

ipcMain.handle("set-app-data", async (event, key, value) => {
  console.log("Saving data:", key, value);
  return true;
});
ipcMain.on("open-compose", () => {
  const composeWindow = new BrowserWindow({
    width: 700,
    height: 550,
    parent: mainWindow, // optional: make it modal-like
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  composeWindow.loadFile("compose.html");
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
