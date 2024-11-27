import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import useGetCartItems from '../../Hooks/useGetCartItems';
import success from "../../assets/Images/Success.png";
import { Link } from 'react-router-dom';
import usePlaceOrder from '../../Hooks/usePlaceOrder';

const Payment = () => {
    const { loading, cartItems, getCartItems } = useGetCartItems();
    const [paymentSuccess, setPaymentSuccess] = useState(false); // Default to false
    const {placeOrder} = usePlaceOrder();
    useEffect(() => {
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
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const createRazorpayOrder = (amount) => {
        const data = JSON.stringify({
            amount: amount * 100,
            currency: 'INR',
        });

        const config = {
            method: 'post',
            url: '/api/payments/initiate',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer APIKEY`,
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
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
            key: 'rzp_live_yZoEMCF1nzkO4k',
            amount: amount,
            currency: 'INR',
            name: 'WristWonders',
            description: 'Payment Gateway',
            image: 'https://www.shutterstock.com/image-vector/watches-frame-logo-design-watch-260nw-2331743355.jpg',
            order_id: order_id,
            handler: function (response) {
                console.log('Payment successful', response);
                setPaymentSuccess(true); // Show popup on success
                placeOrder();
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

            {/* Payment Success Popup */}
            {paymentSuccess && (
                <div className="overlay">

                    <dialog id="my_modal_1" className="modal" open>
                        <div className="modal-box flex justify-center items-center flex-col">
                            <img src={success} alt="" width={100} />
                            <h3 className="font-bold text-lg">Payment Successful!</h3>
                            <p className="py-4">Thank you for your purchase.</p>
                            <div className="modal-action">
                                <Link to="/orders">
                                    <button
                                        className="btn bg-green-500 text-white hover:bg-green-600"
                                        onClick={() => setPaymentSuccess(false)}
                                    >
                                        View Orders
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}
        </>
    );
};

export default Payment;
