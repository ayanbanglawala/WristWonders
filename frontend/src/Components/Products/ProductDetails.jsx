import React from 'react'
import img from '../../assets/Images/Home/MainImage.png'
import CartItem from '../../Components/home/CatItem';
import { FaStar } from "react-icons/fa";

const ProductDetails = () => {
    const addtocart = false;
    return (
        <>
            <div className="hero-content flex flex-col lg:flex-row w-full">
                {/* Image Card */}
                <div className="card bg-base-100 w-full lg:w-1/2 p-4 flex justify-center items-center">
                    <img src={img} alt="Omega Watch" className="rounded-lg object-contain max-h-[550px]" />
                </div>

                {/* Text Card */}
                <div className="text-left w-full lg:w-1/2 p-4">
                    <h1 className="text-4xl font-bold">Omega Watch Series 4</h1>
                    <h1 className="text-2xl font-bold">Omega</h1>
                    <div className='flex items-center gap-2'>
                        <div className="badge badge-primary my-4 py-3 gap-1"><FaStar />4.3</div><p className='text-gray-500 font-medium'>3,899 Ratings & 604 Reviews</p>
                    </div>
                    <div className='flex items-end gap-4'>
                        <p className='text-5xl font-bold'>₹3,999</p>
                        <p className="text-xl  line-through text-gray-500">₹3,999</p>
                        <p className="text-xl text-green-700">80% Off</p>

                    </div>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    {
                        !addtocart && <button className="btn text-white bg-blue-500 hover:bg-blue-600">Add to cart</button>
                    }
                    {
                        addtocart && <CartItem />
                    }
                </div>
            </div>
        </>
    )
}

export default ProductDetails