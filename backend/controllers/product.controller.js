import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const addProduct = async (req, res) => {
    try {
        const sellerId = req.user._id
        const { name, brand, price, description, stock, images } = req.body;
        
        if (!name || !price || !description || !stock || !images || !brand || !sellerId) {
            return res.status(400).json({ message: "Name, price, description, and stock are required" });
        }
        const user = User.findOne(sellerId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const productExists = await Product.findOne({ name, seller: sellerId });
        if (productExists) {
            return res.status(400).json({ message: "Product already exists" });
        }
        const product = new Product({
            name,
            seller: sellerId,
            brand,
            price,
            description,
            stock,
            images
        });
        await product.save();
        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const getProducts = async(req,res)=>{
    res.send("GET PRODUCTS");
}

export const deleteProduct = async(req,res)=>{
    res.send("DELETE PRODUCT");
}

export const updateProduct = async(req,res)=>{
    res.send("UPDATED PRODUCT");
}