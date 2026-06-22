import React from 'react';
import Header from '../common/Header';
import { useAuth } from '../../context/authContext/useAuth';
import Footer from '../common/Footer';
import ThemeToggle from '../common/ThemeToggle';

export default function PublicWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();

  if (isLoading) return null;
  return (
    <div className="public-wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
      <ThemeToggle />
    </div>
  );
}
