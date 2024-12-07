import React from "react";
import mainImage from "../../assets/Images/Home/MainImage.png";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineWatch } from "react-icons/md";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-white">
      <div className="hero bg-base-0 min-h-[91vh] ">
        <div className="hero-content flex-col gap-10 lg:flex-row bg-white">
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 rounded-lg animate-gradient-shift bg-gradient-to-b w-[60%] ml-[20%] h-[90%] mt-[14%] from-blue-500 via-blue-300 to-blue-800 blur-lg opacity-75"></div>
            <img
              src={mainImage}
              alt="Main"
              className="max-w-xs lg:max-w-md rounded-lg relative z-20 animate-updown"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold stylish text-[60px]">new</h1>
            <h1 className="text-5xl font-bold">Omega Watch Series 4</h1>
            <p className="py-6">
              The Omega Watch Series 4 offers a perfect fusion of luxury and
              performance. With its sophisticated design and cutting-edge
              technology, it ensures unparalleled precision and durability. The
              watch’s sleek, modern aesthetics are complemented by advanced
              features, making it an ideal timepiece for both everyday wear and
              formal occasions.
            </p>
            <Link to="/product">
              <button className="btn mx-3">
                <MdOutlineWatch className="text-xl" /> Discover
              </button>
            </Link>
            <Link to="/dashboard/addproduct">
              <button className="btn bg-blue-500 text-white hover:bg-blue-600">
                <LuShoppingCart className="text-xl" /> Add to cart
              </button>
            </Link>
            <Link to="/products">
              <button className="btn bg-blue-500 text-white hover:bg-blue-600 h-[50px]">
                 All Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default Hero;


// import React, { useEffect, useState } from "react";
// import mainImage from "../../assets/Images/Home/MainImage.png";
// import { LuShoppingCart } from "react-icons/lu";
// import { MdOutlineWatch } from "react-icons/md";
// import { Link } from "react-router-dom";
// import useGetProducts from "../../Hooks/useGetProducts";

// const Hero = () => {
//   const { products, loading, error, getProducts } = useGetProducts();
//   const [randomProduct, setRandomProduct] = useState(null); // State to store a random product

//   useEffect(() => {
//     const fetchData = async () => {
//       await getProducts();
//     };

//     fetchData();
//   }, []); // Fetch products on component mount

//   useEffect(() => {
//     if (products.length > 0) {
//       // Ensure products are available before generating a random product
//       const randomIndex = Math.floor(Math.random() * products.length);
//       setRandomProduct(products[randomIndex]); // Set the random product
//     }
//   }, [products]); // Recalculate when `products` changes

//   console.log(randomProduct);

//   return (
//     <div className="bg-white">
//       {randomProduct &&
//         <div className="hero bg-base-0 min-h-[91vh]">
//           {loading && (
//             <div className="overlay">
//               <span className="loading loading-spinner loading-lg bg-blue-600"></span>
//             </div>
//           )}

//           {error && <div className="text-red-500">Error: {error}</div>}

//           <div className="hero-content flex-col gap-10 lg:flex-row bg-white">
//             <div className="relative flex justify-center items-center">
//               <div className="absolute inset-0 rounded-lg animate-gradient-shift bg-gradient-to-b w-[60%] ml-[20%] h-[90%] mt-[14%] from-blue-500 via-blue-300 to-blue-800 blur-lg opacity-75"></div>
//               {randomProduct.images && randomProduct.images[0] && (
//                 <img
//                   src={`http://localhost:5001/${randomProduct.images[0]}`}
//               // src={`https://wristwonders-ewmk.onrender.com/${image}`}
//                   alt={randomProduct.name || "Product Image"}
//                   className="max-w-xs lg:max-w-md rounded-lg relative z-20 animate-updown"
//                 />
//               )}
//             </div>
//             <div>
//               <h1 className="text-5xl font-bold stylish text-[60px]">new</h1>
//               <h1 className="text-5xl font-bold">{randomProduct.name || "No Name Available"}</h1>
//               <p className="py-6">
//               {randomProduct.description || "No Description Available"}
//               </p>




//               <Link to="/product">
//                 <button className="btn mx-3">
//                   <MdOutlineWatch className="text-xl" /> Discover
//                 </button>
//               </Link>
//               <Link to="/dashboard/addproduct">
//                 <button className="btn bg-blue-500 text-white hover:bg-blue-600">
//                   <LuShoppingCart className="text-xl" /> Add to cart
//                 </button>
//               </Link>
//               <Link to="/products">
//                 <button className="btn bg-blue-500 text-white hover:bg-blue-600 h-[50px]">
//                   All Products
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>}
//     </div>
//   );
// };

// export default Hero;
