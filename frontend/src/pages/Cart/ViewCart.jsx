import React from "react";
import Navbar from "../../Components/Navbar";
import CartCard from "../../Components/Cart/CartCard";
import { Link } from "react-router-dom";

const ViewCart = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Cart Content */}
            <div className="flex justify-center p-4">
                <div className="w-full max-w-4xl">
                    {/* Page Header */}
                    <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
                        My Cart
                    </h1>

                    {/* Cart Cards */}
                    <div className="space-y-4">
                        {/* Example Cart Cards */}
                        <CartCard img="https://via.placeholder.com/150" />
                        <CartCard img="https://via.placeholder.com/150" />
                        <CartCard img="https://via.placeholder.com/150" />
                    </div>

                    {/* Total Section */}
                    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Total Amount</h2>
                            <p className="text-xl font-bold text-green-600">₹2997</p>
                        </div>
                        <Link to="/address"><button className="btn bg-blue-500 text-white hover:bg-blue-600 w-full mt-4">
                            Proceed to Checkout
                        </button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCart;
