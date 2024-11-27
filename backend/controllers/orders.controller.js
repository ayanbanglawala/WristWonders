import Cart from "../models/cart.model.js";
import Order from "../models/orders.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        const cartOfUser = await Cart.findOne({ user: userId }).populate({
            path: "cartItems.product",
            select: "price stock name" // Select both price and stock fields for checking stock and calculating the total amount
        });

        if (!cartOfUser) {
            return res.status(404).json({ message: "Cart not found for this user." });
        }

        // Check stock availability for each item in the cart
        for (const item of cartOfUser.cartItems) {
            if (item.product.stock < item.quantity) {
                return res.status(404).json({ message: `The product ${item.product.name} is currently out of stock!` });
            }
        }

        // Calculate total amount
        const totalAmount = cartOfUser.cartItems.reduce((acc, item) => {
            return acc + (item.product.price * item.quantity);
        }, 0);

        // Prepare order items
        const orderItems = cartOfUser.cartItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
        }));

        // Check for primary address
        const address = req.user.addresses.find(item => item.isPrimary);
        if (!address) {
            return res.status(404).json({ message: "No primary address available. Please set a primary address." });
        }

        // Update stock after confirming all items are in stock
        for (const item of cartOfUser.cartItems) {
            await Product.findByIdAndUpdate(
                item.product._id,
                { $inc: { stock: -item.quantity } },
                { new: true }
            );
        }

        // Create the order
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
            paymentStatus: "Paid"
        });

        // Clear the cart after placing the order
        await Cart.findByIdAndDelete(cartOfUser._id);

        // Send success response
        return res.status(201).json(order);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error placing order" });
    }
};




export const getOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ user: userId });
        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(201).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching orders" });

    }
}

export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate("orderItems.product");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching order" });
    }
}

export const getAllOrdersAdmin = async (req, res) => {
    try {
        const orders = await Order.find({});
        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(201).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching orders" });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(201).json(order);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating order status" });
    }
}

export const setPrimaryAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const { addressId } = req.body; // Assuming addressId is sent in the request body to set as primary

        // Set all addresses to not primary
        user.addresses.forEach((address) => {
            address.isPrimary = false;
        });

        // Find the address to set as primary
        const primaryAddress = user.addresses.find(address => address._id.toString() === addressId);

        if (!primaryAddress) {
            return res.status(404).json({ message: "Address not found." });
        }

        primaryAddress.isPrimary = true; // Set the selected address as primary

        await user.save(); // Save the user with updated addresses

        res.status(200).json({ message: "Primary address updated successfully.", addresses: user.addresses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error setting primary address." });
    }
};
