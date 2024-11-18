import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineWatch } from "react-icons/md";

import mainImage from "../../assets/Images/Home/MainImage.png";
import CartItem from "./CatItem";

const Card = () => {
  const addToCart = false;
  return (
    <div className="card bg-base-100 w-80 lg:w-72 shadow-xl rounded-lg">
      <figure>
        <img src={mainImage} alt="Shoes" />
      </figure>
      <div className="card-body p-3 flex justify-center items-center">
        <h2 className="card-title text-md">Omega watch series 2</h2>
        <h2 className="card-title text-sm">₹1400/-</h2>
        <div className="rating rating-lg rating-half w-[40%] flex justify-center items-center">
          <input type="radio" name="rating-10" className="rating-hidden" />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
            defaultChecked
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
          />
          <p className="ml-2">2.5</p>
        </div>
        <div className="flex justify-between gap-4">
          <button className="btn">
            <MdOutlineWatch className="text-sm" /> Discover
          </button>
          {!addToCart && (
            <button className="btn bg-blue-500 text-white hover:bg-blue-600">
              <LuShoppingCart className="text-sm" /> Add to cart
            </button>
          )}

          {addToCart && <CartItem />}
        </div>
      </div>
    </div>
  );
};

export default Card;
