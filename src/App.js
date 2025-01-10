import './CSS/App.css';
import Growth from './Components/Growth';
import Home from './Components/Home';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import UserCrud from './Components/UserCrud';
import Header from './Components/Header';
import { useState } from 'react';
import UserDetail from './Components/UserDetail';
import { UserProvider } from './Components/UserContext';

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const location = useLocation(); 
  const shouldShowHeader = location.pathname !== '/';

  return (
    <>
      {isAuthenticated() && shouldShowHeader && (
        <Header onSidebarToggle={handleSidebarToggle} />
      )}

      <div
        className="main-content"
        style={{
          marginLeft: isSidebarOpen ? '250px' : '0',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/" />} />
          <Route path="/home/growth" element={isAuthenticated() ? <Growth /> : <Navigate to="/" />} />
          <Route path="/home/users" element={isAuthenticated() ? <UserCrud /> : <Navigate to="/" />} />
          <Route path="/user/:userId" element={isAuthenticated() ? <UserDetail /> : <Navigate to="/" />} />
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
