import apiClient from './apiClient';

const usersService = {
  /**
   * Fetch all users
   * @param {Object} params - Filters and pagination
   */
  fetchUsers: async (params = {}) => {
    // Remove 'all' values from filters so backend doesn't try to match them literally
    const cleanParams = { ...params };
    if (cleanParams.role === 'all') delete cleanParams.role;
    if (cleanParams.status === 'all') delete cleanParams.status;
    
    const response = await apiClient.get('/users', { params: cleanParams });
    return response.data;
  },

  /**
   * Fetch a single user by ID
   * @param {string|number} id 
   */
  fetchUserById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Create a new user
   * @param {Object} userData 
   */
  createUser: async (userData) => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },

  /**
   * Update an existing user
   * @param {string|number} id 
   * @param {Object} data 
   */
  updateUser: async (id, data) => {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  },

  /**
   * Update user status (e.g., active, suspended)
   * @param {string|number} id 
   * @param {string} status 
   */
  updateUserStatus: async (id, status) => {
    const response = await apiClient.patch(`/users/${id}/status`, { status });
    return response.data;
  },

  /**
   * Delete a user
   * @param {string|number} id 
   */
  deleteUser: async (id) => {
    await apiClient.delete(`/users/${id}`);
    return id;
  }
};

export default usersService;
