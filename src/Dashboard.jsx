import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000/api/auth';

function Dashboard({ user, onLogout }) {
  const [protectedData, setProtectedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtectedProfile = async () => {
      const token = localStorage.getItem('userToken');
      try {
        const res = await fetch(`${API_BASE}/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Session invalid. Please log in again.');
        const data = await res.json();
        setProtectedData(data.user);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProtectedProfile();
  }, []);

  return (
    <section style={{ padding: '4rem 2rem', color: '#fff', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(17, 20, 24, 0.85)', padding: '2.5rem', borderRadius: '16px', border: '1px solid #6366f1' }}>
        <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', border: '1px solid rgba(34, 197, 94, 0.4)' }}>
          🔒 PROTECTED USER ROUTE
        </span>
        
        <h2 style={{ marginTop: '1.25rem', fontSize: '1.8rem' }}>Welcome back, {user?.name}!</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
          Authenticated Account: <strong style={{ color: '#818cf8' }}>{user?.email}</strong>
        </p>

        {error ? (
          <div style={{ margin: '1.5rem 0', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderRadius: '8px' }}>
            {error}
          </div>
        ) : (
          <div style={{ margin: '2rem 0', padding: '1.25rem', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#4ade80', fontSize: '0.95rem' }}>✅ Bearer Token Active</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
              Your JWT session token was securely sent in request headers and verified by the Node.js server.
            </p>
          </div>
        )}

        <button onClick={onLogout} style={{ padding: '0.65rem 1.5rem', borderRadius: '8px', border: 'none', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', fontWeight: 600, cursor: 'pointer' }}>
          🚪 Log Out & Clear Token
        </button>
      </div>
    </section>
  );
}

export default Dashboard;