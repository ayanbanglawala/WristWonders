import React, { useEffect } from 'react'
import img from '../../assets/Images/Home/MainImage.png'
import CartItem from '../../Components/home/CatItem';
import { FaStar } from "react-icons/fa";
import useGetProductDetails from '../../Hooks/useGetProductDetails';
import { useParams } from 'react-router-dom';

const ProductDetails = ({id}) => {
    console.log(id); // Logging the ID for debugging
    const { loading, product, getProductDetails } = useGetProductDetails();

    useEffect(() => {

        if (id) {
            getProductDetails(id); // Pass the 'id' to get product details
        }
        console.log(product, "00"); // Logs product data when it changes
    }, []); // Dependency array should include 'id' and 'getProductDetails'

    useEffect(() => {
        console.log(product, "00"); // Logs product data when it changes
    }, [product]);

    const addtocart = false;
    console.log(product);
    return (
        <>
            <div className="hero-content flex flex-col lg:flex-row w-full">
                {/* Image Card */}
                <div className="card bg-base-100 w-full lg:w-1/2 p-4 flex justify-center items-center">
                    <img src={img} alt="Omega Watch" className="rounded-lg object-contain max-h-[550px]" />
                </div>

                {/* Text Card */}
                <div className="text-left w-full lg:w-1/2 p-4">
                    <h1 className="text-4xl font-bold">{product.name}</h1>
                    <h1 className="text-2xl font-bold">{product.brand}</h1>
                    <div className='flex items-center gap-2'>
                        <div className="badge badge-primary my-4 py-3 gap-1"><FaStar />{product.ratings / product.numReviews}</div><p className='text-gray-500 font-medium'>{product.ratings} Ratings & {product.numReviews} Reviews</p>
                    </div>
                    <div className='flex items-end gap-4'>
                        <p className='text-5xl font-bold'>₹{product.price}</p>
                        {/* <p className="text-xl  line-through text-gray-500">₹3,999</p>
                        <p className="text-xl text-green-700">80% Off</p> */}

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