import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from './AxiosInstance';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('User');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('Token') || null);
  const navigate = useNavigate();
  const location = useLocation();

  const hasToken = useCallback(() => !!token, [token]);

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('User');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    if (hasToken()) {
      if (location.pathname === '/login') {
        navigate('/dashboard');
      }
    } else {
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    }

    const fetchUsers = async () => {
      if (!hasToken()) return;
      try {
        const response = await axiosInstance.get('/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [hasToken, location.pathname, token, navigate]);


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        hasToken,
        logout,
        token,
        setToken
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
