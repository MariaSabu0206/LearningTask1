import './CSS/App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/Login';
import { UserContext, UserProvider } from './Components/UserContext';
import ProtectedRoutes from './Components/ProtectedRoutes';
import { useContext, useState } from 'react';

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { hasUserData } = useContext(UserContext);

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };
  

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isNotFoundPage = location.pathname !== '/login' && location.pathname !== '/dashboard' && location.pathname !== '/users' && location.pathname !== '/user/:userId' && location.pathname !== '/growth' && location.pathname !== '/reports'
  const shouldShowHeader = !isLoginPage && !isNotFoundPage;

  return (
    <>
      {shouldShowHeader && <Header onSidebarToggle={handleSidebarToggle} />}

      <div
        className="main-content"
        style={{
          marginLeft: isSidebarOpen ? '250px' : '0',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Routes>
          <Route path="/login" element={
              hasUserData() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login />
              )
            } />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    
    <UserProvider>
      <Router>
           <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
