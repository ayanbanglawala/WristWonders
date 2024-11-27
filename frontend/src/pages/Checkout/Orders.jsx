import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    // Mock data fetched from an API or database
    useEffect(() => {
        const fetchedOrders = [
            {
                _id: '67319703efc0ab53848aa467',
                user: '6721c75e530b47650877e30d',
                orderItems: [
                    {
                        product: '6723b2eda35e992ee97b7e59',
                        quantity: 1,
                        _id: '67319703efc0ab53848aa468',
                    },
                ],
                shippingAddress: {
                    street: 'CCC',
                    city: 'BBB',
                    state: 'AAA',
                    country: 'AMERICAN',
                    zipCode: '380022',
                },
                totalAmount: 1000,
                status: 'Pending',
                paymentStatus: 'Unpaid',
                createdAt: '2024-11-11T05:32:51.802+00:00',
                updatedAt: '2024-11-11T05:32:51.802+00:00',
                __v: 0,
            },
        ];
        setOrders(fetchedOrders);
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>
                    {orders.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {orders.map((order) => (
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
                                            <p
                                                key={index}
                                                className="text-gray-800 flex justify-between"
                                            >
                                                Product ID: {item.product} (x{item.quantity})
                                            </p>
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
                        <p className="text-gray-600 text-center">You have no orders yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Orders;
