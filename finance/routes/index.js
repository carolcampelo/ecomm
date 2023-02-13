const bodyParser = require('body-parser');
const express = require('express');
const payments = require('./paymentsRoutes.js');

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        payments
    )
}