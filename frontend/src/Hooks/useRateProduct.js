import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useRateProduct = () => {
  const [loading, setLoading] = useState(false);

  const rateProduct = async(rating, comment, id) => {
    setLoading(true);

    try {
        const response = await fetch(`/api/products/review/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating, comment }),
        });

        if (!response.ok) {
            throw new Error('Failed to rate product');
        }
        const data = await response.json();
        toast.success("Rating successful!");
    } catch (error) {
        console.error(error);
        toast.error(error);
    } finally {
        setLoading(false);
    }
  }

  return { rateProduct, loading };
}

export default useRateProduct