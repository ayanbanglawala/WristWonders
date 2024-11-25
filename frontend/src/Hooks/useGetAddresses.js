import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useGetAddresses = () => {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [user, setUser] = useState(null);

  const getAddresses = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Addresses fetched successfully');
        setAddresses(data.addresses); // Assuming `addresses` is part of the API response
        setUser({
          fName: data.fName,
          lName: data.lName,
          email: data.email,
          phone: data.phone,
        }); // Storing user details for additional use
      } else {
        toast.error(data.error || 'Failed to fetch addresses');
      }
    } catch (error) {
      toast.error('An error occurred while fetching addresses');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddresses(); // Automatically fetch addresses when the hook is used
  }, []);

  return { loading, addresses, user, getAddresses }; // Expose the addresses, user, loading state, and a function to refetch
};

export default useGetAddresses;
