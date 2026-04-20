import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { mockListings } from '../data/mockListings';
import { mockBookings } from '../data/mockBookings.js';
import { useFormatCurrency } from '../config/useAppConfig';

const ScheduleCard = ({ listing, onClick, formatCurrency }) => (
  <div 
    className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    onClick={() => onClick(listing)}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="text-lg font-heading font-bold mb-1">{listing.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          {listing.location.city}, {listing.location.state}
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Icon icon="lucide:users" className="text-muted-foreground" />
            <span>{listing.capacity.guests} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="lucide:bed" className="text-muted-foreground" />
            <span>{listing.capacity.bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="lucide:bath" className="text-muted-foreground" />
            <span>{listing.capacity.bathrooms} baths</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-primary">
          {formatCurrency(listing.price.nightly)}
        </div>
        <div className="text-xs text-muted-foreground">per night</div>
      </div>
    </div>
    
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
        listing.availability.status === 'active' 
          ? 'bg-tertiary/10 text-tertiary' 
          : 'bg-muted/50 text-muted-foreground'
      }`}>
        {listing.availability.status === 'active' ? 'Active' : 'Inactive'}
      </span>
      <span className="px-2 py-1 rounded-lg text-xs font-medium bg-muted/50 text-muted-foreground">
        {listing.type}
      </span>
    </div>
  </div>
);

export default function Schedule() {
  const formatCurrency = useFormatCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [guestCapacity, setGuestCapacity] = useState('all');
  const [selectedListing, setSelectedListing] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [listingDropdownOpen, setListingDropdownOpen] = useState(false);
  const [bedsFilter, setBedsFilter] = useState('all');

  // Get unique property types
  const propertyTypes = useMemo(() => {
    const types = [...new Set(mockListings.map(listing => listing.type))];
    return ['all', ...types];
  }, []);

  // Filter listings based on all criteria
  const filteredListings = useMemo(() => {
    return mockListings.filter(listing => {
      // Search query filter
      const matchesSearch = !searchQuery || 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Property type filter
      const matchesType = selectedType === 'all' || listing.type === selectedType;

      // Beds filter
      let matchesBeds = true;
      if (bedsFilter !== 'all') {
        const beds = listing.capacity.bedrooms;
        if (bedsFilter === '4') {
          matchesBeds = beds >= 4;
        } else {
          matchesBeds = beds === parseInt(bedsFilter);
        }
      }

      // Guest capacity filter
      let matchesCapacity = true;
      if (guestCapacity !== 'all') {
        const guests = listing.capacity.guests;
        switch (guestCapacity) {
          case 'small':
            matchesCapacity = guests <= 2;
            break;
          case 'medium':
            matchesCapacity = guests >= 3 && guests <= 6;
            break;
          case 'large':
            matchesCapacity = guests >= 7;
            break;
        }
      }

      return matchesSearch && matchesType && matchesBeds && matchesCapacity;
    });
  }, [searchQuery, selectedType, bedsFilter, guestCapacity]);

  // Function to get correct price for a specific date
  const getPriceForDate = (date, listing) => {
    if (!listing?.price) return 0;
    
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
    
    // Check seasonal pricing first
    if (listing.price.seasonal) {
      const dateStr = date.toISOString().split('T')[0];
      
      for (const [season, seasonData] of Object.entries(listing.price.seasonal)) {
        const startDate = new Date(seasonData.startDate);
        const endDate = new Date(seasonData.endDate);
        
        // Handle cross-year seasonal periods properly
        const currentYear = date.getFullYear();
        const startWithYear = new Date(seasonData.startDate);
        const endWithYear = new Date(seasonData.endDate);
        
        // Set year for start date
        startWithYear.setFullYear(currentYear);
        
        // For cross-year periods (like Dec 20 - Jan 5), end date should be in next year
        if (endWithYear.getMonth() < startWithYear.getMonth()) {
          endWithYear.setFullYear(currentYear + 1);
        } else {
          endWithYear.setFullYear(currentYear);
        }
        
        if (date >= startWithYear && date <= endWithYear) {
          return seasonData.rate;
        }
      }
    }
    
    // Use weekend pricing if applicable
    if (isWeekend && listing.price.weekend) {
      return listing.price.weekend;
    }
    
    // Default to nightly rate
    return listing.price.nightly || 0;
  };

  // Calendar helper functions
  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Check if a date is booked for selected listing using real mockBookings data
  const isDateBookedFromMockData = (date, listingId) => {
    const dateString = date.toISOString().split('T')[0];
    return mockBookings.some(booking => {
      if (booking.listing.id !== listingId) return false;
      
      const checkInDate = new Date(booking.dates.checkIn);
      const checkOutDate = new Date(booking.dates.checkOut);
      const currentDate = new Date(dateString);
      
      // Check if current date is between check-in and check-out (inclusive of check-in, exclusive of check-out)
      return currentDate >= checkInDate && currentDate < checkOutDate;
    });
  };

  // Generate booking events from real mockBookings data for current month and listing
  const getBookingEventsForMonth = (listingId, month) => {
    const events = [];
    const monthYear = month.toISOString().slice(0, 7); // YYYY-MM format
    
    mockBookings.forEach(booking => {
      if (booking.listing.id !== listingId) return;
      
      const checkInDate = new Date(booking.dates.checkIn);
      const checkOutDate = new Date(booking.dates.checkOut);
      
      // Check if booking overlaps with current month
      if (checkOutDate > new Date(monthYear + '-01') && checkInDate < new Date(monthYear + '-31')) {
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        // Find first day of booking in current month
        let firstDayInMonth = checkInDate;
        if (checkInDate.getMonth() !== month.getMonth()) {
          // Booking starts before current month, use first day of current month
          firstDayInMonth = new Date(month.getFullYear(), month.getMonth(), 1);
        }
        
        events.push({
          startDay: firstDayInMonth.getDate(),
          duration: nights,
          name: booking.guest.name || 'Guest',
          nights: `${nights} Nights`,
          avatar: booking.guest.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
          checkInDate: booking.dates.checkIn,
          checkOutDate: booking.dates.checkOut,
          bookingId: booking.id
        });
      }
    });
    
    return events;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Helper function to find booking for a specific date
  const getBookingForDate = (date, listingId) => {
    const dateString = date.toISOString().split('T')[0];
    return mockBookings.find(booking => 
      booking.listing.id === listingId &&
      booking.dates.checkIn <= dateString &&
      booking.dates.checkOut > dateString
    );
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    
    // Check if there's an existing booking for this date
    const existingBooking = getBookingForDate(day.date, selectedListing?.id);
    
    if (existingBooking) {
      // Navigate to booking details page
      window.location.href = `/bookings/${existingBooking.id}`;
    } else {
      // Navigate to create booking page with pre-filled data
      const bookingUrl = `/bookings/create?propertyId=${selectedListing?.id}&checkIn=${day.date.toISOString().split('T')[0]}`;
      window.location.href = bookingUrl;
    }
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Previous month padding
    const prevMonth = new Date(year, month - 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, daysInPrevMonth - i)
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i)
      });
    }

    // Next month padding
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }

    return days;
  };

  return (
    <PageLayout>
      {/* Header with Filters */}
      <header className="h-auto bg-card border-b border-border px-8 py-6 shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading font-bold">Schedule</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage property listings and booking schedules
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Property Listing Dropdown */}
            <div className="relative">
              <button
                onClick={() => setListingDropdownOpen(!listingDropdownOpen)}
                className="w-full px-4 py-2.5 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer flex items-center justify-between"
              >
                <span className="truncate">
                  {selectedListing ? selectedListing.title : 'Select Property'}
                </span>
                <Icon icon="lucide:chevron-down" className={`transition-transform ${listingDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {listingDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-2">
                    {filteredListings.length === 0 ? (
                      <div className="text-center py-4 text-sm text-muted-foreground">
                        No listings found
                      </div>
                    ) : (
                      filteredListings.map(listing => (
                        <button
                          key={listing.id}
                          onClick={() => {
                            setSelectedListing(listing);
                            setListingDropdownOpen(false);
                          }}
                          className="w-full text-left p-3 hover:bg-muted rounded-lg transition-colors"
                        >
                          <p className="font-medium text-sm">{listing.title}</p>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

           

            {/* Property Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2.5 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>

        

           

            {/* Number of Beds Filter */}
            <select
              value={bedsFilter}
              onChange={(e) => setBedsFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer"
            >
              <option value="all">All Beds</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3">3 Beds</option>
              <option value="4">4+ Beds</option>
            </select>

            {/* Guest Capacity Filter */}
            <select
              value={guestCapacity}
              onChange={(e) => setGuestCapacity(e.target.value)}
              className="w-full px-4 py-2.5 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer"
            >
              <option value="all">All Sizes</option>
              <option value="small">Small (1-2 guests)</option>
              <option value="medium">Medium (3-6 guests)</option>
              <option value="large">Large (7+ guests)</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredListings.length} of {mockListings.length} listings
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
                setBedsFilter('all');
                setGuestCapacity('all');
              }}
              className="text-sm text-primary hover:opacity-80 transition-opacity"
            >
              Clear all filters
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* Availability Calendar Section */}
          {!selectedListing ? (
            <div className="text-center py-12">
              <Icon icon="lucide:calendar" className="text-4xl text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-heading font-bold mb-2">Select a Property</h3>
              <p className="text-sm text-muted-foreground">
                Choose a property from the dropdown above to view its booking calendar
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img src={selectedListing?.images?.[0] || ''} alt={selectedListing?.title || ''} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                      <Icon icon="lucide:calendar" className="text-primary" />
                      Availability & Booking Calendar
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">Showing bookings for <span className="font-bold text-foreground">{selectedListing?.title || ''}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-card border border-border rounded-xl p-1">
                    <button 
                      onClick={() => navigateMonth('prev')}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <Icon icon="lucide:chevron-left" />
                    </button>
                    <span className="px-4 text-sm font-bold">{getMonthName(currentMonth)}</span>
                    <button 
                      onClick={() => navigateMonth('next')}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <Icon icon="lucide:chevron-right" />
                    </button>
                  </div>
                  <button 
                    onClick={() => setSelectedListing(null)}
                    className="px-4 py-2 bg-primary text-primary-foreground text-[10px] font-black rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="flex-1 overflow-x-auto">
                <div className="min-w-[1000px]">
                  {/* Days Header */}
                  <div className="grid grid-cols-7 border-b border-border bg-muted/10">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <div key={day} className={`py-4 text-center text-xs font-black uppercase tracking-widest text-muted-foreground ${i < 6 ? 'border-r border-border' : ''}`}>
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Rows */}
                  <div className="grid grid-cols-7 grid-rows-5 h-[600px]">
                    {generateCalendarDays().map((dayInfo, index) => {
                      // Check if this day is booked using real mockBookings data
                      const isBooked = selectedListing && isDateBookedFromMockData(dayInfo.date, selectedListing.id);
                      
                      // Check if this day is part of any booking using real mockBookings data
                      const bookingEvents = selectedListing ? getBookingEventsForMonth(selectedListing.id, currentMonth) : [];
                      
                      // Check if this is the start of a booking event
                      const currentBookingEvent = bookingEvents.find(event => 
                        dayInfo.day === event.startDay && dayInfo.isCurrentMonth
                      );
                      
                      // Check if this day is a continuation of a multi-week booking
                      const getBookingContinuation = (dayIndex) => {
                        const dayOfWeek = dayIndex % 7;
                        
                        for (const event of bookingEvents) {
                          const startDayIndex = generateCalendarDays().findIndex(day => 
                            day.day === event.startDay && day.isCurrentMonth
                          );
                          
                          if (startDayIndex !== -1) {
                            const startDayOfWeek = startDayIndex % 7;
                            const remainingDaysInFirstWeek = 7 - startDayOfWeek;
                            
                            // Check if this day is in continuation period
                            if (dayIndex > startDayIndex && dayIndex < startDayIndex + event.duration) {
                              const currentDayOfBooking = dayIndex - startDayIndex;
                              
                              // Check if we're in a new week
                              if (currentDayOfBooking >= remainingDaysInFirstWeek) {
                                const daysIntoSecondWeek = currentDayOfBooking - remainingDaysInFirstWeek;
                                const remainingDaysInSecondWeek = Math.min(event.duration - currentDayOfBooking, 7);
                                
                                if (daysIntoSecondWeek < remainingDaysInSecondWeek) {
                                  return {
                                    event,
                                    isContinuation: true,
                                    width: `${remainingDaysInSecondWeek * 100}%`,
                                    isLastSegment: currentDayOfBooking + remainingDaysInSecondWeek >= event.duration
                                  };
                                }
                              }
                            }
                          }
                        }
                        return null;
                      };
                      
                      const bookingContinuation = getBookingContinuation(index);
                      
                      // Calculate if booking spans multiple weeks and handle display accordingly
                      const getBookingDisplayInfo = (event, dayIndex) => {
                        const dayOfWeek = dayIndex % 7;
                        const remainingDaysInWeek = 7 - dayOfWeek;
                        const eventDuration = event.duration;
                        
                        if (eventDuration <= remainingDaysInWeek) {
                          // Booking fits within current week
                          return {
                            width: `${eventDuration * 100}%`,
                            show: true
                          };
                        } else {
                          // Booking spans multiple weeks, only show first week portion
                          return {
                            width: `${remainingDaysInWeek * 100}%`,
                            show: true,
                            isMultiWeek: true
                          };
                        }
                      };
                      
                      const bookingDisplayInfo = currentBookingEvent ? getBookingDisplayInfo(currentBookingEvent, index) : null;
                      
                      return (
                        <div 
                          key={index}
                          className={`relative flex flex-col items-center justify-center p-2 border border-border/20 ${
                            dayInfo.isCurrentMonth ? 'hover:bg-muted/20' : ''
                          } ${
                            dayInfo.isCurrentMonth ? 'group cursor-pointer hover:bg-muted/30' : ''
                          }`}
                          onClick={() => dayInfo.isCurrentMonth && handleDateClick(dayInfo)}
                        >
                          <span className={`text-xs font-bold self-end ${
                            !dayInfo.isCurrentMonth ? 'text-muted-foreground/50' : ''
                          }`}>
                            {dayInfo.day}
                          </span>
                          
                          {(bookingDisplayInfo && bookingDisplayInfo.show) && (
                            <div 
                              className="absolute bottom-1 left-0 h-12 bg-white border border-border shadow-md rounded-lg flex items-center px-3 gap-3 z-10 cursor-pointer hover:shadow-lg transition-shadow"
                              style={{ width: bookingDisplayInfo.width }}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent calendar day click
                                window.location.href = `/bookings/${currentBookingEvent.bookingId}`;
                              }}
                            >
                              <img src={currentBookingEvent.avatar} className="w-8 h-8 rounded-full border border-border" alt="Guest" />
                              <div className="overflow-hidden">
                                <p className="text-[10px] font-black truncate">{currentBookingEvent.name}</p>
                                <p className="text-[8px] text-muted-foreground tracking-widest uppercase">
                                  {bookingDisplayInfo.isMultiWeek ? `${currentBookingEvent.nights} ->` : currentBookingEvent.nights}
                                </p>
                              </div>
                              <div className="ml-auto flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
                              </div>
                            </div>
                          )}
                          
                          {bookingContinuation && (
                            <div 
                              className="absolute bottom-1 left-0 h-12 bg-white border border-border shadow-md rounded-lg flex items-center px-3 gap-3 z-10"
                              style={{ width: bookingContinuation.width }}
                            >
                              <div className="overflow-hidden flex-1">
                                <p className="text-[10px] font-black truncate">{bookingContinuation.event.name}</p>
                                <p className="text-[8px] text-muted-foreground tracking-widest uppercase">
                                  {bookingContinuation.isLastSegment ? bookingContinuation.event.nights : '→'}
                                </p>
                              </div>
                              <div className="ml-auto flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
                              </div>
                            </div>
                          )}
                          
                          {!isBooked && dayInfo.isCurrentMonth && (
                            <>
                              <span className="text-[10px] font-black text-tertiary">
                                {formatCurrency(getPriceForDate(dayInfo.date, selectedListing))}
                              </span>
                              <Link 
                                to="/bookings/create"
                                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Icon icon="lucide:plus" />
                              </Link>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
