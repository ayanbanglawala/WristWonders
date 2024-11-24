import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import useAddToCart from '../../Hooks/useAddToCart';
import useCheckCart from '../../Hooks/useCheckCart';
import { LuShoppingCart } from "react-icons/lu";
import CartItem from '../home/CatItem';

const AddToCart = ({ productId }) => {
  const { addToCart } = useCart(); // Access global addToCart
  const { loading: addingToCart, addToCart: addItemToCart, existanceP } = useAddToCart();
  const { loading: checkingCart, existance, checkCart, cartQuantity } = useCheckCart();
  const [isInCart, setIsInCart] = useState(false);
  const [quantitySet, setQuantitySet] = useState(1);

  useEffect(() => {
    const fetchCartStatus = async () => {
      await checkCart({ productId });
      setIsInCart(existance);
      setQuantitySet(cartQuantity);
    };
    fetchCartStatus();
  }, [checkCart, productId, existance]);

  const handleAddToCart = async () => {
    const newItem = { id: productId }; // Replace with actual product data
    await addItemToCart(newItem);
    addToCart(newItem); // Update global state
    setIsInCart(existanceP);
  };

  if (checkingCart) {
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-sm bg-blue-600"></span>
      </div>
    );
  }

  return (
    <>
      {isInCart ? (
        <CartItem productId= {productId} cartQuantity={quantitySet} />
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
