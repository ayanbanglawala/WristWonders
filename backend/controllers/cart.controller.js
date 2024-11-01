import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js"

export const addToCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const { product } = req.body;

        // Check if the product exists in the database
        const productInDb = await Product.findById(product);
        if (!productInDb) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Create a new cart with the product if none exists
            const newCart = new Cart({
                user: userId,
                cartItems: [{ product: product, quantity: 1 }]
            });
            await newCart.save();
            return res.status(201).json({ message: "Product added to new cart", cart: newCart });
        }

        // Check if the product already exists in the cart
        const itemExists = cart.cartItems.some(item => item.product.toString() === product);

        if (!itemExists) {
            // If product does not exist in the cart, add it with quantity 1
            cart.cartItems.push({ product: product, quantity: 1 });
            await cart.save();
            return res.status(200).json({ message: "Product added to cart", cart });
        } else {
            // Product is already in the cart, no action taken
            return res.status(400).json({ message: "Product already exists in cart" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding item to cart" });
    }
};

export const myCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching cart" });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const productId = req.params.productId;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.cartItems.splice(itemIndex, 1);
        }
        await cart.save();
        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing item from cart" });
    }
}

export const updateCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const productId = req.params.productId;
        const operation = req.body.operation;
        const cart = await Cart.findOne({ user: userId });
        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
        if (operation) {
            cart.cartItems[itemIndex].quantity += 1;
        }
        else if (!operation ){
            if(cart.cartItems[itemIndex].quantity === 0){
                cart.cartItems.splice(itemIndex, 1);
            }
            else{
                cart.cartItems[itemIndex].quantity -= 1;
            }
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating cart" });
    }
}