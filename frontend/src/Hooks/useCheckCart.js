import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

const useCheckCart = () => {
    const [loading, setLoading] = useState(false);
    const [existance, setExistance] = useState(null); // Use null for better clarity
    const [cartQuantity, setCartQuantity] = useState(1);

    const checkCart = useCallback(async ({ productId }) => {
        setLoading(true);

        try {
            const response = await fetch(`/api/cart/${productId}`);
            const data = await response.json();

            if (!response.ok || data.error) {
                setExistance(false);
            } else {
                setExistance(data.exists);
                setCartQuantity(data.quantity);
                
            }
        } catch (error) {
            // Handle network or unexpected errors
            console.error(error);
            toast.error('An error occurred while checking the cart.');
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, existance, checkCart, cartQuantity };
};

export default useCheckCart;
