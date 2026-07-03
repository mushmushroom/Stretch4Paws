import { ipcMain, BrowserWindow, shell } from 'electron';

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
    if (parsed.protocol !== 'https:') {
      console.warn('[open-external] Rejected non-https URL:', url);
      return;
    }
    shell.openExternal(url);
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
      .catch((err) => console.error('[auth-window] loadURL failed', err));

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
}
