const request = require('supertest');
const { describe, it, expect } = require('@jest/globals');
const app = require('../../index.js');

let idResponse;
describe('POST in /orders', () => {
  it('Should add a new order', async () => {
    const response = await request(app)
      .post('/orders/')
      .send({
        customerId: '63fea7ab7fcd4f1056e6b1c2',
        customerName: 'Fiza Lekey',
        customerCpf: '063.279.910-25',
        deliveryAddress: {
          _id: '63feaffd6cc29c3278535be4',
          addressName: 'Trabalho',
          street: 'Rua VP',
          number: 10,
          complement: 'S/N',
          district: 'Setor Goiânia 2',
          zipCode: '74665760',
          city: 'Goiânia',
          uf: 'GO',
        },
        orderItems: [
          {
            name: 'Clean Architecture',
            quantity: 1,
            price: { $numberDecimal: '102.9' },
          },
        ],
      })
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(201);

    expect(response.body.customerName).toEqual('Fiza Lekey');
    idResponse = response.body.id;
  });
});

describe('PATCH in /orders/:id', () => {
  it('Should update an order status', async () => {
    // eslint-disable-next-line no-undef
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        name: 'Fiza Lekey',
        cpf: '063.279.910-25',
        address: {
          uf: 'GO',
          _id: '63feaffd6cc29c3278535be4',
          city: 'Goiânia',
          number: 10,
          street: 'Rua VP',
          zipCode: '74665760',
          district: 'Setor Goiânia 2',
          complement: 'S/N',
          addressName: 'Trabalho',
        },
      }),
    }));
    await request(app)
      .patch(`/orders/${idResponse}/PAGO`)
      .expect(200);
  });
});
