import express from "express";
import { getReviews, isOrdered, isRated, reviewItem } from "../controllers/review.controller.js";
import protectRoute from "../middlewears/protectRoute.js";

const router = express.Router();

router.post('/:id', protectRoute, reviewItem);
router.get('/:id', protectRoute, getReviews);
router.get('/order/:id', protectRoute, isOrdered);
router.get('/rating/:id', protectRoute, isRated);


export default router;