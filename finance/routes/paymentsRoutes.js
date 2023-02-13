const { Router } = require('express');
const PaymentsControllers = require('../controllers/PaymentsControllers.js');

const router = Router();

router
    .get("/payments/:id", PaymentsControllers.getPaymentsById)
    .post("/payments", PaymentsControllers.addPayments)
    .patch("/payments/:id", PaymentsControllers.changePaymentStatus)

module.exports = router;