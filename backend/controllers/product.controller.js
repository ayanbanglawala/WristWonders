import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const addProduct = async (req, res) => {
    try {
        const sellerId = req.user._id;
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


export const getProducts = async (req, res) => {
    try {
        const sellerId = req.user._id;
        const products = await Product.find({ seller: sellerId });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.json(products);  // This will only run if products are found
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const sellerId = req.user._id.toString(); 
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("Product seller ID:", product.seller.toString());
        console.log("Logged-in user ID:", sellerId);

        if (product.seller.toString() !== sellerId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await Product.deleteOne({ _id: productId });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateProduct = async(req,res)=>{
    try {
        const sellerId = req.user._id.toString();
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.seller.toString()!== sellerId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { name, brand, price, description, stock, images } = req.body;
        if (!name ||!price ||!description ||!stock ||!images ||!brand) {
            return res.status(400).json({ message: "Name, price, description, and stock are required" });
        }
        product.name = name;
        product.brand = brand;
        product.price = price;
        product.description = description;
        product.stock = stock;
        product.images = images;
        await product.save();
        res.json({ message: "Product updated successfully", product});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}