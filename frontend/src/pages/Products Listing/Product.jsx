import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import useGetProductDetails from '../../Hooks/useGetProductDetails';
import useCheckIsOrder from '../../Hooks/useCheckIsOrder';
import AddToCart from '../../Components/Cart/AddToCart';

const Product = () => {
  const { id } = useParams();
  const { loading: loadingProduct, product, getProductDetails } = useGetProductDetails();
  const { loading: loadingOrder, isOrder, isOrdered, error } = useCheckIsOrder();

  // Fetch product details when ID changes
  useEffect(() => {
    if (id) {
      getProductDetails(id);
      isOrdered(id); // Check if the product is ordered
    }
  }, [id]);

  // Show loading spinner or fallback UI while fetching data
  if (loadingProduct) {
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
          {/* Product Image */}
          <div className="card bg-base-100 w-full lg:w-1/2 p-4 flex justify-center items-center">
            <img
              src={`http://localhost:5001/${product?.images}`}
              alt={product?.name}
              className="rounded-lg object-contain h-full w-full"
            />
          </div>

          {/* Product Details */}
          <div className="text-left w-full lg:w-1/2 p-4">
            <h1 className="text-4xl font-bold">{product?.name}</h1>
            <h2 className="text-2xl font-bold">{product?.brand}</h2>
            <p className="py-6">{product?.description}</p>

            {/* Add to Cart Button */}
            <AddToCart productId={product?._id} />

            {/* Order Status */}
            {loadingOrder ? (
              <p>Checking order status...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : isOrder ? (
              <p className="text-green-500">You have already ordered this product.</p>
            ) : (
              <p className="text-gray-500">You haven't ordered this product yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
