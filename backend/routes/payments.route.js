import express from "express";
import protectRoute from "../middlewears/protectroute.js";
import { initiatePayment, verifyPayment } from "../controllers/payments.controller.js";
const router = express.Router();

router.post("/initiate", protectRoute, initiatePayment);
router.post("/verify", protectRoute, verifyPayment);
export default router;