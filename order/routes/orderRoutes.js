const { Router } = require('express');
const OrdersController = require('../controllers/OrdersController.js');
const authBearer = require('../middlewares/tokenAuth.js');

const router = Router();

router
  .post('/orders/', authBearer, OrdersController.addNewOrder)
  .patch('/orders/:id/:status', authBearer, OrdersController.updateOrderStatusByLink);

module.exports = router;
