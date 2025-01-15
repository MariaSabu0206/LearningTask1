import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 5000,
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
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
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized! Redirecting to login...');
            localStorage.removeItem('authToken'); 
            window.location.href = '/login';  
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
