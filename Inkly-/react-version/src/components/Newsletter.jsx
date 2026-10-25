import { useState } from 'react';
import { isValidEmail } from '../utils/validators.js';
import { useToast } from '../context/ToastContext.jsx';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'error' | 'success'
  const { show } = useToast();

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    show('You are subscribed. Welcome to Inkly!');
  }

  return (
    <section className="newsletter">
      <div>
        <small className="eyebrow">NEWSLETTER</small>
        <h2>Good Ideas. Delivered Weekly.</h2>
        <p>Join 50,000+ curious minds and get the best stories, ideas and insights straight to your inbox.</p>
      </div>
      <div>
        <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="Enter your email address"
            aria-label="Email address"
          />
          <button type="submit" disabled={status === 'success'}>
            {status === 'success' ? 'Subscribed ✓' : 'Subscribe'}
          </button>
        </form>
        {status === 'error' && <p className="form-error">Enter a valid email address.</p>}
      </div>
    </section>
  );
}
