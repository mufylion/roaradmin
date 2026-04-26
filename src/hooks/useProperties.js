import { useState, useEffect, useCallback } from 'react';
import propertiesService from '../services/propertiesService';

export const useProperties = (initialParams = {}) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await propertiesService.fetchProperties(params);
      setProperties(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const refresh = () => fetchProperties();

  const updateStatus = async (id, status) => {
    try {
      await propertiesService.updatePropertyStatus(id, status);
      setProperties(prev => prev.map(p => p.id === id ? { ...p, status } : p));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update status');
      return false;
    }
  };

  const deleteProperty = async (id) => {
    try {
      await propertiesService.deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete property');
      return false;
    }
  };

  return {
    properties,
    loading,
    error,
    params,
    setParams,
    refresh,
    updateStatus,
    deleteProperty
  };
};
