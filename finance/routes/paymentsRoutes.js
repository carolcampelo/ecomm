const { Router } = require('express');
const PaymentsController = require('../controllers/PaymentsController.js');
const authBearer = require('../middlewares/tokenAuth.js');

const router = Router();

router
  .get('/payments/:id', authBearer, PaymentsController.getPaymentsById)
  .post('/payments', authBearer, PaymentsController.addPayments)
  .patch('/payments/:id', authBearer, PaymentsController.updatePaymentStatus)
  .patch('/payments/:id/:status', authBearer, PaymentsController.updatePaymentStatusByLink);

module.exports = router;
