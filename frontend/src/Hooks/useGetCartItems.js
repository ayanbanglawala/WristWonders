import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const useGetCartItems = () => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCartItems(data.cart?.cartItems || []);
      } else {
        toast.error('Failed to fetch cart items. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  }, []); // Memoized to avoid unnecessary re-renders

  return { loading, cartItems, getCartItems };
};

export default useGetCartItems;
