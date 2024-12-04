import axios from 'axios';
import React, { useState } from 'react';
import './App.css'
import Home from './pages/Home/Home';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import ForgotPassword from './pages/Authentication/ForgetPassword';
import ProductsList from './pages/Products Listing/ProductsList';
import Product from './pages/Products Listing/Product';
import ViewCart from './pages/Cart/ViewCart';
import AddressSelect from './pages/Cart/AddressSelect';
import Payment from './pages/Checkout/Payment';
import {Toaster} from 'react-hot-toast';

import { Routes, Route, Navigate } from "react-router-dom"
import AddProduct from './pages/Dashboard/AddProduct';
import { useAuthContext } from './Context/AuthContext';
import Orders from './pages/Checkout/Orders';
import Profile from './pages/Profile/Profile';

function App() {
  const {authUser} = useAuthContext();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={authUser ? <ViewCart /> : <Navigate to="/login" />} />
        <Route path="/address" element={authUser ? <AddressSelect /> : <Navigate to="/login" />} />
        <Route path="/payment" element={authUser ? <Payment /> : <Navigate to="/login" />} />
        <Route path="/dashboard/addproduct" element={<AddProduct />} />
        <Route path="/orders" element={authUser ? <Orders /> :<Navigate to="/login"/>} />
        <Route path="/profile" element={authUser ? <Profile /> :<Navigate to="/login"/>} />
      </Routes>
      <div><Toaster /></div>
    </div>
  )
}

export default App
