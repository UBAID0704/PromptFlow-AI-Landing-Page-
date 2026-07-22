import React, { useState } from 'react';

function UserFeedbackForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    category: '',
    rating: '5',
    experienceDate: '',
    comments: ''
  });
  const [file, setFile] = useState(null);

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (fieldErrors.attachment) {
        setFieldErrors(prev => ({ ...prev, attachment: '' }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errors.fullName = 'Full Name must be at least 3 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.category) {
      errors.category = 'Please select a category from the dropdown.';
    }

    if (!formData.experienceDate) {
      errors.experienceDate = 'Please select the date of your experience.';
    } else if (new Date(formData.experienceDate) > new Date()) {
      errors.experienceDate = 'Date cannot be set in the future.';
    }

    if (!formData.comments.trim() || formData.comments.trim().length < 10) {
      errors.comments = 'Feedback comments must be at least 10 characters long.';
    }

    if (!file) {
      errors.attachment = 'Please attach a screenshot or document.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    if (!validateForm()) {
      setToast({ type: 'error', message: 'Please fix the errors in the form before submitting.' });
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('category', formData.category);
    data.append('rating', formData.rating);
    data.append('experienceDate', formData.experienceDate);
    data.append('comments', formData.comments);
    data.append('attachment', file);

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        throw new Error(result.message || 'Submission failed.');
      }

      setToast({ type: 'success', message: '🎉 Feedback submitted successfully! Thank you for your input.' });
      
      setFormData({
        fullName: '',
        email: '',
        category: '',
        rating: '5',
        experienceDate: '',
        comments: ''
      });
      setFile(null);
      setFieldErrors({});

    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Network error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{ padding: '3rem 1rem', color: '#fff', maxWidth: '650px', margin: '0 auto' }}>
      <div style={{ background: 'rgba(17, 20, 24, 0.95)', padding: '2.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ marginTop: 0, textAlign: 'center' }}>📝 Detailed User Feedback</h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Connect your feedback directly to our backend system.
        </p>

        {toast && (
          <div style={{
            padding: '0.85rem 1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            fontWeight: '500',
            background: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${toast.type === 'success' ? '#22c55e' : '#ef4444'}`,
            color: toast.type === 'success' ? '#4ade80' : '#f87171'
          }}>
            {toast.message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* 1. Full Name */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Ubaidullah"
              style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: fieldErrors.fullName ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }}
            />
            {fieldErrors.fullName && <p style={{ color: '#f87171', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>⚠️ {fieldErrors.fullName}</p>}
          </div>

          {/* 2. Email Address */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@domain.com"
              style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: fieldErrors.email ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }}
            />
            {fieldErrors.email && <p style={{ color: '#f87171', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>⚠️ {fieldErrors.email}</p>}
          </div>

          {/* 3. Dropdown / Select */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Feedback Category (Select) *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: fieldErrors.category ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.15)', background: '#111418', color: '#fff', boxSizing: 'border-box' }}
            >
              <option value="">-- Choose Category --</option>
              <option value="Model Accuracy">Model Accuracy & Outputs</option>
              <option value="UI UX Bug">UI/UX Bug Report</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Performance">API Performance & Speed</option>
            </select>
            {fieldErrors.category && <p style={{ color: '#f87171', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>⚠️ {fieldErrors.category}</p>}
          </div>

          {/* 4. Date Input */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Date of Experience (Date) *</label>
            <input
              type="date"
              name="experienceDate"
              value={formData.experienceDate}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: fieldErrors.experienceDate ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }}
            />
            {fieldErrors.experienceDate && <p style={{ color: '#f87171', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>⚠️ {fieldErrors.experienceDate}</p>}
          </div>

          {/* 5. File / Image Input */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Attachment / Screenshot (File) *</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleFileChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: fieldErrors.attachment ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }}
            />
            {fieldErrors.attachment && <p style={{ color: '#f87171', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>⚠️ {fieldErrors.attachment}</p>}
          </div>

          {/* 6. Textarea */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Detailed Comments *</label>
            <textarea
              name="comments"
              rows="4"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Describe your feedback or issue in detail..."
              style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: fieldErrors.comments ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', boxSizing: 'border-box' }}
            />
            {fieldErrors.comments && <p style={{ color: '#f87171', fontSize: '0.8rem', margin: '0.3rem 0 0 0' }}>⚠️ {fieldErrors.comments}</p>}
          </div>

          {/* Disabled Submit Button with Loading Indicator */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '8px',
              border: 'none',
              background: isSubmitting ? '#4b5563' : '#6366f1',
              color: '#fff',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: isSubmitting ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            {isSubmitting ? (
              <>
                <span className="spinner" style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid #ffffff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}></span>
                Submitting Feedback...
              </>
            ) : (
              '🚀 Submit Feedback'
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

export default UserFeedbackForm;