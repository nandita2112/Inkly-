import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { navItems } from '../data/content.js';
import { useBookmarks } from '../context/BookmarksContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { saved } = useBookmarks();
  const { user } = useAuth();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const initials = (user?.name || 'G')
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="navbar">
      <Link className="logo" to="/">
        Inkly<span>.</span>
      </Link>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className="nav-link">
            {item.label}
            {item.to === '/saved' && saved.length > 0 && (
              <span className="count-badge">{saved.length}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="header-right">
        <SearchBar />
        <ThemeToggle />
        <Link to="/profile" className="avatar nav-avatar" aria-label="Your profile">
          {initials}
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
