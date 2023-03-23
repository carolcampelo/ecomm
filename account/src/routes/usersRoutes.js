import express from 'express';
import UserController from '../controllers/usersController.js';

const router = express.Router();

router
  .get('/api/admin/users', UserController.listUsers)
  .get('/api/users/logOut', UserController.userLogout)
  .get('/api/users/:id', UserController.findUserById)
  .post('/api/users', UserController.addUser)
  .post('/api/users/login', UserController.userLogin)
  .put('/api/admin/users/:id', UserController.updateUser)
  .delete('/api/admin/users/:id', UserController.deleteUser);

export default router;
