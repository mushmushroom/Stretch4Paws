import { app, BrowserWindow, shell } from 'electron';
import path from 'path';
import { registerIpcHandlers } from './ipcHandlers.js';

const DEV_URL = process.env.DEV_URL ?? 'http://localhost:5174';
const APP_URL = process.env.APP_URL ?? 'http://localhost:5174';

let mainWindow: BrowserWindow | null = null;
const mainWindowRef: { current: BrowserWindow | null } = { current: mainWindow };

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindowRef.current = mainWindow;

  mainWindow.maximize();
  mainWindow.loadURL(DEV_URL);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    mainWindowRef.current = null;
  });
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
}

app.whenReady().then(() => {
  createWindow();
  registerIpcHandlers(mainWindowRef, new URL(APP_URL).origin);
});

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
