import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemsAll, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]); // Update local state
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter(item => item.productId !== productId));
    // You can also make a fetch call to remove the item from the server if needed.
  };

  // Fetch cart items on initial load
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/cart', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.ok) {
          setCartItems(data.cart?.cartItems || []);
        } else {
          setError(data.message || 'Failed to fetch cart items');
        }
      } catch (error) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array to run only once on mount




  return (
    <CartContext.Provider value={{ cartItemsAll, addToCart, removeFromCart, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
