import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { FollowProvider } from './context/FollowContext.jsx';
import { BookmarksProvider } from './context/BookmarksContext.jsx';
import { StoriesProvider } from './context/StoriesContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import './index.css';

// Providers wrap the app from the outside in. Anything inside can read all of them.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <FollowProvider>
            <BookmarksProvider>
              <StoriesProvider>
                <ToastProvider>
                  <App />
                </ToastProvider>
              </StoriesProvider>
            </BookmarksProvider>
          </FollowProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
