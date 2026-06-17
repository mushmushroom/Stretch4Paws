import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from '@stretch4paws/core/context/themeContext/ThemeContext';
import { StretchProvider } from '@stretch4paws/core/context/stretchContext/StretchContext';
import LoginPage from '@stretch4paws/core/components/auth/LoginPage';
import RegisterPage from '@stretch4paws/core/components/auth/RegisterPage';
import ResetPasswordPage from '@stretch4paws/core/components/auth/ResetPasswordPage';
import { AppRoutes } from '@stretch4paws/core/lib/constants';
import ChangePasswordPage from '@stretch4paws/core/components/auth/ChangePasswordPage';
import GuestRoute from '@stretch4paws/core/components/pageWrappers/GuestRoute';
import { AuthProvider } from '@stretch4paws/core/context/authContext/AuthContext';
import DashboardPage from '@stretch4paws/core/components/pages/DashboardPage';
import HomePage from '@stretch4paws/core/components/pages/HomePage';
import ProtectedRoute from '@stretch4paws/core/components/pageWrappers/ProtectedRoute';
import DesktopAppPage from '@stretch4paws/core/components/pages/DesktopAppPage';
import StretchesPage from '@stretch4paws/core/components/pages/StretchesPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <StretchProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path={AppRoutes.HOME} element={<HomePage />} />
              <Route
                path={AppRoutes.LOGIN}
                element={
                  <GuestRoute>
                    <LoginPage />
                  </GuestRoute>
                }
              />
              <Route
                path={AppRoutes.REGISTER}
                element={
                  <GuestRoute>
                    <RegisterPage />
                  </GuestRoute>
                }
              />
              <Route
                path={AppRoutes.RESET_PASSWORD}
                element={
                  <GuestRoute>
                    <ResetPasswordPage />
                  </GuestRoute>
                }
              />
              <Route
                path={AppRoutes.CHANGE_PASSWORD}
                element={
                  <GuestRoute>
                    <ChangePasswordPage />
                  </GuestRoute>
                }
              />
              <Route
                path={AppRoutes.DASHBOARD}
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path={AppRoutes.STRETCHES} element={<StretchesPage />} />
              <Route path={AppRoutes.DESKTOP_APP} element={<DesktopAppPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </StretchProvider>
    </ThemeProvider>
  </StrictMode>,
);
