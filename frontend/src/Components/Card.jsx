import React, { useEffect } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineWatch } from "react-icons/md";

import mainImage from "../assets/Images/Home/MainImage.png";
import CartItem from "./home/CatItem";
import { Link } from "react-router-dom";

const Card = ({image, name, price, key, review}) => {
  const addToCart = false;
  
  return (
    <div className="card bg-base-100 w-80 lg:w-72 shadow-xl rounded-lg">
      <figure>
        <img src={`http://localhost:5001/${image}`} className="w-80 h-full" alt="Watch" />
      </figure>
      <div className="card-body p-3 flex justify-center items-center">
        <h2 className="card-title text-md">{name}</h2>
        <h2 className="card-title text-sm">₹{price}/-</h2>
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
          <Link to="/product">
            <button className="btn">
              <MdOutlineWatch className="text-sm" /> Discover
            </button>
          </Link>
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
