import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');

    return isAuthenticated ? (
        children // Render the protected component(s)
    ) : (
        <Navigate to="/login" replace /> // Redirect to the login page if not authenticated
    );
};

export default ProtectedRoute;
