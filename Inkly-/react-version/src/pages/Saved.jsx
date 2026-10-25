import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import { useBookmarks } from '../context/BookmarksContext.jsx';
import { useStories } from '../context/StoriesContext.jsx';

export default function Saved() {
  const { saved } = useBookmarks();
  const { allArticles } = useStories();

  // Map saved ids to article objects. filter(Boolean) drops ids that no longer exist.
  const items = saved.map((id) => allArticles.find((a) => a.id === id)).filter(Boolean);

  return (
    <>
      <PageHero eyebrow="YOUR READING LIST" title={<>Saved <span>stories</span></>}>
        Everything you bookmarked, newest first.
      </PageHero>
      <section className="explore-grid">
        {items.length > 0 ? (
          items.map((article) => <ArticleCard key={article.id} article={article} />)
        ) : (
          <div className="empty-state">
            <p>You haven’t saved anything yet.</p>
            <Link className="gradient-btn" to="/explore">Find stories</Link>
          </div>
        )}
      </section>
    </>
  );
}
