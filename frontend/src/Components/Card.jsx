import React, { useEffect, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineWatch } from "react-icons/md";

import mainImage from "../assets/Images/Home/MainImage.png";
import CartItem from "./home/CatItem";
import { Link } from "react-router-dom";

const Card = ({image, name, price, productId, rating}) => {
  const addToCart = false;
  if (!rating) {
    rating = 0;
  }
  else{
    rating = rating.toFixed(2);
  }
  
  
  return (
    <div className="card bg-base-100 w-80 lg:w-72 shadow-xl rounded-lg">
      <figure>
        <img src={`http://localhost:5001/${image}`} className="w-80 h-full" alt="Watch" />
      </figure>
      <div className="card-body p-3 flex justify-center items-center">
        <h2 className="card-title text-md">{name}</h2>
        <h2 className="card-title text-sm">₹{price}/-</h2>
        <div className="rating rating-lg rating-half w-[40%] flex justify-center items-center">
          <input type="radio" name="rating-10" className="rating-hidden" checked= {rating==0} />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
            // disabled
            checked={rating <= 0.75 && rating > 0.25}
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
            // disabled
            checked={rating <= 1.25 && rating > 0.75}
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
            // disabled
            checked={rating <= 1.75 && rating > 1.25}
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
            // disabled 
            checked={rating <= 2.25 && rating >= 1.75}
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
            // disabled
            checked={rating <= 2.75 && rating >= 2.25}
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
            // disabled
            checked={rating <= 3.25 && rating >= 2.75}
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
            // disabled
            checked={rating <= 3.75 && rating >= 3.25}
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
            // disabled
            checked={rating <= 4.25 && rating >= 3.75}
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
            disabled
            checked={rating <= 4.75 && rating >= 4.25}
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
            disabled
            checked={rating <= 5 && rating >= 4.75}
          />
          <p className="ml-2">{rating}</p>

        </div>
        <div className="flex justify-between gap-4">
          <Link to={`/product/${productId}`}>
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
