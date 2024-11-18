import axios from 'axios';
import React, { useState } from 'react';
import './App.css'
import Razorpay from './razorpay';
import Home from './pages/Home/Home';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import ForgotPassword from './pages/Authentication/ForgetPassword';
import ProductsList from './pages/Products Listing/ProductsList';

function App() {
  

  return (
    <div>
      <ProductsList/>
    </div>
  )
}

export default App
