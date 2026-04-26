import apiClient from './apiClient';

const authService = {
  /**
   * Login administrator
   * @param {Object} credentials - { email, password }
   */
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('roar_admin_token', response.data.token);
    }
    return response.data;
  },

  /**
   * Logout administrator
   */
  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      localStorage.removeItem('roar_admin_token');
      window.location.href = '/login';
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('roar_admin_token');
  },

  /**
   * Get current admin profile
   */
  getProfile: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }
};

export default authService;
