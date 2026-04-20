import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { FormSection, InputField, SelectField, TextAreaField, CheckboxGroup } from '../components/ListingForm';
import { mockListings, getListingById } from '../data/mockListings';
import { useAppConfig, useFormatCurrency } from '../config/useAppConfig';

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

const StatCard = ({ title, value, footer, iconColor = "text-tertiary" }) => (
  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{title}</p>
    <div className="text-2xl font-heading font-bold">{value}</div>
    <div className="mt-4">{footer}</div>
  </div>
);

export default function EditListing() {
  const { id } = useParams();
  const { config, booking } = useAppConfig();
  const formatCurrency = useFormatCurrency();
  const [activeTab, setActiveTab] = useState('Basic Info');
  const [listing, setListing] = useState(null);
  const [seasonalPricing, setSeasonalPricing] = useState([
    {
      id: 1,
      name: '',
      rate: '',
      startDate: '',
      endDate: ''
    }
  ]);

  // Debug log to verify currency updates
  console.log('EditListing - Current currency symbol:', config.currency.symbol);

  // Load listing data
  useEffect(() => {
    const listingData = getListingById(id);
    if (listingData) {
      setListing(listingData);
    }
  }, [id]);

  // Initialize seasonal pricing from listing data
  useEffect(() => {
    if (listing?.price?.seasonal) {
      const seasonalData = Object.entries(listing.price.seasonal).map(([key, value], index) => ({
        id: index + 1,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        rate: value.rate.toString(),
        startDate: value.startDate,
        endDate: value.endDate
      }));
      setSeasonalPricing(seasonalData.length > 0 ? seasonalData : [{
        id: 1,
        name: '',
        rate: '',
        startDate: '',
        endDate: ''
      }]);
    }
  }, [listing]);

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

  // Force refresh currency if old symbol is cached
  useEffect(() => {
    const storedCurrency = localStorage.getItem('app_currency');
    if (storedCurrency) {
      try {
        const parsed = JSON.parse(storedCurrency);
        if (parsed.symbol === '¥') {
          // Clear old cached currency with wrong symbol
          localStorage.removeItem('app_currency');
          window.location.reload(); // Force refresh to load new config
        }
      } catch (e) {
        // Clear corrupted data
        localStorage.removeItem('app_currency');
      }
    }
  }, []);

  // Show loading state while listing data is being fetched
  if (!listing) {
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
            <p className="text-sm text-muted-foreground">{listing ? `${listing.title} · ${listing.location.city}, ${listing.location.state}` : 'Loading...'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-destructive hover:bg-destructive/10 transition-all active:scale-95 uppercase tracking-widest">
            Pause Listing
          </button>
          <button className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 uppercase tracking-widest">
            Save Changes
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
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
            <NavTab 
              icon="lucide:shield-check" 
              label="Policies" 
              active={activeTab === 'Policies'} 
              onClick={() => setActiveTab('Policies')} 
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
                      defaultValue={listing?.title || ''} 
                      className="col-span-2"
                    />

                    <InputField 
                      label="Nightly Rate" 
                      type="number" 
                      defaultValue={listing?.price?.nightly || 0} 
                      prefix={config.currency.symbol}
                    />

                    <SelectField label="Status" defaultValue={listing?.availability?.status || 'active'}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="draft">Draft</option>
                    </SelectField>

                    <InputField 
                      label="Max Guests" 
                      type="number" 
                      defaultValue={listing?.capacity?.guests || 0} 
                    />

                    <InputField 
                      label="Bedrooms" 
                      type="number" 
                      defaultValue={listing?.capacity?.bedrooms || 0} 
                    />

                    <InputField 
                      label="Bathrooms" 
                      type="number" 
                      defaultValue={listing?.capacity?.bathrooms || 0} 
                    />

                    <TextAreaField 
                      label="Description" 
                      rows="6" 
                      defaultValue={listing?.description || ''} 
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
                        defaultValue={listing?.location?.address || ''} 
                        className="col-span-2"
                      />
                      
                      <InputField label="City" defaultValue={listing?.location?.city || ''} />
                      
                      <InputField label="State/Province" defaultValue={listing?.location?.state || ''} />
                      
                      <InputField label="Postal Code" defaultValue="10001" />
                      
                      <SelectField label="Country" defaultValue="US">
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="FR">France</option>
                        <option value="AU">Australia</option>
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
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Cover Photo</label>
                    <div className="relative group cursor-pointer">
                      <img 
                        src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        className="w-full h-64 object-cover rounded-xl"
                        alt="Cover photo"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <button className="px-4 py-2 bg-white text-black rounded-xl font-bold text-sm">
                          Change Cover
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 block">Gallery Photos</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="relative group">
                        <img 
                          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                          className="w-full h-32 object-cover rounded-xl"
                          alt="Gallery photo 1"
                        />
                        <button className="absolute top-2 right-2 p-1 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon icon="lucide:x" className="text-sm" />
                        </button>
                      </div>
                      <div className="relative group">
                        <img 
                          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                          className="w-full h-32 object-cover rounded-xl"
                          alt="Gallery photo 2"
                        />
                        <button className="absolute top-2 right-2 p-1 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon icon="lucide:x" className="text-sm" />
                        </button>
                      </div>
                      <div className="relative group">
                        <img 
                          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                          className="w-full h-32 object-cover rounded-xl"
                          alt="Gallery photo 3"
                        />
                        <button className="absolute top-2 right-2 p-1 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon icon="lucide:x" className="text-sm" />
                        </button>
                      </div>
                      <div className="relative group">
                        <div className="w-full h-32 bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center">
                          <Icon icon="lucide:plus" className="text-2xl text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground">Add Photo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'Amenities' && (
              <section className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-8">
                <h2 className="text-xl font-heading font-bold border-b border-border pb-4">Amenities</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Connectivity & Entertainment</h3>
                    <div className="space-y-3">
                      {['Free WiFi', 'High-speed internet', '65" Smart TV', 'Cable TV', 'Netflix'].map((amenity) => (
                        <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked={['Free WiFi', '65" Smart TV'].includes(amenity)} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                          <span className="text-sm font-medium">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4">Parking & Transportation</h3>
                    <div className="space-y-3">
                      {['Free parking', 'Garage parking', 'EV charger'].map((amenity) => (
                        <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked={['Free parking'].includes(amenity)} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                          <span className="text-sm font-medium">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4">Kitchen & Dining</h3>
                    <div className="space-y-3">
                      {['Full kitchen', 'Dishwasher', 'BBQ grill'].map((amenity) => (
                        <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked={['Full kitchen', 'BBQ grill'].includes(amenity)} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                          <span className="text-sm font-medium">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4">Pool & Spa</h3>
                    <div className="space-y-3">
                      {['Hot tub', 'Private pool', 'Heated pool', 'Infinity pool', 'Outdoor shower', 'Sauna'].map((amenity) => (
                        <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked={['Hot tub', 'Private pool'].includes(amenity)} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                          <span className="text-sm font-medium">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4">Fitness & Recreation</h3>
                    <div className="space-y-3">
                      {['Home gym', 'Yoga mats', 'Tennis court'].map((amenity) => (
                        <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked={['Home gym'].includes(amenity)} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                          <span className="text-sm font-medium">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4">Comfort & Climate</h3>
                    <div className="space-y-3">
                      {['Air conditioning', 'Heating', 'Ceiling fans'].map((amenity) => (
                        <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked={['Air conditioning', 'Heating'].includes(amenity)} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                          <span className="text-sm font-medium">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4">Work & Business</h3>
                    <div className="space-y-3">
                      {['Workspace', 'Printer'].map((amenity) => (
                        <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked={['Workspace'].includes(amenity)} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                          <span className="text-sm font-medium">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'Pricing Rules' && (
              <section className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-8">
                <h2 className="text-xl font-heading font-bold border-b border-border pb-4">Pricing Rules</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Weekend Rate</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">{config.currency.symbol}</span>
                        <input 
                          type="number" 
                          defaultValue={listing?.price?.weekend || 0} 
                          className="w-full pl-8 pr-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Weekly Discount</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          defaultValue={listing?.price?.fees?.weeklyDiscount || 15} 
                          className="w-full pr-8 pl-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">%</span>
                      </div>
                    </div>
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
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Refundable Caution Deposit</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">{config.currency.symbol}</span>
                          <input 
                            type="number" 
                            defaultValue={listing?.price?.fees?.caution || 25000} 
                            className="w-full pl-8 pr-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                          />
                        </div>
                      </div>
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
              </section>
            )}

            {activeTab === 'Policies' && (
              <section className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-8">
                <h2 className="text-xl font-heading font-bold border-b border-border pb-4">Policies</h2>
                
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
                    <div>
                      <h3 className="text-lg font-bold mb-4">Cancellation Policy</h3>
                      <select className="w-full px-4 py-3 bg-card border border-border rounded-xl text-muted-foreground cursor-not-allowed outline-none" value={booking.cancellationPolicy} disabled readOnly>
                        {booking.cancellationOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground mt-2">
                        {booking.cancellationPolicy === 'flexible' && 'Guests can cancel up to 24 hours before check-in for a full refund'}
                        {booking.cancellationPolicy === 'moderate' && 'Guests can cancel up to 48 hours before check-in for a full refund'}
                        {booking.cancellationPolicy === 'strict' && 'Guests can cancel up to 7 days before check-in for a full refund'}
                        {booking.cancellationPolicy === 'super-strict' && 'Guests can cancel up to 30 days before check-in for a full refund'}
                      </p>
                    </div>

                    {/* <div>
                      <h3 className="text-lg font-bold mb-4">Security Deposit</h3>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">{config.currency.symbol}</span>
                        <input 
                          type="number" 
                          defaultValue={listing?.price?.fees?.securityDeposit || 0} 
                          className="w-full pl-8 pr-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Refunded within 7 days after check-out</p>
                    </div> */}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4">Additional Rules</h3>
                    <textarea 
                      rows="4" 
                      placeholder="Add any additional house rules or policies..."
                      defaultValue="Guests must respect neighbors and keep noise levels down. No unauthorized guests allowed. Please report any damages immediately."
                      className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Dangerous Zone - Always Visible */}
            <section className="bg-destructive/5 p-8 rounded-2xl border border-destructive/20 space-y-4">
              <div className="flex items-center gap-3 text-destructive">
                <Icon icon="lucide:circle-alert" className="text-2xl" />
                <h2 className="text-lg font-heading font-bold">Danger Zone</h2>
              </div>
              <p className="text-sm text-destructive/80 leading-relaxed">
                Once you delete a listing, there is no going back. All booking history, photos, and reviews associated with this property will be permanently removed.
              </p>
              <button className="px-6 py-2.5 bg-destructive text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all active:scale-95">
                Delete Listing
              </button>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
