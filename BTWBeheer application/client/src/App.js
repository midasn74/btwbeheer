import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './routes/ProtectedRoute';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Logout from './components/Logout';
import Invoicing from './components/Invoicing';
import Relations from './components/Relations';

function App() {
  return (
    <Router>
        <div className='bg-dark text-light pt-5' style={{ height: '100vh' }}>
          <div className='container'>
            <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />

                {/* Public route */}
                <Route path="/logout" element={<Logout />} />

                {/* Protected route */}
                <Route
                    path="/"
                    element = {
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Protected route */}
                <Route
                    path="/Invoicing"
                    element = {
                        <ProtectedRoute>
                            <Invoicing />
                        </ProtectedRoute>
                    }
                />

                {/* Protected route */}
                <Route
                    path="/Relations"
                    element = {
                        <ProtectedRoute>
                            <Relations />
                        </ProtectedRoute>
                    }
                />
            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
