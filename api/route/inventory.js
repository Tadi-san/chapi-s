import express from 'express';
const router = express.Router();
import inventoryController from '../controllers/inventory.js';
const inventoryControllerInstance = inventoryController;

router.get('/', inventoryControllerInstance.getInventorys);
router.post('/', inventoryControllerInstance.createInventory);
router.get('/:id', inventoryControllerInstance.getInventoryById);
router.put('/:id', inventoryControllerInstance.updateInventory);
router.delete('/:id', inventoryControllerInstance.deleteInventory);

export default router;