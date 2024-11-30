import express from "express";
import { getReviews, isOrdered, reviewItem } from "../controllers/review.controller.js";
import protectRoute from "../middlewears/protectRoute.js";

const router = express.Router();

router.post('/:id', protectRoute, reviewItem);
router.get('/:id', protectRoute, getReviews);
router.get('/order/:id', protectRoute, isOrdered);

export default router;