import apiClient from './apiClient';

const dashboardService = {
  /**
   * Fetch dashboard statistics
   */
  fetchStats: async () => {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  },

  /**
   * Fetch recent activity
   */
  fetchRecentActivity: async () => {
    const response = await apiClient.get('/dashboard/activity');
    return response.data;
  }
};

export default dashboardService;
