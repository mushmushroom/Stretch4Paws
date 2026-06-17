import React from 'react';
import AuthInfo from '../auth/AuthInfo';
import { AppRoutes } from '../../lib/constants';
import { Link } from 'react-router';

interface AuthWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}
export default function AuthWrapper({ children, title, description }: AuthWrapperProps) {
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
        <div className="form-wrapper__footer">
          <Link to={AppRoutes.HOME}>Return to home page</Link>
        </div>
      </main>
    </div>
  );
}
