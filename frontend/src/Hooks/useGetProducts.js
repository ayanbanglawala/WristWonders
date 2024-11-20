import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useGetProducts = (initialUrl = '/api/products') => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const getProducts = async (url = initialUrl) => {
    setLoading(true);
    setError(null); // Reset error before new request

    const controller = new AbortController();
    const { signal } = controller;

    try {
      const response = await fetch(url, { signal });
      let data;

      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Invalid JSON response');
      }

      if (response.ok) {
        setProducts(data);
      } else {
        const errorMessage = data?.message || 'Failed to fetch products';
        throw new Error(errorMessage);
      }
    } catch (err) {
      const errorMsg =
        err.name === 'AbortError'
          ? 'Request canceled'
          : err.message || 'Unable to fetch products. Please try again!';
      setError(errorMsg);
      console.error('Fetch Error:', err);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }

    // Cleanup logic
    return () => controller.abort();
  };

  return { products, loading, error, getProducts };
};

export default useGetProducts;
