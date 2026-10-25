import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Submitting the search sends the user to /explore with the query in the URL.
export default function SearchBar({ placeholder = 'Search articles...' }) {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const query = term.trim();
    navigate(query ? `/explore?q=${encodeURIComponent(query)}` : '/explore');
    setTerm('');
  }

  return (
    <form className="search" role="search" onSubmit={handleSubmit}>
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={placeholder}
        aria-label="Search articles"
      />
      <button type="submit" aria-label="Search">⌕</button>
    </form>
  );
}
