import React, { useEffect, useState } from "react";
import useUpdateCart from "../../Hooks/useUpdateCart";

const CartItem = ({ productId }) => {
  const [quantity, setQuantity] = useState(1); // Local quantity state
  const { loading, quantityNew, updateCart } = useUpdateCart();

  const increaseQuantity = () => {
    updateCart({ operation: "increment", productId });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateCart({ operation: "decrement", productId });
    }
  };

  // Sync `quantity` state with `quantityNew` from the hook
  useEffect(() => {
    if (quantityNew.length > 0) {
      const updatedItem = quantityNew.find((item) => item.product === productId);
      if (updatedItem) {
        setQuantity(updatedItem.quantity);
      }
    }
  }, [quantityNew, productId]);

  return (
    <div className="flex items-center gap-3 rounded-lg  w-[130px] justify-between p-0">
      <button
        onClick={decreaseQuantity}
        className={`btn bg-blue-500 text-white hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading || quantity <= 1}
      >
        -
      </button>
      <span className="text-lg font-semibold">{quantity}</span>
      <button
        onClick={increaseQuantity}
        className={`btn bg-blue-500 text-white hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        +
      </button>
    </div>
  );
};

export default CartItem;
