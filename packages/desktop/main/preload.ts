import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  openExternal: (url: string) => ipcRenderer.send('open-external', url),
  openAuthWindow: (url: string) => ipcRenderer.send('open-auth-window', url),
  onAuthCallback: (callback: (tokens: { accessToken: string; refreshToken: string }) => void) => {
    const handler = (_event: Electron.IpcRendererEvent, tokens: { accessToken: string; refreshToken: string }) => callback(tokens);
    ipcRenderer.on('auth-callback', handler);
    return () => ipcRenderer.removeListener('auth-callback', handler);
  },
});
