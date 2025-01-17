import './CSS/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './Components/UserContext';
import ProtectedRoutes from './Components/ProtectedRoutes';

function App() {
  return (
    <UserProvider>
      <Router>
        <ProtectedRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
