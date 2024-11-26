import React from "react";
import { MdOutlineWatch } from "react-icons/md";
import { Link } from "react-router-dom";
import AddToCart from "./Cart/AddToCart";

const Card = ({ image, name, price, productId, rating = 0 }) => {
  return (
    <div className="card bg-base-100 w-80 lg:w-72 shadow-xl rounded-lg">
      <figure>
        <img src={`https://wristwonders-ewmk.onrender.com/${image}`} className="w-80 h-full" alt="Watch" />
      </figure>
      <div className="card-body p-3 flex justify-center items-center">
        <h2 className="card-title text-md">{name}</h2>
        <h2 className="card-title text-sm">₹{price}/-</h2>
        <div className="rating rating-lg rating-half w-[40%] flex justify-center items-center">
          <input
            type="radio"
            name="rating-10"
            className="rating-hidden"
            checked={rating === 0}
            readOnly // Make the input read-only
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
            checked={rating <= 0.75 && rating > 0.25}
            readOnly // Add readOnly
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
            checked={rating <= 1.25 && rating > 0.75}
            readOnly
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
            checked={rating <= 1.75 && rating > 1.25}
            readOnly
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
            checked={rating <= 2.25 && rating > 1.75}
            readOnly
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
            checked={rating <= 2.75 && rating > 2.25}
            readOnly
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
            checked={rating <= 3.25 && rating > 2.75}
            readOnly
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
            checked={rating <= 3.75 && rating > 3.25}
            readOnly
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
            checked={rating <= 4.25 && rating > 3.75}
            readOnly
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1 bg-green-500"
            checked={rating <= 4.75 && rating > 4.25}
            readOnly
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2 bg-green-500"
            checked={rating <= 5 && rating > 4.75}
            readOnly
          />
          <p className="ml-2">{rating}</p>
        </div>

        <div className="flex justify-between gap-4">
          <Link to={`/product/${productId}`}>
            <button className="btn">
              <MdOutlineWatch className="text-lg" /> Discover
            </button>
          </Link>
          <AddToCart productId={productId} />
        </div>
      </div>
    </div>
  );
};

export default Card;
