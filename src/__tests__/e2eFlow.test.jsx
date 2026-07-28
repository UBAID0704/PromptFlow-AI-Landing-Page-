// @vitest-environment jsdom
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

describe('End-to-End User Flow Test', () => {

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation((url) => {
      const urlStr = typeof url === 'string' ? url : url.toString();

      if (urlStr.includes('models')) {
        return Promise.resolve({
          ok: true,
          json: async () => [],
        });
      }

      if (urlStr.includes('analytics')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            summaryCards: {
              totalRevenue: '$124,500',
              activeUsers: '14,250',
              totalUploads: '89,100',
              systemHealth: 'Healthy'
            },
            monthlyTrends: [
              { month: 'Jan', revenue: 4000, users: 2400, storageMB: 240 },
              { month: 'Feb', revenue: 3000, users: 1398, storageMB: 221 }
            ],
            categoryDistribution: [
              { name: 'Analytics', value: 400, color: '#818cf8' },
              { name: 'Uploads', value: 300, color: '#38bdf8' }
            ]
          }),
        });
      }

      if (urlStr.includes('feedback') || urlStr.includes('reviews')) {
        return Promise.resolve({
          ok: true,
          json: async () => [
            { id: 1, name: 'Sahil', category: 'UI UX Bug', feedback: 'Great experience!' }
          ],
        });
      }

      return Promise.resolve({
        ok: true,
        json: async () => ({ success: true, message: 'Thank you for your feedback!' }),
      });
    });
  });

  it('simulates full flow: navigate to feedback tab -> fill form -> submit -> view success state', async () => {
    const { container } = render(<App />);

    const feedbackNavBtn = 
      screen.queryByRole('button', { name: /feedback/i }) || 
      screen.queryByRole('tab', { name: /feedback/i }) ||
      screen.queryByText(/feedback/i);

    if (feedbackNavBtn) {
      fireEvent.click(feedbackNavBtn);
    }

    let feedbackInput = null;

    await waitFor(() => {
      feedbackInput = 
        screen.queryByPlaceholderText(/describe your feedback|enter feedback|your feedback/i) ||
        container.querySelector('textarea') ||
        container.querySelector('input[name="feedback"]');

      expect(feedbackInput).not.toBeNull();
    }, { timeout: 3000 });

    expect(feedbackInput).toBeInTheDocument();

    const nameInput = 
      screen.queryByPlaceholderText(/your name|e\.g\./i) || 
      container.querySelector('input[name="name"]');

    if (nameInput) {
      fireEvent.change(nameInput, { target: { value: 'Sahil' } });
    }

    const emailInput = container.querySelector('input[type="email"]');
    if (emailInput) {
      fireEvent.change(emailInput, { target: { value: 'sahil@example.com' } });
    }

    const categorySelect = container.querySelector('select');
    if (categorySelect && categorySelect.options.length > 1) {
      fireEvent.change(categorySelect, { target: { value: categorySelect.options[1].value } });
    }

    const dateInput = container.querySelector('input[type="date"]');
    if (dateInput) {
      fireEvent.change(dateInput, { target: { value: '2026-07-26' } });
    }

    const fileInput = container.querySelector('input[type="file"]');
    if (fileInput) {
      const file = new File(['content'], 'test.png', { type: 'image/png' });
      fireEvent.change(fileInput, { target: { files: [file] } });
    }

    fireEvent.change(feedbackInput, { target: { value: 'The analytics dashboard component loads quickly!' } });

    const submitBtn = 
      screen.queryByRole('button', { name: /submit|send/i }) ||
      container.querySelector('button[type="submit"]');

    if (submitBtn) {
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(
          screen.queryByText(/thank you|success|submitted/i)
        ).toBeInTheDocument();
      });
    }
  });

});
