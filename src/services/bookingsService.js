import apiClient from './apiClient';

const bookingsService = {
  /**
   * Fetch all bookings
   * @param {Object} params - Filters and pagination
   */
  fetchBookings: async (params = {}) => {
    const response = await apiClient.get('/bookings', { params });
    return response.data;
  },

  /**
   * Create a new booking
   * @param {Object} bookingData 
   */
  createBooking: async (bookingData) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
  },

  /**
   * Remove/Delete a booking
   * @param {string|number} bookingId 
   */
  removeBooking: async (bookingId) => {
    await apiClient.delete(`/bookings/${bookingId}`);
    return bookingId;
  },

  /**
   * Update booking status
   * @param {string|number} id 
   * @param {string} status 
   * @param {string} cancellationReason 
   */
  updateBookingStatus: async (id, status, cancellationReason) => {
    const response = await apiClient.patch(`/bookings/${id}/status`, { status, cancellationReason });
    return response.data;
  },

  /**
   * Fetch a single booking by ID
   * @param {string|number} id 
   */
  fetchBookingById: async (id) => {
    const response = await apiClient.get(`/bookings/${id}`);
    return response.data;
  }
};

export default bookingsService;
