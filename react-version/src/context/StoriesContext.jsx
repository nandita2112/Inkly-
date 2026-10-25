import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { articles as baseArticles } from '../data/content.js';

const STORAGE_KEY = 'inkly-user-stories';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=85';

const StoriesContext = createContext(null);

// Runs once, as the lazy initial state for useReducer.
function readStoredStories() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

// A reducer describes every way the list can change. Components dispatch actions
// instead of changing state directly, which keeps the logic in one place.
function storiesReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [action.story, ...state];
    case 'remove':
      return state.filter((story) => story.id !== action.id);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function StoriesProvider({ children }) {
  // useReducer(reducer, initialArg, init): init runs lazily to read saved stories.
  const [userStories, dispatch] = useReducer(storiesReducer, undefined, readStoredStories);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userStories));
    } catch {
      /* storage unavailable: stories still work for this session */
    }
  }, [userStories]);

  // User stories are shown first, then the built-in articles.
  const allArticles = useMemo(() => [...userStories, ...baseArticles], [userStories]);

  const value = useMemo(
    () => ({
      userStories,
      allArticles,
      addStory: (fields) => {
        const paragraphs = fields.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
        const words = paragraphs.join(' ').split(/\s+/).length;
        const story = {
          id: `user-${Date.now()}`,
          title: fields.title.trim(),
          category: fields.category,
          author: fields.author,
          excerpt: fields.excerpt.trim(),
          body: paragraphs,
          readTime: Math.max(1, Math.ceil(words / 200)),
          image: DEFAULT_IMAGE,
          isUserStory: true,
        };
        dispatch({ type: 'add', story });
        return story;
      },
      removeStory: (id) => dispatch({ type: 'remove', id }),
    }),
    [userStories, allArticles]
  );

  return <StoriesContext.Provider value={value}>{children}</StoriesContext.Provider>;
}

export function useStories() {
  const context = useContext(StoriesContext);
  if (!context) throw new Error('useStories must be used inside <StoriesProvider>');
  return context;
}
