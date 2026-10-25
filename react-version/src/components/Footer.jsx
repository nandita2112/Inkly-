import { Link } from 'react-router-dom';
import { navItems } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link className="logo" to="/">Inkly<span>.</span></Link>
        <p>A home for stories, ideas and curious minds.</p>
      </div>
      <div className="footer-links">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to}>{item.label}</Link>
        ))}
      </div>
      <p>© {new Date().getFullYear()} Inkly. All rights reserved.</p>
    </footer>
  );
}
