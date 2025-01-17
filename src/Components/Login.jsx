import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './AxiosInstance'; 
import '../CSS/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
        // expiresInMins: 30,
      });

      const data = response.data;
      localStorage.setItem('email', email);
      console.log(data , "data");
      console.log(response , "response");
      

      if (response.status === 201 && data) {
        console.log('Login successful');
        localStorage.setItem('Token', data.access_token);
        navigate('/dashboard', { state: { message: 'User logged in successfully!' } });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Invalid email or password');
      } else {
        setError('Something went wrong. Please try again later.');
      }
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="logincontainer">
      <h1 className="title text-center mb-4">Login Form</h1>
      <Form className='form' onSubmit={handleSubmit}>
        <Form.Group className="efield mb-3" controlId="formGroupEmail">
          <Form.Label className="loginlabel">Email</Form.Label>
          <Form.Control 
            className='inputfield'
            type="text"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="pfield mb-3" controlId="formGroupPassword">
          <Form.Label className="loginlabel">Password</Form.Label>
          <Form.Control 
            className='inputfield'
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
  );
};

export default Login;
