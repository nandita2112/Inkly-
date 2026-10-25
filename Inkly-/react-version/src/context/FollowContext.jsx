import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

const FollowContext = createContext(null);

// Keeps track of which writers the reader follows.
export function FollowProvider({ children }) {
  const [followed, setFollowed] = useLocalStorage('inkly-followed', []);

  const value = {
    followed,
    isFollowing: (id) => followed.includes(id),
    toggleFollow: (id) =>
      setFollowed((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
  };

  return <FollowContext.Provider value={value}>{children}</FollowContext.Provider>;
}

export function useFollow() {
  const context = useContext(FollowContext);
  if (!context) throw new Error('useFollow must be used inside <FollowProvider>');
  return context;
}
