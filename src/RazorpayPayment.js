
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Razorpay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentGatewayResponse, setPaymentGatewayResponse] = useState(null);
  const [razorpayResponse, setRazorpayResponse] = useState(null);
  const Id = location.state.id;
  const tokenu = location.state.token;
  const amount = location.state.amount;
  console.log('amount', amount);

  useEffect(() => {
    const yearValue = amount === 499 ? '' : '1';
    console.log('yearvalue', yearValue);
    const Payment = 'https://test.e-prathibha.com/apis/test_paymentGateway';
    const requestData = {
      packagearr: {
        '8': '1',
      },
      packagetype: 'RAZORPAY',
      year: yearValue,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        tokenu: tokenu,
        Id: Id,
        server_key: '3w99V63pW7tJ7vavGXtCKo8cp',
      },
      body: JSON.stringify(requestData),
    };

    fetch(Payment, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPaymentGatewayResponse(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [tokenu, Id, amount]);

  const handlePayment = () => {
    const options = {
      key: 'rzp_test_LJbypHDTeZsLaE',
      currency: 'INR',
      amount: amount * 100,
      name: 'Sai Prathap',
      description: 'e-prathibha premium packages',
      prefill: {
        name: 'Enter your name',
      },
      notes: {
        address: 'Hyderabad',
      },
      handler: function (response) {
        if (response.error) {
          console.log('Payment error:', response.error);
          alert('Payment failed!');
        } else {
          console.log('Payment success:', response);
          setRazorpayResponse(response);
          alert('Payment successful!');
        }
      },
      modal: {
        ondismiss: function () {
          alert('Payment canceled!');
          navigate('/Packages', {
            state: {
              id: Id,
              token: tokenu,
            },
          });
        },
      },
    };

    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      document.body.appendChild(script);
    };

    loadRazorpay();
  };

  useEffect(() => {
    if (razorpayResponse && paymentGatewayResponse) {
      const apiUrl = 'https://test.e-prathibha.com/apis/success';
      const requestData = {
        orderId: paymentGatewayResponse.data.order_id,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          tokenu: tokenu,
          Id: Id,
          serverkey: '3w99V63pW7tJ7vavGXtCKo8cp',
        },
        body: JSON.stringify(requestData),
      };

      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          // Handle success response
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [razorpayResponse, paymentGatewayResponse, tokenu, Id]);
  const handleexam = () => {
    navigate('/Fexam', {
      state: {
        id: Id,
        token: tokenu,
      },
    });
  };

  return (
    <div>
      <button onClick={handlePayment}>Proceed</button>
      <br/>
      <button onClick={handleexam}>Forward</button>
     
    </div>
    
  );
};

export default Razorpay;

