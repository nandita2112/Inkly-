import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import FilterBar from '../components/FilterBar.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import { useStories } from '../context/StoriesContext.jsx';
import { categories, categoryName } from '../data/content.js';

const PAGE_SIZE = 6;
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'shortest', label: 'Shortest read' },
  { value: 'longest', label: 'Longest read' },
  { value: 'az', label: 'A to Z' },
];

function matchesQuery(article, query) {
  const term = query.trim().toLowerCase();
  if (!term) return true;
  return [article.title, article.excerpt, article.author, categoryName(article.category)]
    .some((field) => field?.toLowerCase().includes(term));
}

export default function Explore() {
  const { allArticles } = useStories();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? 'all';
  const sort = searchParams.get('sort') ?? 'newest';
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // useCallback: the function keeps its identity unless its dependencies change.
  const updateParam = useCallback(
    (key, value, defaultValue) => {
      const next = new URLSearchParams(searchParams);
      if (value && value !== defaultValue) next.set(key, value);
      else next.delete(key);
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Filter, then sort. The copy avoids mutating the shared articles array.
  const results = useMemo(() => {
    const filtered = allArticles.filter(
      (article) =>
        (category === 'all' || article.category === category) && matchesQuery(article, query)
    );
    const sorted = [...filtered];
    if (sort === 'shortest') sorted.sort((a, b) => a.readTime - b.readTime);
    if (sort === 'longest') sorted.sort((a, b) => b.readTime - a.readTime);
    if (sort === 'az') sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [allArticles, category, query, sort]);

  // Start from the first page again whenever a filter changes.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, category, sort]);

  const counts = useMemo(
    () =>
      allArticles.reduce((acc, article) => {
        acc[article.category] = (acc[article.category] || 0) + 1;
        return acc;
      }, {}),
    [allArticles]
  );

  const filterOptions = [
    { value: 'all', label: 'All', count: allArticles.length },
    ...categories
      .filter((c) => counts[c.slug])
      .map((c) => ({ value: c.slug, label: c.name, count: counts[c.slug] })),
  ];

  const visible = results.slice(0, visibleCount);
  const remaining = results.length - visible.length;

  return (
    <>
      <PageHero eyebrow="DISCOVER NEW IDEAS" title={<>Explore <span>Stories</span></>}>
        Discover thoughtful stories, fresh ideas and perspectives from writers around the world.
      </PageHero>

      <div className="explore-tools">
        <div className="explore-toolbar">
          <label className="explore-search">
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(e) => updateParam('q', e.target.value, '')}
              placeholder="Search articles..."
              aria-label="Search articles"
            />
          </label>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => updateParam('sort', e.target.value, 'newest')}
            aria-label="Sort stories"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <FilterBar
          options={filterOptions}
          active={category}
          onChange={(value) => updateParam('category', value, 'all')}
        />
      </div>

      <p className="results-count">
        Showing {visible.length} of {results.length} stories
      </p>

      <section className="explore-grid">
        {visible.length > 0 ? (
          visible.map((article) => <ArticleCard key={article.id} article={article} />)
        ) : (
          <div className="empty-state">
            <p>No stories match “{query}”. Try a different word or clear the filters.</p>
            <button onClick={() => setSearchParams({}, { replace: true })}>Clear filters</button>
          </div>
        )}
      </section>

      {remaining > 0 && (
        <div className="load-more-wrap">
          <button className="load-more" onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}>
            Load more ({remaining} left)
          </button>
        </div>
      )}
    </>
  );
}
