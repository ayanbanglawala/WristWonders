import express from "express";
import protectRoute from "../middlewears/protectRoute.js";
import { uploadImg } from "../controllers/upload.controller.js";

const router = express.Router();

router.post('/', uploadImg);

export default router;