import React, { useState } from 'react';

const useCheckIsOrder = () => {
  const [loading, setLoading] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [error, setError] = useState(null);

  const isOrdered = async (id) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/review/order/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsOrder(data.isOrdered || false)
        ;
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong');
        setIsOrder(false);
      }
    } catch (err) {
      console.error('Error fetching order status:', err); // Log the actual error
      setError('Failed to fetch order status. Please try again.');
      setIsOrder(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, isOrder, isOrdered, error };
};

export default useCheckIsOrder;
