import { useBookmarks } from '../context/BookmarksContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function BookmarkButton({ articleId, compact = false }) {
  const { isSaved, toggleSaved } = useBookmarks();
  const { show } = useToast();
  const saved = isSaved(articleId);

  function handleClick(event) {
    event.preventDefault();
    toggleSaved(articleId);
    show(saved ? 'Removed from your reading list' : 'Saved to your reading list');
  }

  return (
    <button
      className={`bookmark-btn ${saved ? 'saved' : ''} ${compact ? 'compact' : ''}`}
      aria-pressed={saved}
      onClick={handleClick}
    >
      {saved ? '★ Saved' : '☆ Save'}
    </button>
  );
}
