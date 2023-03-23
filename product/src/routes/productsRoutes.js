import express from 'express';
import ProductController from '../controllers/productsController.js';

const router = express.Router();

router
  .get('/api/products', ProductController.findProducts)
  .get('/api/products/:id', ProductController.findProductById)
  .post('/api/admin/products', ProductController.addProduct)
  .put('/api/admin/products/:id', ProductController.updateProduct)
  .delete('/api/admin/products/:id', ProductController.deleteProduct);

export default router;
