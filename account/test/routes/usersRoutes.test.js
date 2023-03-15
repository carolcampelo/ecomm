import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
import mongoose from 'mongoose';
import app from '../../src/app.js';

afterAll((done) => {
  mongoose.connection.close();
  done();
});

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGE3Zjk5MWViZTA4NjkyZThjMGEzMiIsImlhdCI6MTY3ODQ3MzYwMn0.6duZHn_YRtzzdYGEHWGzPzKzyyKUUEBjVbLUJifcGOI';
let idResponse;
describe('POST in /api/users', () => {
  it('Should add a new user', async () => {
    const response = await request(app)
      .post('/api/users/')
      .send({
        cart: {
          products: [],
        },
        name: 'Rozia Roero 2',
        email: 'roziaroero2@example.com',
        password: 'aloha123',
        cpf: '73856828044',
        telefone: '519777888666',
        address: [
          {
            addressName: 'Casa',
            street: 'Rua Seis',
            number: 25,
            complement: 'apto 403',
            district: 'Residencial Itamarati',
            zipCode: '78058867',
            city: 'Cuiabá',
            uf: 'MT',
          },
        ],
      })
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResponse = response.body._id;
  });
});

describe('POST in /api/users/login', () => {
  it('Should log an user', async () => {
    await request(app)
      .post('/api/users/login')
      .send({
        email: 'roziaroero2@example.com',
        password: 'aloha123',
      })
      .expect(204);
  });
});

describe('GET in /api/admin/users', () => {
  it('Should return a list of users', async () => {
    const response = await request(app)
      .get('/api/admin/users/')
      .set('Accept', 'application/json')
      .auth(authToken, { type: 'bearer' })
      .expect(200);

    expect(response.body[0].name).toEqual('Fiza Lekey');
  });
});

describe('GET by ID in /api/users/:id', () => {
  it('Must return an user according to its ID', async () => {
    const response = await request(app)
      .get(`/api/users/${idResponse}`)
      .auth(authToken, { type: 'bearer' })
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(response.body.name).toEqual('Rozia Roero 2');
  });
});

describe('PUT in /api/admin/users/:id', () => {
  it('Should update an user', async () => {
    await request(app)
      .put(`/api/admin/users/${idResponse}`)
      .auth(authToken, { type: 'bearer' })
      .send({
        cart: {
          products: [],
        },
        name: 'Rozia Roero Teste',
        email: 'roziaroero@example.com',
        password: '$2y$10$IA7AYMDaoSmMUrt.WPdVOujJkrRf/8yPiphopj5l7AtVTEZQGEVvW',
        cpf: '73856828044',
        telefone: '519777888666',
        address: [
          {
            addressName: 'Casa',
            street: 'Rua Seis',
            number: 25,
            complement: 'apto 403',
            district: 'Residencial Itamarati',
            zipCode: '78058867',
            city: 'Cuiabá',
            uf: 'MT',
          },
        ],
      })
      .expect(200);
  });
});

describe('DELETE in /api/admin/users', () => {
  it('Should delete an user', async () => {
    await request(app)
      .delete(`/api/admin/users/${idResponse}`)
      .auth(authToken, { type: 'bearer' })
      .expect(200);
  });
});

describe('POST in /api/admin/users', () => {
  it("Shouldn't add a new user", async () => {
    await request(app)
      .post('/api/users/')
      .auth(authToken, { type: 'bearer' })
      .send()
      .expect(400);
  });
});

describe('GET by ID in /api/users/:id', () => {
  it('Must NOT return an user according to its ID', async () => {
    await request(app)
      .get('/api/users/123')
      .expect(404);
  });
});

describe('PUT in /api/admin/users/:id', () => {
  it("Shouldn't update an user", async () => {
    await request(app)
      .put('/api/admin/users/123')
      .auth(authToken, { type: 'bearer' })
      .send()
      .expect(400);
  });
});

describe('DELETE in /api/admin/users', () => {
  it("Shouldn't delete an user", async () => {
    await request(app)
      .delete('/api/admin/users/123')
      .auth(authToken, { type: 'bearer' })
      .expect(400);
  });
});
