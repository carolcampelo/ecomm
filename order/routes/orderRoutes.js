const { Router } = require('express');
const OrdersController = require('../controllers/OrdersController.js');

const router = Router();

router
  .post('/orders/', OrdersController.addNewOrder)
  .patch('/orders/:id/:status', OrdersController.updateOrderStatusByLink);

module.exports = router;
