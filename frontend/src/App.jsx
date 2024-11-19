import axios from 'axios';
import React, { useState } from 'react';
import './App.css'
import Razorpay from './razorpay';
import Home from './pages/Home/Home';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import ForgotPassword from './pages/Authentication/ForgetPassword';
import ProductsList from './pages/Products Listing/ProductsList';
import Product from './pages/Products Listing/Product';
import ViewCart from './pages/Cart/ViewCart';
import AddressSelect from './pages/Cart/AddressSelect';
import Payment from './pages/Checkout/Payment';

function App() {
  

  return (
    <div>
      <Payment/>
    </div>
  )
}

export default App
