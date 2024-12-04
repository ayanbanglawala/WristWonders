import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);

  const updateProfile = async ({fName, lName, email, phone}) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({fName, lName, email, phone}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('Profile updated successfully!');
      setLoading(false);
    } catch (error) {
      toast.error('Error updating profile: ' + error.message);
      setLoading(false);
    }
  };

  return { updateProfile, loading };
}

export default useUpdateProfile