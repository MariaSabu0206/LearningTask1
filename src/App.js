import './CSS/App.css';
import { BrowserRouter} from 'react-router-dom';
import { UserProvider } from './Components/UserContext';
import ProtectedRoutes from './Components/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
        <ProtectedRoutes />
    </UserProvider>
    </BrowserRouter>
  );
}

export default App;
