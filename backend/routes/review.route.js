import express from "express";
import { getReviews, reviewItem } from "../controllers/review.controller.js";
import protectRoute from '../middlewears/protectroute.js';

const router = express.Router();

router.post('/:id', protectRoute, reviewItem);
router.get('/:id', protectRoute, getReviews);

export default router;