import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import useAddAddress from '../../Hooks/useAddAddress'; // Adjust the path as needed
import useMakePrimary from '../../Hooks/useMakePrimary';

const AddressSelect = () => {
    const [addresses, setAddresses] = useState([]);
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    const [errorAddresses, setErrorAddresses] = useState(null);
    const navigate = useNavigate();
    const { addAddress, loading: addingAddress, error: errorAddingAddress } = useAddAddress();
    const makePrimary = useMakePrimary();
    const [newAddress, setNewAddress] = useState({
        name: '',
        phoneNumber: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
    });

    // Fetch existing addresses
    useEffect(() => {
        const fetchAddresses = async () => {
            setLoadingAddresses(true);
            try {
                const response = await fetch('/api/auth/profile');
                if (!response.ok) {
                    throw new Error('Failed to fetch addresses');
                }
                const data = await response.json();
                setAddresses(data.addresses);
            } catch (err) {
                setErrorAddresses(err.message);
            } finally {
                setLoadingAddresses(false);
            }
        };

        fetchAddresses();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewAddress((prev) => ({ ...prev, [id]: value }));
    };

    const handleDeliver = async (id) => {
        try {
            await makePrimary(id);
            navigate("/payment")
        } catch (error) {
            console.error(error);
        }
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const addedAddress = await addAddress(newAddress);
            setAddresses((prev) => [...prev, addedAddress]); // Update local state
            setNewAddress({
                name: '',
                phoneNumber: '',
                street: '',
                city: '',
                state: '',
                country: '',
                zipCode: '',
            });
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Select Delivery Address</h1>

                {loadingAddresses && <p>Loading addresses...</p>}
                {errorAddresses && <p className="text-red-500">{errorAddresses}</p>}

                <div className="space-y-4 mb-6">
                    {addresses.map((addr) => (
                        <div
                            key={addr._id}
                            className="border border-gray-300 rounded-lg p-4 bg-white shadow-md flex justify-between items-start"
                        >
                            <div>
                                <h2 className="font-semibold text-lg">{addr.name}</h2>
                                <p className="text-sm text-gray-600">{addr.phoneNumber}</p>
                                <p className="text-sm text-gray-600">
                                    {`${addr.street}, ${addr.city}, ${addr.state}, ${addr.country}, ${addr.zipCode}`}
                                </p>
                            </div>

                            <button
                                className="btn bg-blue-500 hover:bg-blue-600 text-white btn-sm"
                                onClick={() => handleDeliver(addr._id)} // Fixed here
                            >
                                Deliver Here
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Add New Address</h2>
                    {errorAddingAddress && <p className="text-red-500">{errorAddingAddress}</p>}
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={newAddress.name}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={newAddress.phoneNumber}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="street">
                                Street
                            </label>
                            <input
                                type="text"
                                id="street"
                                value={newAddress.street}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                placeholder="Enter street address"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="city">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    value={newAddress.city}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    placeholder="Enter city"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="state">
                                    State
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    value={newAddress.state}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    placeholder="Enter state"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="country">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    value={newAddress.country}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    placeholder="Enter country"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="zipCode">
                                    Zip Code
                                </label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    value={newAddress.zipCode}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    placeholder="Enter zip code"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn bg-blue-500 hover:bg-blue-600 text-white w-full"
                            disabled={addingAddress}
                        >
                            {addingAddress ? 'Saving...' : 'Save Address'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddressSelect;
