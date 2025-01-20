import React, { createContext, useCallback, useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(() => {
    
    const savedUser = localStorage.getItem('User');
    return savedUser ? JSON.parse(savedUser) : null;
  }); 
  const [token, setToken] = useState(() => localStorage.getItem('Token') || null);

  const hasToken = useCallback(() => !!token, [token]);

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

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('User'); 
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
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
  }, [hasToken, token]);

  return (
    <UserContext.Provider value={{ user, setUser, users, setUsers, hasToken, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};
