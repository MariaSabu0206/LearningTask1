import React, { useContext } from 'react';
import {  Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import UserCrud from './UserCrud';
import UserDetail from './UserDetail';
import Reports from './Reports';
import Growth from './Growth';
import NotFound from './NotFound';
import MainPage from './MainPage';
import { UserContext } from './UserContext';

const ProtectedRoutes = () => {
  const { hasToken } = useContext(UserContext);
  return (
    <Routes>
      
      <Route path="/login" element={
        hasToken() ? <Navigate to="/dashboard" replace /> : 
        <Login />} />
     
      <Route path="/" element={<MainPage />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserCrud />} />
        <Route path="user/:userId" element={<UserDetail />} />
        <Route path="reports" element={<Reports />} />
        <Route path="growth" element={<Growth />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
