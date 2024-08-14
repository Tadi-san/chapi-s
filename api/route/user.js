import express from 'express';
const router = express.Router();
import userController from '../controllers/user.js';
const userControllerInstance = userController;

router.post('/', userControllerInstance.getUsers);
router.post('/create', userControllerInstance.createUser);
router.post('/login', userControllerInstance.loginUser);
router.get('/find/:id', userControllerInstance.getUserById);
router.post('/update/:id', userControllerInstance.updateUser);
router.get('/delete/:id', userControllerInstance.deleteuser);

export default router;