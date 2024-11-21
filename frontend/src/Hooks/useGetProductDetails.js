import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const useGetProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const getProductDetails = useCallback(async (productId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      if (response.ok) {
        setProduct(data);
      } else {
        toast.error('Please try again later.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  }, []); // Memoize the function

  return { loading, product, getProductDetails };
};

export default useGetProductDetails;
