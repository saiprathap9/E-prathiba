import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://test.e-prathibha.com/apis/register',
        {
          name,
          email,
          phone, 
          password,
          confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);

      setName('');
      setEmail('');
      setPhone(''); 
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('');

      const VerficationEmail = response.data.data.split(' data');
      console.log(VerficationEmail);
    navigate('/Verfication', {state:{ otp: VerficationEmail }});

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('User details already exist.');
      }
      console.error(error);
    }
  };

  return (
    <div>
      <center>
        
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleRegister}>
        <h2>Register page </h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            type="tel"
            placeholder="Phone"
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </center>
    </div>
  );
};

export default Register;
         
