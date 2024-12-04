import React, { useState } from 'react'
import { useAuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';


const useUpload = () => {
    const [loading, setLoading] = useState("");
    // const { setAuthUser } = useAuthContext();

    const upload = async ({ name, brand, price, description, stock, category }, image) => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('stock', stock);
        formData.append('category', category);
        formData.append('image', image);
        try {
            const response = await fetch('/api/admin/addProduct', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Product uploaded successfully');
                // setAuthUser(data.user);
            } else {
                toast.error('Failed to upload product');
            }
            
        } catch (error) {
            toast.error(error.message);
        }
        
    }
    return { loading, upload };
}

export default useUpload