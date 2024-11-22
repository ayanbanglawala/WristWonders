import express from "express";
import { addToCart, checkCart, myCart, removeFromCart, updateCart } from "../controllers/cart.controller.js";
import protectRoute from "../middlewears/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, addToCart);
router.get("/", protectRoute, myCart);
router.delete("/:productId", protectRoute, removeFromCart);
router.put("/:productId", protectRoute, updateCart);
router.get("/:productId", protectRoute, checkCart);

export default router;