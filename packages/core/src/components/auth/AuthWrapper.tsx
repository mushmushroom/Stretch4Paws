import React from 'react';
import AuthInfo from './AuthInfo';

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
      </main>
    </div>
  );
}
