import express, { Router } from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';
import protectRoute from '../middlewears/protectroute.js';
const router = express.Router();

router.post("/addProduct", protectRoute, addProduct);
router.get("/getProduct", protectRoute, getProducts);
router.patch("/updateProduct/:id", protectRoute, updateProduct);
router.delete("/deleteProduct/:id", protectRoute, deleteProduct);
 
export default router;