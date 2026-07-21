import React from 'react';

function Navbar({ user, activeTab, setActiveTab, onLogout }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: 'rgba(10, 12, 16, 0.8)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setActiveTab('landing')}>
        <span style={{ fontSize: '1.25rem' }}>⚡</span>
        <strong style={{ color: '#fff', fontSize: '1.1rem' }}>AI Flow</strong>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={() => setActiveTab('landing')} style={{ background: 'transparent', border: 'none', color: activeTab === 'landing' ? '#818cf8' : 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.9rem' }}>
          Home
        </button>

        {user ? (
          <>
            <button onClick={() => setActiveTab('dashboard')} style={{ background: 'transparent', border: 'none', color: activeTab === 'dashboard' ? '#818cf8' : 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.9rem' }}>
              👤 Dashboard
            </button>
            <button onClick={onLogout} style={{ padding: '0.4rem 0.85rem', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', cursor: 'pointer', fontSize: '0.85rem' }}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => setActiveTab('auth')} style={{ padding: '0.4rem 1rem', borderRadius: '6px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
            Log In / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
