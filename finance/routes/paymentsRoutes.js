const { Router } = require('express');
const PaymentsController = require('../controllers/PaymentsController.js');

const router = Router();

router
  .get('/payments/:id', PaymentsController.getPaymentsById)
  .post('/payments', PaymentsController.addPayments)
  .patch('/payments/:id', PaymentsController.updatePaymentStatus)
  .patch('/payments/:id/:status', PaymentsController.updatePaymentStatusByLink);

module.exports = router;
