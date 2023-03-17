import express from 'express';
import UserController from '../controllers/usersController.js';
import { authLocal, authBearer } from '../middlewares/userAuth.js';

const router = express.Router();

router
  .get('/api/admin/users', authBearer, UserController.listUsers)
  .get('/api/users/logOut', authBearer, UserController.userLogout)
  .get('/api/users/:id', UserController.findUserById)
  .post('/api/users', UserController.addUser)
  .post('/api/users/login', authLocal, UserController.userLogin)
  .put('/api/admin/users/:id', authBearer, UserController.updateUser)
  .delete('/api/admin/users/:id', authBearer, UserController.deleteUser);

export default router;
