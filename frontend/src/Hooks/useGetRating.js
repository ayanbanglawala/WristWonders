import React, { useState } from 'react';
import toast from 'react-hot-toast';

const useGetRating = () => {
  const [loading1, setLoading] = useState(false); // Initialize as false
  const [ratings, setRatings] = useState([]);

  const getRatings = async ({ id }) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/review/rating/${id}`);
      const data = await response.json();
      if (!response.ok) {
        toast.error("Error occurred!");
      }
      setRatings(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error('Error fetching ratings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Return loading1, ratings, and the getRatings function from the hook
  return { loading1, ratings, getRatings };
};

export default useGetRating;
