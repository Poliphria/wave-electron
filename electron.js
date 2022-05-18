// ./public/electron.js
const { app, BrowserWindow, session, ipcMain, dialog } = require('electron');
const isDev = require('electron-is-dev');
const { openFile } = require('./eventHandlers/openFile');
const os = require('os')
const path = require('path');

// Add React Developer Tools if in Dev mode
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
}
// Currently a bug with this
/* const reactDevToolsPath = path.join(
    os.homedir(),
    "/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.24.3_0"
) */

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools if in dev mode
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  try {
    // await session.defaultSession.loadExtension(reactDevToolsPath)
    
    // Listen for open file ask from renderer
    ipcMain.handle('dialog:openFile', openFile)

    createWindow()
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows() === 0) createWindow()
    })
    
  } catch (err) {
    console.error('err: ', err)
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});