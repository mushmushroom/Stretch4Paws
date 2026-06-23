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
  DESKTOP_APP: '/desktop-app',
} as const;
