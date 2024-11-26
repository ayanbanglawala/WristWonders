import React, { useState } from "react";
import AddToCart from "./AddToCart";
import useRemoveItemCart from "../../Hooks/useRemoveItemCart";

const CartCard = ({ img, name, brand, price, quantity, productId }) => {
    const [remove, setRemove] = useState(false);
    const { loading, removeItemCart } = useRemoveItemCart();
    const handleRemoveCart = async()=>{
        removeItemCart({id:productId});
    }
    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 w-full">
            {/* Product Image */}
            <div className="w-48 h-48 md:w-32 md:h-32 flex-shrink-0">
                <img
                    src={`https://wristwonders-ewmk.onrender.com/${img}`}
                    alt={name}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Product Details */}
            <div className="flex-grow md:ml-4 mt-4 md:mt-0 text-left">
                <h2 className="text-lg font-semibold truncate">{name}</h2>
                <p className="text-sm text-gray-500 truncate">{brand}</p>
                <p className="text-sm text-gray-500 truncate">Quantity: {quantity}</p>
                <p className="text-sm text-green-600">In Stock</p>
            </div>

            {/* Price and Actions */}
            <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 text-center md:text-right">
                {/* Price */}
                <p className="text-xl font-semibold">₹{price}</p>

                {/* Actions */}
                <div>
                    <AddToCart productId={productId} />
                    <button onClick={handleRemoveCart} className="btn mt-3 btn-error btn-sm text-white w-[100%]">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
