import React from 'react';
import { Link, useSearchParams } from 'react-router';
import AuthInfo from '../auth/AuthInfo';
import { AppRoutes } from '../../lib/constants';
import ThemeToggle from '../common/ThemeToggle';

export function useDesktopRoute() {
  const [searchParams] = useSearchParams();
  const isDesktop = searchParams.get('desktop') === 'true';
  return (path: string) => isDesktop ? `${path}?desktop=true` : path;
}

interface AuthWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}
export default function AuthWrapper({ children, title, description }: AuthWrapperProps) {
  const [searchParams] = useSearchParams();
  const isDesktop = searchParams.get('desktop') === 'true';

  return (
    <div className="auth-container">
      <AuthInfo />

      <main className="form-wrapper auth-container__section">
        {(title || description) && (
          <div className="form-wrapper__header">
            {title && <h1 className="form-wrapper__title">{title}</h1>}
            {description && <p className="form-wrapper__descr">{description}</p>}
          </div>
        )}

        {children}
        {!isDesktop && (
          <div className="form-wrapper__footer">
            <Link to={AppRoutes.HOME}>Return to home page</Link>
          </div>
        )}
      </main>
      <ThemeToggle />
    </div>
  );
}
