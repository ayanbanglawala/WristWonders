import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import img from "../../assets/Images/Home/digital.jpeg";

const CollectionCard = () => {
    return (
        <div className="relative w-80 h-[400px] shadow-lg rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
            {/* Image */}
            <img
                src={img}
                alt="Shoes"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />

            {/* Text Overlay */}
            <a href="">
                <div className="absolute bottom-0 w-full flex text-white items-center justify-between bg-blue-500 bg-opacity-90 px-5 py-4 group-hover:bg-opacity-100 transition-all duration-300">
                    <h2 className="text-xl font-semibold ">Digital</h2>
                    <FaArrowRight className="text-2xl" />
                </div>
            </a>
        </div>
    );
};

export default CollectionCard;
