import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useGetProducts = () => {
   const [loading, setLoading] = useState(false);
   const [products, setProducts] = useState([]);

   const getProducts = async()=>{
      setLoading(true);
      try {
         const response = await fetch('/api/products');
         const data = await response.json();
         if (response.ok) {
            console.log("Successfully Fetched");
            setProducts(data);
         }
         else{
            toast.error("Error!");
         }
         if (data.error) {
            toast.error(data.error);
         }
      } catch (error) {
         toast.error("Does'nt get products!", error);
      } finally{
         setLoading(false)
      }
   }

   return {products, loading, getProducts};
}

export default useGetProducts