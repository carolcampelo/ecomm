import express from 'express';
import ApiGatewayController from '../controllers/apiGatewayController.js';
import { authBearer, authLocal } from '../middlewares/auth.js';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = express.Router();

router
  .get('/', (req, res) => { res.status(200).send({ titulo: 'E-Comm' })})
  .get('/logOut', authBearer, ApiGatewayController.userLogout)
  .post('/login', authLocal, ApiGatewayController.userLogin)

export default router;