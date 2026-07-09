import { ipcMain, BrowserWindow, shell, Notification, app } from 'electron';
import { execFile } from 'child_process';
import path from 'path';

const iconPath = app.isPackaged
  ? path.join(process.resourcesPath, 'icon.png')
  : path.join(__dirname, '../../resources/icon.png');

const debug = process.env.DEBUG === 'true';
const log = (...args: unknown[]) => { if (debug) console.log(...args); };

interface ReminderSchedule {
  reminders_enabled?: boolean;
  reminder_interval_minutes?: number;
  quiet_hours_enabled?: boolean;
  quiet_hours_start?: string;
  quiet_hours_end?: string;
}

let reminderTimer: NodeJS.Timeout | null = null;
let currentSchedule: ReminderSchedule = {};

function isInQuietHours(schedule: ReminderSchedule): boolean {
  if (!schedule.quiet_hours_enabled) return false;
  const start = schedule.quiet_hours_start;
  const end = schedule.quiet_hours_end;
  if (!start || !end) return false;

  const now = new Date();
  const current = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // overnight range e.g. 22:00–06:00
  if (start > end) return current >= start || current <= end;
  // same-day range e.g. 12:00–14:00
  return current >= start && current <= end;
}

function showReminderNotification(mainWindowRef: { current: BrowserWindow | null }) {
  log('[reminder] showReminderNotification called, schedule:', currentSchedule);
  log('[reminder] Notification.isSupported():', Notification.isSupported());
  if (isInQuietHours(currentSchedule)) {
    log('[reminder] Blocked by quiet hours');
    return;
  }

  if (process.platform === 'darwin') {
    const script = `display notification "Take a short break and move around to keep your body healthy." with title "Time to stretch!" sound name "Ping"`;
    execFile('osascript', ['-e', script], (err) => {
      if (err) console.error('[reminder] osascript failed:', err);
      else log('[reminder] osascript notification sent');
    });
    return;
  }

  const notification = new Notification({
    title: 'Time to stretch!',
    body: 'Take a short break and move around to keep your body healthy.',
    sound: 'Ping',
    urgency: 'critical',
    icon: iconPath,
  });

  notification.on('click', () => {
    const win = mainWindowRef.current;
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.show();
    win.focus();
    win.webContents.send('focus-stretches');
  });

  notification.on('failed', (_e, err) => console.error('[reminder] notification failed:', err));
  log('[reminder] notification.show() called');
  notification.show();
}

function startReminderTimer(mainWindowRef: { current: BrowserWindow | null }) {
  if (reminderTimer) {
    clearInterval(reminderTimer);
    reminderTimer = null;
  }
  if (process.platform === 'darwin') {
    log('[reminder] Timer not started: notifications not supported on macOS without proper signing');
    return;
  }
  if (!currentSchedule.reminders_enabled) {
    log('[reminder] Timer not started: reminders_enabled is false');
    return;
  }

  const intervalMs = (currentSchedule.reminder_interval_minutes ?? 30) * 60 * 1000;
  log(`[reminder] Timer started: interval=${intervalMs}ms (${currentSchedule.reminder_interval_minutes} min)`);
  reminderTimer = setInterval(() => showReminderNotification(mainWindowRef), intervalMs);
}

export function registerIpcHandlers(
  mainWindowRef: { current: BrowserWindow | null },
  allowedOrigin: string,
) {
  ipcMain.on('open-external', (_event, url: string) => {
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      console.warn('[open-external] Rejected invalid URL');
      return;
    }
    const isHttpsUrl = parsed.protocol === 'https:';
    const isLocalHttp = parsed.protocol === 'http:' && parsed.hostname === 'localhost';
    if (!isHttpsUrl && !isLocalHttp) {
      console.warn('[open-external] Rejected non-https URL:', url);
      return;
    }
    shell
      .openExternal(url)
      .catch((err) => console.error('[open-external] Failed to open URL:', err));
  });

  ipcMain.on('open-auth-window', (_event, url: string) => {
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      console.warn('[open-auth-window] Rejected invalid URL');
      return;
    }
    if (parsed.origin !== allowedOrigin) {
      console.warn('[open-auth-window] Rejected disallowed origin:', parsed.origin);
      return;
    }
    const authWindow = new BrowserWindow({
      width: 500,
      height: 700,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        partition: 'auth-window',
      },
    });

    // parsed.origin is already validated above — reuse it instead of re-parsing
    const webAppOrigin = parsed.origin;
    const loginUrl = new URL(url);
    loginUrl.searchParams.set('desktop', 'true');

    let done = false;
    const AUTH_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

    const finish = (accessToken: string, refreshToken: string) => {
      if (done || authWindow.isDestroyed()) return;
      done = true;
      clearTimeout(timeout);
      if (mainWindowRef.current) {
        mainWindowRef.current.webContents.send('auth-callback', { accessToken, refreshToken });
        mainWindowRef.current.focus();
      }
      authWindow.destroy();
    };

    // Clear storage before loading so no existing session interferes
    authWindow.webContents.session
      .clearStorageData({ storages: ['localstorage', 'cookies'] })
      .then(() => authWindow.loadURL(loginUrl.toString()))
      .catch(() => authWindow.loadURL(loginUrl.toString()))
      .catch((err) => {
        console.error('[auth-window] loadURL failed', err);
        if (!authWindow.isDestroyed()) authWindow.destroy();
      });

    const timeout = setTimeout(() => {
      clearInterval(poll);
      if (!authWindow.isDestroyed()) authWindow.destroy();
    }, AUTH_TIMEOUT_MS);

    // Poll localStorage every 500ms for a Supabase session written after login.
    // We check currentUrl.startsWith(webAppOrigin) because the auth flow may redirect
    // through external pages (e.g. OAuth provider) before returning to our origin —
    // only attempt to read localStorage once we're back on our own origin.
    const poll = setInterval(() => {
      if (authWindow.isDestroyed()) {
        clearInterval(poll);
        return;
      }
      const currentUrl = authWindow.webContents.getURL();
      if (!currentUrl.startsWith(webAppOrigin)) return;

      authWindow.webContents
        .executeJavaScript(
          `
        (() => {
          const key = Object.keys(localStorage).find(k => k.startsWith('sb-') && k.endsWith('-auth-token'));
          return key ? localStorage.getItem(key) : null;
        })()
      `,
        )
        .then((raw) => {
          if (!raw) return;
          let session: { access_token?: string; refresh_token?: string };
          try {
            session = JSON.parse(raw);
          } catch {
            return;
          }
          if (session?.access_token && session?.refresh_token) {
            clearInterval(poll);
            finish(session.access_token, session.refresh_token);
          }
        })
        .catch(() => {});
    }, 500);

    authWindow.on('closed', () => {
      done = true;
      clearInterval(poll);
      clearTimeout(timeout);
    });
  });

  ipcMain.on('set-reminder-schedule', (_event, schedule: ReminderSchedule) => {
    log('[reminder] set-reminder-schedule received:', schedule);
    currentSchedule = { ...currentSchedule, ...schedule };
    log('[reminder] merged schedule:', currentSchedule);
    const interval = currentSchedule.reminder_interval_minutes;
    if (interval !== undefined && (isNaN(interval) || interval < 1)) {
      console.warn(
        '[set-reminder-schedule] Invalid reminder_interval_minutes:',
        currentSchedule.reminder_interval_minutes,
      );
      return;
    }

    startReminderTimer(mainWindowRef);
  });
}
