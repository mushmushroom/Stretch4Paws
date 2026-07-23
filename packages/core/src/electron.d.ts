interface Window {
  electron?: {
    platform: NodeJS.Platform;
    openExternal: (url: string) => void;
    openAuthWindow: (url: string) => void;
    onAuthCallback: (
      callback: (tokens: { accessToken: string; refreshToken: string }) => void,
    ) => () => void;
    setReminderSchedule: (schedule: {
      reminders_enabled?: boolean;
      reminder_interval_minutes?: number;
      quiet_hours_enabled?: boolean;
      quiet_hours_start?: string;
      quiet_hours_end?: string;
    }) => void;
    onFocusStretches: (callback: () => void) => () => void;
    onFocusSettings: (callback: () => void) => () => void;
  };
}
