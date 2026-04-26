import apiClient from './apiClient';

const propertiesService = {
  /**
   * Fetch all properties
   * @param {Object} params - Filters and pagination
   */
  fetchProperties: async (params) => {
    const response = await apiClient.get('/properties', { params });
    return response.data;
  },
  
  /**
   * Fetch a single property by ID
   * @param {string|number} id 
   */
  fetchProperty: async (id) => {
    const response = await apiClient.get(`/properties/${id}`);
    return response.data;
  },

  /**
   * Create a new property
   * @param {Object} propertyData 
   */
  createProperty: async (propertyData) => {
    const response = await apiClient.post('/properties', propertyData);
    return response.data;
  },

  /**
   * Update an existing property
   * @param {string|number} id 
   * @param {Object} data 
   */
  updateProperty: async (id, data) => {
    const response = await apiClient.put(`/properties/${id}`, data);
    return response.data;
  },

  /**
   * Update property status (e.g., available, maintenance)
   * @param {string|number} id 
   * @param {string} status 
   */
  updatePropertyStatus: async (id, status) => {
    const response = await apiClient.patch(`/properties/${id}/status`, { status });
    return response.data;
  },

  /**
   * Delete a property
   * @param {string|number} id 
   */
  deleteProperty: async (id) => {
    await apiClient.delete(`/properties/${id}`);
    return id;
  },

  /**
   * Upload images for a property
   * @param {string|number} id 
   * @param {FormData} formData 
   */
  uploadPropertyImages: async (id, formData) => {
    const response = await apiClient.post(`/properties/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  /**
   * Delete a specific image from a property
   * @param {string|number} propertyId 
   * @param {string} imageKey 
   */
  deletePropertyImage: async (propertyId, imageKey) => {
    const response = await apiClient.delete(`/properties/${propertyId}/images`, { data: { imageKey } });
    return response.data;
  }
};

export default propertiesService;
