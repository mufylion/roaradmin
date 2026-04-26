import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { FormSection, InputField, SelectField, TextAreaField, CheckboxGroup, FileField } from '../components/ListingForm';
import { useFormatCurrency, useAppConfig } from '../config/useAppConfig';
import { useListingForm } from '../hooks/useListingForm';

export default function AddNewListing() {
  const { config } = useAppConfig();
  const navigate = useNavigate();
  
  const { 
    formData, 
    loading, 
    error, 
    setError,
    handleChange, 
    handleSelectChange, 
    handleCheckboxChange, 
    handleFileChange,
    handleSubmit,
    selectedFiles
  } = useListingForm();

  const [currentStep, setCurrentStep] = useState(1);

  const validateStep = () => {
    setError(null);
    switch (currentStep) {
      case 1:
        const requiredFields = ['name', 'pricePerNight', 'address', 'city'];
        const missing = requiredFields.filter(f => !formData[f]);
        if (missing.length > 0) {
          setError(`Please fill in all required fields: ${missing.join(', ')}`);
          return false;
        }
        return true;
      case 2:
        if (selectedFiles.length === 0 && formData.images.length === 0) {
          setError('Please upload at least one photo of your property.');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < 6) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        handlePublish();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = async () => {
    const result = await handleSubmit();
    if (result) {
      navigate('/listings');
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Basic Information';
      case 2: return 'Media & Gallery';
      case 3: return 'Amenities';
      case 4: return 'Pricing Rules';
      case 5: return 'Policies';
      case 6: return 'Review & Publish';
      default: return 'Basic Information';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <FormSection title="Property Details" icon="lucide:info">
              <div className="space-y-4">
                <InputField 
                  label="Listing Title" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Modern Downtown Loft" 
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <SelectField 
                    label="Property Type"
                    name="type"
                    value={formData.type}
                    onChange={(e) => handleSelectChange('type', e.target.value)}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Cabin">Cabin</option>
                  </SelectField>
                  <InputField 
                    label="Base Price (Nightly)" 
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    placeholder="0.00" 
                    type="number" 
                    prefix={config.currency.symbol} 
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <InputField 
                    label="Max Guests" 
                    name="maxGuests"
                    value={formData.maxGuests}
                    onChange={handleChange}
                    placeholder="2" 
                    type="number" 
                  />
                  <InputField 
                    label="Bedrooms" 
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="1" 
                    type="number" 
                  />
                  <InputField 
                    label="Bathrooms" 
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="1" 
                    type="number" 
                  />
                </div>

                <TextAreaField 
                  label="Description" 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the unique features of your property..." 
                  rows="4" 
                />
              </div>
            </FormSection>

            <FormSection title="Location" icon="lucide:map-pin">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <InputField 
                    label="Street Address" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Luxury Ave" 
                  />
                </div>
                <InputField 
                  label="City" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Lagos" 
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
          </>
        );

      case 2:
        return (
          <FormSection title="Media & Gallery" icon="lucide:image">
            <div className="space-y-6">
              <FileField 
                label="Property Photos" 
                onChange={handleFileChange}
                loading={loading}
              />
              
              {selectedFiles.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-muted border border-border">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={`Selected ${idx}`} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-[10px] text-white font-bold truncate px-2">{file.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {selectedFiles.length === 0 && formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {formData.images.map((url, idx) => (
                    <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
                      <img src={url} alt={`Existing ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
                <Icon icon="lucide:info" className="text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-primary/80 leading-relaxed">
                  High-quality photos increase your booking rate by up to 40%. Upload at least 5 photos for best results.
                </p>
              </div>
            </div>
          </FormSection>
        );

      case 3:
        return (
          <FormSection title="Amenities" icon="lucide:zap">
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
          </FormSection>
        );

      case 4:
        return (
          <FormSection title="Pricing Rules" icon="lucide:calendar">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                  label="Weekend Rate" 
                  type="number" 
                  defaultValue="150" 
                  prefix={config.currency.symbol} 
                />
                <InputField 
                  label="Weekly Discount" 
                  type="number" 
                  defaultValue="15" 
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">Additional Fees</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Refundable Caution Deposit" type="number" defaultValue="25000" prefix={config.currency.symbol} />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">VAT Rate</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={config.tax.vatRate} 
                        className="w-full pr-8 pl-4 py-3 bg-card border border-border rounded-xl text-muted-foreground cursor-not-allowed outline-none" 
                        readOnly
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FormSection>
        );

      case 5:
        return (
          <FormSection title="Policies" icon="lucide:shield-check">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">House Rules</h3>
                <div className="space-y-3">
                  {[
                    'No smoking',
                    'No parties or events',
                    'No pets (unless specified)',
                    'Check-in after 3:00 PM',
                    'Check-out before 11:00 AM'
                  ].map((rule) => (
                    <div key={rule} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                      <Icon icon="lucide:check-circle" className="text-tertiary" />
                      <span className="text-sm font-medium">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <TextAreaField 
                label="Additional Rules" 
                placeholder="Add any additional house rules or policies..."
                rows="4" 
              />
            </div>
          </FormSection>
        );

      case 6:
        return (
          <FormSection title="Review & Publish" icon="lucide:check-circle">
            <div className="space-y-6">
              <div className="bg-tertiary/10 p-6 rounded-xl border border-tertiary/20">
                <h3 className="text-lg font-bold mb-4">Review Your Listing</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">Title</p>
                    <p className="font-bold">{formData.name || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">Price</p>
                    <p className="font-bold">{config.currency.symbol}{formData.pricePerNight || '0'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">Location</p>
                    <p className="font-bold">{formData.city || 'Not set'}, {formData.country}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">Status</p>
                    <p className="font-bold uppercase text-tertiary">{formData.status}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your listing will be live once published. Make sure all information is accurate before proceeding.
                </p>
              </div>
            </div>
          </FormSection>
        );

      default:
        return null;
    }
  };

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-20 bg-card border-b border-border px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/listings" className="p-2 hover:bg-muted rounded-xl transition-colors">
            <Icon icon="lucide:arrow-left" className="text-xl" />
          </Link>
          <div>
            <h1 className="text-2xl font-heading font-bold">Add New Listing</h1>
            <p className="text-sm text-muted-foreground">Step {currentStep} of 6: {getStepTitle()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1 || loading}
            className="px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-muted transition-all active:scale-95 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous Step
          </button>
          <button 
            onClick={nextStep}
            disabled={loading}
            className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && <Icon icon="lucide:loader-2" className="animate-spin" />}
            {currentStep === 6 ? 'Publish Listing' : 'Next Step'}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <Icon icon="lucide:alert-circle" className="text-destructive text-xl shrink-0" />
              <p className="text-sm font-bold text-destructive">{error}</p>
            </div>
          )}
          {renderStepContent()}
        </div>
      </div>
    </PageLayout>
  );
}

