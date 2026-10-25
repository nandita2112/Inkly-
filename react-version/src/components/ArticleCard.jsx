import { memo } from 'react';
import { Link } from 'react-router-dom';
import BookmarkButton from './BookmarkButton.jsx';
import { categoryName } from '../data/content.js';

// variant: "default" (grid), "lead" (large), or "compact" (side list)
function ArticleCard({ article, variant = 'default' }) {
  const details = [article.author, `${article.readTime} min read`].filter(Boolean).join(' · ');

  return (
    <article className={`article-card ${variant}`}>
      <Link to={`/article/${article.id}`} tabIndex={-1} aria-hidden="true">
        <img src={article.image} alt="" loading="lazy" />
      </Link>
      <div className="article-body">
        <div className="card-top">
          <span className="tag">{categoryName(article.category)}</span>
          {article.isUserStory && <span className="new-badge">NEW</span>}
        </div>
        <h3>
          <Link to={`/article/${article.id}`}>{article.title}</Link>
        </h3>
        <p>{article.excerpt}</p>
        <div className="card-bottom">
          <span className="meta">{details}</span>
          <BookmarkButton articleId={article.id} compact={variant === 'compact'} />
        </div>
      </div>
    </article>
  );
}

// memo skips re-rendering a card when its props have not changed.
export default memo(ArticleCard);
