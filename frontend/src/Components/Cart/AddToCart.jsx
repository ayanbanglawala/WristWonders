import React from 'react'
import useAddToCart from '../../Hooks/useAddToCart'

const AddToCart = ({ id }) => {
    const { loading, addToCart } = useAddToCart();
    const handleClick = async () => {
        addToCart({ id });
    }

    return (
        <>
            <button className="btn text-white bg-blue-500 hover:bg-blue-600" onClick={handleClick}>
                {loading && (
                    <span className="loading loading-spinner loading-lg bg-blue-600"></span>
                )}{
                    !loading && "Add to cart"
                }
            </button>
        </>
    )
}

export default AddToCart