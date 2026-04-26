import { useState, useCallback } from 'react';
import usersService from '../services/usersService';

export const useUserForm = (initialData = {}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'guest',
    status: 'active',
    bio: '',
    avatar: '',
    ...initialData
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (isEdit = false, id = null) => {
    setLoading(true);
    setError(null);
    try {
      // Map form data to API structure if needed
      const payload = {
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          avatar: formData.avatar,
          bio: formData.bio
        },
        contact: {
          email: formData.email,
          phone: formData.phone
        },
        role: formData.role,
        status: formData.status
      };

      let result;
      if (isEdit && id) {
        result = await usersService.updateUser(id, payload);
      } else {
        result = await usersService.createUser(payload);
      }
      return result;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save user');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    error,
    handleChange,
    handleSelectChange,
    handleSubmit
  };
};
