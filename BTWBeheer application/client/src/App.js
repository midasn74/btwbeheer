import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './routes/ProtectedRoute';

import Dashboard from './components/Dashboard';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Invoicing from './components/Invoicing';
import Quoting from './components/Quoting';
import Relations from './components/Relations';
import CreateRelation from './components/CreateRelation';
import CreateInvoice from './components/CreateInvoice';
import CreateQuotation from './components/CreateQuotation';

function App() {
  return (
    <Router>
        <div className='bg-dark text-light pt-5' style={{ minHeight: '100vh' }}>
          <div className='container'>
            <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />

                {/* Public route */}
                <Route path="/register" element={<Register />} />

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
                    path="/Account"
                    element = {
                        <ProtectedRoute>
                            <Account />
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
                    path="/Quoting"
                    element = {
                        <ProtectedRoute>
                            <Quoting />
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

                {/* Protected route */}
                <Route
                    path="/CreateRelation"
                    element = {
                        <ProtectedRoute>
                            <CreateRelation />
                        </ProtectedRoute>
                    }
                />

                {/* Protected route */}
                <Route
                    path="/CreateInvoice"
                    element = {
                        <ProtectedRoute>
                            <CreateInvoice />
                        </ProtectedRoute>
                    }
                />
                
                {/* Protected route */}
                <Route
                    path="/CreateQuotation"
                    element = {
                        <ProtectedRoute>
                            <CreateQuotation />
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
