import express from "express";
import protectRoute from "../middlewears/protectroute.js";
import { getPayment, initiatePayment, verifyPayment } from "../controllers/payments.controller.js";
const router = express.Router();

router.post("/initiate", initiatePayment);
router.post("/verify", verifyPayment);
router.get("/:paymentId", getPayment);
export default router;