import express from 'express';
import CategoryController from '../src/controllers/categoriesController.js';

const router = express.Router();

router
  .get('/api/categories', CategoryController.listCategories)
  .get('/api/categories/:id', CategoryController.listCategoriesById)
  .post('/api/admin/categories', CategoryController.addCategories)
  .put('/api/admin/categories/:id', CategoryController.updateCategories)
  .patch('/api/admin/categories/:id', CategoryController.activateCategories)
  .delete('/api/admin/categories/:id', CategoryController.deleteCategories);

export default router;
