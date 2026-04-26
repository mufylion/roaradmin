import apiClient from './apiClient';

const financialsService = {
  /**
   * Fetch aggregated financial stats
   */
  fetchStats: async (period = 'All') => {
    const response = await apiClient.get('/financials/stats', { params: { period } });
    return response.data;
  }
};

export default financialsService;
