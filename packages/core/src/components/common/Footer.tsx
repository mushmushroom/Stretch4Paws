import { Link } from "react-router";
import Logo from "./Logo";
import { AppRoutes } from "../../lib/constants";

export default function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <nav className="footer__menu">
        <ul className="footer__list">
          <li className="footer__item">
            <Link to={AppRoutes.STRETCHES}>Start stretching</Link>
          </li>
          <li className="footer__item">
            <Link to={AppRoutes.DESKTOP_APP}>Get the app</Link>
          </li>
        </ul>
      </nav>
      <p className="footer__copy">© 2026 Stretch4Paws</p>
    </footer>
  );
}
