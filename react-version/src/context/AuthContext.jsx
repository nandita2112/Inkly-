import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

const AuthContext = createContext(null);

// Demo authentication: the "session" is just a user object in localStorage.
// A real app would call a backend API here.
export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('inkly-user', null);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login: ({ name, email }) => setUser({ name, email }),
    loginAsGuest: () => setUser({ name: 'Guest', email: '' }),
    logout: () => setUser(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
}
