import React, { useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import img from '../../assets/Images/Home/MainImage.png';
import CartItem from '../../Components/home/CatItem';
import { FaStar } from "react-icons/fa";
import useGetProductDetails from '../../Hooks/useGetProductDetails';
import { useParams } from 'react-router-dom';
import AddToCart from '../../Components/Cart/AddToCart';

const Product = () => {
  let addtocart = false;
  const { id } = useParams();
  const { loading, product, getProductDetails } = useGetProductDetails();

  useEffect(() => {
    if (id) {
      getProductDetails(id); // Fetch product details using the provided ID
    }
  }, [id, getProductDetails]);

  // While loading or if product is null/undefined, show a loading or fallback UI
  if (loading || !product) {
    return (
        <div className="overlay">
          <span className="loading loading-spinner loading-lg bg-blue-600"></span>
        </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="hero bg-base-0 min-h-[80vh]">
        <div className="hero-content flex flex-col lg:flex-row w-full">
          {/* Image Card */}
          <div className="card bg-base-100 w-full lg:w-1/2 p-4 flex justify-center items-center">
            <img src={`http://localhost:5001/${product.images}`} alt={product.name} className="rounded-lg object-contain h-full w-full" />
            {/* <img src={`https://wristwonders-ewmk.onrender.com/${product.images}`} alt={product.name} className="rounded-lg object-contain h-full w-full" /> */}
          </div>

          {/* Text Card */}
          <div className="text-left w-full lg:w-1/2 p-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <h1 className="text-2xl font-bold">{product.brand}</h1>
            <div className='flex items-center gap-2'>
              <div className="badge badge-primary my-4 py-3 gap-1"><FaStar />{product.ratings/product.numReviews}</div>
              <p className='text-gray-500 font-medium'>{product.ratings} Stars & {product.numReviews} Reviews</p>
            </div>
            <div className='flex items-end gap-4'>
              <p className='text-5xl font-bold'>₹{product.price}</p>
              {/* <p className="text-xl line-through text-gray-500">₹{product.originalPrice}</p>
              <p className="text-xl text-green-700">{product.discount || "N/A"} Off</p> */}
            </div>
            <p className="py-6">{product.description}</p>
            <AddToCart productId={product._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
