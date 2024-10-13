import express from 'express';
const router = express.Router();
import userController from '../controllers/user.js';
const userControllerInstance = userController;

router.get('/', userControllerInstance.getUsers);
router.post('/', userControllerInstance.createUser);
router.post('/login', userControllerInstance.loginUser);
router.get('/:id', userControllerInstance.getUserById);
router.put('/:id', userControllerInstance.updateUser);
router.delete('/:id', userControllerInstance.deleteuser);

export default router;