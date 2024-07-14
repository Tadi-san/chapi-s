import express from 'express';
const router = express.Router();
import orderController from '../controllers/order.js';
const orderControllerInstance = orderController;

router.get('/', orderControllerInstance.getOrders);
router.post('/create', orderControllerInstance.createOrder);
router.get('/:id', orderControllerInstance.getOrderById);
router.post('/update/:id', orderControllerInstance.updateOrder);
router.get('/delete/:id', orderControllerInstance.deleteOrder);
// router.post('/bulk-create', orderControllerInstance.addMultipleStudents)

export default router;