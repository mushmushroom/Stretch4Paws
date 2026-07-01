import { app, BrowserWindow } from 'electron';

const DEV_URL = process.env.DEV_URL ?? 'http://localhost:5174';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.maximize();
  mainWindow.loadURL(DEV_URL);
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
