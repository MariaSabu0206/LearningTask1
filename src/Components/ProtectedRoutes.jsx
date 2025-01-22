import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import UserCrud from './UserCrud';
import UserDetail from './UserDetail';
import Reports from './Reports';
import Growth from './Growth';
import NotFound from './NotFound';
import MainPage from './MainPage';

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainPage />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserCrud />} />
        <Route path="user/:userId" element={<UserDetail />} />
        <Route path="reports" element={<Reports />} />
        <Route path="growth" element={<Growth />} />
      </Route>
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProtectedRoutes;
