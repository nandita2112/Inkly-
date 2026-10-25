import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Auto-advancing featured carousel. Pauses while the mouse is over it.
export default function HeroSlider({ slides, popular }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);
    // Cleanup stops the timer when the component unmounts or `paused` changes.
    return () => clearInterval(timer);
  }, [slides.length, paused]);

  const slide = slides[index];
  const next = () => setIndex((current) => (current + 1) % slides.length);
  const prev = () => setIndex((current) => (current - 1 + slides.length) % slides.length);
  const initials = slide.author.split(' ').map((word) => word[0]).join('');

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(90deg, #02070d 5%, rgba(3,10,17,.65), rgba(3,10,17,.1)), url('${slide.image}')`,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-content" key={slide.id}>
        <span className="badge">FEATURED STORY</span>
        <h1>{slide.title}</h1>
        <p>{slide.excerpt}</p>
        <div className="hero-buttons">
          <Link to={`/article/${slide.id}`} className="gradient-btn">Read Full Article →</Link>
          <div className="author">
            <div className="avatar">{initials}</div>
            <div>
              <b>By {slide.author}</b>
              <small>{slide.readTime} min read</small>
            </div>
          </div>
        </div>
        <div className="slider-controls">
          <button onClick={prev} aria-label="Previous story">←</button>
          <span>{index + 1} / {slides.length}</span>
          <button onClick={next} aria-label="Next story">→</button>
        </div>
      </div>

      <aside className="popular-panel">
        <h3>Most Popular</h3>
        {popular.map((article, i) => (
          <Link key={article.id} to={`/article/${article.id}`} className="popular-item">
            <b>0{i + 1}</b>
            <span>
              {article.title}
              <small>{article.readTime} min read</small>
            </span>
          </Link>
        ))}
      </aside>
    </section>
  );
}
