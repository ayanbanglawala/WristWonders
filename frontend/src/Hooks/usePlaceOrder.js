import React, { useState } from 'react'
import toast from 'react-hot-toast';

const usePlaceOrder = () => {
    const [loading, setLoading] = useState(false);

    const placeOrder = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error("The order was not placed!");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return { placeOrder, loading };
}

export default usePlaceOrder