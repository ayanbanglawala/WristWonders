import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

const useUpdateCart = () => {
  const [loading, setLoading] = useState(false);
  const [quantityNew, setQuantity] = useState([]);

  const updateCart = useCallback(async ({ operation, productId }) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operation }),
      });
      const data = await response.json();
      if (response.ok) {
        const updatedCartItem = data.cartItems.filter(
          (cartItem) => cartItem.product === productId
        );
        setQuantity(updatedCartItem);
        // console.log('Updated Cart Item:', updatedCartItem); // Use the updated value here
      }
      if (data.error) {
        console.error(data.error);
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, quantityNew, updateCart };
};

export default useUpdateCart;
