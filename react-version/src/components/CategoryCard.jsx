import { Link } from 'react-router-dom';

// Clicking a category opens Explore already filtered to that category (URL query string).
export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/explore?category=${category.slug}`}
      className="category-card"
      style={{ backgroundImage: `url('${category.image}')` }}
    >
      <h3>{category.name}</h3>
      <small>{category.count}</small>
    </Link>
  );
}
