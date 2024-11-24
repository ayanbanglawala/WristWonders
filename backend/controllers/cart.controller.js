import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

// Add to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const { product } = req.body;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Check if the product exists in the database
        const productInDb = await Product.findById(product);
        if (!productInDb) return res.status(404).json({ message: "Product not found" });

        // Find the user's cart or create one if it doesn't exist
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, cartItems: [{ product, quantity: 1 }] });
            await cart.save();
            return res.status(201).json({ message: "Product added to new cart", cart });
        }

        // Check if the product is already in the cart
        const itemExists = cart.cartItems.some(item => item.product.toString() === product);

        if (!itemExists) {
            cart.cartItems.push({ product, quantity: 1 });
            await cart.save();
            return res.status(200).json({ message: "Product added to cart", cart });
        } else {
            return res.status(400).json({ error: "Product already in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error adding item to cart" });
    }
};

// View Cart
export const myCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const cart = await Cart.findOne({ user: userId }).populate("cartItems.product");
        if (!cart) return res.status(404).json({ error: "Cart not found" });
        res.status(200).json({ cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching cart" });
    }
};

export const checkCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const productId = req.params.productId; // Get the product ID from the URL parameters
        if (!userId) {
            console.log("No");
            return res.status(401).json({ error: "Unauthorized" });
            
        }
        // Find the cart for the user and populate the cart items
        const cart = await Cart.findOne({ user: userId }).populate("cartItems.product");
        if (!cart) return res.status(404).json({ error: "Cart not found" });

        // Check if the product exists in the cart and get its quantity
        const cartItem = cart.cartItems.find(item => item.product._id.toString() === productId);

        // Return the product's existence and quantity (0 if not found)
        const response = {
            exists: !!cartItem,
            quantity: cartItem ? cartItem.quantity : 0,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching cart" });
    }
};



// Remove from Cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const productId = req.params.productId;
        const cart = await Cart.findOne({ user: userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        // Find the item index
        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.cartItems.splice(itemIndex, 1);
            await cart.save();
            return res.status(200).json({ message: "Item removed from cart", cart });
        } else {
            return res.status(404).json({ message: "Product not in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing item from cart" });
    }
};

// Update Cart Item Quantity
export const updateCart = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const productId = req.params.productId;
        const { operation } = req.body;
        const cart = await Cart.findOne({ user: userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

        // Adjust quantity
        if (operation === "increment") {
            cart.cartItems[itemIndex].quantity += 1;
        } else if (operation === "decrement") {
            if (cart.cartItems[itemIndex].quantity > 1) {
                cart.cartItems[itemIndex].quantity -= 1;
            } else {
                cart.cartItems.splice(itemIndex, 1); // Remove item if quantity becomes 0
            }
        } else {
            return res.status(400).json({ message: "Invalid operation" });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating cart" });
    }
};
