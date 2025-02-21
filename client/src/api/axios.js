import axios from 'axios';
import { store } from '../store';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch({ type: 'auth/logout' });
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; 