import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { useFormatCurrency, useFormatDate } from '../config/useAppConfig';
import { mockBookings, getBookingById } from '../data/mockBookings';

const InfoBlock = ({ label, value, subtext }) => (
  <div className="space-y-1">
    <p className="text-[10px] text-muted-foreground font-bold uppercase">{label}</p>
    <p className="text-base font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{subtext}</p>
  </div>
);

const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
      <Icon icon={icon} className="text-muted-foreground" />
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-[10px] text-muted-foreground font-bold uppercase">{label}</p>
      <p className="text-xs font-medium truncate">{value}</p>
    </div>
  </div>
);

const ActivityItem = ({ title, time, isLast = false, isActive = false }) => (
  <div className="flex gap-3">
    <div className="relative">
      <div className={`w-2 h-2 rounded-full mt-1.5 ${isActive ? 'bg-primary' : 'bg-border'}`}></div>
      {!isLast && <div className="absolute top-4 bottom-0 left-1 w-px bg-border -mb-4"></div>}
    </div>
    <div>
      <p className="text-xs font-bold">{title}</p>
      <p className="text-[10px] text-muted-foreground">{time}</p>
    </div>
  </div>
);

export default function BookingDetails() {
  const { id } = useParams();
  const formatCurrency = useFormatCurrency();
  const formatDate = useFormatDate();
  const [adminNotes, setAdminNotes] = useState([]);

  // Get booking data
  const booking = useMemo(() => {
    const bookingData = getBookingById(id);
    if (!bookingData) return null;
    
    // Generate some activity history based on booking dates
    const createdAt = new Date(bookingData.createdAt);
    const checkInDate = new Date(bookingData.dates.checkIn);
    
    return {
      ...bookingData,
      activity: [
        {
          title: 'Booking Confirmed',
          time: formatDate(createdAt.toISOString().split('T')[0]) + ' ' + createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          isActive: true
        },
        {
          title: 'Payment Processed',
          time: formatDate(createdAt.toISOString().split('T')[0]) + ' ' + new Date(createdAt.getTime() - 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          isActive: false
        },
        {
          title: 'Inquiry Received',
          time: formatDate(new Date(createdAt.getTime() - 86400000).toISOString().split('T')[0]) + ' ' + new Date(createdAt.getTime() - 86400000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          isActive: false
        }
      ],
      notes: [
        {
          text: "Guest requested an early check-in at 1:00 PM. Confirmed availability with cleaning staff.",
          author: "Alex Rivera",
          date: formatDate(new Date(checkInDate.getTime() - 86400000).toISOString().split('T')[0])
        }
      ]
    };
  }, [id, formatDate]);

  if (!booking) {
    return (
      <PageLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Icon icon="lucide:calendar-x" className="text-6xl text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Booking Not Found</h2>
            <p className="text-muted-foreground mb-4">The booking you're looking for doesn't exist.</p>
            <Link to="/bookings" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Icon icon="lucide:arrow-left" className="text-lg" />
              Back to Bookings
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-tertiary/10 text-tertiary';
      case 'pending':
        return 'bg-primary/10 text-primary';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getPaymentStatus = (status) => {
    switch (status) {
      case 'paid':
        return 'Paid in Full';
      case 'partial':
        return 'Partially Paid';
      case 'pending':
        return 'Payment Pending';
      default:
        return 'Unknown';
    }
  };

  const getPaymentMethod = (method) => {
    switch (method) {
      case 'credit_card':
        return 'Mastercard';
      case 'debit_card':
        return 'Visa Debit';
      case 'paypal':
        return 'PayPal';
      default:
        return 'Credit Card';
    }
  };

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-auto md:h-20 bg-card border-b border-border px-4 md:px-8 py-4 md:py-0 flex items-center justify-between shrink-0 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/bookings" className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted hover:bg-muted/80 transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Icon icon="lucide:arrow-left" className="text-xl" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-heading font-bold">Booking Details</h1>
              <span className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Booking ID: {booking.id} &#8226; Created {formatDate(booking.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-muted text-foreground px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-muted/80 transition-all text-xs">
            <Icon icon="lucide:pencil" className="text-lg" />
            <span>Update Booking</span>
          </button>
          {booking.status !== 'cancelled' && (
            <button className="bg-destructive text-destructive-foreground px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-destructive/20 hover:opacity-90 transition-opacity text-xs">
              <Icon icon="lucide:circle-x" className="text-lg" />
              <span>Cancel Reservation</span>
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stay Overview Card */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-heading font-bold">Stay Overview</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <InfoBlock 
                  label="Check-in" 
                  value={formatDate(booking.dates.checkIn)} 
                  subtext="After 3:00 PM" 
                />
                <InfoBlock 
                  label="Check-out" 
                  value={formatDate(booking.dates.checkOut)} 
                  subtext="Before 11:00 AM" 
                />
                <InfoBlock 
                  label="Duration" 
                  value={`${booking.dates.nights} Nights`} 
                  subtext="Total stay length" 
                />
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-heading font-bold">Property Details</h2>
              </div>
              <div className="p-6 flex items-start gap-6">
                <img 
                  src={booking.listing.image} 
                  className="w-32 h-32 rounded-xl object-cover border border-border" 
                  alt={booking.listing.title}
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{booking.listing.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Icon icon="lucide:map-pin" className="text-primary" />
                      {booking.listing.location}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon icon="lucide:home" className="text-lg" />
                      <span>Entire Apartment</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon icon="lucide:users" className="text-lg" />
                      <span>{booking.guests.total} Guests</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon icon="lucide:layers" className="text-lg" />
                      <span>2 Bedrooms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-heading font-bold">Billing & Payments</h2>
                <span className="px-2 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-lg uppercase">
                  {getPaymentStatus(booking.paymentStatus)}
                </span>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{formatCurrency(booking.pricing.nightlyRate)} x {booking.dates.nights} nights</span>
                    <span className="font-medium">{formatCurrency(booking.pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cleaning Fee</span>
                    <span className="font-medium">{formatCurrency(booking.pricing.cleaningFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium">{formatCurrency(booking.pricing.serviceFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-medium">{formatCurrency(booking.pricing.taxes)}</span>
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between items-center">
                    <span className="text-base font-bold">Total Amount</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(booking.pricing.total)}</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:credit-card" className="text-2xl text-muted-foreground" />
                    <div>
                      <p className="text-xs font-bold">{getPaymentMethod(booking.paymentMethod)} &#8226;&#8226;&#8226;&#8226; 4242</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-medium">Transaction: #{booking.id.replace('BK-', 'TR-')}</p>
                    </div>
                  </div>
                  <button className="text-primary text-xs font-bold hover:underline">View Receipt</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Info */}
          <div className="space-y-6">
            {/* Guest Card */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-heading font-bold">Guest Information</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={booking.guest.avatar} 
                    className="w-16 h-16 rounded-full border-2 border-primary/20" 
                    alt={booking.guest.name}
                  />
                  <div>
                    <h3 className="text-base font-bold">{booking.guest.name}</h3>
                    <p className="text-xs text-muted-foreground">Guest since 2021</p>
                    <div className="flex items-center gap-1 text-tertiary mt-1">
                      <Icon icon="lucide:star" className="fill-current" />
                      <span className="text-xs font-bold">4.9 (12 reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-border">
                  <ContactItem icon="lucide:mail" label="Email" value={booking.guest.email} />
                  <ContactItem icon="lucide:phone" label="Phone" value={booking.guest.phone} />
                </div>
                <Link 
                  to={`/users/profile/${booking.guest.id}`}
                  className="w-full py-2.5 bg-muted text-foreground font-bold rounded-xl text-xs hover:bg-muted/80 transition-colors inline-flex items-center justify-center"
                >
                  View Full Profile
                </Link>
              </div>
            </div>

            {/* Admin Notes */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-heading font-bold">Admin Notes</h2>
                <button className="text-primary text-xs font-bold hover:underline">Edit</button>
              </div>
              <div className="p-6 space-y-4">
                {booking.notes.map((note, index) => (
                  <div key={index} className="bg-muted/30 p-4 rounded-xl">
                    <p className="text-xs text-foreground italic">"{note.text}"</p>
                    <p className="text-[10px] text-muted-foreground mt-2 font-medium">&#8212; Added by {note.author}, {note.date}</p>
                  </div>
                ))}
                <button className="w-full py-2.5 border border-dashed border-border text-muted-foreground font-medium rounded-xl text-xs hover:bg-muted/30 transition-colors flex items-center justify-center gap-2">
                  <Icon icon="lucide:plus" />
                  <span>Add New Note</span>
                </button>
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-heading font-bold">Activity History</h2>
              </div>
              <div className="p-6 space-y-4">
                {booking.activity.map((activity, index) => (
                  <ActivityItem 
                    key={index}
                    title={activity.title}
                    time={activity.time}
                    isActive={activity.isActive}
                    isLast={index === booking.activity.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
