import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { useFormatCurrency } from '../config/useAppConfig';
import propertiesService from '../services/propertiesService';
import bookingsService from '../services/bookingsService';

export default function Schedule() {
  const navigate = useNavigate();
  const formatCurrency = useFormatCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [guestCapacity, setGuestCapacity] = useState('all');
  const [selectedListing, setSelectedListing] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [listingDropdownOpen, setListingDropdownOpen] = useState(false);
  const [bedsFilter, setBedsFilter] = useState('all');

  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [propsData, bookingsData] = await Promise.all([
          propertiesService.fetchProperties(),
          bookingsService.fetchBookings()
        ]);
        setProperties(propsData);
        setBookings(bookingsData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get unique property types
  const propertyTypes = useMemo(() => {
    const types = [...new Set(properties.map(p => p.type))].filter(Boolean);
    return ['all', ...types];
  }, [properties]);

  // Filter listings based on criteria
  const filteredListings = useMemo(() => {
    return properties.filter(listing => {
      const matchesSearch = !searchQuery ||
        listing.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.city?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'all' || listing.type === selectedType;

      let matchesBeds = true;
      if (bedsFilter !== 'all') {
        const beds = listing.bedrooms || 0;
        matchesBeds = bedsFilter === '4' ? beds >= 4 : beds === parseInt(bedsFilter);
      }

      let matchesCapacity = true;
      if (guestCapacity !== 'all') {
        const guests = listing.guests || 0;
        if (guestCapacity === 'small') matchesCapacity = guests <= 2;
        else if (guestCapacity === 'medium') matchesCapacity = guests >= 3 && guests <= 6;
        else if (guestCapacity === 'large') matchesCapacity = guests >= 7;
      }

      return matchesSearch && matchesType && matchesBeds && matchesCapacity;
    });
  }, [properties, searchQuery, selectedType, bedsFilter, guestCapacity]);

  const getPriceForDate = (date, listing) => {
    return listing?.pricePerNight || 0;
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isDateBooked = (date, listingId) => {
    const dateString = date.toISOString().split('T')[0];
    return bookings.some(booking => {
      if (booking.propertyId != listingId) return false;
      const checkIn = booking.checkInDate?.split('T')[0];
      const checkOut = booking.checkOutDate?.split('T')[0];
      return dateString >= checkIn && dateString <= checkOut;
    });
  };

  const getBookingEventsForMonth = (listingId, month) => {
    const events = [];
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    bookings.forEach(booking => {
      if (booking.propertyId != listingId) return;

      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);

      if (checkOut > firstDay && checkIn < lastDay) {
        // Calculate duration including checkout day
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const duration = nights + 1; 
        
        let startDayInMonth = checkIn;
        if (checkIn < firstDay) {
          startDayInMonth = firstDay;
        }

        events.push({
          startDay: startDayInMonth.getDate(),
          duration: duration,
          name: booking.user?.firstName ? `${booking.user.firstName} ${booking.user.lastName}` : 'Guest Booking',
          avatar: booking.user?.profile?.avatar || '',
          bookingId: booking.id
        });
      }
    });

    return events;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(direction === 'prev' ? prev.getMonth() - 1 : prev.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateClick = (day) => {
    if (!selectedListing) return;
    const dateStr = day.date.toISOString().split('T')[0];
    
    // Use the same logic as isDateBooked to find the booking
    const booking = bookings.find(b => {
      if (b.propertyId != selectedListing.id) return false;
      const bStart = b.checkInDate?.split('T')[0];
      const bEnd = b.checkOutDate?.split('T')[0];
      return dateStr >= bStart && dateStr < bEnd;
    });
    
    if (booking) {
      console.log('Found booking:', booking);
      navigate(`/bookings/${booking.id}`);
    } else {
      console.log('No booking found for date:', dateStr);
      navigate(`/bookings/create?propertyId=${selectedListing.id}&checkIn=${dateStr}`);
    }
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Prev month padding
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isCurrentMonth: false, date: new Date(year, month - 1, prevMonthLastDay - i) });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
    }

    // Next month padding
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, isCurrentMonth: false, date: new Date(year, month + 1, i) });
    }

    return days;
  };

  return (
    <PageLayout>
      <header className="h-auto bg-card border-b border-border px-8 py-6 shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading font-bold">Schedule</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage property availability and booking schedules</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative">
              <button
                onClick={() => setListingDropdownOpen(!listingDropdownOpen)}
                className="w-full px-4 py-2.5 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer flex items-center justify-between"
              >
                <span className="truncate">{selectedListing ? selectedListing.name : 'Select Property'}</span>
                <Icon icon="lucide:chevron-down" className={`transition-transform ${listingDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {listingDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-2">
                    {filteredListings.map(listing => (
                      <button
                        key={listing.id}
                        onClick={() => { setSelectedListing(listing); setListingDropdownOpen(false); }}
                        className="w-full text-left p-3 hover:bg-muted rounded-lg transition-colors"
                      >
                        <p className="font-medium text-sm">{listing.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full px-4 py-2.5 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer">
              {propertyTypes.map(type => <option key={type} value={type}>{type === 'all' ? 'All Types' : type}</option>)}
            </select>

            <select value={bedsFilter} onChange={(e) => setBedsFilter(e.target.value)} className="w-full px-4 py-2.5 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer">
              <option value="all">All Beds</option>
              {[1, 2, 3].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Bed' : 'Beds'}</option>)}
              <option value="4">4+ Beds</option>
            </select>

            <select value={guestCapacity} onChange={(e) => setGuestCapacity(e.target.value)} className="w-full px-4 py-2.5 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer">
              <option value="all">All Sizes</option>
              <option value="small">Small (1-2)</option>
              <option value="medium">Medium (3-6)</option>
              <option value="large">Large (7+)</option>
            </select>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {!selectedListing ? (
            <div className="text-center py-12">
              <Icon icon="lucide:calendar" className="text-4xl text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-heading font-bold mb-2">Select a Property</h3>
              <p className="text-sm text-muted-foreground">Choose a property to view its booking calendar</p>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                    {selectedListing.images?.[0] ? <img src={selectedListing.images[0]} className="w-full h-full object-cover" /> : <Icon icon="lucide:image" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold">{selectedListing.name}</h2>
                    <p className="text-xs text-muted-foreground">Schedule for {getMonthName(currentMonth)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-card border border-border rounded-xl p-1">
                    <button onClick={() => navigateMonth('prev')} className="p-2 hover:bg-muted rounded-lg"><Icon icon="lucide:chevron-left" /></button>
                    <span className="px-4 text-sm font-bold">{getMonthName(currentMonth)}</span>
                    <button onClick={() => navigateMonth('next')} className="p-2 hover:bg-muted rounded-lg"><Icon icon="lucide:chevron-right" /></button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-x-auto">
                <div className="min-w-[1000px]">
                  <div className="grid grid-cols-7 border-b border-border bg-muted/10">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <div key={day} className="py-4 text-center text-xs font-black uppercase tracking-widest text-muted-foreground border-r border-border last:border-r-0">{day}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 h-[600px]">
                    {generateCalendarDays().map((dayInfo, index) => {
                      const isBooked = isDateBooked(dayInfo.date, selectedListing.id);
                      const bookingEvents = getBookingEventsForMonth(selectedListing.id, currentMonth);
                      const event = bookingEvents.find(e => e.startDay === dayInfo.day && dayInfo.isCurrentMonth);

                      return (
                        <div
                          key={index}
                          className={`relative flex flex-col p-2 border border-border/20 ${dayInfo.isCurrentMonth ? 'group cursor-pointer hover:bg-muted/10' : 'bg-muted/5'}`}
                          onClick={() => dayInfo.isCurrentMonth && handleDateClick(dayInfo)}
                        >
                          <span className={`text-xs font-bold self-end ${!dayInfo.isCurrentMonth ? 'text-muted-foreground/30' : ''}`}>{dayInfo.day}</span>

                          {event && (
                            <div
                              className="absolute bottom-2 left-0 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center px-2 gap-2 z-10 mx-1"
                              style={{ width: `calc(${Math.min(event.duration, 7 - (index % 7)) * 100}% - 8px)` }}
                            >
                              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                                {event.avatar ? <img src={event.avatar} className="w-full h-full object-cover" /> : <Icon icon="lucide:user" className="text-xs text-primary" />}
                              </div>
                              <p className="text-[10px] font-bold truncate text-primary">{event.name}</p>
                            </div>
                          )}

                          {!isBooked && dayInfo.isCurrentMonth && (
                            <span className="text-[10px] font-bold text-tertiary mt-auto">{formatCurrency(getPriceForDate(dayInfo.date, selectedListing))}</span>
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
