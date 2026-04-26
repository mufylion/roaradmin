import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import UniversalTable from '../components/UniversalTable';
import { useFormatCurrency, useFormatDate } from '../config/useAppConfig';
import { useBookings } from '../hooks/useBookings';

const StatCard = ({ title, value, trend, trendType }) => {
  const trendStyles = {
    positive: 'text-tertiary bg-tertiary/10',
    negative: 'text-destructive bg-destructive/10',
    neutral: 'text-muted-foreground bg-muted',
    new: 'text-primary bg-primary/10',
  };

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
      <p className="text-xs text-muted-foreground font-bold uppercase mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-bold">{value}</h3>
        <span className={`text-[10px] font-bold flex items-center px-2 py-0.5 rounded-full ${trendStyles[trendType]}`}>
          {trend}
        </span>
      </div>
    </div>
  );
};

export default function Bookings() {
  const formatCurrency = useFormatCurrency();
  const formatDate = useFormatDate();
  const { bookings, loading, error } = useBookings();
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate stats from bookings data
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    return { total, pending, confirmed, cancelled };
  }, [bookings]);

  // Filter bookings based on search query
  const filteredBookings = useMemo(() => {
    if (!searchQuery) return bookings;
    
    return bookings.filter(booking => {
      const guestName = `${booking.guestFirstName || booking.User?.firstName || ''} ${booking.guestLastName || booking.User?.lastName || ''}`.toLowerCase();
      return (
        String(booking.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
        guestName.includes(searchQuery.toLowerCase()) ||
        (booking.guestEmail || booking.User?.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (booking.Property?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (booking.status || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [bookings, searchQuery]);

  const exportBookings = () => {
    const bookingsData = filteredBookings.map(booking => ({
      id: booking.id,
      guest: `${booking.guestFirstName || booking.User?.firstName || ''} ${booking.guestLastName || booking.User?.lastName || ''}`.trim(),
      email: booking.guestEmail || booking.User?.email,
      listing: booking.Property?.name || 'Unknown',
      location: booking.Property?.address || 'Unknown',
      checkIn: formatDate(booking.checkInDate),
      checkOut: formatDate(booking.checkOutDate),
      nights: booking.numberOfNights,
      amount: formatCurrency(booking.totalAmount),
      status: (booking.status || '').toUpperCase()
    }));
    
    // Create CSV content
    const csvContent = `Booking ID,Guest,Email,Listing,Location,Check-in,Check-out,Nights,Amount,Status\n${
      bookingsData.map(booking => 
        `"${booking.id}","${booking.guest}","${booking.email}","${booking.listing}","${booking.location}","${booking.checkIn}","${booking.checkOut}","${booking.nights}","${booking.amount}","${booking.status}"`
      ).join('\n')
    }`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const timestamp = new Date().toISOString().split('T')[0];
    link.download = `bookings-export-${timestamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <PageLayout>
      <PageHeader
        title="Booking Management"
        description="Monitor and manage all reservations across platform."
        actions={[
          {
            type: 'button',
            label: 'Export CSV',
            shortLabel: 'Export',
            icon: 'lucide:download',
            onClick: exportBookings
          },
          {
            type: 'link',
            label: 'New Booking',
            shortLabel: 'Booking',
            icon: 'lucide:plus',
            to: '/bookings/create',
            variant: 'primary'
          }
        ]}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Bookings" value={stats.total.toLocaleString()} trend="+0%" trendType="neutral" />
          <StatCard title="Pending" value={stats.pending.toLocaleString()} trend="New" trendType="new" />
          <StatCard title="Confirmed" value={stats.confirmed.toLocaleString()} trend="Active" trendType="neutral" />
          <StatCard title="Cancelled" value={stats.cancelled.toLocaleString()} trend="0%" trendType="neutral" />
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-xl text-sm font-bold">
            {error}
          </div>
        )}

        {/* Bookings Table */}
        <UniversalTable
          headers={['Booking ID', 'Guest', 'Listing', 'Check-in/out', 'Amount', 'Status', 'Actions']}
          data={loading ? [] : filteredBookings.map(booking => ({
            col0: booking.id,
            col1: ({ rowIndex }) => (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-border bg-muted flex items-center justify-center overflow-hidden">
                  {booking.User?.avatar ? (
                    <img src={booking.User.avatar} className="w-full h-full object-cover" alt="guest" />
                  ) : (
                    <Icon icon="lucide:user" className="text-muted-foreground text-xl" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {`${booking.guestFirstName || booking.User?.firstName || ''} ${booking.guestLastName || booking.User?.lastName || ''}`.trim()}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{booking.guestEmail || booking.User?.email}</p>
                </div>
              </div>
            ),
            col2: (
              <div>
                <p className="text-sm font-bold">{booking.Property?.name || 'Unknown'}</p>
                <p className="text-[10px] text-muted-foreground">{booking.Property?.address || 'Unknown'}</p>
              </div>
            ),
            col3: `${formatDate(booking.checkInDate)} - ${formatDate(booking.checkOutDate)}`,
            col4: <span className="text-sm font-bold text-tertiary">{formatCurrency(booking.totalAmount)}</span>,
            col5: (
              <span className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase ${
                booking.status === 'confirmed' ? 'bg-tertiary/10 text-tertiary' : 
                booking.status === 'pending' ? 'bg-primary/10 text-primary' : 
                'bg-destructive/10 text-destructive'
              }`}>
                {booking.status}
              </span>
            ),
            col6: (
              <Link 
                to={`/bookings/${booking.id}`}
                className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary inline-flex"
                aria-label="View booking"
              >
                <Icon icon="lucide:more-vertical" className="text-lg" />
              </Link>
            )
          }))}
          searchPlaceholder="Search bookings..."
          filterButton={true}
          exportButton={true}
          onExport={exportBookings}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          mobileColumns={[0, 1, 5]} 
          loading={loading}
        />
      </div>
    </PageLayout>
  );
}

