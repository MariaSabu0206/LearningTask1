import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import Form from 'react-bootstrap/Form';
import '../CSS/Login.css';
import axiosInstance from './AxiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {setToken,setUser} = useContext(UserContext); 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const result = await login(email, password);
    if (result.success) {
      console.log('Login successful');
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error);
    }
  };
  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { access_token } = response.data; 

      localStorage.setItem('Token', access_token);
      setToken(access_token);

      const userResponse = await axiosInstance.get('/auth/profile', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      localStorage.setItem('User', JSON.stringify(userResponse.data)); 
      setUser(userResponse.data);
      console.log('Logged in user:', userResponse.data); 
      return { success: true, user: userResponse.data };

    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };
    return (
    <div className="logincontainer">
      <h1 className="title text-center mb-4">Login Form</h1>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group className="efield mb-3" controlId="formGroupEmail">
          <Form.Label className="loginlabel">Email</Form.Label>
          <Form.Control
            className="inputfield"
            type="text"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="pfield mb-3" controlId="formGroupPassword">
          <Form.Label className="loginlabel">Password</Form.Label>
          <Form.Control
            className="inputfield"
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
