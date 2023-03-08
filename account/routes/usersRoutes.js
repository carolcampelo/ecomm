import express from 'express';
import UserController from '../controllers/usersController.js';

const router = express.Router();

router
  .get('/api/admin/users', UserController.listUsers)
  .get('/api/users/:id', UserController.listUsersById)
  .post('/api/admin/users', UserController.addUsers)
  .put('/api/admin/users/:id', UserController.updateUsers)
  .delete('/api/admin/users/:id', UserController.deleteUsers);

export default router;
