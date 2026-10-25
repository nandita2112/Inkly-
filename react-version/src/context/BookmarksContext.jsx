import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

const BookmarksContext = createContext(null);

// Saved article ids, newest first.
export function BookmarksProvider({ children }) {
  const [saved, setSaved] = useLocalStorage('inkly-saved', []);

  const value = {
    saved,
    isSaved: (id) => saved.includes(id),
    toggleSaved: (id) =>
      setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev])),
  };

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) throw new Error('useBookmarks must be used inside <BookmarksProvider>');
  return context;
}
