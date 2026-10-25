import { categories } from '../data/content.js';

// A continuously scrolling strip of category names. The list is repeated
// so the animation can loop without a visible jump.
export default function Ticker() {
  const items = [...categories, ...categories];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span key={`${item.slug}-${i}`}>
            {item.name}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
