import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import UserCrud from './UserCrud';
import UserDetail from './UserDetail';
import Reports from './Reports';
import Growth from './Growth'
import NotFound from './NotFound';
import { UserContext } from './UserContext';
import ToastProvider from './ToastProvider';

const ProtectedRoutes = () => {
  
  const { hasUserData } = useContext(UserContext);

  if (!hasUserData()) {
    return <Navigate to="/login" />;
  } 
  

  return (
    <ToastProvider>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<UserCrud />} />
      <Route path="/user/:userId" element={<UserDetail />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/growth" element={<Growth/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </ToastProvider>
  );
};

export default ProtectedRoutes;