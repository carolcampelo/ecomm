import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
import mongoose from 'mongoose';
import app from '../../src/app.js';

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe('GET in /api/admin/users', () => {
  it('Should return a list of users', async () => {
    const response = await request(app)
      .get('/api/admin/users/')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(response.body[0].name).toEqual('Fiza Lekey');
  });
});

let idResponse;
describe('POST in /api/admin/users', () => {
  it('Should add a new user', async () => {
    const response = await request(app)
      .post('/api/admin/users/')
      .send({
        cart: {
          products: [],
        },
        name: 'Rozia Roero 2',
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
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResponse = response.body._id;
  });
});

describe('GET by ID in /api/users/:id', () => {
  it('Must return an user according to its ID', async () => {
    const response = await request(app)
      .get(`/api/users/${idResponse}`)
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
      .expect(200);
  });
});

// .get('/api/users/:id', UserController.listUsersById)
// .post('/api/admin/users', UserController.addUsers)
// .put('/api/admin/users/:id', UserController.updateUsers)
// .delete('/api/admin/users/:id', UserController.deleteUsers);
