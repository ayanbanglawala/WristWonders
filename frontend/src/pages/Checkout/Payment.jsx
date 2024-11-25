import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import useGetCartItems from '../../Hooks/useGetCartItems';

const Payment = () => {
    const { loading, cartItems, getCartItems } = useGetCartItems();

    useEffect(() => {
        // Fetch cart data when the component mounts
        getCartItems();
    }, [getCartItems]);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const calculateTotal = () => {
        // Calculate total amount directly from cartItems
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const createRazorpayOrder = (amount) => {
        const data = JSON.stringify({
            amount: amount * 100,
            currency: 'INR',
        });

        const config = {
            method: 'post',
            url: 'http://localhost:5001/api/payments/initiate',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer APIKEY`,
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(response.data);
                handleRazorpayScreen(response.data.amount, response.data.order_id);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleRazorpayScreen = async (amount, order_id) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
            alert('Razorpay SDK failed to load.');
            return;
        }

        const options = {
            key: 'rzp_live_yZoEMCF1nzkO4k', // Replace with your Razorpay key
            amount: amount,
            currency: 'INR',
            name: 'WristWonders',
            description: 'Payment Gateway',
            image: 'https://www.shutterstock.com/image-vector/watches-frame-logo-design-watch-260nw-2331743355.jpg',
            order_id: order_id,
            handler: function (response) {
                console.log('Payment successful', response);
            },
            prefill: {
                name: 'WristWonders',
                email: 'ayanchhipa2278@gmail.com',
            },
            theme: { color: '#F4C430' },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex justify-center bg-gray-100 p-4">
                <div className="w-full md:w-[50%] flex flex-col justify-between bg-gray-100">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                        {!loading && cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between items-center bg-white shadow-md p-4 rounded-md mb-2"
                                >
                                    <div>
                                        <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                        <p className="text-gray-600">Price: ₹{item.product.price}</p>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="text-gray-800 font-bold">
                                        ₹{item.product.price * item.quantity}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full md:w-[50%] bg-white shadow-md p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Total</h2>
                            <p className="text-xl font-bold">₹{calculateTotal()}</p>
                        </div>
                        <button
                            onClick={() => createRazorpayOrder(calculateTotal())}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md text-lg font-semibold"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;
