import React, { useState } from 'react';
import { useApp } from './context/AppContext.jsx';
import UserFeedbackForm from './UserFeedbackForm.jsx';
import { SkeletonCard } from './components/SkeletonLoader.jsx';
import { EmptyState } from './components/EmptyState.jsx';

function CrudDashboard({ onSwitchToAdmin }) {
  const { reviews, isReviewsLoading, fetchReviews } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('quick'); // 'quick' or 'detailed'
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setToast({ type: 'error', message: 'All fields are required.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to submit review');
      
      setToast({ type: 'success', message: 'Review added to community feed!' });
      setFormData({ name: '', email: '', message: '' });
      fetchReviews();
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="feedback-section" style={{ padding: '4rem 1.5rem', maxWidth: '850px', margin: '0 auto', color: '#fff' }}>
      
      {/* SECTION HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Community Hub & Support Center
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
          Share your review with the community or submit technical feedback directly to our engineering team.
        </p>

        {/* ADMIN SWITCH BUTTON */}
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={onSwitchToAdmin}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🔒 Switch to Admin Moderation
          </button>
        </div>
      </div>

      {/* CLEAN TOGGLE BAR */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        background: 'rgba(17, 20, 24, 0.8)',
        padding: '0.4rem',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => setActiveSubTab('quick')}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: 'none',
            background: activeSubTab === 'quick' ? '#6366f1' : 'transparent',
            color: activeSubTab === 'quick' ? '#fff' : 'rgba(255,255,255,0.6)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          ⭐ Public Reviews
        </button>

        <button
          onClick={() => setActiveSubTab('detailed')}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: 'none',
            background: activeSubTab === 'detailed' ? '#6366f1' : 'transparent',
            color: activeSubTab === 'detailed' ? '#fff' : 'rgba(255,255,255,0.6)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          📝 Report an Issue & Uploads
        </button>
      </div>

      {/* SUB-TAB CONTENT 1: QUICK REVIEWS */}
      {activeSubTab === 'quick' && (
        <div style={{ background: 'rgba(17, 20, 24, 0.95)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.2rem' }}>Leave a Quick Community Review</h3>

          {toast && (
            <div style={{ padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', background: toast.type === 'success' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)', color: toast.type === 'success' ? '#4ade80' : '#f87171' }}>
              {toast.message}
            </div>
          )}

          <form onSubmit={handleQuickSubmit} style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }}
              />
              <input
                type="text"
                placeholder="Rating / Tag (e.g. 5 Stars ⭐)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <textarea
              rows="3"
              placeholder="Your quick feedback..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
            >
              {loading ? 'Posting...' : 'Post Public Review'}
            </button>
          </form>

          {/* PUBLIC REVIEW FEED */}
          <h4 style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginBottom: '1rem' }}>Public Community Feed</h4>
          
          {/* DATA FETCHING STATES */}
          {isReviewsLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : reviews.length === 0 ? (
            <EmptyState />
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto' }}>
              {reviews.map((rev) => (
                <div key={rev.id} style={{ padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <strong style={{ color: '#818cf8', fontSize: '0.95rem' }}>{rev.name}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{rev.email}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>"{rev.message}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB CONTENT 2: DETAILED MULTI-FIELD FORM */}
      {activeSubTab === 'detailed' && (
        <UserFeedbackForm />
      )}

    </section>
  );
}

export default CrudDashboard;
