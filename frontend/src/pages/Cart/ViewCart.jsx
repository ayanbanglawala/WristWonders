import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import CartCard from '../../Components/Cart/CartCard';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const ViewCart = () => {
  const { cartItemsAll } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate the total amount dynamically based on `cartItemsAll`
  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = cartItemsAll.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [cartItemsAll]); // Recalculate when `cartItemsAll` changes



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
            {cartItemsAll.length > 0 ? (
              cartItemsAll.map((item, index) => {
                // Safeguard for item.product
                const product = item.product || {};

                return (
                  <CartCard
                    key={product._id || index} // Use a fallback key if _id is not present
                    productId={product._id}
                    img={product.images ? product.images[0] : ''} // Safeguard for images array
                    name={product.name || 'Unknown Product'}
                    quantity={item.quantity || 0}
                    price={product.price || 0}
                    brand={product.brand || 'Unknown Brand'}
                  />
                );
              })
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}

          </div>

          {/* Total Section */}
          {cartItemsAll.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Total Amount</h2>
                <p className="text-xl font-bold text-green-600">
                  ₹{totalAmount}
                </p>
              </div>
              <Link to="/address">
                <button className="btn bg-blue-500 text-white hover:bg-blue-600 w-full mt-4">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
