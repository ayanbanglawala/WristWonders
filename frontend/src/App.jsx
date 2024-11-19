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

import { Routes, Route, Navigate } from "react-router-dom"

function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/allproducts" element={<ProductsList />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<ViewCart />} />
        <Route path="/address" element={<AddressSelect />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  )
}

export default App
