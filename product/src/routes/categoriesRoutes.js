import express from 'express';
import CategoryController from '../controllers/categoriesController.js';
import authBearer from '../middlewares/tokenAuth.js';

const router = express.Router();

router
  .get('/api/categories', CategoryController.listCategories)
  .get('/api/categories/:id', CategoryController.listCategoryById)
  .post('/api/admin/categories', authBearer, CategoryController.addCategory)
  .put('/api/admin/categories/:id', authBearer, CategoryController.updateCategory)
  .patch('/api/admin/categories/:id', authBearer, CategoryController.activateCategory)
  .delete('/api/admin/categories/:id', authBearer, CategoryController.deleteCategory);

export default router;
