import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { FormSection, InputField, SelectField, TextAreaField, CheckboxGroup } from '../components/ListingForm';
import { useFormatCurrency, useAppConfig } from '../config/useAppConfig';

export default function AddNewListing() {
  const { config } = useAppConfig();
  const formatCurrency = useFormatCurrency();
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState('publish');
  const [seasonalPricing, setSeasonalPricing] = useState([
    {
      id: 1,
      name: '',
      rate: '',
      startDate: '',
      endDate: ''
    }
  ]);

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addSeasonalPricing = () => {
    setSeasonalPricing([
      ...seasonalPricing,
      {
        id: Date.now(),
        name: '',
        rate: '',
        startDate: '',
        endDate: ''
      }
    ]);
  };

  const removeSeasonalPricing = (id) => {
    if (seasonalPricing.length > 1) {
      setSeasonalPricing(seasonalPricing.filter(item => item.id !== id));
    }
  };

  const updateSeasonalPricing = (id, field, value) => {
    setSeasonalPricing(seasonalPricing.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
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
                <InputField label="Listing Title" placeholder="e.g. Modern Downtown Loft" />
                
                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="Property Type">
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Cabin</option>
                  </SelectField>
                  <InputField label="Base Price (Nightly)" placeholder="0.00" type="number" prefix={config.currency.symbol} />
                </div>

                <TextAreaField label="Description" placeholder="Describe the unique features of your property..." rows="4" />
              </div>
            </FormSection>

            <FormSection title="Location" icon="lucide:map-pin">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <InputField label="Street Address" placeholder="123 Luxury Ave" />
                </div>
                <InputField label="City" placeholder="New York" />
                <SelectField label="Country">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>France</option>
                </SelectField>
              </div>
            </FormSection>
          </>
        );

      case 2:
        return (
          <FormSection title="Media & Gallery" icon="lucide:image">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Cover Photo</label>
                <div className="relative group cursor-pointer">
                  <div className="aspect-video bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center overflow-hidden group-hover:border-primary/50 transition-all">
                    <Icon icon="lucide:upload-cloud" className="text-4xl text-muted-foreground group-hover:text-primary transition-colors" />
                    <p className="text-xs font-black uppercase mt-2 text-muted-foreground group-hover:text-primary">Click to upload</p>
                    <p className="text-[10px] text-muted-foreground mt-1">JPG, PNG up to 10MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Gallery Photos</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="relative group">
                      <div className="w-full h-32 bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center">
                        <Icon icon="lucide:plus" className="text-2xl text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground">Add Photo</span>
                      </div>
                    </div>
                  ))}
                </div>
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
              defaultChecked={['Wi-Fi', 'Kitchen', 'Free Parking', 'TV', 'Air Conditioning']}
            />
            
            <CheckboxGroup 
              title="Special Features"
              items={['Pool', 'Hot Tub', 'Gym', 'Workspace', 'Beach Access', 'Mountain View']}
              defaultChecked={['Pool', 'Workspace']}
            />
            
            <CheckboxGroup 
              title="Additional Amenities"
              items={['Smoke Detector', 'First Aid Kit', 'Fire Extinguisher', 'Carbon Monoxide Detector', 'Baby Monitor']}
              defaultChecked={[]}
            />
          </FormSection>
        );

      case 4:
        return (
          <FormSection title="Pricing Rules" icon="lucide:calendar">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Weekend Rate" type="number" defaultValue="150" prefix={config.currency.symbol} />
                <InputField label="Weekly Discount" type="number" defaultValue="15" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Seasonal Pricing</h3>
                  <button
                    onClick={addSeasonalPricing}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
                  >
                    <Icon icon="lucide:plus" className="text-lg" />
                    Add Season
                  </button>
                </div>
                <div className="space-y-3">
                  {seasonalPricing.map((item, index) => (
                    <div key={item.id} className="p-4 bg-muted/50 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-muted-foreground">
                          Season {index + 1}
                        </span>
                        {seasonalPricing.length > 1 && (
                          <button
                            onClick={() => removeSeasonalPricing(item.id)}
                            className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                          >
                            <Icon icon="lucide:trash-2" className="text-lg" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Season Name</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateSeasonalPricing(item.id, 'name', e.target.value)}
                            placeholder="e.g., Summer Season"
                            className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rate</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">{config.currency.symbol}</span>
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) => updateSeasonalPricing(item.id, 'rate', e.target.value)}
                              placeholder="0"
                              className="w-full pl-8 pr-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Start Date</label>
                          <input
                            type="date"
                            value={item.startDate}
                            onChange={(e) => updateSeasonalPricing(item.id, 'startDate', e.target.value)}
                            className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">End Date</label>
                          <input
                            type="date"
                            value={item.endDate}
                            onChange={(e) => updateSeasonalPricing(item.id, 'endDate', e.target.value)}
                            min={item.startDate}
                            className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                    <p className="text-xs text-muted-foreground">Applied to nightly rate only (Fixed rate)</p>
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
                    'Check-out before 11:00 AM',
                    'Quiet hours: 10 PM - 7 AM'
                  ].map((rule) => (
                    <div key={rule} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                      <Icon icon="lucide:check-circle" className="text-tertiary" />
                      <span className="text-sm font-medium">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField label="Cancellation Policy" defaultValue="Flexible (24-hour notice)">
                  <option>Flexible (24-hour notice)</option>
                  <option>Moderate (48-hour notice)</option>
                  <option>Strict (7-day notice)</option>
                  <option>Super Strict (30-day notice)</option>
                </SelectField>
                <InputField label="Security Deposit" type="number" defaultValue="200" prefix={config.currency.symbol} />
              </div>

              <TextAreaField 
                label="Additional Rules" 
                placeholder="Add any additional house rules or policies..."
                rows="4" 
                defaultValue="Guests must respect neighbors and keep noise levels down. No unauthorized guests allowed. Please report any damages immediately."
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
                <div className="space-y-4">
                  {[
                    'Basic information completed',
                    'Media uploaded',
                    'Amenities configured',
                    'Pricing rules set',
                    'Policies defined',
                    'Ready to publish'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Icon icon="lucide:check" className="text-tertiary" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
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
            disabled={currentStep === 1}
            className="px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-muted transition-all active:scale-95 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous Step
          </button>
          <button className="px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-muted transition-all active:scale-95 uppercase tracking-widest">
            Save Draft
          </button>
          <button 
            onClick={nextStep}
            disabled={currentStep === 6}
            className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === 6 ? 'Publish Listing' : 'Next Step'}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        <div className="max-w-4xl mx-auto">
          {renderStepContent()}
        </div>
      </div>
    </PageLayout>
  );
}
