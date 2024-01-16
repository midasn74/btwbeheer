import axios from 'axios';
import jwt_decode from 'jwt-decode';

const fetchData = async (quotationId) => {
    const token = localStorage.getItem('token');
    const companyId = jwt_decode(token).sub;

    if (!token || !companyId) {
        // Redirect to the login page
        window.location.href = '/login';
    }
    
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/quotations/${quotationId}`, {
            headers: {
                'Authorization': token,
            }
        });

        console.log(response.data)
        return response.data;
    } catch (error) {
        if (error.response.status === 404) {
            return [];
        }
        console.error('Fetching products failed:', error);
    }
};

export default fetchData;