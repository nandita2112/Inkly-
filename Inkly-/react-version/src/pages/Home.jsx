import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider.jsx';
import Ticker from '../components/Ticker.jsx';
import StatsStrip from '../components/StatsStrip.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import WriterCard from '../components/WriterCard.jsx';
import Newsletter from '../components/Newsletter.jsx';
import { useFollow } from '../context/FollowContext.jsx';
import { useStories } from '../context/StoriesContext.jsx';
import { categories, writers, popularIds, getArticle } from '../data/content.js';

export default function Home() {
  const { followed } = useFollow();
  const { allArticles, userStories } = useStories();

  // Derived lists: computed from the combined article list on each render.
  const featured = allArticles.filter((a) => a.featured);
  const popular = popularIds.map(getArticle);
  const latest = allArticles.filter((a) => !a.featured);
  const [lead, ...rest] = latest;
  const middleColumn = rest.slice(0, 3);
  const rightColumn = rest.slice(3, 5);

  const stats = [
    { value: allArticles.length, label: 'Stories' },
    { value: writers.length, label: 'Featured writers' },
    { value: categories.length, label: 'Categories' },
    { value: userStories.length, label: 'Written by you' },
  ];

  return (
    <>
      <HeroSlider slides={featured} popular={popular} />
      <Ticker />
      <StatsStrip stats={stats} />

      <section className="section">
        <div className="section-heading">
          <div>
            <small className="eyebrow">EXPLORE CATEGORIES</small>
            <h2>Find What <span>Inspires</span> You</h2>
          </div>
          <p>Dive into our curated categories and explore stories that match your interests.</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <small className="eyebrow">LATEST STORIES</small>
            <h2>Fresh <span>Perspectives</span></h2>
          </div>
          <Link className="section-link" to="/explore">View all articles →</Link>
        </div>
        {lead && (
          <div className="stories">
            <ArticleCard article={lead} variant="lead" />
            <div className="side-column">
              {middleColumn.map((a) => <ArticleCard key={a.id} article={a} variant="compact" />)}
            </div>
            <div className="side-column">
              {rightColumn.map((a) => <ArticleCard key={a.id} article={a} variant="compact" />)}
            </div>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <small className="eyebrow">GET INSPIRED</small>
            <h2>Featured <span>Writers</span></h2>
          </div>
          <p>
            Thought leaders, creators and curious minds sharing their unique perspectives.
            You are following {followed.length} of {writers.length}.
          </p>
        </div>
        <div className="writer-grid">
          {writers.map((writer) => <WriterCard key={writer.id} writer={writer} />)}
        </div>
      </section>

      <section className="section write-cta">
        <div>
          <small className="eyebrow">YOUR TURN</small>
          <h2>Have a perspective worth <span>sharing?</span></h2>
        </div>
        <Link className="gradient-btn" to="/write">Start writing →</Link>
      </section>

      <Newsletter />
    </>
  );
}
