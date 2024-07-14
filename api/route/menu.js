import express from 'express';
const router = express.Router();
import menuController from '../controllers/menu.js';
const menuControllerInstance = menuController;

router.get('/', menuControllerInstance.getMenus);
router.post('/create', menuControllerInstance.createMenu);
router.get('/:id', menuControllerInstance.getMenuById);
router.post('/update/:id', menuControllerInstance.updateMenu);
router.get('/delete/:id', menuControllerInstance.deleteMenu);
// router.post('/bulk-create', orderControllerInstance.addMultipleStudents)

export default router;