import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { FormSection, InputField, TextAreaField } from '../components/ListingForm';
import { useUserForm } from '../hooks/useUserForm';
import usersService from '../services/usersService';

export default function AddNewUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const pageTitle = isEditMode ? 'Edit User' : 'Add New User';

  const {
    formData,
    setFormData,
    loading,
    error,
    handleChange,
    handleSelectChange,
    handleSubmit
  } = useUserForm();

  const [fetchLoading, setFetchLoading] = useState(isEditMode);

  // Load user data for edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        setFetchLoading(true);
        try {
          const data = await usersService.fetchUserById(id);
          setFormData({
            firstName: data.profile?.firstName || '',
            lastName: data.profile?.lastName || '',
            email: data.contact?.email || '',
            phone: data.contact?.phone || '',
            role: data.role || 'guest',
            status: data.status || 'active',
            bio: data.profile?.bio || '',
            avatar: data.profile?.avatar || ''
          });
        } catch (err) {
          console.error('Failed to fetch user:', err);
        } finally {
          setFetchLoading(false);
        }
      };
      fetchUser();
    }
  }, [id, isEditMode, setFormData]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const result = await handleSubmit(isEditMode, id);
    if (result) {
      navigate(isEditMode ? `/users/profile/${id}` : '/users');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // In a real app, you'd upload this to a server
    // For now, we'll use a file reader preview
    const reader = new FileReader();
    reader.onload = (event) => {
      handleSelectChange('avatar', event.target.result);
    };
    reader.readAsDataURL(file);
  };

  if (fetchLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-auto md:h-20 bg-card border-b border-border px-4 md:px-8 py-4 md:py-0 flex items-center justify-between shrink-0 gap-4">
        <div className="flex items-center gap-4">
          <Link to={isEditMode ? `/users/profile/${id}` : "/users"} className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted hover:bg-muted/80 transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Icon icon="lucide:arrow-left" className="text-xl" />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-heading font-bold">{pageTitle}</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {isEditMode ? 'Edit user account details and permissions.' : 'Create a new host or guest account manually.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-xs text-destructive font-bold">{error}</span>}
          <Link to={isEditMode ? `/users/profile/${id}` : "/users"} className="hidden md:flex bg-muted text-foreground px-6 py-2.5 rounded-xl font-black items-center justify-center gap-2 hover:bg-muted/80 transition-all active:scale-95 text-[10px] uppercase tracking-widest border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Cancel
          </Link>
        </div>
      </header>

      {/* Form Body */}
      <form onSubmit={onFormSubmit} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Account Information Card */}
            <FormSection title="Personal Information" icon="lucide:user">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField 
                  label="First Name"
                  name="firstName"
                  placeholder="e.g. John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <InputField 
                  label="Last Name"
                  name="lastName"
                  placeholder="e.g. Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <InputField 
                label="Email Address"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                icon="lucide:mail"
                required
              />
              <InputField 
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                icon="lucide:phone"
              />
            </FormSection>

            {/* Role & Permissions Card */}
            <FormSection title="Role & Access" icon="lucide:shield-check">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['guest', 'host', 'admin'].map((roleOption) => (
                  <label key={roleOption} className="relative cursor-pointer group">
                    <input 
                      type="radio" 
                      name="role" 
                      value={roleOption} 
                      className="peer sr-only" 
                      checked={formData.role === roleOption}
                      onChange={() => handleSelectChange('role', roleOption)}
                    />
                    <div className="p-4 bg-muted border-2 border-transparent rounded-2xl flex flex-col items-center gap-3 transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted/80">
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <Icon 
                          icon={roleOption === 'guest' ? 'lucide:user' : roleOption === 'host' ? 'lucide:home' : 'lucide:shield'} 
                          className={`text-xl ${formData.role === roleOption ? 'text-primary' : 'text-muted-foreground'}`} 
                        />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest">{roleOption}</span>
                    </div>
                  </label>
                ))}
              </div>
            </FormSection>

            {/* Bio Card */}
            <FormSection title="Biography" icon="lucide:file-text">
              <TextAreaField 
                label="Internal Notes / Bio"
                name="bio"
                placeholder="User biography or internal notes..."
                value={formData.bio}
                onChange={handleChange}
                rows="4"
              />
            </FormSection>
          </div>

          {/* Right Column: Profile & Preview */}
          <div className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 text-center space-y-4">
              <div className="relative inline-block group">
                <div className="w-32 h-32 rounded-full border-4 border-muted bg-muted flex items-center justify-center overflow-hidden relative">
                  {formData.avatar ? (
                    <img 
                      src={formData.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon icon="lucide:user" className="text-6xl text-muted-foreground/30" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Icon icon="lucide:camera" className="text-white text-3xl" />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button 
                  type="button"
                  className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-4 border-card hover:scale-110 transition-transform pointer-events-none"
                >
                  <Icon icon="lucide:plus" className="text-lg font-bold" />
                </button>
              </div>
              <div>
                <h3 className="font-heading font-bold">Profile Picture</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Icon icon="lucide:info" className="text-xl" />
                <h3 className="text-xs font-black uppercase tracking-widest">Admin Note</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEditMode 
                  ? 'Updating user details will take effect immediately. Ensure all information is accurate.' 
                  : 'Creating a user manually will generate a temporary password. The user will be prompted to change it upon their first login.'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-border">
          <div className="flex justify-end gap-3">
            <Link to={isEditMode ? `/users/profile/${id}` : "/users"} className="bg-muted text-foreground px-6 py-2.5 rounded-xl font-black items-center justify-center gap-2 hover:bg-muted/80 transition-all active:scale-95 text-[10px] uppercase tracking-widest border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary">
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 text-[10px] uppercase tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {loading ? <Icon icon="lucide:loader-2" className="animate-spin" /> : <Icon icon="lucide:check" className="text-lg" />}
              <span>{isEditMode ? 'Update User' : 'Create User'}</span>
            </button>
          </div>
        </div>
      </form>
    </PageLayout>
  );
}

