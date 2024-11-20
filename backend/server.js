import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import products from "./routes/productAdmin.route.js";
import allProducts from "./routes/products.route.js";
import cart from "./routes/cart.route.js";
import orders from "./routes/orders.route.js";
import payments from "./routes/payments.route.js";
import review from "./routes/review.route.js";
import upload from './routes/upload.route.js';


dotenv.config();

connectDB();

const app = express();
app.use('/', express.static('uploads'))
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',  // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],         // Allowed methods
  }));
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/api/auth", authRoutes)
app.use("/api/admin", products)
app.use("/api/products", allProducts)
app.use("/api/cart", cart)
app.use("/api/orders", orders)
app.use("/api/payments", payments)
app.use("/api/products/review", review);
app.use("/api/upload", upload);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});