import request from 'supertest';
import { describe, it } from '@jest/globals';
import app from '../../src/app.js';

let server;
beforeEach(() => {
  const port = 3031;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

let idResponse;
describe('GET in /api/products', () => {
  it('Should return a list of products', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    // eslint-disable-next-line no-underscore-dangle
    idResponse = response.body[0]._id;
    console.log(idResponse);
  });
});

describe('POST in /api/admin/products', () => {
  it('Should NOT add a new product', async () => {
    await request(app)
      .post('/api/admin/products/')
      .send({
        name: 'Sofá 3 lugares',
        description: 'Sofá 3 Lugares Retrátil e Reclinável Cama Inbox Compact 1,80m Velusoft Cinza',
        slug: 'sofa-3-lugares-teste',
        price: {
          $numberDecimal: '2500',
        },
        quantityInStock: 1,
        product: 'moveis',
      })
      .expect(401);
  });
});

describe('GET by ID in /api/products/:id', () => {
  it('Must return a product according to its ID', async () => {
    await request(app)
      .get(`/api/products/${idResponse}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

describe('PUT in /api/admin/products/:id', () => {
  it('Should update a product', async () => {
    await request(app)
      .put(`/api/admin/products/${idResponse}`)
      .send({
        name: 'Sofá 2 lugares',
        description: 'Sofá 2 Lugares Retrátil e Reclinável Cama Inbox Compact 1,80m Velusoft Cinza',
        slug: 'sofa-2-lugares-teste',
        price: {
          $numberDecimal: '2000',
        },
        quantityInStock: 3,
        category: 'moveis',
      })
      .expect(200);
  });
});

describe('DELETE in /api/admin/products', () => {
  it('Should delete a product', async () => {
    await request(app)
      .delete(`/api/admin/products/${idResponse}`)
      .expect(200);
  });
});
