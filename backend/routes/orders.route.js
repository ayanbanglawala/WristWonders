import express, { Router } from 'express';
import protectRoute from '../middlewears/protectroute.js';
import { getOrderById, getOrders, placeOrder } from '../controllers/orders.controller.js';
const router = express.Router();

router.post("/", protectRoute, placeOrder);
router.get("/", protectRoute, getOrders);
router.get("/:id", protectRoute, getOrderById);

export default router;