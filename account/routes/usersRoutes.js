import express from 'express';
import UserController from '../controllers/usersController.js';
import { authLocal, authBearer } from '../middlewares/userAuth.js';

const router = express.Router();

router
  .get('/api/admin/users', authBearer, UserController.listUsers)
  .get('/api/users/:id', UserController.listUsersById)
  .post('/api/admin/users', authBearer, UserController.addUsers)
  .post('/api/users/login', authLocal, UserController.userLogin)
  .put('/api/admin/users/:id', authBearer, UserController.updateUsers)
  .delete('/api/admin/users/:id', authBearer, UserController.deleteUsers);

export default router;
