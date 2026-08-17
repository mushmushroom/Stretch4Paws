import { app, BrowserWindow, Menu, shell } from 'electron';
import path from 'path';
import { config } from 'dotenv';
import { registerIpcHandlers } from './ipcHandlers.js';
import { IpcChannels } from './ipcChannels.js';

// Load renderer .env so VITE_PUBLIC_URL is available in the main process.
// In packaged builds, this file is not present, so the existing env vars are used.
config({ path: path.join(__dirname, '../renderer/.env') });

const DEV_URL = process.env.DEV_URL ?? 'http://localhost:5174';
const APP_URL = process.env.APP_URL ?? process.env.VITE_PUBLIC_URL ?? 'http://localhost:5174';

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

function buildMenu() {
  const isMac = process.platform === 'darwin';
  const webAppUrl = APP_URL;

  const template: Electron.MenuItemConstructorOptions[] = [
    // macOS app menu
    ...(isMac
      ? ([
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ] as Electron.MenuItemConstructorOptions[])
      : []),
    {
      label: 'Stretch4Paws',
      submenu: [
        {
          label: 'Start Stretching',
          accelerator: 'CmdOrCtrl+Shift+S',
          click() {
            const win = mainWindowRef.current;
            if (!win) return;
            if (win.isMinimized()) win.restore();
            win.show();
            win.focus();
            win.webContents.send(IpcChannels.FOCUS_STRETCHES);
          },
        },
        {
          label: 'Settings',
          accelerator: 'CmdOrCtrl+,',
          click() {
            const win = mainWindowRef.current;
            if (!win) return;
            if (win.isMinimized()) win.restore();
            win.show();
            win.focus();
            win.webContents.send(IpcChannels.FOCUS_SETTINGS);
          },
        },
        { type: 'separator' },
        {
          label: 'Open Dashboard in Browser',
          accelerator: 'CmdOrCtrl+Shift+D',
          click() {
            shell.openExternal(webAppUrl);
          },
        },
        { type: 'separator' },
        ...(!isMac ? [{ role: 'quit' } as Electron.MenuItemConstructorOptions] : []),
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app
  .whenReady()
  .then(() => {
    launchWithSplash();
    buildMenu();
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
