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


  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]); // Update local state
  };

  return (
    <CartContext.Provider value={{ cartItemsAll, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
