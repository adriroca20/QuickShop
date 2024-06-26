import express from 'express';
const router = express.Router();
import { protect, admin} from '../middleware/authMiddleware.js';
import { addOrderItems, getMyOrders,getAllOrders, updateOrderToPaid, updateToDelivered, getOrderByID} from '../controllers/orderController.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderByID);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateToDelivered);

export default router;