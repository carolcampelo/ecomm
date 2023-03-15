import express from 'express';
import ProductController from '../controllers/productsController.js';
import authBearer from '../middlewares/tokenAuth.js';

const router = express.Router();

router
  .get('/api/products', ProductController.findProducts)
  .get('/api/products/:id', ProductController.findProductById)
  .post('/api/admin/products', authBearer, ProductController.addProduct)
  .put('/api/admin/products/:id', authBearer, ProductController.updateProduct)
  .delete('/api/admin/products/:id', authBearer, ProductController.deleteProduct);

export default router;
