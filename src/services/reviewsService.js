import apiClient from './apiClient';

const reviewsService = {
  /**
   * Fetch all reviews
   * @param {Object} params - Query parameters (status, rating, propertyId)
   */
  fetchReviews: async (params = {}) => {
    const response = await apiClient.get('/reviews', { params });
    return response.data;
  },

  /**
   * Update review status (publish/unpublish)
   * @param {string} id - Review ID
   * @param {string} status - New status
   */
  updateReviewStatus: async (id, status) => {
    const response = await apiClient.patch(`/reviews/${id}/status`, { status });
    return response.data;
  },

  /**
   * Reply to a review
   * @param {string} id - Review ID
   * @param {string} reply - Reply content
   */
  replyToReview: async (id, reply) => {
    const response = await apiClient.post(`/reviews/${id}/reply`, { reply });
    return response.data;
  }
};

export default reviewsService;
