import Order from "../models/orders.model.js";
import Product from "../models/product.model.js";
import Review from "../models/review.model.js";

export const reviewItem = async (req, res)=>{
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
        const reviews = await Review.find({ product: productId }).populate("user", "name");

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this product" });
        }

        // Initialize variables for calculating overall average rating
        let totalRatingSum = 0;
        let totalRatingCount = 0;

        reviews.map(review => {
            totalRatingSum += review.rating;
            totalRatingCount++;
        })

        // Calculate overall average rating
        const averageRating = totalRatingCount > 0 ? totalRatingSum / totalRatingCount : 0;

        res.json({ averageRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};