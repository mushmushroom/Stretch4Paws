// renderer > main
export const enum IpcChannels {
  OPEN_EXTERNAL = 'open-external',
  OPEN_AUTH_WINDOW = 'open-auth-window',
  SET_REMINDER_SCHEDULE = 'set-reminder-schedule',

  // main > renderer
  AUTH_CALLBACK = 'auth-callback',
  FOCUS_STRETCHES = 'focus-stretches',
  FOCUS_SETTINGS = 'focus-settings',
}
