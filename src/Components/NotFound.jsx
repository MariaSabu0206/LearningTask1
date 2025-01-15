import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' , marginRight:'250px' }}>
      <h1 style={{ fontSize: '3rem', color: '#ff4c4c' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={handleGoBack}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '1rem',
          color: '#fff',
          backgroundColor: 'rgb(247 83 83)',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
