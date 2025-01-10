import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
   const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        
        setError(null);

        try{
            const response = await fetch( 'https://dummyjson.com/user/login',
                {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({
                    username,
                    password,
                    expiresInMins: 30,
                }),

            } );

        const data = await response.json();
        console.log(data);
        
        if (response.ok && data){
            console.log('Login successful');
            localStorage.setItem('isAuthenticated','true');
            localStorage.setItem('userData', JSON.stringify(data));
            navigate('/home')
        }
        else{
            setError('Invalid username or password')
        }
    } catch (error)
    {
      setError('Something went wrong. Please try again later.')
  }
};


  return (
    <>
     <div className='logincontainer'>
        <h1 className=' title text-center  mb-4'>Login Form</h1>
     <Form onSubmit={handleSubmit}>
      <Form.Group className="efield mb-3" controlId="formGroupEmail">
        <Form.Label className='loginlabel'>UserName</Form.Label>
        <Form.Control 
           type="text" 
           placeholder="Your Username" 
           value={username}
           onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group className="pfield mb-3" controlId="formGroupPassword">
        <Form.Label className='loginlabel'>Password</Form.Label>
        <Form.Control 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      
      <Button className='loginbutton' type='submit'> Login </Button>
      {error && <div className="alert alert-danger">{error}</div>}
    </Form>
    </div>
             
    </>
  )
}

export default Login