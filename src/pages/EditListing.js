import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { FormSection, InputField, SelectField, TextAreaField, CheckboxGroup, FileField } from '../components/ListingForm';
import { useAppConfig } from '../config/useAppConfig';
import { useListingForm } from '../hooks/useListingForm';
import propertiesService from '../services/propertiesService';

const NavTab = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all group ${
      active 
        ? 'bg-primary/10 text-primary' 
        : 'hover:bg-muted text-muted-foreground'
    }`}
  >
    <Icon icon={icon} className={`text-xl ${active ? '' : 'group-hover:text-foreground'}`} />
    <span className={`text-sm ${active ? '' : 'group-hover:text-foreground'}`}>{label}</span>
  </button>
);

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { config } = useAppConfig();
  const [activeTab, setActiveTab] = useState('Basic Info');
  
  const { 
    formData, 
    setFormData,
    loading: saveLoading, 
    error: saveError, 
    handleChange, 
    handleSelectChange, 
    handleCheckboxChange, 
    handleFileChange,
    handleSubmit,
    selectedFiles
  } = useListingForm();

  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Load listing data
  useEffect(() => {
    const fetchListing = async () => {
      setFetchLoading(true);
      try {
        const data = await propertiesService.fetchProperty(id);
        setFormData({
          name: data.name || '',
          description: data.description || '',
          type: data.type || 'Apartment',
          pricePerNight: data.pricePerNight || 0,
          maxGuests: data.maxGuests || 0,
          bedrooms: data.bedrooms || 0,
          bathrooms: data.bathrooms || 0,
          address: data.address || '',
          city: data.city || '',
          country: data.country || 'Nigeria',
          amenities: Array.isArray(data.amenities) ? data.amenities : (data.amenities ? JSON.parse(data.amenities) : []),
          images: Array.isArray(data.images) ? data.images : (data.images ? JSON.parse(data.images) : []),
          status: data.status || 'available'
        });
      } catch (err) {
        setFetchError(err.response?.data?.message || err.message || 'Failed to fetch listing');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchListing();
  }, [id, setFormData]);

  const handleSave = async () => {
    const result = await handleSubmit(true, id);
    if (result) {
      navigate('/listings');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      try {
        await propertiesService.deleteProperty(id);
        navigate('/listings');
      } catch (err) {
        alert(err.response?.data?.message || err.message || 'Failed to delete listing');
      }
    }
  };

  if (fetchLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading listing details...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-20 bg-card border-b border-border px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/listings" className="p-2 hover:bg-muted rounded-xl transition-colors">
            <Icon icon="lucide:arrow-left" className="text-xl" />
          </Link>
          <div>
            <h1 className="text-xl font-heading font-bold">Edit Listing</h1>
            <p className="text-sm text-muted-foreground">{formData.name || 'Listing'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {saveError && <span className="text-xs text-destructive font-bold">{saveError}</span>}
          <button 
            onClick={() => handleSelectChange('status', formData.status === 'maintenance' ? 'available' : 'maintenance')}
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-destructive hover:bg-destructive/10 transition-all active:scale-95 uppercase tracking-widest"
          >
            {formData.status === 'maintenance' ? 'Activate' : 'Pause'} Listing
          </button>
          <button 
            onClick={handleSave}
            disabled={saveLoading}
            className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 uppercase tracking-widest flex items-center gap-2"
          >
            {saveLoading && <Icon icon="lucide:loader-2" className="animate-spin" />}
            Save Changes
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        {fetchError && (
          <div className="max-w-4xl mx-auto bg-destructive/10 text-destructive p-4 rounded-xl text-sm font-bold">
            {fetchError}
          </div>
        )}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Tabs */}
          <div className="lg:col-span-1 space-y-2">
            <NavTab 
              icon="lucide:info" 
              label="Basic Info" 
              active={activeTab === 'Basic Info'} 
              onClick={() => setActiveTab('Basic Info')} 
            />
            <NavTab 
              icon="lucide:image" 
              label="Media & Gallery" 
              active={activeTab === 'Media & Gallery'} 
              onClick={() => setActiveTab('Media & Gallery')} 
            />
            <NavTab 
              icon="lucide:zap" 
              label="Amenities" 
              active={activeTab === 'Amenities'} 
              onClick={() => setActiveTab('Amenities')} 
            />
            <NavTab 
              icon="lucide:calendar" 
              label="Pricing Rules" 
              active={activeTab === 'Pricing Rules'} 
              onClick={() => setActiveTab('Pricing Rules')} 
            />
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3 space-y-8">
            {activeTab === 'Basic Info' && (
              <>
                {/* General Information */}
                <FormSection title="General Information" icon="lucide:info">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                      label="Listing Title" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="col-span-2"
                    />

                    <InputField 
                      label="Nightly Rate" 
                      name="pricePerNight"
                      type="number" 
                      value={formData.pricePerNight}
                      onChange={handleChange}
                      prefix={config.currency.symbol}
                    />

                    <SelectField 
                      label="Status" 
                      name="status"
                      value={formData.status}
                      onChange={(e) => handleSelectChange('status', e.target.value)}
                    >
                      <option value="available">Available</option>
                      <option value="maintenance">Maintenance</option>
                    </SelectField>

                    <InputField 
                      label="Max Guests" 
                      name="maxGuests"
                      type="number" 
                      value={formData.maxGuests}
                      onChange={handleChange}
                    />

                    <InputField 
                      label="Bedrooms" 
                      name="bedrooms"
                      type="number" 
                      value={formData.bedrooms}
                      onChange={handleChange}
                    />

                    <InputField 
                      label="Bathrooms" 
                      name="bathrooms"
                      type="number" 
                      value={formData.bathrooms}
                      onChange={handleChange}
                    />

                    <TextAreaField 
                      label="Description" 
                      name="description"
                      rows="6" 
                      value={formData.description}
                      onChange={handleChange}
                      className="col-span-2"
                    />
                  </div>
                </FormSection>

                {/* Location Section */}
                <div className="border-t border-border pt-6 mt-6">
                  <FormSection title="Location & Address" icon="lucide:map-pin">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField 
                        label="Street Address" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="col-span-2"
                      />
                      
                      <InputField 
                        label="City" 
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                      
                      <SelectField 
                        label="Country" 
                        name="country"
                        value={formData.country}
                        onChange={(e) => handleSelectChange('country', e.target.value)}
                      >
                        <option value="Nigeria">Nigeria</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                      </SelectField>
                    </div>
                  </FormSection>
                </div>
              </>
            )}

            {activeTab === 'Media & Gallery' && (
              <section className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-8">
                <h2 className="text-xl font-heading font-bold border-b border-border pb-4">Media & Gallery</h2>
                
                <div className="space-y-6">
                  <FileField 
                    label="Add New Photos" 
                    onChange={handleFileChange}
                    loading={saveLoading}
                  />

                  {selectedFiles.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">New Photos to Upload:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedFiles.map((file, idx) => (
                          <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-muted border border-border ring-2 ring-primary">
                            <img src={URL.createObjectURL(file)} alt="new" className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Icon icon="lucide:arrow-up-circle" className="text-primary text-3xl animate-bounce" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Photos:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((url, idx) => (
                        <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-muted border border-border">
                          <img 
                            src={url}
                            className="w-full h-full object-cover"
                            alt={`Gallery ${idx}`}
                          />
                          <button 
                            onClick={async () => {
                              if (window.confirm('Remove this photo?')) {
                                try {
                                  await propertiesService.deletePropertyImage(id, url);
                                  setFormData(prev => ({
                                    ...prev,
                                    images: prev.images.filter(img => img !== url)
                                  }));
                                } catch (err) {
                                  alert('Failed to delete image');
                                }
                              }
                            }}
                            className="absolute top-2 right-2 w-8 h-8 bg-destructive text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <Icon icon="lucide:trash-2" className="text-lg" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'Amenities' && (
              <section className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-8">
                <h2 className="text-xl font-heading font-bold border-b border-border pb-4">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <CheckboxGroup 
                    title="Essential Amenities"
                    items={['Wi-Fi', 'Kitchen', 'Free Parking', 'Washer', 'TV', 'Air Conditioning']}
                    selectedItems={formData.amenities}
                    onChange={(item) => handleCheckboxChange('amenities', item)}
                  />
                  <CheckboxGroup 
                    title="Special Features"
                    items={['Pool', 'Hot Tub', 'Gym', 'Workspace', 'Beach Access', 'Mountain View']}
                    selectedItems={formData.amenities}
                    onChange={(item) => handleCheckboxChange('amenities', item)}
                  />
                </div>
              </section>
            )}

            {activeTab === 'Pricing Rules' && (
              <section className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-8">
                <h2 className="text-xl font-heading font-bold border-b border-border pb-4">Pricing Rules</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Weekend Rate" type="number" defaultValue="150" prefix={config.currency.symbol} />
                    <InputField label="Weekly Discount" type="number" defaultValue="15" suffix="%" />
                  </div>
                </div>
              </section>
            )}

            {/* Dangerous Zone */}
            <section className="bg-destructive/5 p-8 rounded-2xl border border-destructive/20 space-y-4">
              <div className="flex items-center gap-3 text-destructive">
                <Icon icon="lucide:circle-alert" className="text-2xl" />
                <h2 className="text-lg font-heading font-bold">Danger Zone</h2>
              </div>
              <p className="text-sm text-destructive/80 leading-relaxed">
                Once you delete a listing, there is no going back. All booking history and details associated with this property will be permanently removed.
              </p>
              <button 
                onClick={handleDelete}
                className="px-6 py-2.5 bg-destructive text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all active:scale-95"
              >
                Delete Listing
              </button>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

