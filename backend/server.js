import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});