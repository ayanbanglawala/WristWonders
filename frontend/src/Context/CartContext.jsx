import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemsAll, setCartItems] = useState([]);

  // Fetch cart items on initial load
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        if (response.ok) {
          setCartItems(data.cart?.cartItems || []);
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.product._id === item.product._id);
      if (existingItem) {
        return prev.map((i) =>
          i.product._id === item.product._id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, item];
      }
    });
  };

  // Update item quantity
  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return; // Prevent quantity from going below 1
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItemsAll, addToCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
