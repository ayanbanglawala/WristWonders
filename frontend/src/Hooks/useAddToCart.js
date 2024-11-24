import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useAddToCart = () => {
    const [loading, setLoading] = useState();
    const [quantityBtn, setQuantity] = useState();
    const [existanceP, setExistanceP] = useState(false);
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
                setExistanceP(false)
            }
            if (response.ok) {
                toast.success('Product added to cart successfully');
                setExistanceP(true);
                setQuantity(true);
            }
            console.log(data);
        } catch (error) {
            toast.error('Failed to add product to cart');   
        } finally {
            setLoading(false);
        }
    }

    return { loading, addToCart, quantityBtn, existanceP }  // Return the addToCart function and loading state
 
}

export default useAddToCart