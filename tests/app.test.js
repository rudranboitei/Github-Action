const request = require('supertest');
const app = require('../src/app');

describe('Express API Endpoints', () => {
  describe('GET /', () => {
    it('should return welcome message and endpoints list', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'online');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('endpoints');
    });
  });

  describe('GET /api/health', () => {
    it('should return 200 OK and health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('uptime');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/items', () => {
    it('should return list of all items', async () => {
      const res = await request(app).get('/api/items');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/items/:id', () => {
    it('should return item details when id exists', async () => {
      const res = await request(app).get('/api/items/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id', 1);
      expect(res.body.data).toHaveProperty('name');
    });

    it('should return 404 when item is not found', async () => {
      const res = await request(app).get('/api/items/9999');
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /api/items', () => {
    it('should create a new item successfully', async () => {
      const payload = {
        name: 'Test GitHub Actions CI',
        completed: false
      };

      const res = await request(app)
        .post('/api/items')
        .send(payload);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.name).toBe(payload.name);
      expect(res.body.data.completed).toBe(false);
    });

    it('should return 400 when name is missing or empty', async () => {
      const res = await request(app)
        .post('/api/items')
        .send({ name: '' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('404 Handling', () => {
    it('should return 404 for unknown endpoints', async () => {
      const res = await request(app).get('/unknown-endpoint-xyz');
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'Route not found');
    });
  });
});
