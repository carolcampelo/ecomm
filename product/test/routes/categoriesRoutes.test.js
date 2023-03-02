import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
import app from '../../src/app.js';

let server;
beforeEach(() => {
  const port = 3032;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET in /api/categories', () => {
  it('Should return a list of categories', async () => {
    const response = await request(app)
      .get('/api/categories')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(response.body[0].name).toEqual('informatica');
  });
});

let idResponse;
describe('POST in /api/admin/categories', () => {
  it('Should add a new category', async () => {
    const response = await request(app)
      .post('/api/admin/categories/')
      .send({
        name: 'moda',
        status: false,
      })
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResponse = response.body._id;
  });
});

describe('GET by ID in /api/categories/:id', () => {
  it('Must return a category according to its ID', async () => {
    const response = await request(app)
      .get(`/api/categories/${idResponse}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(response.body.name).toEqual('moda');
  });
});

describe('PUT in /api/admin/categories/:id', () => {
  it('Should update a category', async () => {
    await request(app)
      .put(`/api/admin/categories/${idResponse}`)
      .send({
        name: 'fashion',
        status: false,
      })
      .expect(200);
  });
});

describe('PATCH in /api/admin/categories/:id', () => {
  it('Should activate a category', async () => {
    await request(app)
      .patch(`/api/admin/categories/${idResponse}`)
      .send({
        status: true,
      })
      .expect(200);
  });
});

describe('DELETE in /api/admin/categories', () => {
  it('Should delete a category', async () => {
    await request(app)
      .delete(`/api/admin/categories/${idResponse}`)
      .expect(200);
  });
});
