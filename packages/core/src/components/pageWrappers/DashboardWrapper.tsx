import { useState } from 'react';
import ThemeToggle from '../common/ThemeToggle';
import Logo from '../common/Logo';
import { Link, NavLink } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import LogoutButton from '../common/LogoutButton';

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="dashboard-wrapper">
      <aside className={`dashboard-wrapper__aside dashboard-aside${menuOpen ? ' dashboard-aside--open' : ''}`}>
        <div className="dashboard-aside__top">
          <Link to={AppRoutes.HOME} onClick={closeMenu}>
            <Logo />
          </Link>
          <ul className="dashboard-aside__menu">
            <li className="dashboard-aside__item">
              <NavLink to={AppRoutes.DASHBOARD} end onClick={closeMenu}>
                Dashboard
              </NavLink>
            </li>
            <li className="dashboard-aside__item">
              <NavLink to={AppRoutes.DASHBOARD_STATISTICS} onClick={closeMenu}>Statistics</NavLink>
            </li>
            <li className="dashboard-aside__item">
              <NavLink to={AppRoutes.DASHBOARD_GOAL} onClick={closeMenu}>Goals</NavLink>
            </li>
            <li className="dashboard-aside__item">
              <NavLink to={AppRoutes.DASHBOARD_PROFILE} onClick={closeMenu}>Profile</NavLink>
            </li>
          </ul>
        </div>
        <div className="dashboard-aside__bottom">
          <div className="dashboard-aside__banner">
            <h3 className="dashboard-aside__banner-title">Get the desktop app</h3>
            <p className="dashboard-aside__banner-text">
              Gentle stretch reminders, right on your desk.
            </p>
            <Link className="btn btn--purple" to={AppRoutes.DESKTOP_APP} onClick={closeMenu}>
              Download
            </Link>
          </div>
          <LogoutButton className="btn btn--outline dashboard-aside__logout" />
        </div>
      </aside>

      {menuOpen && <div className="dashboard-wrapper__overlay" onClick={closeMenu} />}

      <main className="dashboard-wrapper__main">
        <button
          className={`dashboard-wrapper__burger${menuOpen ? ' dashboard-wrapper__burger--open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
        {children}
      </main>

      <ThemeToggle />
    </div>
  );
}
