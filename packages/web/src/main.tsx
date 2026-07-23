import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from '@stretch4paws/core/components/auth/LoginPage';
import RegisterPage from '@stretch4paws/core/components/auth/RegisterPage';
import ResetPasswordPage from '@stretch4paws/core/components/auth/ResetPasswordPage';
import { AppRoutes } from '@stretch4paws/core/lib/constants';
import ChangePasswordPage from '@stretch4paws/core/components/auth/ChangePasswordPage';
import GuestRoute from '@stretch4paws/core/components/pageWrappers/GuestRoute';
import DashboardPage from '@stretch4paws/core/components/pages/DashboardPage';
import HomePage from '@stretch4paws/core/components/pages/HomePage';
import ProtectedRoute from '@stretch4paws/core/components/pageWrappers/ProtectedRoute';
import DesktopAppPage from '@stretch4paws/core/components/pages/DesktopAppPage';
import StretchesPage from '@stretch4paws/core/components/pages/StretchesPage';
import Providers from '@stretch4paws/core/components/common/Providers';
import ErrorBoundary from '@stretch4paws/core/components/common/ErrorBoundary';
import StatisticsPage from '@stretch4paws/core/components/dashboard/StatisticsPage';
import GoalsPage from '@stretch4paws/core/components/dashboard/GoalsPage';
import ProfilePage from '@stretch4paws/core/components/dashboard/ProfilePage';
import EditProfilePage from '@stretch4paws/core/components/dashboard/EditProfilePage';
import DashboardChangePasswordPage from '@stretch4paws/core/components/dashboard/DashboardChangePasswordPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
    <Providers>
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
          <Route
            path={AppRoutes.DASHBOARD_STATISTICS}
            element={
              <ProtectedRoute>
                <StatisticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.DASHBOARD_GOAL}
            element={
              <ProtectedRoute>
                <GoalsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.DASHBOARD_PROFILE}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.DASHBOARD_EDIT_PROFILE}
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.DASHBOARD_CHANGE_PASSWORD}
            element={
              <ProtectedRoute>
                <DashboardChangePasswordPage />
              </ProtectedRoute>
            }
          />
          <Route path={AppRoutes.STRETCHES} element={<StretchesPage />} />
          <Route path={AppRoutes.DESKTOP_APP} element={<DesktopAppPage />} />
        </Routes>
      </BrowserRouter>
    </Providers>
    </ErrorBoundary>
  </StrictMode>,
);
