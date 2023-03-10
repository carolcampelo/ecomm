import express from 'express';
import ProductController from '../controllers/productsController.js';
import authBearer from '../middlewares/tokenAuth.js';

const router = express.Router();

router
  .get('/api/products', ProductController.findProducts)
  .get('/api/products/:id', ProductController.findProductById)
  .post('/api/admin/products', authBearer, ProductController.addProducts)
  .put('/api/admin/products/:id', authBearer, ProductController.updateProducts)
  .delete('/api/admin/products/:id', authBearer, ProductController.deleteProducts);

export default router;
