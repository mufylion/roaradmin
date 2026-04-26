import apiClient from './apiClient';

const contentService = {
  /**
   * Fetch content items (pages, blog posts, media)
   * @param {string} type - 'page', 'post', or 'media'
   */
  fetchContent: async (type) => {
    const response = await apiClient.get('/content', { params: { type } });
    return response.data;
  },

  /**
   * Create new content
   * @param {string} type - 'page', 'post', or 'media'
   * @param {Object} data - Content data
   */
  createContent: async (type, data) => {
    const response = await apiClient.post('/content', { ...data, type });
    return response.data;
  },

  /**
   * Update existing content
   * @param {string} id - Content ID
   * @param {Object} data - Updated content data
   */
  updateContent: async (id, data) => {
    const response = await apiClient.put(`/content/${id}`, data);
    return response.data;
  },

  /**
   * Delete content
   * @param {string} id - Content ID
   */
  deleteContent: async (id) => {
    const response = await apiClient.delete(`/content/${id}`);
    return response.data;
  }
};

export default contentService;
