import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  openExternal: (url: string) => ipcRenderer.send('open-external', url),
  openAuthWindow: (url: string) => ipcRenderer.send('open-auth-window', url),
  onAuthCallback: (callback: (tokens: { accessToken: string; refreshToken: string }) => void) => {
    ipcRenderer.on('auth-callback', (_event, tokens) => callback(tokens));
  },
});
