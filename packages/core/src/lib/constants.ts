export const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL as string;

export const AppRoutes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  CHANGE_PASSWORD: '/change-password',
  STRETCH: '/stretch',
  DASHBOARD: '/dashboard',
} as const;
