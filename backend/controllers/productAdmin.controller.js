import Category from "../models/categories.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const addProduct = async (req, res) => {
    try {
        const sellerId = req.user._id;
        const { name, brand, price, description, stock, images, category } = req.body;

        if (!name || !price || !description || !stock || !images || !brand || !sellerId || !category) {
            return res.status(400).json({ message: "All fields are required" });
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
            images,
            category
        });
        await product.save();
        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
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

export const updateProduct = async (req, res) => {
    try {
        const sellerId = req.user._id.toString();
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.seller.toString() !== sellerId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { name, brand, price, description, stock, images, category } = req.body;
        if (!name || !price || !description || !stock || !images || !brand || !category) {
            return res.status(400).json({ message: "Name, price, description, and stock are required" });
        }
        const isExist = await Product.findOne({ name, _id: { $ne: productId } });
        if (isExist) {
            return res.status(400).json({ message: "Product already exists" });
        }
        product.name = name;
        product.brand = brand;
        product.price = price;
        product.description = description;
        product.stock = stock;
        product.images = images;
        product.category = category
        await product.save();
        res.json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json({ message: 'Added category' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add category' });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(201).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get categories' });
    }
}

import mongoose from 'mongoose';

export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid category ID format' });
        }

        // Attempt to find and delete the category
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Deleted category' });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
