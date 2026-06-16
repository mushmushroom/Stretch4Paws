import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@stretch4paws/core/App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from '@stretch4paws/core/context/ThemeContext';
import { StretchProvider } from '@stretch4paws/core/context/StretchContext';
import LoginPage from '@stretch4paws/core/components/auth/LoginPage';
import RegisterPage from '@stretch4paws/core/components/auth/RegisterPage';
import ResetPasswordPage from '@stretch4paws/core/components/auth/ResetPasswordPage';
import { AppRoutes } from '@stretch4paws/core/lib/constants';
import ChangePasswordPage from '@stretch4paws/core/components/auth/ChangePasswordPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <StretchProvider>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoutes.HOME} element={<App />} />
            <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
            <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
            <Route path={AppRoutes.RESET_PASSWORD} element={<ResetPasswordPage />} />
            <Route path={AppRoutes.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
          </Routes>
        </BrowserRouter>
      </StretchProvider>
    </ThemeProvider>
  </StrictMode>,
);
