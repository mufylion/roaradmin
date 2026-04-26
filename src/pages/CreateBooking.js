import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { FormSection, InputField, SelectField, TextAreaField } from '../components/ListingForm';
import { useFormatCurrency, useAppConfig } from '../config/useAppConfig';
import propertiesService from '../services/propertiesService';
import usersService from '../services/usersService';
import bookingsService from '../services/bookingsService';

export default function CreateBooking() {
  const navigate = useNavigate();
  const formatCurrency = useFormatCurrency();
  const { config } = useAppConfig();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const queryPropertyId = searchParams.get('propertyId');
  const queryCheckIn = searchParams.get('checkIn');
  
  const [guestCount, setGuestCount] = useState(2);
  const [insuranceEnabled, setInsuranceEnabled] = useState(true);
  const [selectedGuest, setSelectedGuest] = useState('');
  const [selectedGuestId, setSelectedGuestId] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(queryPropertyId || '');
  const [checkInDate, setCheckInDate] = useState(queryCheckIn || '');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [bookingSource, setBookingSource] = useState('direct');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [properties, setProperties] = useState([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditMode = id && id !== 'undefined';
  const pageTitle = isEditMode ? 'Edit Booking' : 'Create New Booking';

  // Fetch properties on mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await propertiesService.fetchProperties();
        setProperties(data);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      }
    };
    fetchProperties();
  }, []);

  // Search users when query changes
  useEffect(() => {
    if (userSearchQuery && userSearchQuery.length >= 2) {
      const searchUsers = async () => {
        try {
          const data = await usersService.fetchUsers({ search: userSearchQuery });
          setFilteredUsers(data.users || []);
          setShowUserDropdown(true);
        } catch (err) {
          console.error('Failed to search users:', err);
        }
      };
      const timer = setTimeout(searchUsers, 500);
      return () => clearTimeout(timer);
    } else {
      setFilteredUsers([]);
      setShowUserDropdown(false);
    }
  }, [userSearchQuery]);

  const handleUserSelect = (user) => {
    setSelectedGuestId(user.id);
    setSelectedGuest(`${user.firstName} ${user.lastName}`);
    setUserSearchQuery('');
    setShowUserDropdown(false);
  };

  const calculateTotal = () => {
    const nights = checkInDate && checkOutDate ? 
      Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)) : 0;
    
    const listing = properties.find(p => p.id == selectedProperty);
    const nightlyRate = listing?.pricePerNight || 0;
    const insurance = insuranceEnabled ? 4500 : 0;
    const vat = Math.round((nightlyRate * nights) * (config.tax.vatRate / 100));
    
    return (nightlyRate * nights) + vat + insurance;
  };

  const handleConfirm = async () => {
    if (!selectedGuestId) {
      setError('Please search and select a guest from the dropdown list.');
      return;
    }
    if (!selectedProperty) {
      setError('Please select a property.');
      return;
    }
    if (!checkInDate || !checkOutDate) {
      setError('Please select both check-in and check-out dates.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const payload = {
        userId: selectedGuestId,
        propertyId: selectedProperty,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        numberOfGuests: guestCount,
        notes: specialRequests,
        status: 'confirmed',
        paymentStatus: 'paid'
      };

      if (isEditMode) {
        // await bookingsService.updateBooking(id, payload);
      } else {
        await bookingsService.createBooking(payload);
      }
      navigate('/bookings');
    } catch (err) {
      const data = err.response?.data;
      const errorMessage = data?.error || (data?.errors && data.errors.map(e => e.message).join(', ')) || data?.message || err.message || 'Failed to create booking';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title={pageTitle}
        description={isEditMode ? 'Modify booking details and manage reservation.' : 'Reserve a listing for a guest manually.'}
        backButton={{
          to: '/bookings',
          icon: 'lucide:arrow-left',
          ariaLabel: 'Back to bookings'
        }}
        actions={[
          {
            type: 'button',
            label: 'Cancel',
            onClick: () => navigate('/bookings')
          },
          {
            type: 'button',
            label: loading ? 'Processing...' : (isEditMode ? 'Update Booking' : 'Confirm Reservation'),
            variant: 'primary',
            onClick: handleConfirm,
            disabled: loading
          }
        ]}
      />

      <div className="flex-1 overflow-y-auto p-8">
        {error && (
          <div className="max-w-5xl mx-auto mb-6 bg-destructive/10 text-destructive p-4 rounded-xl text-sm font-bold">
            {error}
          </div>
        )}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <FormSection title="Guest Information" icon="lucide:user">
              <div className="space-y-2 relative">
                <InputField 
                  label="Search Guest"
                  placeholder="Type name or email (min 3 chars)..."
                  value={userSearchQuery || selectedGuest}
                  onChange={(e) => {
                    setUserSearchQuery(e.target.value);
                    if (!e.target.value) {
                      setSelectedGuest('');
                      setSelectedGuestId('');
                    }
                  }}
                  onFocus={() => setShowUserDropdown(true)}
                  icon="lucide:search"
                />
                
                {showUserDropdown && filteredUsers.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filteredUsers.map(user => (
                      <div
                        key={user.id}
                        onClick={() => handleUserSelect(user)}
                        className="p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                            <Icon icon="lucide:user" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FormSection>

            <FormSection title="Property & Dates" icon="lucide:house">
              <div className="space-y-4">
                <SelectField 
                  label="Select Property"
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                >
                  <option value="">Select a property...</option>
                  {properties.map(listing => (
                    <option key={listing.id} value={listing.id}>
                      {listing.name} - {listing.city}
                    </option>
                  ))}
                </SelectField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField 
                    label="Check-in Date"
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                  <InputField 
                    label="Check-out Date"
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Number of Guests</label>
                    <div className="flex items-center gap-3 bg-muted rounded-xl p-1">
                      <button 
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="w-8 h-8 flex items-center justify-center bg-card rounded-lg shadow-sm hover:bg-muted transition-colors"
                      >
                        <Icon icon="lucide:minus" />
                      </button>
                      <span className="flex-1 text-center font-bold">{guestCount}</span>
                      <button 
                        onClick={() => setGuestCount(guestCount + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-card rounded-lg shadow-sm hover:bg-muted transition-colors"
                      >
                        <Icon icon="lucide:plus" />
                      </button>
                    </div>
                  </div>
                  <SelectField 
                    label="Booking Source"
                    value={bookingSource}
                    onChange={(e) => setBookingSource(e.target.value)}
                  >
                    <option value="direct">Direct Admin Entry</option>
                    <option value="phone">Phone Inquiry</option>
                    <option value="walkin">Walk-in</option>
                  </SelectField>
                </div>
              </div>
            </FormSection>

            <FormSection title="Additional Details" icon="lucide:zap">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border/50">
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:shield-check" className="text-tertiary text-xl" />
                    <div>
                      <p className="text-sm font-bold">Include Insurance</p>
                      <p className="text-xs text-muted-foreground">Comprehensive damage protection plan</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setInsuranceEnabled(!insuranceEnabled)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      insuranceEnabled ? 'bg-tertiary' : 'bg-muted-foreground/30'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${insuranceEnabled ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
                <TextAreaField 
                  label="Special Requests / Notes"
                  placeholder="Add any specific guest requirements..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows="4"
                />
              </div>
            </FormSection>
          </div>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-lg sticky top-28">
              <h2 className="text-lg font-heading font-bold mb-6">Booking Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nightly Rate</span>
                  <span className="font-bold">
                    {formatCurrency(properties.find(p => p.id == selectedProperty)?.pricePerNight || 0)} × {checkInDate && checkOutDate ? Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)) : 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">VAT {config.tax.vatRate}%</span>
                  <span className="font-bold">
                    {formatCurrency(checkInDate && checkOutDate ? Math.round(((properties.find(p => p.id == selectedProperty)?.pricePerNight || 0) * Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))) * (config.tax.vatRate / 100)) : 0)}
                  </span>
                </div>
                {insuranceEnabled && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Insurance</span>
                    <span className="font-bold text-tertiary">+{formatCurrency(4500)}</span>
                  </div>
                )}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase">Total Amount</p>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(calculateTotal())}</p>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg font-bold">NGN</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleConfirm}
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  {loading && <Icon icon="lucide:loader-2" className="animate-spin" />}
                  {isEditMode ? 'Update Reservation' : 'Create Reservation'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
