import express from "express";
import protectRoute from "../middlewears/protectroute.js";
import { getPayment, initiatePayment } from "../controllers/payments.controller.js";
const router = express.Router();

router.post("/initiate", initiatePayment);
router.get("/:paymentId", getPayment);
export default router;