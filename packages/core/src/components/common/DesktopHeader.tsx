import { useState } from 'react';
import Logo from './Logo';
import { useAuth } from '../../context/authContext/useAuth';
import { AppRoutes } from '../../lib/constants';
import LogoutButton from './LogoutButton';
import useOnlineStatus from '../../hooks/useOnlineStatus';
import type { DesktopView } from '../../lib/types';

interface DesktopHeaderProps {
  view: DesktopView;
  onViewChange: (view: DesktopView) => void;
}

export default function DesktopHeader({ view, onViewChange }: DesktopHeaderProps) {
  const { user } = useAuth();
  const isOnline = useOnlineStatus();
  const BASE_URL = import.meta.env.VITE_PUBLIC_URL ?? '';
  const [menuOpen, setMenuOpen] = useState(false);

  const openAuthWindow = (path: string) => {
    window.electron?.openAuthWindow(`${BASE_URL}${path}`);
  };

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <Logo text={true} />

      <button
        className={`header__burger${menuOpen ? ' header__burger--open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && <div className="header__overlay" onClick={closeMenu} />}

      <nav className={`header__menu${menuOpen ? ' header__menu--open' : ''}`}>
        <ul className="header__list">
          <li className="header__item">
            <button
              className={`btn btn--ghost${view === 'stretches' ? ' btn--active' : ''}`}
              onClick={() => { onViewChange('stretches'); closeMenu(); }}
            >
              Stretches
            </button>
          </li>
          <li className="header__item">
            <button
              className={`btn btn--ghost${view === 'settings' ? ' btn--active' : ''}`}
              onClick={() => { onViewChange('settings'); closeMenu(); }}
            >
              Settings
            </button>
          </li>
          {!user && (
            <>
              <li className="header__item">
                <button
                  className="btn btn--outline"
                  onClick={() => openAuthWindow(AppRoutes.LOGIN)}
                  disabled={!isOnline}
                  title={!isOnline ? 'No internet connection' : undefined}
                >
                  Login
                </button>
              </li>
              <li className="header__item">
                <button
                  className="btn"
                  onClick={() => openAuthWindow(AppRoutes.REGISTER)}
                  disabled={!isOnline}
                  title={!isOnline ? 'No internet connection' : undefined}
                >
                  Start free
                </button>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="header__item">
                <button
                  className="btn btn--ghost"
                  onClick={() => window.electron?.openExternal(`${BASE_URL}${AppRoutes.DASHBOARD}`)}
                  disabled={!isOnline}
                  title={!isOnline ? 'No internet connection' : undefined}
                >
                  Dashboard
                </button>
              </li>
              <li className="header__item">
                <LogoutButton />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
