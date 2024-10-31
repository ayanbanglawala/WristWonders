import mongoose from "mongoose";

const product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  // Assuming User is the model name
    },
    brand:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    images:{
        type: Array,
        required: true
    }
}, {
    timestamps: true,
})

const Product = mongoose.model("Product", product);
export default Product;
