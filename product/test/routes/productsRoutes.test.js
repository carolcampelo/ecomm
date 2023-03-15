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

describe('GET in /api/products', () => {
  it('Should return a list of products', async () => {
    await request(app)
      .get('/api/products')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

let idResponse;
describe('POST in /api/admin/products', () => {
  it('Should add a new product', async () => {
    const response = await request(app)
      .post('/api/admin/products')
      .set('Authorization', this.state.clientToken)
      .send({
        name: 'Sofá 3 lugares',
        description: 'Sofá 3 Lugares Retrátil e Reclinável Cama Inbox Compact 1,80m Velusoft Cinza',
        slug: 'sofa-3-lugares-teste',
        price: {
          $numberDecimal: '2500',
        },
        quantityInStock: 1,
        category: 'moveis',
      })
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResponse = response.body._id;
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

describe('POST in /api/admin/products', () => {
  it("Shouldn't add a new product", async () => {
    await request(app)
      .post('/api/admin/products')
      .send()
      .expect(401);
  });
});

describe('GET by ID in /api/products/:id', () => {
  it('Must NOT return a product according to its ID', async () => {
    await request(app)
      .get('/api/products/123')
      .expect(404);
  });
});

describe('PUT in /api/admin/products/:id', () => {
  it("Shouldn't update a product", async () => {
    await request(app)
      .put('/api/admin/products/123')
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
      .expect(401);
  });
});

describe('DELETE in /api/admin/products', () => {
  it("Shouldn't delete a product", async () => {
    await request(app)
      .delete('/api/admin/products/123')
      .expect(401);
  });
});
