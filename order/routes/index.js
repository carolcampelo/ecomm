const bodyParser = require('body-parser');
const orders = require('./orderRoutes.js');

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        orders
    )
}