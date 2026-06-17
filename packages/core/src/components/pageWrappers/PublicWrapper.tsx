import React from 'react';
import Header from '../Header';
import { useAuth } from '../../context/authContext/useAuth';

export default function PublicWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();

  if (isLoading) return null;
  return (
    <div className="public-wrapper">
      <Header />
      <main>{children}</main>
    </div>
  );
}
