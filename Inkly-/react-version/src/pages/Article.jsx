import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard.jsx';
import BookmarkButton from '../components/BookmarkButton.jsx';
import ReadingProgress from '../components/ReadingProgress.jsx';
import NotFound from './NotFound.jsx';
import useScrollProgress from '../hooks/useScrollProgress.js';
import { useStories } from '../context/StoriesContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { categoryName } from '../data/content.js';

export default function Article() {
  const { id } = useParams();
  const { allArticles } = useStories();
  const { show } = useToast();
  const articleRef = useRef(null);
  const { percent } = useScrollProgress(articleRef);
  const [copied, setCopied] = useState(false);
  const article = allArticles.find((a) => a.id === id);

  // Reset the "Copied" label after two seconds.
  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      show('Link copied to clipboard');
    } catch {
      show('Could not copy the link', 'error');
    }
  }, [show]);

  if (!article) return <NotFound />;

  const related = allArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <>
      <ReadingProgress percent={percent} />
      <article className="article-page" ref={articleRef}>
        <Link className="back-link" to="/explore">← Back to stories</Link>
        <span className="tag block">{categoryName(article.category)}</span>
        <h1>{article.title}</h1>
        <p className="meta">
          {article.author} · {article.readTime} min read · {Math.round(percent)}% read
        </p>
        <div className="article-actions">
          <BookmarkButton articleId={article.id} />
          <button className="ghost-btn" onClick={copyLink}>
            {copied ? 'Copied ✓' : 'Copy link'}
          </button>
        </div>
        <img className="article-hero" src={article.image} alt="" />
        <div className="article-text">
          {article.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="related">
          <h2>More in {categoryName(article.category)}</h2>
          <div className="article-grid">
            {related.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        </section>
      )}
    </>
  );
}
