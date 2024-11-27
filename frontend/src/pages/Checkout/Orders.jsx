import React, { useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import useFetchOrders from '../../Hooks/useFetchOrders';

const Orders = () => {
    const { loading, allorders, fetchOrders } = useFetchOrders();

    // Fetch orders when the component mounts
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>

                    {/* Show loading spinner */}
                    {loading ? (
                        <div className="text-center text-gray-600">
                            <p>Loading your orders...</p>
                        </div>
                    ) : allorders.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allorders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-white shadow-md rounded-lg p-6"
                                >
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                                        Order ID: {order._id}
                                    </h2>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-semibold">Order Date:</span>{' '}
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-semibold">Status:</span>{' '}
                                        <span
                                            className={`${
                                                order.status === 'Pending'
                                                    ? 'text-yellow-500'
                                                    : 'text-green-500'
                                            } font-semibold`}
                                        >
                                            {order.status}
                                        </span>
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        <span className="font-semibold">Payment Status:</span>{' '}
                                        <span
                                            className={`${
                                                order.paymentStatus === 'Unpaid'
                                                    ? 'text-red-500'
                                                    : 'text-green-500'
                                            } font-semibold`}
                                        >
                                            {order.paymentStatus}
                                        </span>
                                    </p>
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-gray-800">Shipping Address:</h3>
                                        <p className="text-gray-600">
                                            {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                                            {order.shippingAddress.state}, {order.shippingAddress.country},{' '}
                                            {order.shippingAddress.zipCode}
                                        </p>
                                    </div>
                                    <div className="border-t pt-4">
                                        <h3 className="font-semibold text-gray-800 mb-2">Order Items:</h3>
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="flex justify-between">
                                                <p className="text-gray-800">
                                                    {item.product} (x{item.quantity})
                                                </p>
                                            </div>
                                        ))}
                                        <div className="flex justify-between font-bold text-gray-900 mt-4">
                                            <p>Total Amount:</p>
                                            <p>₹{order.totalAmount}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>You have no orders yet. Start shopping now!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Orders;
