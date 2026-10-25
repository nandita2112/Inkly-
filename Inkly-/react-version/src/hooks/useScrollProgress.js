import { useEffect, useState } from 'react';

// Returns { percent, scrollY }.
// With a ref: percent is how far the referenced element has been read (0-100).
// Without a ref: percent is how far the whole page has been scrolled.
export default function useScrollProgress(targetRef) {
  const [progress, setProgress] = useState({ percent: 0, scrollY: 0 });

  useEffect(() => {
    function update() {
      const scrollY = window.scrollY;
      const element = targetRef?.current;
      let percent = 0;

      if (element) {
        const top = element.getBoundingClientRect().top + scrollY;
        const total = element.offsetHeight - window.innerHeight;
        percent = total > 0 ? ((scrollY - top) / total) * 100 : 0;
      } else {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        percent = total > 0 ? (scrollY / total) * 100 : 0;
      }

      setProgress({ percent: Math.min(100, Math.max(0, percent)), scrollY });
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    // Cleanup: remove the listeners when the component unmounts.
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [targetRef]);

  return progress;
}
