import React, { createContext, useEffect, useState } from 'react';
// import axios from 'axios';
import axiosInstance from './AxiosInstance';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  
  const hasUserData = () => {
    return localStorage.getItem('userData') !== null;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers, hasUserData }}>
      {children}
    </UserContext.Provider>
  );
};
