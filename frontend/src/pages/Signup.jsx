import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Client-side validation ──
    if (form.name.trim().length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Signup failed');
      }

      login(json.data.user, json.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  // ── Compute password strength ──
  const pwdLen = form.password.length;
  let strengthLabel = '';
  let strengthColor = '';
  let strengthWidth = '';

  if (pwdLen > 0) {
    if (pwdLen < 6) {
      strengthLabel = 'Weak';
      strengthColor = 'bg-red-500';
      strengthWidth = 'w-1/3';
    } else if (pwdLen >= 6 && pwdLen <= 9) {
      strengthLabel = 'Fair';
      strengthColor = 'bg-yellow-500';
      strengthWidth = 'w-2/3';
    } else {
      strengthLabel = 'Strong';
      strengthColor = 'bg-green-500';
      strengthWidth = 'w-full';
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md">
        
        {/* ── HEADER ── */}
        <div className="text-center mb-8">
          <div className="text-indigo-400 text-3xl font-bold mb-2">&lt;/&gt;</div>
          <h1 className="text-2xl font-bold text-white mt-2">Create your account</h1>
          <p className="text-slate-400 text-sm mt-1">Join thousands of developers on SnipForge</p>
        </div>

        {/* ── ERROR DISPLAY ── */}
        {error && (
          <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3 text-red-400 text-sm mb-4">
            {error}
          </div>
        )}

        {/* ── SIGNUP FORM ── */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Roy Het"
              className="input"
            />
          </div>

          <div>
            <label className="label">Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input"
            />
          </div>

          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
            
            {/* ── PASSWORD STRENGTH INDICATOR ── */}
            {pwdLen > 0 && (
              <div className="mt-2">
                <div className="h-1 rounded-full bg-slate-700">
                  <div className={`h-full rounded-full transition-all duration-300 ${strengthColor} ${strengthWidth}`} />
                </div>
                <p className={`text-xs mt-1 text-${strengthColor.split('-')[1]}-400`}>
                  {strengthLabel}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="label">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        {/* ── BOTTOM LINK ── */}
        <div className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;
