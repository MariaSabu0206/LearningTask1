import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [users, setUsers] = useState([]);
  
  const hasToken = () => {
    return localStorage.getItem('Token') !== null;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data);
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers, hasToken }}>
      {children}
    </UserContext.Provider>
  );
};
