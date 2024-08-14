import express from 'express';
const router = express.Router();
import inventoryController from '../controllers/inventory.js';
const inventoryControllerInstance = inventoryController;

router.post('/', inventoryControllerInstance.getInventorys);
router.post('/create', inventoryControllerInstance.createInventory);
router.post('/find', inventoryControllerInstance.getInventoryById);
router.post('/update/:id', inventoryControllerInstance.updateInventory);
router.get('/delete/:id', inventoryControllerInstance.deleteInventory);

export default router;