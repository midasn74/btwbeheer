import axios from 'axios';
import jwt_decode from 'jwt-decode';

const fetchData = async (setCompany) => {
    const token = localStorage.getItem('token');
    const companyId = jwt_decode(token).sub;

    if (!token || !companyId) {
        // Redirect to the login page
        window.location.href = '/login';
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/companies/${companyId}`, {
            headers: {
                'Authorization': token,
            }
        });

        setCompany(response.data);
    } catch (error) {
        console.error('Invalid token');
        // Remove the invalid token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        window.location.href = '/login';
        
        console.error('Login failed:', error);
    }
};

export default fetchData;