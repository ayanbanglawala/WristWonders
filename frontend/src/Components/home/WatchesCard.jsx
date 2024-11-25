import React, { useEffect } from "react";
import Card from "../Card";
import useGetProducts from "../../Hooks/useGetProducts";

const WatchesCard = () => {
  const { products, loading, getProducts } = useGetProducts();

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
  }, [products]); // Logs when products state changes
  return (
    <div className="flex justify-center flex-col items-center">
      {loading && (
        <div className="overlay">
          <span className="loading loading-spinner loading-lg bg-blue-600"></span>
        </div>
      )}
      <h1 className="text-5xl stylish font-bold">new arrivals</h1>
      <div className="container mx-auto my-5 flex flex-wrap justify-center gap-6 w-[100vw]">
        {products.map((product) => (
          <Card
            productId={product._id}
            name={product.name}
            price={product.price}
            image={product.images[0]}
            rating={product.ratings / product.numReviews}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchesCard;
