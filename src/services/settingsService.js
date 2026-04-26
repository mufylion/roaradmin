import apiClient from './apiClient';

const settingsService = {
  /**
   * Fetch all system settings
   */
  fetchSettings: async () => {
    const response = await apiClient.get('/settings');
    return response.data;
  },

  /**
   * Update system settings
   * @param {Array} updates - Array of { key, value } pairs
   */
  updateSettings: async (updates) => {
    const response = await apiClient.put('/settings', { settings: updates });
    return response.data;
  }
};

export default settingsService;
