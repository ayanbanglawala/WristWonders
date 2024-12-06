import React, { useEffect } from "react";
import { MdOutlineWatch } from "react-icons/md";
import { Link } from "react-router-dom";
import AddToCart from "./Cart/AddToCart";
import { FaStar } from "react-icons/fa";

const Card = ({ image, name, price, productId, rating }) => {
  
  return (
    <div className="card bg-base-100 w-80 lg:w-72 shadow-xl rounded-lg">
      <figure>
        {/* <img src={`http://localhost:5001/${image}`} className="w-80 h-full" alt="Watch" /> */}
        <img src={`https://wristwonders-ewmk.onrender.com/${image}`} className="w-80 h-full" alt="Watch" />
      </figure>
      <div className="card-body p-3 flex justify-center items-center">
        <h2 className="card-title text-md">{name}</h2>
        <h2 className="card-title text-sm">₹{price}/-</h2>
        <div className="badge text-white bg-blue-500 h-8 gap-2 mt-5"><FaStar/> {rating}</div>

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
