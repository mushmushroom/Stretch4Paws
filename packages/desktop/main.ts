import { app, BrowserWindow, shell, ipcMain } from 'electron';
import path from 'path';

const DEV_URL = process.env.DEV_URL ?? 'http://localhost:5174';

let mainWindow: BrowserWindow | null = null;

ipcMain.on('open-external', (_event, url: string) => {
  shell.openExternal(url);
});

ipcMain.on('open-auth-window', (_event, url: string) => {
  const authWindow = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      partition: 'auth-window',
    },
  });

  const webAppOrigin = new URL(url).origin;
  const loginUrl = new URL(url);
  loginUrl.searchParams.set('desktop', 'true');

  let done = false;

  const finish = (accessToken: string, refreshToken: string) => {
    if (done || authWindow.isDestroyed()) return;
    done = true;
    if (mainWindow) {
      mainWindow.webContents.send('auth-callback', { accessToken, refreshToken });
      mainWindow.focus();
    }
    authWindow.destroy();
  };

  // Clear storage before loading so no existing session interferes
  authWindow.webContents.session.clearStorageData({ storages: ['localstorage', 'cookies'] })
    .then(() => authWindow.loadURL(loginUrl.toString()))
    .catch(() => authWindow.loadURL(loginUrl.toString()));

  // Poll localStorage every 500ms for a Supabase session written after login
  const poll = setInterval(() => {
    if (authWindow.isDestroyed()) {
      clearInterval(poll);
      return;
    }
    const currentUrl = authWindow.webContents.getURL();
    if (!currentUrl.startsWith(webAppOrigin)) return;

    authWindow.webContents.executeJavaScript(`
      (() => {
        const key = Object.keys(localStorage).find(k => k.startsWith('sb-') && k.endsWith('-auth-token'));
        return key ? localStorage.getItem(key) : null;
      })()
    `).then((raw) => {
      if (!raw) return;
      const session = JSON.parse(raw);
      if (session?.access_token && session?.refresh_token) {
        clearInterval(poll);
        finish(session.access_token, session.refresh_token);
      }
    }).catch(() => {});
  }, 500);

  authWindow.on('closed', () => { done = true; clearInterval(poll); });
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.maximize();
  mainWindow.loadURL(DEV_URL);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
}

app.whenReady().then(() => {
  createWindow();
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
