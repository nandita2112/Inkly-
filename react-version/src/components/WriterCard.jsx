import { useFollow } from '../context/FollowContext.jsx';

export default function WriterCard({ writer }) {
  const { isFollowing, toggleFollow } = useFollow();
  const following = isFollowing(writer.id);

  return (
    <div className="writer-card">
      <div className="writer-avatar">{writer.initials}</div>
      <div>
        <h3>{writer.name}</h3>
        <small>{writer.publication}</small>
        <p>{writer.bio}</p>
        <button
          className={`follow-btn ${following ? 'following' : ''}`}
          aria-pressed={following}
          onClick={() => toggleFollow(writer.id)}
        >
          {following ? 'Following ✓' : 'Follow'}
        </button>
      </div>
    </div>
  );
}
