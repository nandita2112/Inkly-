import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${next} mode`}>
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
