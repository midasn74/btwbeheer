import axios from 'axios';
import jwt_decode from 'jwt-decode';

const fetchData = async (setRelations) => {
    const token = localStorage.getItem('token');
    const companyId = jwt_decode(token).sub;

    if (!token || !companyId) {
        // Redirect to the login page
        window.location.href = '/login';
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/relations/company/${companyId}`, {
            headers: {
                'Authorization': token,
            }
        });

        setRelations(response.data);
    } catch (error) {
        if (error.response.status === 404) {
            setRelations(null);
        }
        console.error('Fetching relations failed:', error);
    }
};

export default fetchData;