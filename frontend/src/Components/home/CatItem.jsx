import React, { useState } from "react";

const CartItem = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="flex items-center gap-3 rounded-lg  w-[130px] justify-between p-0">
      <button
        onClick={decreaseQuantity}
        className="btn bg-blue-500 text-white hover:bg-blue-600"
      >
        -
      </button>
      <span className="text-lg font-semibold">{quantity}</span>
      <button
        onClick={increaseQuantity}
        className="btn bg-blue-500 text-white hover:bg-blue-600"
      >
        +
      </button>
    </div>
  );
};

export default CartItem;
