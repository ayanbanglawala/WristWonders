import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import useGetProductDetails from '../../Hooks/useGetProductDetails';
import useCheckIsOrder from '../../Hooks/useCheckIsOrder';
import AddToCart from '../../Components/Cart/AddToCart';
import useRateProduct from '../../Hooks/useRateProduct';
import useGetRating from '../../Hooks/useGetRating';

const Product = () => {
  const { id } = useParams();
  const { loading: loadingProduct, product, getProductDetails } = useGetProductDetails();
  const { loading: loadingOrder, isOrder, isOrdered, error } = useCheckIsOrder();
  const {rateProduct1, loading} = useRateProduct();
  const {loading1, ratings, getRatings} = useGetRating();

  const [rateProduct, setRateProduct] = useState(1);
  const [comment, setComment] = useState("");

  const idOfProduct = id;
  console.log(idOfProduct);
  

  const handleRateChange = async(e) => {
    e.preventDefault();
    await rateProduct1({rating: rateProduct, comment : comment, id : idOfProduct});
    console.log("ID:", idOfProduct);
    console.log("Rating:", rateProduct);
    console.log("Comment:", comment);
  };

  // Fetch product details when ID changes
  useEffect(() => {
    if (id) {
      getProductDetails(id);
      isOrdered(id); // Check if the product is ordered
      if (isOrder) {
        getRatings({id : idOfProduct});
        console.log(ratings, "000000000000000000");
      }
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
              <div className="w-100 flex justify-center py-10 flex-col gap-4">
                <p>Rate the product!</p>
                <div className="rating flex w-100">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-blue-400" defaultChecked={rateProduct === 1} hidden onClick={() => setRateProduct(1)} />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-blue-400" onClick={() => setRateProduct(1)} />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-blue-400" onClick={() => setRateProduct(2)} />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-blue-400" onClick={() => setRateProduct(3)} />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-blue-400" onClick={() => setRateProduct(4)} />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-blue-400" onClick={() => setRateProduct(5)} />
                </div>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                  className="btn bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleRateChange}
                >
                  Submit
                </button>
              </div>
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
