import Logo from './Logo';
import { useAuth } from '../../context/authContext/useAuth';
import { AppRoutes } from '../../lib/constants';
import LogoutButton from './LogoutButton';
import type { DesktopView } from '../../lib/types';

interface DesktopHeaderProps {
  view: DesktopView;
  onViewChange: (view: DesktopView) => void;
}

export default function DesktopHeader({ view, onViewChange }: DesktopHeaderProps) {
  const { user } = useAuth();
  const BASE_URL = import.meta.env.VITE_PUBLIC_URL ?? '';

  const openAuthWindow = (path: string) => {
    window.electron?.openAuthWindow(`${BASE_URL}${path}`);
  };

  return (
    <header className="header">
      <Logo text={true} />
      <nav className="header__menu">
        <ul className="header__list">
          <li className="header__item">
            <button
              className={`btn btn--ghost${view === 'stretches' ? ' btn--active' : ''}`}
              onClick={() => onViewChange('stretches')}
            >
              Stretches
            </button>
          </li>
          <li className="header__item">
            <button
              className={`btn btn--ghost${view === 'settings' ? ' btn--active' : ''}`}
              onClick={() => onViewChange('settings')}
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
                >
                  Login
                </button>
              </li>
              <li className="header__item">
                <button className="btn" onClick={() => openAuthWindow(AppRoutes.REGISTER)}>
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
