const db = require('../models');
const { host, port } = require('../utils/constants.js');

class OrdersController {
  static async addNewOrder(req, res) {
    const orderInfos = req.body;

    try {
      const newOrder = await db.Orders.create(orderInfos);

      const statusLinks = {
        links: [
          {
            rel: 'CANCELADO',
            method: 'PATCH',
            href: `http://${host}:${port}/orders/${newOrder.id}/CANCELADO`,
          },
          {
            rel: 'PAGO',
            method: 'PATCH',
            href: `http://${host}:${port}/orders/${newOrder.id}/PAGO`,
          },
        ],
      };

      await db.Orders.update(statusLinks, { where: { id: Number(newOrder.id) } });
      const order = await db.Orders.findOne({ where: { id: Number(newOrder.id) } });

      return res.status(201).json(order);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async updateOrderStatusByLink(req, res) {
    const { id, status } = req.params;

    try {
      await db.Orders.update({ status }, { where: { id: Number(id) } });
      const statusUpdatedOrder = await db.Orders.findOne({ where: { id: Number(id) } });

      const customerInfos = await fetch(`http://ecomm-account:3003/api/users/${statusUpdatedOrder.customerId}`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => data);

      await db.Orders.update(
        {
          customerName: customerInfos.name,
          customerCpf: customerInfos.cpf,
          deliveryAddress: customerInfos.address,
        },
        { where: { id: Number(id) } },
      );

      const order = await db.Orders.findOne({ where: { id: Number(id) }, attributes: { exclude: ['links'] } });

      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = OrdersController;
