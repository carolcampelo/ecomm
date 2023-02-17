const express = require('express');
const routes = require('./routes/index.js');

const app = express();
const port = 3003;

routes(app);

app.listen(port, () => console.log(`O servidor está rodando na porta ${port}.`));

module.exports = app;