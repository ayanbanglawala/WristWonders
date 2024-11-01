import mongoose from "mongoose";

const product = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: String },
    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
}, {
    timestamps: true,
})

const Product = mongoose.model("Product", product);
export default Product;
