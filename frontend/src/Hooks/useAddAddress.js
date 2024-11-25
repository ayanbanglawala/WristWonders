import { useState } from 'react';

const useAddAddress = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addAddress = async (address) => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth/addAddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(address),
            });

            if (!response.ok) {
                throw new Error('Failed to add address');
            }

            const data = await response.json();
            return data; // Return response to handle updates in the component
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { addAddress, loading, error };
};

export default useAddAddress;
