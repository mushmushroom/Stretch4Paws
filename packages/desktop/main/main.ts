import { app, BrowserWindow, shell } from 'electron';
import path from 'path';
import { registerIpcHandlers } from './ipcHandlers.js';

const DEV_URL = process.env.DEV_URL ?? 'http://localhost:5174';
const APP_URL = process.env.APP_URL ?? 'http://localhost:5174';

let mainWindow: BrowserWindow | null = null;
const mainWindowRef: { current: BrowserWindow | null } = { current: mainWindow };
const splashPath = app.isPackaged
  ? path.join(process.resourcesPath, 'splash.html')
  : path.join(__dirname, '../splash.html');

function createSplashWindow(): BrowserWindow {
  const splash = new BrowserWindow({
    width: 340,
    height: 220,
    frame: false,
    transparent: false,
    resizable: false,
    center: true,
    skipTaskbar: true,
    alwaysOnTop: true,
    show: false,
    webPreferences: { nodeIntegration: false },
  });

  console.log('[splash] loading from:', splashPath);
  splash.once('ready-to-show', () => splash.show());
  splash.loadFile(splashPath);
  return splash;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindowRef.current = mainWindow;

  if (process.platform !== 'darwin') {
    app.setAppUserModelId('com.stretch4paws.app');
  }

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../renderer/dist/index.html'));
  } else {
    mainWindow
      .loadURL(DEV_URL)
      .catch((err) => console.error('[main] Failed to load renderer:', err));
  }

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

app.setName('Stretch4Paws');
if (process.platform === 'darwin') {
  app.setAppUserModelId('com.apple.mail');
}

const MIN_SPLASH_MS = 1500;

function launchWithSplash() {
  const splash = createSplashWindow();
  const splashShownAt = Date.now();

  splash.webContents.on('did-fail-load', (_e, code, desc) =>
    console.error('[splash] failed to load:', code, desc, splashPath),
  );

  splash.once('ready-to-show', () => {
    console.log('[splash] ready-to-show fired');
    createWindow();

    mainWindow!.once('ready-to-show', () => {
      const elapsed = Date.now() - splashShownAt;
      const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
      setTimeout(() => {
        splash.close();
        mainWindow!.maximize();
        mainWindow!.show();
      }, remaining);
    });
  });
}

app
  .whenReady()
  .then(() => {
    launchWithSplash();
    registerIpcHandlers(mainWindowRef, new URL(APP_URL).origin);
  })
  .catch((err) => {
    console.error('[main] Failed to start app:', err);
    app.quit();
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
  if (app.isReady() && mainWindow === null) launchWithSplash();
});

console.log(app.getName());
