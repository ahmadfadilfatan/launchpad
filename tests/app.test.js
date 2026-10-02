const request = require('supertest');
const app = require('../src/app');

describe('launchpad', () => {
  it('GET / returns service metadata', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.service).toBe('launchpad');
    expect(res.body.status).toBe('ok');
  });

  it('GET /health returns 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('OK');
  });

  it('GET /ready returns 200 READY', async () => {
    const res = await request(app).get('/ready');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('READY');
  });
});