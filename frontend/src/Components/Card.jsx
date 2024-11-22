import React from "react";
import { MdOutlineWatch } from "react-icons/md";
import { Link } from "react-router-dom";
import AddToCart from "./Cart/AddToCart";

const Card = ({ image, name, price, productId, rating = 0 }) => {
  return (
    <div className="card bg-base-100 w-80 lg:w-72 shadow-xl rounded-lg">
      <figure>
        <img src={`http://localhost:5001/${image}`} className="w-80 h-full" alt="Watch" />
      </figure>
      <div className="card-body p-3 flex justify-center items-center">
        <h2 className="card-title text-md">{name}</h2>
        <h2 className="card-title text-sm">₹{price}/-</h2>
        <div className="rating rating-lg rating-half w-[40%] flex justify-center items-center">
          {/* Rating rendering logic */}
          <p className="ml-2">{rating.toFixed(2)}</p>
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
