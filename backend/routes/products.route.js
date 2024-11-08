import express from "express";
import { productById, productsAll, searchQuery } from "../controllers/products.controller.js";

const router = express.Router();

// Define the search route first
router.get("/", productsAll);
router.get('/search', searchQuery);
router.get("/:id", productById);

export default router;
