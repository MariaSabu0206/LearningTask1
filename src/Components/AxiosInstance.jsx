import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1',
    timeout: 5000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token'); 
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
            localStorage.removeItem('Token'); 
            window.location.href = '/login';  
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
