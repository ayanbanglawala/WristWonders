import express, { Router } from 'express';
const router = express.Router();
import { login, logout, profile, profileUpdate, signup} from '../controllers/auth.controller.js';
import protectRoute from '../middlewears/protectroute.js';

router.post("/login",login);
router.post("/logout", logout);
router.post("/signup", signup);
router.get("/profile", protectRoute, profile);
router.put("/profile", protectRoute, profileUpdate);

export default router;