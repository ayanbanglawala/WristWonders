import express, { Router } from 'express';
const router = express.Router();
import { addAddress, deleteAddress, login, logout, profile, profileUpdate, signup, updateAddress} from '../controllers/auth.controller.js';
import protectRoute from '../middlewears/protectroute.js';

router.post("/login",login);
router.post("/logout", logout);
router.post("/signup", signup);
router.get("/profile", protectRoute, profile);
router.put("/profile", protectRoute, profileUpdate);

router.post("/addAddress", protectRoute, addAddress);
router.put("/updateAddress/:id", protectRoute, updateAddress);
router.delete("/deleteAddress/:id", protectRoute, deleteAddress);

export default router;