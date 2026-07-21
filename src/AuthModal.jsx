import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000/api/auth';

function AuthModal({ onLoginSuccess, onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Client-Side Validation
  const validateForm = () => {
    if (isSignup && !name.trim()) {
      setError('Full Name is required.');
      return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    const endpoint = isSignup ? `${API_BASE}/signup` : `${API_BASE}/login`;
    const payload = isSignup ? { name, email, password } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed.');

      // Save token securely on frontend
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '3rem 1rem', color: '#fff' }}>
      <div style={{ maxWidth: '420px', margin: '0 auto', background: 'rgba(17, 20, 24, 0.95)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
        <h2 style={{ marginTop: 0, textAlign: 'center', fontSize: '1.5rem' }}>
          {isSignup ? 'Create Your Account' : 'Welcome Back'}
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: '1.5rem' }}>
          {isSignup ? 'Sign up to unlock your personal workspace.' : 'Log in to access your protected user dashboard.'}
        </p>

        {error && (
          <div style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#f87171', fontSize: '0.85rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem', color: 'rgba(255,255,255,0.8)' }}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Alex Smith" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.4)', color: '#fff', boxSizing: 'border-box' }} />
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem', color: 'rgba(255,255,255,0.8)' }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="alex@example.com" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.4)', color: '#fff', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem', color: 'rgba(255,255,255,0.8)' }}>Password (min 6 characters)</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.4)', color: '#fff', boxSizing: 'border-box' }} />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Authenticating...' : (isSignup ? 'Sign Up' : 'Log In')}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem' }}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <button onClick={() => { setIsSignup(!isSignup); setError(''); }} style={{ background: 'transparent', border: 'none', color: '#818cf8', cursor: 'pointer', textDecoration: 'underline' }}>
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;