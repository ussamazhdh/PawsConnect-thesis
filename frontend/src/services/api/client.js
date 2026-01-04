import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        if (user?.jwtdto?.accessToken) {
          config.headers.Authorization = `Bearer ${user.jwtdto.accessToken}`;
        }
      } catch (error) {
        console.error('Error parsing userInfo from localStorage:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Axios wraps the response, so we need to check response.data
    const data = response.data;
    
    // If response has ApiResponse wrapper, return the whole object
    if (data && typeof data === 'object' && 'success' in data) {
      if (data.success) {
        // Return the ApiResponse object so the caller can access .data
        return data;
      } else {
        // Handle API error response
        const errorMessage = data.message || 'An error occurred';
        toast.error(errorMessage);
        return Promise.reject(new Error(errorMessage));
      }
    }
    // If no wrapper, return data as-is
    return data || response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const errorData = error.response.data;

      let errorMessage = 'An error occurred';

      if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (typeof errorData === 'string') {
        errorMessage = errorData;
      } else if (errorData?.error) {
        errorMessage = errorData.error;
      }

      switch (status) {
        case 401:
          // Unauthorized - but don't redirect if we're already on login page
          if (window.location.pathname !== '/login') {
            localStorage.removeItem('userInfo');
            toast.error('Session expired. Please login again.');
            window.location.href = '/login';
          }
          break;
        case 403:
          toast.error('You do not have permission to perform this action.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 400:
          // Don't show toast for 400 errors - let the component handle it
          // toast.error(errorMessage);
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(errorMessage);
      }

      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Request made but no response received
      toast.error('Network error. Please check your connection.');
      return Promise.reject(new Error('Network error'));
    } else {
      // Something else happened
      toast.error('An unexpected error occurred.');
      return Promise.reject(error);
    }
  }
);

export default apiClient;

