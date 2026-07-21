import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/contacts';

function CrudDashboard({ onSwitchToAdmin }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Could not fetch reviews.');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err.message || 'Server error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;
    if (rating === 0) {
      setError('Please select a star rating before submitting.');
      return;
    }

    setActionLoading(true);
    setError(null);

    const payload = { name, email: `${rating} Stars ⭐`, message };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to post review.');

      setName('');
      setRating(0);
      setMessage('');
      await fetchItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section style={{ padding: '3rem 2rem', color: '#fff', textAlign: 'center' }}>
      <div className="features-header">
        <span className="hero-tag" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
          USER REVIEWS
        </span>
        <h2>AI Model Ratings & Feedback</h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Rate our neural generation pipelines and share performance feedback.
        </p>
      </div>

      {error && (
        <div style={{ margin: '0 auto 1.5rem auto', maxWidth: '600px', padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#f87171' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1000px', margin: '0 auto', alignItems: 'flex-start' }}>
        
        {/* Public Submission Form */}
        <form onSubmit={handleSubmit} style={{ flex: '1', minWidth: '280px', maxWidth: '380px', background: 'rgba(17, 20, 24, 0.6)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'left' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#fff', fontSize: '1.15rem' }}>
            ⭐ Submit Rating
          </h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Your Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Alex" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }} required />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Select Rating</label>
            <div style={{ display: 'flex', gap: '0.3rem', fontSize: '1.6rem', cursor: 'pointer' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ color: star <= (hoverRating || rating) ? '#f59e0b' : 'rgba(255,255,255,0.2)', transition: 'color 0.15s' }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Comment</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows="2" placeholder="Write feedback..." style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', resize: 'none', boxSizing: 'border-box' }} required />
          </div>

          <button type="submit" disabled={actionLoading} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', color: '#fff', fontWeight: 600, cursor: 'pointer', opacity: actionLoading ? 0.6 : 1 }}>
            {actionLoading ? 'Saving...' : 'Post Rating'}
          </button>
        </form>

        {/* Public Reviews List (No Edit or Delete Buttons) */}
        <div style={{ flex: '1.2', minWidth: '300px', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
          <h3 style={{ marginTop: 0, color: '#fff', fontSize: '1.15rem', marginBottom: '0.25rem' }}>🌟 Community Reviews</h3>
          
          {loading && (
            <div style={{ color: 'rgba(255,255,255,0.5)', padding: '1.5rem', textAlign: 'center' }}>
              ⏳ Fetching reviews...
            </div>
          )}

          {!loading && items.length === 0 && (
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>No ratings submitted yet.</p>
          )}

          <div style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.25rem' }}>
            {!loading && items.map(item => (
              <div key={item.id} style={{ background: 'rgba(17, 20, 24, 0.5)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{item.name}</strong> 
                <div style={{ color: '#f59e0b', fontSize: '0.9rem', marginTop: '0.1rem' }}>
                  {item.email && item.email.includes('Stars') ? item.email : '5 Stars ⭐'}
                </div>
                <p style={{ margin: '0.35rem 0 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{item.message}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={onSwitchToAdmin} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}>
          ⚙️ Switch to Admin Console (Moderation Mode)
        </button>
      </div>
    </section>
  );
}

export default CrudDashboard;