import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(null);

    try {
   
      const response = await axios.post('https://dummyjson.com/user/login', {
        username,
        password,
        expiresInMins: 30,
      });

      const data = response.data;
      console.log(data);

      if (response.status === 200 && data) {
        console.log('Login successful');
        localStorage.setItem('userData', JSON.stringify(data));
        navigate('/dashboard', { state: { message: 'User logged in successfully!' } });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Invalid username or password');
      } else {
        setError('Something went wrong. Please try again later.');
      }
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <div className="logincontainer">
        <h1 className="title text-center mb-4">Login Form</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="efield mb-3" controlId="formGroupEmail">
            <Form.Label className="loginlabel">UserName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="pfield mb-3" controlId="formGroupPassword">
            <Form.Label className="loginlabel">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <button className="loginbutton" type="submit">
            Login
          </button>
          {error && <div className="alert alert-danger">{error}</div>}
        </Form>
      </div>
    </>
  );
};

export default Login;
