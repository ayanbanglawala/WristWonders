import React from 'react'
import Navbar from '../../Components/Navbar'
import ProductNav from '../../Components/Products/ProductNav'
import Card from '../../Components/Card'
import Footer from '../../Components/Footer'

const ProductsList = () => {
  return (
    <div>
        <Navbar/>
        <ProductNav/>
        <div className="container mx-auto my-5 flex flex-wrap justify-center gap-6 w-[100vw]">
            <Card/>
        </div>
        <Footer/>
    </div>
  )
}

export default ProductsList