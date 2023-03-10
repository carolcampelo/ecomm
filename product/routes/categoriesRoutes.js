import express from 'express';
import CategoryController from '../controllers/categoriesController.js';
import authBearer from '../middlewares/tokenAuth.js';

const router = express.Router();

router
  .get('/api/categories', CategoryController.listCategories)
  .get('/api/categories/:id', CategoryController.listCategoriesById)
  .post('/api/admin/categories', authBearer, CategoryController.addCategories)
  .put('/api/admin/categories/:id', authBearer, CategoryController.updateCategories)
  .patch('/api/admin/categories/:id', authBearer, CategoryController.activateCategories)
  .delete('/api/admin/categories/:id', authBearer, CategoryController.deleteCategories);

export default router;
