import axios from 'axios';

/**
 * API Service
 * Axios instance configured for backend API calls
 * Automatically attaches JWT token from localStorage to requests
 */

// Base URL for backend API
// Uses environment variable if available, otherwise defaults to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Automatically attaches JWT token to all requests
 */
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles common errors (401, 403, etc.)
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('authState');
      
      // Redirect to login if not already on login page
      if (!window.location.pathname.includes('/login')) {
        // Get role from current path or use default
        const path = window.location.pathname;
        const rolePath = path.split('/')[1] || 'login';
        window.location.href = `/${rolePath}`;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
