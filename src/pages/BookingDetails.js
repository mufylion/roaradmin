import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { useFormatCurrency, useFormatDate } from '../config/useAppConfig';
import bookingsService from '../services/bookingsService';

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

export default function BookingDetails() {
  const { id } = useParams();
  const formatCurrency = useFormatCurrency();
  const formatDate = useFormatDate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const data = await bookingsService.fetchBookingById(id);
        setBooking(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch booking');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (error || !booking) {
    return (
      <PageLayout>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <Icon icon="lucide:calendar-x" className="text-6xl text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Booking Not Found</h2>
            <p className="text-muted-foreground mb-4">{error || "The booking you're looking for doesn't exist."}</p>
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
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return 'bg-tertiary/10 text-tertiary';
      case 'pending':
        return 'bg-primary/10 text-primary';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted/10 text-muted-foreground';
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
                {booking.status}
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Booking ID: {booking.id} &#8226; Created {formatDate(booking.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {booking.status?.toLowerCase() !== 'cancelled' && (
            <button 
              onClick={async () => {
                if(window.confirm('Cancel this booking?')) {
                  await bookingsService.updateBookingStatus(booking.id, 'cancelled');
                  window.location.reload();
                }
              }}
              className="bg-destructive text-destructive-foreground px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-destructive/20 hover:opacity-90 transition-opacity text-xs"
            >
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
                  value={formatDate(booking.checkInDate)} 
                  subtext="After 3:00 PM" 
                />
                <InfoBlock 
                  label="Check-out" 
                  value={formatDate(booking.checkOutDate)} 
                  subtext="Before 11:00 AM" 
                />
                <InfoBlock 
                  label="Duration" 
                  value={`${booking.numberOfGuests || 0} Guests`} 
                  subtext="Total occupancy" 
                />
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-heading font-bold">Property Details</h2>
              </div>
              <div className="p-6 flex items-start gap-6">
                <div className="w-32 h-32 rounded-xl bg-muted overflow-hidden border border-border">
                  {booking.Property?.images?.[0] ? (
                    <img src={booking.Property.images[0]} className="w-full h-full object-cover" alt="Property" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon icon="lucide:home" className="text-4xl text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{booking.Property?.name || 'Unknown Property'}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Icon icon="lucide:map-pin" className="text-primary" />
                      {booking.Property?.city}, {booking.Property?.country}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon icon="lucide:users" className="text-lg" />
                      <span>{booking.numberOfGuests || 0} Guests</span>
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
                  {booking.paymentStatus || 'Payment Status'}
                </span>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-medium">{formatCurrency(booking.totalAmount)}</span>
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between items-center">
                    <span className="text-base font-bold">Paid Amount</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(booking.totalAmount)}</span>
                  </div>
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
                  <div className="w-16 h-16 rounded-full border-2 border-primary/20 bg-muted flex items-center justify-center overflow-hidden">
                    <Icon icon="lucide:user" className="text-3xl text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">{booking.User?.firstName} {booking.User?.lastName}</h3>
                    <p className="text-xs text-muted-foreground">ID: {booking.userId}</p>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-border">
                  <ContactItem icon="lucide:mail" label="Email" value={booking.User?.email || 'N/A'} />
                </div>
                <Link 
                  to={`/users/profile/${booking.userId}`}
                  className="w-full py-2.5 bg-muted text-foreground font-bold rounded-xl text-xs hover:bg-muted/80 transition-colors inline-flex items-center justify-center"
                >
                  View Full Profile
                </Link>
              </div>
            </div>

            {/* Note */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-lg font-heading font-bold mb-4">Internal Notes</h2>
              <p className="text-sm text-muted-foreground italic">
                {booking.notes || "No internal notes for this booking."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

