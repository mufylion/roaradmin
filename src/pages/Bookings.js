import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import UniversalTable from '../components/UniversalTable';
import { useFormatCurrency, useFormatDate } from '../config/useAppConfig';
import { mockBookings, getBookingStats } from '../data/mockBookings';

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

const BookingRow = ({ id, guest, listing, location, dates, nights, amount, status, avatar }) => (
  <tr className="hover:bg-muted/30 transition-colors">
    <td className="px-6 py-4 text-xs font-bold text-primary">{id}</td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <img src={avatar} className="w-8 h-8 rounded-full" alt={guest} />
        <span className="text-xs font-bold">{guest}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex flex-col">
        <span className="text-xs font-bold">{listing}</span>
        <span className="text-[10px] text-muted-foreground">{location}</span>
      </div>
    </td>
    <td className="px-6 py-4 text-xs">
      <div className="flex flex-col">
        <span>{dates}</span>
        <span className="text-[10px] text-muted-foreground">{nights} Nights</span>
      </div>
    </td>
    <td className="px-6 py-4 text-xs font-bold">{amount}</td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase ${
        status === 'Confirmed' ? 'bg-tertiary/10 text-tertiary' : 'bg-primary/10 text-primary'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <Link to="/bookings/edit/BK-9021" className="p-2 hover:bg-muted rounded-lg transition-colors">
        <Icon icon="lucide:edit" className="text-muted-foreground" />
      </Link>
    </td>
  </tr>
);

export default function Bookings() {
  const formatCurrency = useFormatCurrency();
  const formatDate = useFormatDate();
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate stats from mock data
  const stats = useMemo(() => getBookingStats(), []);

  // Filter bookings based on search query
  const filteredBookings = useMemo(() => {
    if (!searchQuery) return mockBookings;
    
    return mockBookings.filter(booking =>
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const exportBookings = () => {
    // Use actual mock bookings data
    const bookingsData = filteredBookings.map(booking => ({
      id: booking.id,
      guest: booking.guest.name,
      email: booking.guest.email,
      listing: booking.listing.title,
      location: booking.listing.location,
      checkIn: booking.dates.checkIn,
      checkOut: booking.dates.checkOut,
      nights: booking.dates.nights,
      amount: formatCurrency(booking.pricing.total),
      status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
    }));
    
    // Create CSV content
    const csvContent = `Booking ID,Guest,Email,Listing,Location,Check-in,Check-out,Nights,Amount,Status\n${
      bookingsData.map(booking => 
        `"${booking.id}","${booking.guest}","${booking.email}","${booking.listing}","${booking.location}","${booking.checkIn}","${booking.checkOut}","${booking.nights}","${booking.amount}","${booking.status}"`
      ).join('\n')
    }`;
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
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
          <StatCard title="Total Bookings" value={stats.total.toLocaleString()} trend="+8%" trendType="positive" />
          <StatCard title="Pending" value={stats.pending.toLocaleString()} trend="New" trendType="new" />
          <StatCard title="Confirmed" value={stats.confirmed.toLocaleString()} trend="Active" trendType="neutral" />
          <StatCard title="Cancelled" value={stats.cancelled.toLocaleString()} trend="-2%" trendType="negative" />
        </div>

        {/* Bookings Table */}
        <UniversalTable
          headers={['Booking ID', 'Guest', 'Listing', 'Check-in/out', 'Amount', 'Status', 'Actions']}
          data={filteredBookings.map(booking => ({
            col0: booking.id,
            col1: ({ rowIndex }) => (
              <div className="flex items-center gap-3">
                <img src={booking.guest.avatar} className="w-10 h-10 rounded-full border border-border" alt={booking.guest.name} />
                <div>
                  <p className="text-sm font-bold">{booking.guest.name}</p>
                  <p className="text-[10px] text-muted-foreground">{booking.guest.email}</p>
                </div>
              </div>
            ),
            col2: (
              <div>
                <p className="text-sm font-bold">{booking.listing.title}</p>
                <p className="text-[10px] text-muted-foreground">{booking.listing.location}</p>
              </div>
            ),
            col3: `${formatDate(booking.dates.checkIn)} - ${formatDate(booking.dates.checkOut)}`,
            col4: <span className="text-sm font-bold text-tertiary">{formatCurrency(booking.pricing.total)}</span>,
            col5: (
              <span className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase ${
                booking.status === 'confirmed' ? 'bg-tertiary/10 text-tertiary' : 
                booking.status === 'pending' ? 'bg-primary/10 text-primary' : 
                'bg-destructive/10 text-destructive'
              }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
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
          mobileColumns={[0, 1, 5]} // Show Booking ID, Guest, and Status on mobile
        />
      </div>
    </PageLayout>
  );
}
