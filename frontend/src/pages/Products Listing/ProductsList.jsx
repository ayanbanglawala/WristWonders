import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar";
import ProductNav from "../../Components/Products/ProductNav";
import Card from "../../Components/Card";
import Footer from "../../Components/Footer";
import useGetProducts from "../../Hooks/useGetProducts";

const ProductsList = () => {
  const { products, loading, getProducts } = useGetProducts();

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
  }, [products]); // Logs when products state changes
  return (
    <div>
      {loading && (
        <div className="overlay">
          <span className="loading loading-spinner loading-lg bg-blue-600"></span>
        </div>
      )}
      <Navbar />
      <ProductNav />
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
      <Footer />

    </div>
  );
};

export default ProductsList;
