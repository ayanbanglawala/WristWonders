import express, { Router } from 'express';
import protectRoute from '../middlewears/protectroute.js';
import { getAllOrdersAdmin, getOrderById, getOrders, placeOrder, updateOrderStatus } from '../controllers/orders.controller.js';
const router = express.Router();

router.get("/admin", protectRoute, getAllOrdersAdmin);
router.put("/admin/updateStatus/:id", protectRoute, updateOrderStatus);

router.post("/", protectRoute, placeOrder);
router.get("/", protectRoute, getOrders);
router.get("/:id", protectRoute, getOrderById);


export default router;