import React from 'react';

const useMakePrimary = () => {
  const makePrimary = async (addressId) => {
    try {
      const response = await fetch('/api/orders/primaryAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ addressId }),
      });

      if (!response.ok) {
        throw new Error('Failed to set primary address');
      }

      const data = await response.json();
      return data; // Return the response for further use if needed
    } catch (error) {
      console.error('Error making primary address:', error);
      throw error; // Rethrow error for caller to handle
    }
  };

  return makePrimary;
};

export default useMakePrimary;
