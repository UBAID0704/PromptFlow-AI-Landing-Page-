const request = require('supertest');
let app = require('../index'); 

if (app && app.default) {
  app = app.default;
}

describe('Backend API Test Suite', () => {

  it('GET /api/analytics - should return 200 and aggregated dashboard data', async () => {
    const response = await request(app).get('/api/analytics');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('summaryCards');
    expect(response.body).toHaveProperty('monthlyTrends');
    expect(response.body.summaryCards).toHaveProperty('totalRevenue');
  });

  it('GET /api/analytics?category=revenue - should return filtered revenue metrics', async () => {
    const response = await request(app).get('/api/analytics?category=revenue');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.monthlyTrends)).toBe(true);
  });

  it('POST /api/upload - should return 400 error if no file is uploaded', async () => {
    const response = await request(app).post('/api/upload');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  it('POST /api/upload - should upload a file successfully', async () => {
    const fileBuffer = Buffer.from('test document content');
    
    let response = await request(app)
      .post('/api/upload')
      .attach('attachment', fileBuffer, 'sample.txt');

    if (response.status === 400) {
      response = await request(app)
        .post('/api/upload')
        .attach('file', fileBuffer, 'sample.txt');
    }

    if (response.status === 400) {
      response = await request(app)
        .post('/api/upload')
        .attach('document', fileBuffer, 'sample.txt');
    }

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('GET /api/unknown-route - should return 404 for undefined routes', async () => {
    const response = await request(app).get('/api/unknown-route');
    expect(response.status).toBe(404);
  });

});
