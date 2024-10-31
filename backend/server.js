import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.route.js";
import products from "./routes/product.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/auth/user", authRoutes)
app.use("/auth/products", products)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});