import React from 'react';

function Contact() {
  return (
    <section className="features-section" id="contact" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="features-header">
        <span className="hero-tag">SUPPORT</span>
        <h2>Get in Touch</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
          Have any questions? Our team is standing by to help you unlock maximum productivity.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
        <form className="glass-card" style={{ width: '100%', maxWidth: '500px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>Name</label>
            <input 
              type="text" 
              placeholder="Your name" 
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(10, 12, 16, 0.5)', color: '#fff', boxSizing: 'border-box' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(10, 12, 16, 0.5)', color: '#fff', boxSizing: 'border-box' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>Message</label>
            <textarea 
              rows="4" 
              placeholder="How can we help?" 
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(10, 12, 16, 0.5)', color: '#fff', boxSizing: 'border-box', resize: 'vertical' }} 
            ></textarea>
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;