import axios from 'axios';
import jwt_decode from 'jwt-decode';

const fetchData = async (setQuotations) => {
    const token = localStorage.getItem('token');
    const companyId = jwt_decode(token).sub;

    if (!token || !companyId) {
        // Redirect to the login page
        window.location.href = '/login';
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/quotations/company/${companyId}`, {
            headers: {
                'Authorization': token,
            }
        });

        setQuotations(response.data);
    } catch (error) {
        if (error.response.status === 404) {
            setQuotations(null);
        }
        console.error('Fetching quotations failed:', error);
    }
};

export default fetchData;