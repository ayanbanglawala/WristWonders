import React, { useEffect, useState } from 'react';
import { useCart } from '../../Context/CartContext';
import useAddToCart from '../../Hooks/useAddToCart';
import useCheckCart from '../../Hooks/useCheckCart';
import { LuShoppingCart } from "react-icons/lu";
import CartItem from '../home/CatItem'; // Fixed typo in import
import { useAuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

const AddToCart = ({ productId }) => {
  const { addToCart } = useCart(); // Access global addToCart function
  const { loading: addingToCart, addToCart: addItemToCart } = useAddToCart();
  const { loading: checkingCart, existance, checkCart, cartQuantity } = useCheckCart();
  const { authUser } = useAuthContext();
  const [isInCart, setIsInCart] = useState(false);
  const [quantitySet, setQuantitySet] = useState(1);

  // Fetch cart status when the component mounts or when dependencies change
  useEffect(() => {
    const fetchCartStatus = async () => {
      try {
        await checkCart({ productId });
        setIsInCart(existance); // Update based on fetched existence
        setQuantitySet(cartQuantity);
      } catch (error) {
        console.error('Error fetching cart status:', error);
      }
    };
    if (authUser) {
      fetchCartStatus();
    }
  }, [checkCart, productId, existance, cartQuantity]);

  // Handle adding item to cart
  const handleAddToCart = async () => {
    try {
      if (authUser) {
        const newItem = { id: productId }; // Replace with actual product data
        await addItemToCart(newItem); // Add to cart using custom hook
        addToCart(newItem); // Update global state
        setIsInCart(true); // Update local state directly after successful addition
      }
      else{
        toast.error("Login first!");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (checkingCart) {
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-sm bg-blue-600"></span>
      </div>
    );
  }

  return (
    <div>
      {isInCart ? (
        <CartItem productId={productId} cartQuantity={quantitySet == 0 ? 1 : quantitySet} />
      ) : (
        <button
          className="btn text-white bg-blue-500 hover:bg-blue-600"
          onClick={handleAddToCart}
          disabled={addingToCart}
        >
          {addingToCart ? (
            <span className="loading loading-spinner loading-sm bg-white"></span>
          ) : (
            <>
              <LuShoppingCart className="text-lg" /> Add to cart
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default AddToCart;
