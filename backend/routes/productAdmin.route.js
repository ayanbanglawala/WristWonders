import express, { Router } from 'express';
import { addCategory, addProduct, deleteCategory, deleteProduct, getAllProducts, getCategories, getProducts, updateProduct } from '../controllers/productAdmin.controller.js';
import protectRoute from '../middlewears/protectRoute.js';
import multer from 'multer';
const upload = multer({dest:'uploads/'})
const router = express.Router();

router.post("/addProduct", upload.single('image'), protectRoute, addProduct);
router.get("/getProduct", protectRoute, getProducts);
router.get("/getAllProduct", protectRoute, getAllProducts);
router.put("/updateProduct/:id", protectRoute, updateProduct);
router.delete("/deleteProduct/:id", protectRoute, deleteProduct);

router.post('/addcategory', protectRoute, addCategory);
router.get('/getcategories', protectRoute, getCategories);
router.delete('/deletecategories/:id', protectRoute, deleteCategory);

 
export default router;