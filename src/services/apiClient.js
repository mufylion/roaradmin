import axios from 'axios';

// Create axios instance
const apiClient = axios.create({
  baseURL: (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/+$/, '') + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage
    // roaradmin uses 'roar_admin_token' or 'roar_token' as fallback
    const token = localStorage.getItem('roar_admin_token') || localStorage.getItem('roar_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    
    if (response && response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('roar_admin_token');
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
