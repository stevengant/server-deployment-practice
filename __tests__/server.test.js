const { app } = require('../server');
const supertest = require('supertest');
const { default: test } = require('node:test');
const mockRequest = supertest(app);

describe('API Server', () => {
  it('handles the root path', async () => {
    const response = await mockRequest.get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    expect(response.text).toEqual('this is a log...');
  });

  test('handles invalid requests', async () => {
    const response = await mockRequest('/foo');

    expect(response.status).toEqual(404);
  });

  test('handles error', async () => {
    const response = await mockRequest('/bad');

    console.log(response);
    expect(response.status).toEqual(500);
    expect(response.body.route).toEqual('/bad');
  });
});