export const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL as string;

export const AppRoutes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  CHANGE_PASSWORD: '/change-password',
  STRETCHES: '/stretches',
  DASHBOARD: '/dashboard',
  DASHBOARD_STATISTICS: '/dashboard/statistics',
  DASHBOARD_GOAL: '/dashboard/goal',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_EDIT_PROFILE: '/dashboard/profile/edit',
  DASHBOARD_CHANGE_PASSWORD: '/dashboard/profile/change-password',
  DESKTOP_APP: '/desktop-app',
} as const;

export const DEFAULT_GOAL = 5;
export const MIN_GOAL = 1;
export const MAX_GOAL = 14;

export const DEFAULT_SETTINGS = {
  SOUND_ENABLED: true,
  QUIET_HOURS: true,
  QUIET_HOURS_START: '21:00',
  QUIET_HOURS_END: '09:00',
  REMINDER_INTERVAL_MINUTES: 60,
}

export const REMINDER_PRESETS = [
  { label: '30 min', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
] as const;
