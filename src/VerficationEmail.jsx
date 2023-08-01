import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const VerificationEmail = () => {
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState('');
  const location = useLocation();
  const otp = location.state ? location.state.otp : '';
  const [lastValue, setLastValue] = useState('');
  

 console.log(otpCode)
  useEffect(() => {
    if (otp) {
      const displaycode = otp;
      const value = displaycode[displaycode.length - 1];
      setLastValue(value);
    }
  }, [otp]);
   console.log(lastValue)
  const otpChange = (e) => {
    setOtpCode(e.target.value);
  };
  const handlverify=async(e)=>{
    e.preventDefault()
    await verify()
  }
  const verify = async () => {
    try {
      const response = await axios.post(
        "https://test.e-prathibha.com/apis/verifyEmail",
       
        
          
          { reg_code:otpCode}
          
        
      );
     
  
      console.log(response);
      
      console.log(response.data);
  
      if (response.status === 200) {
        navigate('/');
      } else {
        console.log('Email verification failed');
      }
    } catch (error) {
      console.log('Error occurred during email verification:', error.message);
    }
  };
  
 

  return (
    <div className="center">
      <center>
        <form onSubmit={handlverify}>
        

        <input
          type="text"
          className="regCode"
          placeholder="Enter Reg Code"
          onChange={otpChange}
        />

        <button type="submit" className="btn btn-primary hh" >
          Verify
        </button>
        <br />
        <div className="center1">
          <button type="submit" className="btn btn-primary hh1">
            <Link to="/" className="remove">
              Login
            </Link>
          </button>
        </div>
        {otp && <div id="otpElement">{lastValue}</div>}
        </form>
      </center>
    </div>
  );
};

export default VerificationEmail;
