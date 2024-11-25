import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useAddToCart = () => {
    const [loading, setLoading] = useState();
    const [quantityBtn, setQuantity] = useState();
    const addToCart = async (product) => {
        const productId = product.id;
        setLoading(true);
        try {
            const response = await fetch(`/api/cart`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ product : productId })  // Assuming quantity is 1 by default
            });
            const data = await response.json();
            if (data.error) {
                toast.error(data.error);
            }
            if (response.ok) {
                toast.success('Product added to cart successfully');
                setQuantity(true);
            }
            console.log(data);
        } catch (error) {
            toast.error('Failed to add product to cart');   
        } finally {
            setLoading(false);
        }
    }

    return { loading, addToCart, quantityBtn }  // Return the addToCart function and loading state
 
}

export default useAddToCart