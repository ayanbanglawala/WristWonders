import React from "react";
import mainImage from "../../assets/Images/Home/MainImage.png";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineWatch } from "react-icons/md";

const Main = () => {
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
            <button className="btn mx-3">
              <MdOutlineWatch className="text-xl" /> Discover
            </button>
            <button className="btn bg-blue-500 text-white hover:bg-blue-600">
              <LuShoppingCart className="text-xl" /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
