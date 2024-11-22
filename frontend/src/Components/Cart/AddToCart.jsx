import React, { useEffect, useState } from 'react';
import useAddToCart from '../../Hooks/useAddToCart';
import useCheckCart from '../../Hooks/useCheckCart';
import { LuShoppingCart } from "react-icons/lu";
import CartItem from '../home/CatItem';

const AddToCart = ({ productId }) => {
  const { loading: addingToCart, addToCart } = useAddToCart();
  const { loading: checkingCart, existance, checkCart } = useCheckCart();
  const [isInCart, setIsInCart] = useState(false);

  // Check if the product is in the cart
  useEffect(() => {
    const fetchCartStatus = async () => {
      await checkCart({ productId });
      setIsInCart(existance);
    };
    fetchCartStatus();
  }, [checkCart, productId, existance]);

  // Handle Add to Cart action
  const handleAddToCart = async () => {
    await addToCart({ id: productId });
    setIsInCart(true); // Update local state after adding to cart
  };

  // Show loading spinner while checking the cart
  if (checkingCart) {
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-sm bg-blue-600"></span>
      </div>
    );
  }

  // Render appropriate button based on cart status
  return (
    <>
      {isInCart ? (
        <CartItem />
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
    </>
  );
};

export default AddToCart;
