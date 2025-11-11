import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      onClick={toggleTheme}
      className="theme-toggle-btn"
    >
      {theme === 'dark' ? <FaMoon size={22} /> : <FaSun size={22} />}
    </button>
  );
}
