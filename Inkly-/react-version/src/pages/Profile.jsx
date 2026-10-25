import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useBookmarks } from '../context/BookmarksContext.jsx';
import { useFollow } from '../context/FollowContext.jsx';
import { useStories } from '../context/StoriesContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Profile() {
  const { user, logout } = useAuth();
  const { saved } = useBookmarks();
  const { followed } = useFollow();
  const { userStories, removeStory } = useStories();
  const { show } = useToast();

  const initials = (user?.name || 'G')
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const stats = [
    { label: 'Saved', value: saved.length },
    { label: 'Following', value: followed.length },
    { label: 'Your stories', value: userStories.length },
  ];

  function handleDelete(story) {
    // window.confirm is a browser API that shows a built-in yes/no dialog.
    if (!window.confirm(`Delete “${story.title}”?`)) return;
    removeStory(story.id);
    show('Story deleted', 'error');
  }

  return (
    <>
      <PageHero eyebrow="YOUR ACCOUNT" title={<>Hello, <span>{user?.name}</span></>}>
        {user?.email || 'Browsing as a guest'}
      </PageHero>

      <section className="profile">
        <div className="profile-card">
          <div className="avatar big">{initials}</div>
          <div className="stat-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat">
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <button className="ghost-btn" onClick={logout}>Sign out</button>
        </div>

        <div className="profile-stories">
          <h2>Your stories</h2>
          {userStories.length === 0 ? (
            <p className="meta">
              You haven’t published anything yet. <Link className="link" to="/write">Write your first story</Link>.
            </p>
          ) : (
            userStories.map((story) => (
              <div key={story.id} className="user-story-row">
                <Link className="link" to={`/article/${story.id}`}>{story.title}</Link>
                <button className="ghost-btn small" onClick={() => handleDelete(story)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
