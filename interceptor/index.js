import axios from 'axios';
import Cookies from 'js-cookie';
 
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
 
const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});
 
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('jToken');
        if (token) {
            // config.headers['accessToken'] = token;
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
 
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors, for example, refreshing token, logging out user, etc.
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error, e.g., redirect to login
        }
        return Promise.reject(error);
    }
);
 
export default axiosInstance;