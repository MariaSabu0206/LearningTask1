import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Replace the current history state to prevent going back
    navigate('/not-found', { replace: true });
  }, [navigate]);

  const handleGoBack = () => {
    // Redirect the user to the dashboard or another valid route
    navigate('/dashboard', { replace: true });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
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
          backgroundColor: '#f75353',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
