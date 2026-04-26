import { useState } from 'react';
import propertiesService from '../services/propertiesService';

export const useListingForm = (initialData = {}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    type: initialData.type || 'Apartment',
    pricePerNight: initialData.pricePerNight || '',
    maxGuests: initialData.maxGuests || 2,
    bedrooms: initialData.bedrooms || 1,
    bathrooms: initialData.bathrooms || 1,
    address: initialData.address || '',
    city: initialData.city || '',
    country: initialData.country || 'Nigeria',
    amenities: initialData.amenities || [],
    images: initialData.images || [],
    status: initialData.status || 'available',
    ...initialData
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (category, value) => {
    setFormData(prev => {
      const current = prev.amenities || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, amenities: updated };
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (isUpdate = false, id = null) => {
    setLoading(true);
    setError(null);
    try {
      // Prepare data: convert type to lowercase and strings to numbers where needed
      const payload = {
        ...formData,
        type: formData.type.toLowerCase(),
        pricePerNight: parseFloat(formData.pricePerNight),
        maxGuests: parseInt(formData.maxGuests, 10),
        bedrooms: parseInt(formData.bedrooms, 10),
        bathrooms: parseFloat(formData.bathrooms)
      };

      let result;
      if (isUpdate && id) {
        result = await propertiesService.updateProperty(id, payload);
        
        // If files were selected during edit, upload them
        if (selectedFiles.length > 0) {
          const uploadData = new FormData();
          selectedFiles.forEach(file => uploadData.append('images', file));
          await propertiesService.uploadPropertyImages(id, uploadData);
        }
      } else {
        result = await propertiesService.createProperty(payload);
        
        // If files were selected, upload them to the new property
        if (result.property?.id && selectedFiles.length > 0) {
          const uploadData = new FormData();
          selectedFiles.forEach(file => uploadData.append('images', file));
          await propertiesService.uploadPropertyImages(result.property.id, uploadData);
        }
      }
      return result;
    } catch (err) {
      const data = err.response?.data;
      const errorMessage = data?.error || (data?.errors && data.errors.map(e => e.message).join(', ')) || data?.message || err.message || 'Failed to save listing';
      setError(errorMessage);
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
    setError,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleFileChange,
    handleSubmit,
    selectedFiles
  };
};
