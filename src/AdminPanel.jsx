import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/contacts';
const LOGIN_URL = 'http://localhost:5000/api/admin/login';

function AdminPanel({ onSwitchToPublic }) {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      fetchItems();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      // Safely check content type before parsing as JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response (404 Page or Backend Offline). Please restart your backend server with: node server/index.js");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed.');

      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setPasswordInput('');
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
  };

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Could not fetch database records.');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setEmail(item.email);
    setMessage(item.message);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, message })
      });
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update action failed.');

      cancelEdit();
      await fetchItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete action failed.');

      await fetchItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // --- SHOW UNAUTHENTICATED LOGIN FORM ---
  if (!token) {
    return (
      <section style={{ padding: '3rem 2rem', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', background: 'rgba(17, 20, 24, 0.8)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#fff' }}>🔒 Admin Authentication</h3>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Enter password to access database management controls.</p>

          {loginError && (
            <div style={{ marginBottom: '1rem', padding: '0.6rem', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#f87171', fontSize: '0.85rem' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Admin Password</label>
              <input 
                type="password" 
                value={passwordInput} 
                onChange={e => setPasswordInput(e.target.value)} 
                placeholder="Enter password..." 
                style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }} 
                required 
              />
            </div>
            <button type="submit" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
              Unlock Console
            </button>
          </form>

          <button onClick={onSwitchToPublic} style={{ marginTop: '1.25rem', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}>
            ⬅️ Return to Public Site
          </button>
        </div>
      </section>
    );
  }

  // --- SHOW AUTHENTICATED MANAGEMENT PANEL ---
  return (
    <section style={{ padding: '3rem 2rem', color: '#fff', textAlign: 'center' }}>
      <div className="features-header">
        <span className="hero-tag" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.4)' }}>
          AUTHENTICATED ADMIN
        </span>
        <h2>Database Management Panel</h2>
      </div>

      <div style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <button onClick={onSwitchToPublic} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>
            ⬅️ Back to Public View
          </button>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', cursor: 'pointer', fontSize: '0.85rem' }}>
            🚪 Log Out Admin
          </button>
        </div>

        {error && (
          <div style={{ marginBottom: '1.5rem', padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#f87171' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Inline Edit Form */}
        {editingId && (
          <form onSubmit={handleUpdate} style={{ background: 'rgba(17, 20, 24, 0.9)', padding: '1.25rem', borderRadius: '12px', border: '1px solid #6366f1', marginBottom: '1.5rem' }}>
            <h4 style={{ marginTop: 0, color: '#6366f1', fontSize: '1rem' }}>📝 Edit Record #{editingId}</h4>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: '1fr 1fr' }}>
              <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff' }} required />
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff' }} required />
            </div>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows="2" style={{ width: '100%', marginTop: '0.75rem', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }} required />
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
              <button type="submit" disabled={actionLoading} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', background: '#6366f1', color: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>
                {actionLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={cancelEdit} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading && <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>⏳ Loading database records...</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {!loading && items.map(item => (
            <div key={item.id} style={{ background: 'rgba(17, 20, 24, 0.6)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{item.name}</strong> 
                <span style={{ fontSize: '0.85rem', color: '#6366f1', marginLeft: '0.5rem' }}>({item.email})</span>
                <p style={{ margin: '0.35rem 0 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{item.message}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => startEdit(item)} disabled={actionLoading} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.4rem 0.65rem', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '0.8rem' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} disabled={actionLoading} style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '0.4rem 0.65rem', borderRadius: '6px', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminPanel;