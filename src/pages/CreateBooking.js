import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { FormSection, InputField, SelectField, TextAreaField } from '../components/ListingForm';
import { useFormatCurrency } from '../config/useAppConfig';
import { mockUsers } from '../data/mockUsers.js';

export default function CreateBooking() {
  const formatCurrency = useFormatCurrency();
  const { id } = useParams();
  const [guestCount, setGuestCount] = useState(2);
  const [insuranceEnabled, setInsuranceEnabled] = useState(true);
  const [selectedGuest, setSelectedGuest] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [bookingSource, setBookingSource] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [checkInMonth, setCheckInMonth] = useState(new Date()); // Current month
  const [checkOutMonth, setCheckOutMonth] = useState(new Date()); // Current month
  
  // User search and new guest states
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState('');
  const [showNewGuestModal, setShowNewGuestModal] = useState(false);
  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: ''
  });
  
  const isEditMode = id && id !== 'undefined';
  const pageTitle = isEditMode ? 'Edit Booking' : 'Create New Booking';

  // Load booking data for edit mode
  useEffect(() => {
    if (isEditMode) {
      // In a real app, you would fetch booking data here
      // For demo purposes, we'll use mock data
      const mockBookingData = {
        'BK-9021': {
          guestCount: 4,
          selectedGuest: 'John Doe',
          selectedProperty: 'ocean-breeze',
          checkInDate: '2024-12-15',
          checkOutDate: '2024-12-18',
          bookingSource: 'direct',
          specialRequests: 'Late check-in requested, please prepare room'
        }
      };
      
      const bookingData = mockBookingData[id];
      if (bookingData) {
        setGuestCount(bookingData.guestCount);
        setSelectedGuest(bookingData.selectedGuest);
        setSelectedProperty(bookingData.selectedProperty);
        setCheckInDate(bookingData.checkInDate);
        setCheckOutDate(bookingData.checkOutDate);
        setBookingSource(bookingData.bookingSource);
        setSpecialRequests(bookingData.specialRequests);
      }
    }
  }, [id]);

  // User search functionality
  useEffect(() => {
    if (userSearchQuery) {
      const filtered = mockUsers.filter(user => 
        user.role === 'guest' && (
          user.profile.firstName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
          user.profile.lastName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
          user.contact.email.toLowerCase().includes(userSearchQuery.toLowerCase())
        )
      );
      setFilteredUsers(filtered);
      setShowUserDropdown(true);
    } else {
      setFilteredUsers([]);
      setShowUserDropdown(false);
    }
  }, [userSearchQuery]);

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedGuestId(user.id);
    setSelectedGuest(`${user.profile.firstName} ${user.profile.lastName}`);
    setUserSearchQuery('');
    setShowUserDropdown(false);
  };

  // Handle new guest creation
  const handleCreateNewGuest = () => {
    if (newGuest.firstName && newGuest.lastName && newGuest.email) {
      // In a real app, you would save this to the database
      const newUser = {
        id: `user-${Date.now()}`,
        profile: {
          firstName: newGuest.firstName,
          lastName: newGuest.lastName,
          avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 50)}.jpg`,
          location: newGuest.location || 'Unknown'
        },
        contact: {
          email: newGuest.email,
          phone: newGuest.phone || '+1 (555) 000-0000'
        },
        role: 'guest',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        verification: {
          email: true,
          phone: false,
          identity: false
        },
        stats: {
          totalBookings: 0,
          averageRating: 0,
          responseRate: 0,
          totalSpent: 0
        }
      };
      
      // Add to mock users (in real app, this would be an API call)
      mockUsers.push(newUser);
      
      // Select the new guest
      handleUserSelect(newUser);
      
      // Reset form and close modal
      setNewGuest({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: ''
      });
      setShowNewGuestModal(false);
    }
  };

  // Sample booked dates for demonstration
  const bookedDates = [
    '2024-10-12', '2024-10-13', '2024-10-14',
    '2024-10-20', '2024-10-21', '2024-10-25', '2024-10-26',
    '2024-11-05', '2024-11-06', '2024-11-07',
    '2024-11-15', '2024-11-16', '2024-11-22'
  ];

  const calculateTotal = () => {
    const nights = checkInDate && checkOutDate ? 
      Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)) : 0;
    const nightlyRate = 35000; // Naira
    const cautionFee = 25000; // Naira - Refundable caution fee
    const insurance = insuranceEnabled ? 4500 : 0; // Naira
    
    // VAT 7.5% on total nightly rate only
    const vat = Math.round((nightlyRate * nights) * 0.075);
    
    return (nightlyRate * nights) + cautionFee + vat + insurance;
  };

  const isDateBooked = (dateString) => {
    return bookedDates.includes(dateString);
  };

  const navigateMonth = (type, direction) => {
    if (type === 'checkin') {
      const newMonth = new Date(checkInMonth);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      setCheckInMonth(newMonth);
    } else {
      const newMonth = new Date(checkOutMonth);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      setCheckOutMonth(newMonth);
    }
  };

  const generateCalendarDays = (type = 'preview') => {
    let currentDate;
    if (type === 'checkin') {
      currentDate = checkInMonth;
    } else if (type === 'checkout') {
      currentDate = checkOutMonth;
    } else {
      currentDate = new Date(2024, 10, 1); // November for preview
    }
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${type}-${i}`} className="p-2"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isBooked = isDateBooked(dateString);
      let isSelected = false;
      
      if (type === 'checkin') {
        isSelected = checkInDate === dateString;
      } else if (type === 'checkout') {
        isSelected = checkOutDate === dateString;
      } else {
        isSelected = checkInDate === dateString || checkOutDate === dateString;
      }
      
      days.push(
        <div
          key={`${type}-${day}`}
          className={`
            p-2 rounded-lg text-sm font-medium cursor-pointer transition-colors
            ${isBooked ? 'bg-destructive text-destructive-foreground' : 
              isSelected ? 'bg-primary text-primary-foreground' : 
                'hover:bg-muted text-foreground'}
          `}
          onClick={() => {
            if (!isBooked) {
              if (type === 'checkin') {
                setCheckInDate(dateString);
              } else if (type === 'checkout') {
                setCheckOutDate(dateString);
              } else {
                if (!checkInDate) {
                  setCheckInDate(dateString);
                } else if (!checkOutDate) {
                  setCheckOutDate(dateString);
                }
              }
            }
          }}
        >
          {day}
        </div>
      );
    }
    
    return days;
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
            onClick: () => window.history.back()
          },
          {
            type: 'button',
            label: isEditMode ? 'Update Booking' : 'Confirm Reservation',
            shortLabel: isEditMode ? 'Update' : 'Confirm',
            variant: 'primary'
          }
        ]}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Guest Selection */}
            <FormSection title="Guest Information" icon="lucide:user">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 relative">
                  <InputField 
                    label="Select Guest"
                    placeholder="Search by name or email..."
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
                  
                  {/* User Dropdown */}
                  {showUserDropdown && filteredUsers.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                      {filteredUsers.map(user => (
                        <div
                          key={user.id}
                          onClick={() => handleUserSelect(user)}
                          className="p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            <img src={user.profile.avatar} className="w-8 h-8 rounded-full" alt={user.profile.firstName} />
                            <div className="flex-1">
                              <p className="text-sm font-bold">{user.profile.firstName} {user.profile.lastName}</p>
                              <p className="text-xs text-muted-foreground">{user.contact.email}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-end">
                  <button 
                    onClick={() => setShowNewGuestModal(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-border rounded-xl text-sm font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all"
                  >
                    <Icon icon="lucide:plus" className="text-lg" />
                    <span>Add New Guest</span>
                  </button>
                </div>
              </div>
            </FormSection>

            {/* Property Selection */}
            <FormSection title="Property & Dates" icon="lucide:house">
              <div className="space-y-4">
                <SelectField 
                  label="Select Property"
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                >
                  <option value="">Select a property...</option>
                  <option value="ocean-breeze">Ocean Breeze Villa - Malibu, CA</option>
                  <option value="mountain-retreat">Mountain Retreat - Aspen, CO</option>
                  <option value="urban-loft">Urban Loft - New York, NY</option>
                  <option value="lakeside-cabin">Lakeside Cabin - Tahoe, NV</option>
                </SelectField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Check-in</label>
                    <div className="bg-card p-4 rounded-xl border border-border">
                      <div className="flex items-center justify-between mb-4">
                        <button 
                          onClick={() => navigateMonth('checkin', 'prev')}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Icon icon="lucide:chevron-left" className="text-lg" />
                        </button>
                        <span className="text-sm font-bold text-muted-foreground">
                          {checkInMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button 
                          onClick={() => navigateMonth('checkin', 'next')}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Icon icon="lucide:chevron-right" className="text-lg" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center mb-4">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                          <div key={i} className="text-xs font-bold text-muted-foreground">{day}</div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {generateCalendarDays('checkin')}
                      </div>
                      
                      <div className="mt-2 p-2 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 text-xs">
                          <div className="w-3 h-3 bg-destructive rounded-full"></div>
                          <span className="text-muted-foreground">Booked</span>
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">Selected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Check-out</label>
                    <div className="bg-card p-4 rounded-xl border border-border">
                      <div className="flex items-center justify-between mb-4">
                        <button 
                          onClick={() => navigateMonth('checkout', 'prev')}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Icon icon="lucide:chevron-left" className="text-lg" />
                        </button>
                        <span className="text-sm font-bold text-muted-foreground">
                          {checkOutMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button 
                          onClick={() => navigateMonth('checkout', 'next')}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Icon icon="lucide:chevron-right" className="text-lg" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center mb-4">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                          <div key={i} className="text-xs font-bold text-muted-foreground">{day}</div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {generateCalendarDays('checkout')}
                      </div>
                      
                      <div className="mt-2 p-2 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 text-xs">
                          <div className="w-3 h-3 bg-destructive rounded-full"></div>
                          <span className="text-muted-foreground">Booked</span>
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">Selected</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    <option value="">Select source...</option>
                    <option value="direct">Direct Admin Entry</option>
                    <option value="phone">Phone Inquiry</option>
                    <option value="walkin">Walk-in</option>
                    <option value="partner">Partner Referral</option>
                  </SelectField>
                </div>
              </div>
            </FormSection>

            {/* Additional Options */}
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
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        insuranceEnabled ? 'right-1' : 'left-1'
                      }`}
                    ></div>
                  </button>
                </div>
                <TextAreaField 
                  label="Special Requests / Notes"
                  placeholder="Add any specific guest requirements or internal notes here..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows="4"
                />
              </div>
            </FormSection>
          </div>

          {/* Right Column: Summary & Actions */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-lg sticky top-28">
              <h2 className="text-lg font-heading font-bold mb-6">Booking Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nightly Rate</span>
                  <span className="font-bold">{formatCurrency(35000)} × {checkInDate && checkOutDate ? 
                    Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)) : 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Refundable Caution Fee</span>
                  <span className="font-bold">{formatCurrency(25000)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">VAT 7.5%</span>
                  <span className="font-bold">{formatCurrency(
                    checkInDate && checkOutDate ? 
                    Math.round((35000 * Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))) * 0.075) : 0
                  )}</span>
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
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(calculateTotal())}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg font-bold">NGN</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10">
                  <Icon icon="lucide:info" className="text-primary shrink-0" />
                  <p className="text-xs text-primary font-medium">A confirmation email will be sent to guest immediately after booking.</p>
                </div>
                <button className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
                  Create Reservation
                </button>
                <button className="w-full py-3.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
                  Save as Draft
                </button>
              </div>

                          </div>
          </div>
        </div>
      </div>

      {/* New Guest Modal */}
      {showNewGuestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Add New Guest</h2>
              <button
                onClick={() => setShowNewGuestModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon icon="lucide:x" className="text-lg" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">First Name</label>
                  <input
                    type="text"
                    value={newGuest.firstName}
                    onChange={(e) => setNewGuest({...newGuest, firstName: e.target.value})}
                    className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Last Name</label>
                  <input
                    type="text"
                    value={newGuest.lastName}
                    onChange={(e) => setNewGuest({...newGuest, lastName: e.target.value})}
                    className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({...newGuest, email: e.target.value})}
                  className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                <input
                  type="tel"
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Location</label>
                <input
                  type="text"
                  value={newGuest.location}
                  onChange={(e) => setNewGuest({...newGuest, location: e.target.value})}
                  className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                  placeholder="New York, NY"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewGuestModal(false)}
                className="flex-1 py-3 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewGuest}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
              >
                Add Guest
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
