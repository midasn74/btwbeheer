const Login = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    window.location.href = '/login';
};

export default Login;