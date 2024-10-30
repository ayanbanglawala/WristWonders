import express, { Router } from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';
const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/getProduct", getProducts);
router.patch("/updateProduct", updateProduct);
router.delete("/deleteProduct", deleteProduct);

export default router;