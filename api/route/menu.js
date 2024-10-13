import express from 'express';
const router = express.Router();
import menuController from '../controllers/menu.js';
const menuControllerInstance = menuController;

router.get('/', menuControllerInstance.getMenus);
router.post('/', menuControllerInstance.createMenu);
router.get('/:id', menuControllerInstance.getMenuById);
router.put('/:id', menuControllerInstance.updateMenu);
router.delete('/:id', menuControllerInstance.deleteMenu);

export default router;