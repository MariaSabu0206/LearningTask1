import React, { useContext, useState } from 'react';
import { Navigate, Route, Routes, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Dashboard from './Dashboard';
import UserCrud from './UserCrud';
import UserDetail from './UserDetail';
import Reports from './Reports';
import Growth from './Growth';
import NotFound from './NotFound';
import { UserContext } from './UserContext';
import ToastProvider from './ToastProvider'

const ProtectedRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { hasToken } = useContext(UserContext);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isNotFound =  location.pathname !== '/login' && location.pathname !== '/dashboard' && location.pathname !== '/users' && location.pathname !== '/user/:userId' && location.pathname !== '/growth' && location.pathname !== '/reports'

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <>
      <Routes>
          <Route path="/login"element={ hasToken() ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/*" element={ hasToken() ? (
              <>
                {!isLoginPage && !isNotFound  && (
                  <Header onSidebarToggle={handleSidebarToggle} />
                )}
                <div
                  className="main-content"
                  style={{
                    marginLeft: isSidebarOpen ? '250px' : '0',
                    transition: 'margin-left 0.3s ease',
                  }}
                >
                  <ToastProvider>
                     <Outlet />
                  </ToastProvider>
                </div>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserCrud />} />
            <Route path="user/:userId" element={<UserDetail />} />
            <Route path="reports" element={<Reports />} />
            <Route path="growth" element={<Growth />} />
            <Route path="*" element={<NotFound />} />  
        </Route>
      </Routes>
  </>
  );
};

export default ProtectedRoutes;
