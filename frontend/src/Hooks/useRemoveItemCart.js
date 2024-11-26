import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useCart } from '../Context/CartContext';

const useRemoveItemCart = () => {
  const [loading, setLoading] = useState(false);
  const {removeFromCart} = useCart();

  const removeItemCart = async ({id})=>{
    setLoading(true);
    try{
      const response = await fetch(`/api/cart/${id}`,{
        method: 'DELETE',
      });
      if(response.ok){
        toast.success('Item removed from cart successfully!');
        removeFromCart(id);
      }else{
        toast.error('Failed to remove item from cart');
      }
    } catch(error){
      toast.error('Failed to remove item from cart');
    } finally{
      setLoading(false);
    }
  }
 
  return { loading, removeItemCart };
}

export default useRemoveItemCart