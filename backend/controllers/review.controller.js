import Order from "../models/orders.model.js";
import Product from "../models/product.model.js";
import Review from "../models/review.model.js";

export const reviewItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.id;
        const { rating, comment } = req.body;

        if (!rating || !comment) {
            return res.status(400).json({ message: "Rating and comment are required" });
        }
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ message: "Product not found" });
        }
        const productInOrders = await Order.find({
            user: userId,
            "orderItems.product": productId
        });
        if (productInOrders.length === 0) {
            return res.status(403).json({ message: "You cannot review this product because it is not in your Orders" });
        }
        const reviewExists = await Review.findOne({ user: userId, product: productId });
        if (reviewExists) {
            return res.status(400).json({ message: "Review already exists for this product" });
        }

        const product = await Product.findById(productId);
        product.ratings += rating;
        product.numReviews += 1;
        await product.save();

        const review = new Review({ user: userId, product: productId, rating, comment });
        await review.save();
        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getReviews = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId); // Use findById for a single document

        if (!product) {
            return res.status(404).json({ message: "No reviews found for this product" });
        }

        const reviews = await Review.find({ product: productId });
        console.log(reviews);

        // Initialize variables for calculating overall average rating
        const totalRatingSum = product.ratings; // Sum all the ratings
        const totalRatingCount = product.numReviews; // Number of ratings

        // Calculate overall average rating
        const averageRating = totalRatingCount > 0 ? totalRatingSum / totalRatingCount : 0;

        res.json({ averageRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const isOrdered = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.id;

        const order = await Order.find({ user: userId, product: productId });
        if (!order) {
            return res.status(404).json({ message: "Product not found in your Orders" });
        }
        res.json({ isOrdered: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}