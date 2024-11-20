import React, { useState } from 'react';
import useUpload from '../../Hooks/useUpload';


const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        description: '',
        stock: '',
        category: '',
    });
    const [image, setImage] = useState('');

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImage(file);
        console.log(file);
    }
    // const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const {loading, upload} = useUpload();
    const handleSubmit = (e) => {
        e.preventDefault();
        upload(formData, image)
    };

    return (
        <div className="flex min-h-[80vh] lg:min-h-[100vh] flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            {loading && (
                <div className="overlay">
                    <span className="loading loading-spinner loading-lg bg-blue-600"></span>
                </div>
            )}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Wrist Wonders"
                    src={`http://localhost:5001/uploads/2f4a3ebbca36160f1126e651436d2f98`}
                    className="mx-auto h-14 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Add New Product
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                            Product Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                        />
                    </div>

                    {/* Brand */}
                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-900">
                            Brand
                        </label>
                        <input
                            id="brand"
                            name="brand"
                            type="text"
                            required
                            value={formData.brand}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-900">
                            Price
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="3"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                        ></textarea>
                    </div>

                    {/* Stock */}
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-900">
                            Stock
                        </label>
                        <input
                            id="stock"
                            name="stock"
                            type="number"
                            required
                            value={formData.stock}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                        />
                    </div>

                    {/* Images */}
                    <div>
                        <label htmlFor="images" className="block text-sm font-medium text-gray-900">
                            Image URLs (Comma-separated)
                        </label>
                        <input
                            id="images"
                            name="images"
                            type="file"
                            required
                            value={formData.image}
                            onChange={handleImageChange}
                            className="file-input w-full max-w-xs"
                        />
                    </div>

                    {/* Categories */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-900">
                            Categories (Comma-separated)
                        </label>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            required
                            value={formData.category}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;

