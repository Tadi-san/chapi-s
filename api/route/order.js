import express from 'express';
const router = express.Router();
import orderController from '../controllers/order.js';
const orderControllerInstance = orderController;

router.get('/', orderControllerInstance.getOrders);
router.post('/', orderControllerInstance.createOrder);
router.get('/:id', orderControllerInstance.getOrderById);
router.put('/:id', orderControllerInstance.updateOrder);
router.delete('/:id', orderControllerInstance.deleteOrder);

// Actions 

router.post('/pay', orderController.payOrder)
router.post('/unpay', orderController.unpayOrder)
router.post('/serve', orderController.serveOrder)
router.post('/unserve', orderController.unserveOrder)

// Get Action 

// router.get('/paid', orderController.getPaid)
// router.get('/unpaid', orderController.getUnpaid)
// router.get('/served', orderController.getServed)
// router.get('/unserved', orderController.getUnserve)
// router.get('/unpaid-unserved', orderController.getUnpaidUnserved)



export default router;