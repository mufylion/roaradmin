import { useState, useEffect, useCallback } from 'react';
import dashboardService from '../services/dashboardService';

export const useDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, activityData] = await Promise.all([
        dashboardService.fetchStats(),
        dashboardService.fetchRecentActivity()
      ]);
      setStats(statsData);
      setActivity(activityData);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    stats,
    activity,
    loading,
    error,
    refresh: fetchData
  };
};
