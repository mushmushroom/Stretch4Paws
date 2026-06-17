import { useState } from 'react';
import { Link } from 'react-router';
import { AppRoutes } from '../lib/constants';
import Logo from './Logo';
import { useAuth } from '../context/authContext/useAuth';
import LogoutButton from './LogoutButton';

export default function Header() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <Link to={AppRoutes.HOME}>
        <Logo />
      </Link>

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
            <Link to={AppRoutes.STRETCHES} onClick={closeMenu}>Stretches</Link>
          </li>
          <li className="header__item">
            <Link to={AppRoutes.DESKTOP_APP} onClick={closeMenu}>Get the app</Link>
          </li>
          {!user && (
            <>
              <li className="header__item">
                <Link to={AppRoutes.LOGIN} onClick={closeMenu}>Login</Link>
              </li>
              <li className="header__item">
                <Link className="btn btn--accent" to={AppRoutes.REGISTER} onClick={closeMenu}>
                  Start free
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="header__item">
                <Link className="btn btn--accent" to={AppRoutes.DASHBOARD} onClick={closeMenu}>
                  Dashboard
                </Link>
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
