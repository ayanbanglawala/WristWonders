import React from 'react'
import Navbar from '../../Components/Navbar'
import ProductDetails from '../../Components/Products/ProductDetails'
const Product = () => {
  
  return (
    <div>
      <Navbar />
      <div className="hero bg-base-0 min-h-[80vh]">
        <ProductDetails/>
      </div>

    </div>
  )
}

export default Product
