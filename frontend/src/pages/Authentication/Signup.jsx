import React, { useState } from 'react'
import logo from '../../assets/Images/Logo.png'
import useSignup from '../../Hooks/useSignup.js'

const Signup = () => {
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    phone: '',
    email: '',
    password: '',
    cPassword: '',
  });

  const { loading, signup } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };
  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      {
        loading && (<div className="overlay">
          <span className="loading loading-spinner loading-lg bg-blue-600"></span>
        </div>)
      }
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Wrist Wonders" src={logo} className="mx-auto h-14 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create Your Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="fName" className="block text-sm font-medium text-gray-900">
              First Name
            </label>
            <div className="mt-0">
              <input
                id="fName"
                name="fName"
                type="text"
                required
                value={formData.fName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Enter your first name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="lName" className="block text-sm font-medium text-gray-900">
              Last Name
            </label>
            <div className="mt-0">
              <input
                id="lName"
                name="lName"
                type="text"
                required
                value={formData.lName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <div className="mt-0">
              <input
                id="phone"
                name="phone"
                type="number"
                required
                autoComplete="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <div className="mt-0">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-0">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cPassword" className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="mt-0">
              <input
                id="cPassword"
                name="cPassword"
                type="password"
                required
                value={formData.cPassword}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already Member of in Wrist Wonders?{' '}
          <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
            Login here
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
