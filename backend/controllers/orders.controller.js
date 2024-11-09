import Cart from "../models/cart.model.js";
import Order from "../models/orders.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        const cartOfUser = await Cart.findOne({ user: userId }).populate({
            path: "cartItems.product", // Populate the product field inside cartItems
            select: "price" // Only select the price field for calculating the total amount
        });

        if (!cartOfUser) {
            return res.status(404).json({ message: "Cart not found for this user." });
        }

        const totalAmount = cartOfUser.cartItems.reduce((acc, item) => {
            const product = item.product; // Get the populated product
            return acc + (product.price * item.quantity); // Add the total for this item
        }, 0);

        const orderItems = cartOfUser.cartItems.map(item => ({
            product: item.product._id, // Product ID
            quantity: item.quantity,   // Quantity of the product
        }));

        const address = req.user.addresses
            .filter(item => item.isPrimary) // Filter for the primary address
            .map(item => ({
                street: item.street,
                city: item.city,
                state: item.state,
                country: item.country,
                zipCode: item.zipCode
            }))[0]; // Return the first primary address, or undefined if not found

        const order = await Order.create({
            user: userId,
            orderItems,
            totalAmount,
            shippingAddress: {
                street: address.street,
                city: address.city,
                state: address.state,
                country: address.country,
                zipCode: address.zipCode
            },
            totalAmount
        });
        for (const item of cartOfUser.cartItems) {
            await Product.findByIdAndUpdate(
                item.product._id,
                { $inc: { stock: -item.quantity } }, // Decrease stock by ordered quantity
                { new: true }
            );
        }

        await Cart.findByIdAndDelete(cartOfUser._id); // Delete the cart after placing the order
        return res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error placing order" });
    }
};



export const getOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ user: userId }).populate("user orderItems.product");
        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching orders" });
        
    }
}

export const getOrderById = async (req, res) => {
    res.send("GET BY ID");
}
