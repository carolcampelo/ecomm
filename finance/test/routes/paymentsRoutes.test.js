const request = require('supertest');
const { describe, it, expect } = require('@jest/globals');
const app = require('../../index.js');

let idResponse;
describe('POST in /payments', () => {
  it('Should add a new payment', async () => {
    const response = await request(app)
      .post('/payments/')
      .send({
        totalPrice: 3500,
        cardName: 'Carolina',
        cardNumber: '1111222233334444',
        expDate: '2025-05',
        cvv: 123,
      })
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(201);

    expect(response.body.totalPrice).toEqual(3500);
    idResponse = response.body.id;
  });
});

describe('GET by ID in /payments/:id', () => {
  it('Must return a payment according to its ID', async () => {
    const response = await request(app)
      .get(`/payments/${idResponse}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(response.body.cardName).toEqual('Carolina');
  });
});

describe('PATCH in /payments/:id', () => {
  it('Should update a payment status', async () => {
    const response = await request(app)
      .patch(`/payments/${idResponse}`)
      .send({
        status: 'CANCELADO',
      })
      .expect(200);

    expect(response.body.status).toEqual('CANCELADO');
  });
});

describe('POST in /payments', () => {
  it("Shouldn't add a new payment", async () => {
    await request(app)
      .post('/payments/')
      .send()
      .expect(400);
  });
});

describe('GET by ID in /payments/:id', () => {
  it('Must return a payment according to its ID', async () => {
    await request(app)
      .get('/payments/abc123')
      .expect(404);
  });
});

describe('PATCH in /payments/:id', () => {
  it('Should update a payment status', async () => {
    await request(app)
      .patch('/payments/abc123')
      .send({
        status: 'CANCELADO',
      })
      .expect(404);
  });
});
