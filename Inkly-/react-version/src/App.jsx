import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PageLoader from './components/PageLoader.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Explore = lazy(() => import('./pages/Explore.jsx'));
const Article = lazy(() => import('./pages/Article.jsx'));
const Write = lazy(() => import('./pages/Write.jsx'));
const Saved = lazy(() => import('./pages/Saved.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/write" element={<Write />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
