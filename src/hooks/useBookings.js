import { useState, useEffect, useCallback } from 'react';
import bookingsService from '../services/bookingsService';

export const useBookings = (initialParams = {}) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingsService.fetchBookings(params);
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const refresh = () => fetchBookings();

  const updateStatus = async (id, status, cancellationReason) => {
    try {
      const updated = await bookingsService.updateBookingStatus(id, status, cancellationReason);
      setBookings(prev => prev.map(b => b.id === id ? updated : b));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update booking status');
      return false;
    }
  };

  return {
    bookings,
    loading,
    error,
    params,
    setParams,
    refresh,
    updateStatus
  };
};
