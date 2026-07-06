import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  openExternal: (url: string) => ipcRenderer.send('open-external', url),
  openAuthWindow: (url: string) => ipcRenderer.send('open-auth-window', url),
  onAuthCallback: (callback: (tokens: { accessToken: string; refreshToken: string }) => void) => {
    const handler = (
      _event: Electron.IpcRendererEvent,
      tokens: { accessToken: string; refreshToken: string },
    ) => callback(tokens);
    ipcRenderer.on('auth-callback', handler);
    return () => ipcRenderer.removeListener('auth-callback', handler);
  },
  setReminderSchedule: (schedule: {
    reminders_enabled?: boolean;
    reminder_interval_minutes?: number;
    quiet_hours_enabled?: boolean;
    quiet_hours_start?: string;
    quiet_hours_end?: string;
  }) => ipcRenderer.send('set-reminder-schedule', schedule),
  onFocusStretches: (callback: () => void) => {
    const handler = () => callback();
    ipcRenderer.on('focus-stretches', handler);
    return () => ipcRenderer.removeListener('focus-stretches', handler);
  },
});
