import Logo from './Logo';
import { useAuth } from '../../context/authContext/useAuth';
import { AppRoutes } from '../../lib/constants';
import LogoutButton from './LogoutButton';

const BASE_URL = import.meta.env.VITE_PUBLIC_URL ?? '';

function openAuthWindow(path: string) {
  window.electron.openAuthWindow(`${BASE_URL}${path}`);
}

export default function DesktopHeader() {
  const { user } = useAuth();

  return (
    <header className="header">
      <Logo text={true} />
      <nav className="header__menu">
        <ul className="header__list">
          

          {!user && (
            <>
              <li className="header__item">
                <button className="btn btn--outline" onClick={() => openAuthWindow(AppRoutes.LOGIN)}>
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
                <button className="btn btn--ghost" onClick={() => window.electron.openExternal(`${BASE_URL}${AppRoutes.DASHBOARD}`)}>
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
