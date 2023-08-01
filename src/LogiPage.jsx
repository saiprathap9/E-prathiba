import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LogiPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    try {
      const response = await fetch('https://test.e-prathibha.com/apis/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const { status, data } = await response.json();
      console.log(status)
      console.log(data)
      if (status === 200) {
        const { Id, Token } = data;
        console.log(Id);
        console.log(Token);
        navigate('/Fexam', {
          state: {
            id: Id,
            token: Token,
          },
        });
        setEmail('');
        setPassword('');
        setSuccessMessage('');
        
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid email or password');
    }
  };
  let Id,Token;
  

 

  return (
    <div className="center">
      <center>
     
      
      {errorMessage && <p className="successmsg">{errorMessage}</p>}
      {successMessage && <p className="successmsg">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          className="log"
          type="email"
          id="email"
          name="username"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <br/>
        <br/>
        <label htmlFor="password">Password:</label>
        <input
        className="log"
        id="password"
        type="password"
        name="password"
        value={password}
        placeholder="Enter your password"
       onChange={(e) => setPassword(e.target.value)}
       required autoComplete="current-password"/>
<br/>
        <br/>
        <div className="button-container-log-in">
          <button type="submit">Login</button>
          <br/>
          <br/>
          <Link to="/register" className="remove">
                Register
              </Link>
              
        </div>
      </form>
      </center>
    </div>
  );
};

export default LogiPage ;