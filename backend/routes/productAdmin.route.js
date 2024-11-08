import express, { Router } from 'express';
import { addCategory, addProduct, deleteCategory, deleteProduct, getCategories, getProducts, updateProduct } from '../controllers/productAdmin.controller.js';
import protectRoute from '../middlewears/protectroute.js';
const router = express.Router();

router.post("/addProduct", protectRoute, addProduct);
router.get("/getProduct", protectRoute, getProducts);
router.put("/updateProduct/:id", protectRoute, updateProduct);
router.delete("/deleteProduct/:id", protectRoute, deleteProduct);

router.post('/addcategory', protectRoute, addCategory);
router.get('/getcategories', protectRoute, getCategories);
router.delete('/deletecategories/:id', protectRoute, deleteCategory);

 
export default router;