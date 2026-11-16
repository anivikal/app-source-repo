import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('backend API', () => {
  it('returns health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('returns an application message', async () => {
    const response = await request(app).get('/api/message');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('EKS backend');
  });
});
