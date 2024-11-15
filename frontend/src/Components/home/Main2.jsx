import React from 'react'
import Main2Img from '../../assets/Images/Home/Main2.png';
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineWatch } from "react-icons/md";

const Main2 = () => {
    return (
        <div className="relative">
            {/* Rotated Background Div */}
            <div className="absolute inset-0 bg-gray-200 h-[450px] w-[2000px] ml-[-40px] mt-[250px] transform rotate-6 z-[-1]"></div>

            {/* Your Hero Section */}
            <div className="hero bg-base-0 min-h-[80vh]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={Main2Img}
                        className="max-w-xs lg:max-w-sm rounded-lg" />
                    <div>
                        <h1 className="text-5xl font-bold stylish text-[60px]">new</h1>
                        <h1 className="text-5xl font-bold">Omega Watch Series 4</h1>
                        <p className="py-6">
                            The Omega Watch Series 4 offers a perfect fusion of luxury and performance. With its sophisticated design and cutting-edge technology, it ensures unparalleled precision and durability. The watch’s sleek, modern aesthetics are complemented by advanced features, making it an ideal timepiece for both everyday wear and formal occasions.
                        </p>
                        <button className="btn mx-3"><MdOutlineWatch className='text-xl' /> Discover </button>
                        <button className="btn btn-primary"><LuShoppingCart className='text-xl' /> Add to cart </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Main2