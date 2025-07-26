import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';

// Base API URL from environment variable or default to local development
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Create axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage (if available in browser environment)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorResponse = error.response?.data;

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized (could redirect to login or clear auth)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        // Optional: window.location.href = '/login';
      }
    }

    return Promise.reject(errorResponse || error);
  }
);

export default axiosInstance;
