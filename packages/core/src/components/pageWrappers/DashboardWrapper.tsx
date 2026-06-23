import React from 'react';
import ThemeToggle from '../common/ThemeToggle';
import Logo from '../common/Logo';
import { Link, NavLink } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import LogoutButton from '../common/LogoutButton';

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-wrapper__aside dashboard-aside">
        <div className="dashboard-aside__top">
          <Link to={AppRoutes.HOME}>
            <Logo />
          </Link>
          <ul className="dashboard-aside__menu">
            <li className="dashboard-aside__item">
              <NavLink to={AppRoutes.DASHBOARD} end>
                Dashboard
              </NavLink>
            </li>
            <li className="dashboard-aside__item">
              <NavLink to={AppRoutes.DASHBOARD_STATISTICS}>Statistics</NavLink>
            </li>
            <li className="dashboard-aside__item">
              <NavLink to={AppRoutes.DASHBOARD_GOAL}>Goals</NavLink>
            </li>
            <li className="dashboard-aside__item">
              <NavLink to={AppRoutes.DASHBOARD_PROFILE}>Profile</NavLink>
            </li>
          </ul>
        </div>
        <div className="dashboard-aside__bottom">
          <div className="dashboard-aside__banner">
            <h3 className="dashboard-aside__banner-title">Get the desktop app</h3>
            <p className="dashboard-aside__banner-text">
              Gentle stretch reminders, right on your desk.
            </p>
            <Link className="btn btn--purple" to={AppRoutes.DESKTOP_APP}>
              Download
            </Link>
          </div>
          <LogoutButton className="btn btn--outline dashboard-aside__logout" />
        </div>
      </aside>
      <main className="dashboard-wrapper__main">{children}</main>
      <ThemeToggle />
    </div>
  );
}
