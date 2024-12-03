import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useRateProduct = () => {
  const [loading, setLoading] = useState(false);

  const rateProduct1 = async ({rating, comment, id}) => {
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
        toast.error("ERROR OCCurred", id);
      }
      else {
        const data = await response.json();
        toast.success("Rating successful!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { rateProduct1, loading };
}

export default useRateProduct