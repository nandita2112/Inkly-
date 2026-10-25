import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import useForm from '../hooks/useForm.js';
import { useAuth } from '../context/AuthContext.jsx';
import { validateLogin } from '../utils/validators.js';

const initialValues = { name: '', email: '', password: '' };

export default function Login() {
  const { isAuthenticated, login, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Return the user to the page they originally asked for, or home.
  const destination = location.state?.from || '/';

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validateLogin,
    ({ name, email }) => {
      login({ name: name.trim(), email: email.trim() });
      navigate(destination, { replace: true });
    }
  );

  // Already signed in? Skip the form.
  if (isAuthenticated) return <Navigate to="/" replace />;

  function continueAsGuest() {
    loginAsGuest();
    navigate(destination, { replace: true });
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">Inkly<span>.</span></div>
        <h1>Welcome back</h1>
        <p>Sign in to continue to Inkly.</p>

        <form onSubmit={handleSubmit} noValidate>
          <FormField label="Full Name" name="name" placeholder="Enter your name"
            value={values.name} onChange={handleChange} error={errors.name} />
          <FormField label="Email Address" name="email" type="email" placeholder="Enter your email"
            value={values.email} onChange={handleChange} error={errors.email} />
          <FormField label="Password" name="password" type="password" placeholder="Enter password"
            value={values.password} onChange={handleChange} error={errors.password} />
          <button type="submit" className="gradient-btn">Continue →</button>
        </form>

        <div className="login-line"><span>or</span></div>
        <button className="guest-btn" onClick={continueAsGuest}>Continue as Guest</button>
      </div>
    </div>
  );
}
