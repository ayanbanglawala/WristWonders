import mongoose from "mongoose";

const product = new mongoose.Schema({
    name: {
        type: String,
        required: true
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

export default mongoose.model("Product", product);
