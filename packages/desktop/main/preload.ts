import { contextBridge, ipcRenderer } from 'electron';
import { IpcChannels } from './ipcChannels.js';

contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  openExternal: (url: string) => ipcRenderer.send(IpcChannels.OPEN_EXTERNAL, url),
  openAuthWindow: (url: string) => ipcRenderer.send(IpcChannels.OPEN_AUTH_WINDOW, url),
  onAuthCallback: (callback: (tokens: { accessToken: string; refreshToken: string }) => void) => {
    const handler = (
      _event: Electron.IpcRendererEvent,
      tokens: { accessToken: string; refreshToken: string },
    ) => callback(tokens);
    ipcRenderer.on(IpcChannels.AUTH_CALLBACK, handler);
    return () => ipcRenderer.removeListener(IpcChannels.AUTH_CALLBACK, handler);
  },
  setReminderSchedule: (schedule: {
    reminders_enabled?: boolean;
    reminder_interval_minutes?: number;
    quiet_hours_enabled?: boolean;
    quiet_hours_start?: string;
    quiet_hours_end?: string;
  }) => ipcRenderer.send(IpcChannels.SET_REMINDER_SCHEDULE, schedule),
  onFocusStretches: (callback: () => void) => {
    const handler = () => callback();
    ipcRenderer.on(IpcChannels.FOCUS_STRETCHES, handler);
    return () => ipcRenderer.removeListener(IpcChannels.FOCUS_STRETCHES, handler);
  },
});
