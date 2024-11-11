import axios from 'axios';
import React, { useState } from 'react';
import './App.css'

function App() {
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    })
  }

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 10,
      currency: "INR",
    });

    let config = {
      method: 'post',
      url: 'http://localhost:5001/api/payments/initiate',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_RAZORPAY_API_KEY'
      },
      data: data
    }

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        handleRazorpayScreen(response.data.amount)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleRazorpayScreen = async (amount, order_id) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: "rzp_live_yZoEMCF1nzkO4k", // Replace with your live/test Razorpay key
      amount: amount,
      currency: "INR",
      name: "WristWonders",
      description: "Payment Gateway",
      image: "https://www.shutterstock.com/image-vector/watches-frame-logo-design-watch-260nw-2331743355.jpg",
      order_id: order_id,
      handler: function (response) {
        setResponseId(response.razorpay_order_id);
        setResponseState(response.razorpay_payment_id);
      },
      prefill: {
        name: "WristWonders",
        email: "ayanchhipa2278@gmail.com",
      },
      theme: { color: "#F4C430" },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };



  const paymentFetch = (e) => {
    e.preventDefault();
    const paymentId = e.target.paymentId.value;
    axios.get(`http://localhost:5001/api/payments/${paymentId}`)
      .then((response) => {
        console.log(response.data);
        setResponseState(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <button onClick={() => createRazorpayOrder(100)}>Pay 10 rupees</button>
      {responseId && <p> {responseId}</p>}
      <form onSubmit={paymentFetch}>
        <input type="text" name="paymentId" placeholder="Payment ID" />
        <button type="submit">Fetch Payment</button>
        {
          responseState && (
            <div>
              <ul>
                <li>Amount: {responseState.amount / 100}Rs.</li>
                <li>Currency: {responseState.currency}</li>
                <li>status: {responseState.status}</li>
                <li>Method: {responseState.method}</li>
              </ul>
            </div>
          )
        }
      </form>
    </div>
  )
}

export default App
