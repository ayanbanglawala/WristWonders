import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true }
    },
    status: { type: String, default: 'Pending' }, // e.g., Pending, Shipped, Delivered
    paymentStatus: { type: String, default: 'Unpaid' }, // e.g., Unpaid, Paid
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;