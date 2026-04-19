import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { useFormatCurrency } from '../config/useAppConfig';
import { mockListings } from '../data/mockListings';

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
  const [showBookingModal, setShowBookingModal] = useState(false);
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

  // Calendar helper functions
  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
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

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setShowBookingModal(true);
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
                      const isBooked = [6, 7, 8, 17, 18, 19, 20, 26, 27].includes(dayInfo.day) && dayInfo.isCurrentMonth;
                      
                      // Check if this day is part of any booking
                      const bookingEvents = [
                        { startDay: 6, duration: 3, name: 'Siri Jakobsson', nights: '3 Nights', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                        { startDay: 17, duration: 4, name: 'Slavcho Karbashewski', nights: '4 Nights', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' },
                        { startDay: 26, duration: 2, name: 'Regina Pollastro', nights: '2 Nights', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' }
                      ];
                      
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
                          className={`border-r border-b border-border p-3 flex flex-col justify-between relative ${
                            !dayInfo.isCurrentMonth ? 'bg-muted/5' : ''
                          } ${
                            isBooked ? 'bg-primary/5' : ''
                          } ${
                            !isBooked && dayInfo.isCurrentMonth ? 'group cursor-pointer hover:bg-muted/30' : ''
                          }`}
                          onClick={() => !isBooked && dayInfo.isCurrentMonth && handleDateClick(dayInfo)}
                        >
                          <span className={`text-xs font-bold self-end ${
                            !dayInfo.isCurrentMonth ? 'text-muted-foreground/50' : ''
                          }`}>
                            {dayInfo.day}
                          </span>
                          
                          {(bookingDisplayInfo && bookingDisplayInfo.show) && (
                            <div 
                              className="absolute top-1/2 left-0 h-12 -translate-y-1/2 bg-white border border-border shadow-md rounded-lg flex items-center px-3 gap-3 z-10"
                              style={{ width: bookingDisplayInfo.width }}
                            >
                              <img src={currentBookingEvent.avatar} className="w-8 h-8 rounded-full border border-border" alt="Guest" />
                              <div className="overflow-hidden">
                                <p className="text-[10px] font-black truncate">{currentBookingEvent.name}</p>
                                <p className="text-[8px] text-muted-foreground tracking-widest uppercase">
                                  {bookingDisplayInfo.isMultiWeek ? `${currentBookingEvent.nights} →` : currentBookingEvent.nights}
                                </p>
                              </div>
                              <div className="ml-auto flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
                              </div>
                            </div>
                          )}
                          
                          {bookingContinuation && (
                            <div 
                              className="absolute top-1/2 left-0 h-12 -translate-y-1/2 bg-white border border-border shadow-md rounded-lg flex items-center px-3 gap-3 z-10"
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
                                {formatCurrency(selectedListing?.price?.nightly || 0)}
                              </span>
                              <Icon icon="lucide:plus" className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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

          {/* Booking Modal */}
          {showBookingModal && selectedDate && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-card rounded-2xl border border-border shadow-xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Add New Booking</h3>
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Icon icon="lucide:x" className="text-xl" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Listing Info */}
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={selectedListing?.images?.[0] || ''} 
                        alt={selectedListing?.title || ''} 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-bold text-sm">{selectedListing?.title || ''}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedListing?.location?.city}, {selectedListing?.location?.state}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Start Date</label>
                    <input 
                      type="date" 
                      value={selectedDate.date.toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(prev => ({ ...prev, date: new Date(e.target.value) }))}
                      className="w-full px-3 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary transition-all outline-none"
                      readOnly
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">End Date</label>
                    <input 
                      type="date" 
                      min={selectedDate.date.toISOString().split('T')[0]}
                      className="w-full px-3 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary transition-all outline-none"
                    />
                  </div>

                  {/* Guest Info */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Guest Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter guest name"
                      className="w-full px-3 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary transition-all outline-none"
                    />
                  </div>

                  {/* Guest Email */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Guest Email</label>
                    <input 
                      type="email" 
                      placeholder="guest@example.com"
                      className="w-full px-3 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary transition-all outline-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 py-2.5 bg-muted text-foreground rounded-xl font-bold text-sm hover:bg-muted/80 transition-all active:scale-95"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        // Handle booking creation logic here
                        console.log('Creating booking for:', {
                          listing: selectedListing?.title,
                          date: selectedDate.date,
                          // Add other form data
                        });
                        setShowBookingModal(false);
                      }}
                      className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-95"
                    >
                      Create Booking
                    </button>
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
