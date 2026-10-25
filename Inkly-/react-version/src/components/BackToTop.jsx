import useScrollProgress from '../hooks/useScrollProgress.js';

// Appears after the reader scrolls 400px down.
export default function BackToTop() {
  const { scrollY } = useScrollProgress();
  if (scrollY < 400) return null;

  return (
    <button
      className="back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  );
}
