import React from "react";
import CartItem from "../home/CatItem";

const CartCard = ({ img }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 w-full">
            {/* Product Image */}
            <div className="w-48 h-48 md:w-32 md:h-32 flex-shrink-0">
                <img
                    src={img}
                    alt="Product"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Product Details */}
            <div className="flex-grow md:ml-4 mt-4 md:mt-0 text-left">
                <h2 className="text-lg font-semibold truncate">Product Name</h2>
                <p className="text-sm text-gray-500 truncate">Brand Name</p>
                <p className="text-sm text-gray-500 truncate">Seller: Ayan bhoi</p>
                <p className="text-sm text-green-600">In Stock</p>
            </div>

            {/* Price and Actions */}
            <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 text-center md:text-right">
                {/* Price */}
                <p className="text-xl font-semibold">₹999</p>

                <div className="">
                    {/* Remove Button */}
                    <CartItem />
                    <button className="btn mt-3 btn-error btn-sm text-white w-[100%]">Remove</button>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
