import express from 'express';
import SwaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import categories from './categoriesRoutes.js';
import products from './productsRoutes.js';

const swaggerDocument = YAML.load('./swagger/product.yaml');

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: 'E-comm Project' });
  });

  app.use(
    express.json(),
    categories,
    products,
  );

  app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
};

export default routes;
