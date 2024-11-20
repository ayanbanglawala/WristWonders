import React from 'react'
import logo from '../assets/Images/Logo.png'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../Context/AuthContext';
import Logout from './Logout';

const Navbar = () => {
    const { authUser } = useAuthContext();
    console.log(authUser);
    let isAuth = false;
    if (authUser == null) {
        isAuth = true;
    }

    return (
        <>
            <div className="navbar bg-base-100 w-100">
                <div className="navbar-start">
                    <div className="drawer z-50">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="drawer-button"><div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                            </div></label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                <img src={logo} alt="Logo" className="mb-6" />

                                {/* Authentication Section */}
                                {
                                    isAuth && (
                                        <div className="mb-6">
                                            <Link to="/login">
                                                <button className="btn bg-blue-500 hover:bg-blue-600 text-white w-full mb-2">Login</button>
                                            </Link>
                                            <div className="divider">OR</div>
                                            <Link to="/signup">
                                                <button className="btn bg-green-500 hover:bg-green-600 text-white w-full">Sign Up</button>
                                            </Link>
                                        </div>
                                    )
                                }
                                {
                                    !isAuth && (
                                        <div className="mb-6">
                                            <Link to="/profile">
                                                <button className="btn bg-blue-500 hover:bg-blue-600 text-white w-full mb-2">Profile</button>
                                            </Link>
                                            <div className="divider">OR</div>
                                            <Logout/>
                                        </div>
                                    )
                                }

                                {/* Categories Section */}
                                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                                <ul className="menu menu-compact">
                                    <li><a href="#">Men's Watches</a></li>
                                    <li><a href="#">Women's Watches</a></li>
                                    <li><a href="#">Sports Watches</a></li>
                                    <li><a href="#">Luxury Watches</a></li>
                                    <li><a href="#">Smart Watches</a></li>
                                    <li><a href="#">Kids' Watches</a></li>
                                </ul>

                                {/* Additional Sections */}
                                <h3 className="text-lg font-semibold mt-6 mb-4">Quick Links</h3>
                                <ul className="menu menu-compact">
                                    <li><a href="#">Best Sellers</a></li>
                                    <li><a href="#">New Arrivals</a></li>
                                    <li><a href="#">Sale</a></li>
                                    <li><a href="#">Gift Cards</a></li>
                                </ul>

                                {/* Customer Support Section */}
                                <h3 className="text-lg font-semibold mt-6 mb-4">Customer Support</h3>
                                <ul className="menu menu-compact">
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Returns & Exchanges</a></li>
                                    <li><a href="#">Shipping Information</a></li>
                                    <li><a href="#">FAQs</a></li>
                                </ul>

                                {/* Footer Section */}
                                <div className="mt-auto pt-6">
                                    <p className="text-sm text-center">© 2024 WristWonders. All Rights Reserved.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl font-type"><img src={logo} className=' w-[190px] lg:w-[230px]' alt="" /></a>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-70 shadow">
                            <div className="card-body">
                                <label className="input input-bordered flex items-center gap-2">
                                    <input type="text" className="grow" placeholder="Search" />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                            fillRule="evenodd"
                                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                            clipRule="evenodd" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">8 Items</span>
                                <span className="text-info">Subtotal: $999</span>
                                <div className="card-actions">
                                    <Link to="/cart"><button className="btn bg-blue-500 text-white hover:bg-blue-600 btn-block">View cart</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar