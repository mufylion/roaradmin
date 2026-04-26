import { useState, useEffect, useCallback } from 'react';
import usersService from '../services/usersService';

export const useUsers = (initialParams = {}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usersService.fetchUsers(params);
      // Backend returns { users, total, page, totalPages }
      setUsers(data.users || data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const refresh = () => fetchUsers();

  const updateStatus = async (id, status) => {
    try {
      await usersService.updateUserStatus(id, status);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update user status');
      return false;
    }
  };

  const deleteUser = async (id) => {
    try {
      await usersService.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete user');
      return false;
    }
  };

  return {
    users,
    loading,
    error,
    params,
    setParams,
    refresh,
    updateStatus,
    deleteUser
  };
};
