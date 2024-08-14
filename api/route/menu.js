import express from 'express';
const router = express.Router();
import menuController from '../controllers/menu.js';
const menuControllerInstance = menuController;

router.post('/', menuControllerInstance.getMenus);
router.post('/create', menuControllerInstance.createMenu);
router.post('/find', menuControllerInstance.getMenuById);
router.post('/update/:id', menuControllerInstance.updateMenu);
router.get('/delete/:id', menuControllerInstance.deleteMenu);

export default router;