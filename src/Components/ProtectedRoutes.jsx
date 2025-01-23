import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
// import UserCrud from './UserCrud';
import UserDetail from './UserDetail';
import Reports from './Reports';
import Growth from './Growth';
import NotFound from './NotFound';
import MainPage from './MainPage';
// import ProductPage from './ProductPage';
import ProductDetailPage from './ProductDetailPage';
import ProductDataPage from './ProductDataPage';
import UserDataPage from './UserDataPage';
import ProductGrid from './ProductGrid';

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainPage />}>
        <Route path="dashboard" element={<Dashboard />} />
        {/* <Route path="users" element={<UserCrud />} /> */}
        <Route path="users" element={<UserDataPage />} />
        <Route path="user/:userId" element={<UserDetail />} />
        <Route path="reports" element={<Reports />} />
        <Route path="growth" element={<Growth />} />
        {/* <Route path="products" element={<ProductPage />} /> */}
        <Route path="products" element={<ProductDataPage />} />
        <Route path="product/:productId" element={<ProductDetailPage/>} />
        <Route path="productgrid" element={<ProductGrid/>} />
      </Route>
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProtectedRoutes;
