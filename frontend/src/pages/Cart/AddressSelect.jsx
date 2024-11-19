import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';

const AddressSelect = () => {
  // Example addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Ayan Banglawala',
      phone: '1234567890',
      address: '123, Main Street, Ahmedabad, Gujarat, 380001',
    },
    {
      id: 2,
      name: 'John Doe',
      phone: '9876543210',
      address: '456, Park Avenue, Mumbai, Maharashtra, 400001',
    },
  ]);

  // Form state for adding a new address
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Combine address fields into a single string
    const fullAddress = `${newAddress.street}, ${newAddress.city}, ${newAddress.state}, ${newAddress.country}, ${newAddress.zipCode}`;

    // Add the new address to the state
    setAddresses((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: newAddress.name,
        phone: newAddress.phone,
        address: fullAddress,
      },
    ]);

    // Reset the form
    setNewAddress({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Page Header */}
        <h1 className="text-2xl font-bold mb-6 text-center">Select Delivery Address</h1>

        {/* Address List */}
        <div className="space-y-4 mb-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-md flex justify-between items-start"
            >
              <div>
                <h2 className="font-semibold text-lg">{addr.name}</h2>
                <p className="text-sm text-gray-600">{addr.phone}</p>
                <p className="text-sm text-gray-600">{addr.address}</p>
              </div>
              <button className="btn bg-blue-500 hover:bg-blue-600 text-white btn-sm">
                Deliver Here
              </button>
            </div>
          ))}
        </div>

        {/* Add New Address */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Address</h2>
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
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={newAddress.phone}
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
            >
              Save Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressSelect;
