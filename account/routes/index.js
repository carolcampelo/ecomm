import express from 'express';
import users from './usersRoutes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger/accounts.yaml');

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "E-comm Project"})
    });

    app.use(
        express.json(),
        users
    );

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

export default routes;