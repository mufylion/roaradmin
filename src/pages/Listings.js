import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { useFormatCurrency } from '../config/useAppConfig';
import { mockListings } from '../data/mockListings';
import { mockBookings } from '../data/mockBookings.js';

const ListingCard = ({ 
  image, 
  title, 
  price, 
  location, 
  status, 
  statLabel, 
  statValue, 
  reviewLabel, 
  reviewValue,
  isDraft = false,
  id,
  onClick,
  formatCurrency
}) => (
  <div 
    className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    onClick={() => onClick({ image, title, price, location, status, statLabel, statValue, reviewLabel, reviewValue, isDraft, id })}
  >
    <div className={`relative h-56 overflow-hidden ${isDraft ? 'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100' : ''}`}>
      <img 
        src={image} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        alt={title} 
      />
      <div className="absolute top-4 left-4">
        <span className={`px-3 py-1 ${isDraft ? 'bg-muted-foreground' : 'bg-tertiary/90'} text-white text-[10px] font-black rounded-full uppercase backdrop-blur-md shadow-lg`}>
          {status}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-heading font-bold group-hover:text-primary transition-colors">{title}</h3>
        <span className="text-primary font-black">{price}</span>
      </div>
      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
        <Icon icon="lucide:map-pin" className="text-primary" />
        {location}
      </p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted/50 p-3 rounded-xl text-center border border-transparent hover:border-primary/20 transition-colors">
          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{statLabel}</p>
          <p className="text-sm font-bold">{statValue}</p>
        </div>
        <div className="bg-muted/50 p-3 rounded-xl text-center border border-transparent hover:border-primary/20 transition-colors">
          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{reviewLabel}</p>
          <p className="text-sm font-bold">{reviewValue}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link to={`/listings/edit/${id}`} className="flex-1 py-3 bg-primary text-primary-foreground text-xs font-black rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest text-center">
          {isDraft ? 'Finish Setup' : 'Edit Details'}
        </Link>
        <button className="px-4 py-3 bg-muted text-foreground text-xs font-black rounded-xl hover:bg-muted/80 transition-all active:scale-95 uppercase tracking-widest">
          <Icon icon="lucide:trash-2" className="text-lg" />
        </button>
      </div>
    </div>
  </div>
);

export default function Listings() {
  const formatCurrency = useFormatCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [locationFilter, setLocationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Filter listings based on search query
  const filteredListings = mockListings.filter(listing =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.type.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleListingClick = (listingData) => {
    // Find the full listing data to get the complete price object
    const fullListing = mockListings.find(listing => listing.id === listingData.id);
    setSelectedListing(fullListing || listingData);
  };

  // Function to get the correct price for a specific date
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
        
        // Set the year for start date
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

  // Check if a date is booked for the selected listing using real mockBookings data
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

  // Generate booking events from real mockBookings data for the current month and listing
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
        
        // Find the first day of the booking in the current month
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
      <>
        <PageHeader
          title="Manage Listings"
          description="Add, edit, and optimize your property portfolio."
          actions={[
            {
              type: 'link',
              label: 'Add New Listing',
              shortLabel: 'Add Listing',
              icon: 'lucide:plus',
              to: '/listings/add-new',
              variant: 'primary'
            }
          ]}
        />

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
              <select className="bg-muted border border-transparent rounded-xl text-xs px-4 py-2 font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer min-w-[120px]">
                <option>All Locations</option>
                <option>New York</option>
                <option>California</option>
                <option>Colorado</option>
              </select>
              <select className="bg-muted border border-transparent rounded-xl text-xs px-4 py-2 font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer min-w-[120px]">
                <option>Status: All</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Inactive</option>
              </select>
              <button className="p-2.5 bg-muted rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:scale-95 shrink-0">
                <Icon icon="lucide:funnel" className="text-xl" />
              </button>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <ListingCard 
                key={listing.id}
                image={listing.images[0]}
                title={listing.title}
                price={`${formatCurrency(listing.price.nightly)}/night`}
                location={`${listing.location.city}, ${listing.location.state}`}
                status={listing.availability.status === 'active' ? 'Active' : 'Draft'}
                statLabel="Occupancy"
                statValue={`${listing.stats.occupancy}%`}
                reviewLabel="Reviews"
                reviewValue={`${listing.ratings.overall} (${listing.reviews.length})`}
                id={listing.id}
                isDraft={listing.availability.status === 'draft'}
                onClick={handleListingClick}
                formatCurrency={formatCurrency}
              />
            ))}
          </div>

          {/* Availability Calendar Section */}
          {selectedListing && (
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col mb-8">
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
                            
                            // Check if this day is in the continuation period
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
                                e.stopPropagation(); // Prevent the calendar day click
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
      </>
    </PageLayout>
  );
}
