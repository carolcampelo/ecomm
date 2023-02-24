const bodyParser = require('body-parser');
const payments = require('./paymentsRoutes.js');

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        payments
    )
}