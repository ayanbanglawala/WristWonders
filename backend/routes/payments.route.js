import express from "express";
import { getPayment, initiatePayment } from "../controllers/payments.controller.js";
const router = express.Router();

router.post("/initiate", initiatePayment);
router.get("/:paymentId", getPayment);
export default router;