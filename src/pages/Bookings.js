import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import UniversalTable from '../components/UniversalTable';
import { useFormatCurrency, useFormatDate } from '../config/useAppConfig';

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

  const exportBookings = () => {
    // Sample bookings data - in a real app, you would get this from state or API
    const bookingsData = [
      {
        id: "#BK-9021",
        guest: "Arlene McCoy",
        listing: "Skyline Penthouse Suite",
        location: "Manhattan, New York",
        dates: "Nov 12 - Nov 18",
        nights: "6",
        amount: "$2,450.00",
        status: "Confirmed"
      },
      {
        id: "#BK-9022",
        guest: "Cody Fisher",
        listing: "Coastal Breeze Villa",
        location: "Malibu, California",
        dates: "Dec 20 - Dec 27",
        nights: "7",
        amount: "$4,800.00",
        status: "Pending"
      },
      {
        id: "#BK-9023",
        guest: "Jane Cooper",
        listing: "Alpine Retreat Lodge",
        location: "Aspen, Colorado",
        dates: "Jan 05 - Jan 12",
        nights: "7",
        amount: "$3,100.00",
        status: "Confirmed"
      }
    ];
    
    // Create CSV content
    const csvContent = `Booking ID,Guest,Listing,Location,Dates,Nights,Amount,Status\n${
      bookingsData.map(booking => 
        `"${booking.id}","${booking.guest}","${booking.listing}","${booking.location}","${booking.dates}","${booking.nights}","${booking.amount}","${booking.status}"`
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
          <StatCard title="Total Bookings" value="4,821" trend="+8%" trendType="positive" />
          <StatCard title="Pending" value="142" trend="New" trendType="new" />
          <StatCard title="Check-ins Today" value="56" trend="Active" trendType="neutral" />
          <StatCard title="Cancellations" value="12" trend="-2%" trendType="negative" />
        </div>

        {/* Bookings Table */}
        <UniversalTable
          headers={['Booking ID', 'Guest', 'Listing', 'Check-in/out', 'Amount', 'Status', 'Actions']}
          data={[
            {
              col0: '#BK-9021',
              col1: ({ rowIndex }) => (
                <div className="flex items-center gap-3">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-10 h-10 rounded-full border border-border" alt="Arlene McCoy" />
                  <div>
                    <p className="text-sm font-bold">Arlene McCoy</p>
                    <p className="text-[10px] text-muted-foreground">arlene.mccoy@example.com</p>
                  </div>
                </div>
              ),
              col2: (
                <div>
                  <p className="text-sm font-bold">Ocean Breeze Villa</p>
                  <p className="text-[10px] text-muted-foreground">Malibu, CA</p>
                </div>
              ),
              col3: `${formatDate('2024-10-12')} - ${formatDate('2024-10-15')}`,
              col4: <span className="text-sm font-bold text-tertiary">{formatCurrency(125000)}</span>,
              col5: (
                <span className="px-2 py-1 text-[10px] font-bold rounded-lg uppercase bg-tertiary/10 text-tertiary">
                  Confirmed
                </span>
              ),
              col6: (
                <Link 
                  to="/bookings/BK-9021"
                  className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary inline-flex"
                  aria-label="View booking"
                >
                  <Icon icon="lucide:more-vertical" className="text-lg" />
                </Link>
              )
            },
            {
              col0: '#BK-9022',
              col1: ({ rowIndex }) => (
                <div className="flex items-center gap-3">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-10 h-10 rounded-full border border-border" alt="Cody Fisher" />
                  <div>
                    <p className="text-sm font-bold">Cody Fisher</p>
                    <p className="text-[10px] text-muted-foreground">cody.fisher@example.com</p>
                  </div>
                </div>
              ),
              col2: (
                <div>
                  <p className="text-sm font-bold">Mountain Retreat</p>
                  <p className="text-[10px] text-muted-foreground">Aspen, CO</p>
                </div>
              ),
              col3: `${formatDate('2024-10-14')} - ${formatDate('2024-10-18')}`,
              col4: <span className="text-sm font-bold text-tertiary">{formatCurrency(240000)}</span>,
              col5: (
                <span className="px-2 py-1 text-[10px] font-bold rounded-lg uppercase bg-primary/10 text-primary">
                  Pending
                </span>
              ),
              col6: (
                <Link 
                  to="/bookings/BK-9022"
                  className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary inline-flex"
                  aria-label="View booking"
                >
                  <Icon icon="lucide:more-vertical" className="text-lg" />
                </Link>
              )
            },
            {
              col0: '#BK-9023',
              col1: ({ rowIndex }) => (
                <div className="flex items-center gap-3">
                  <img src="https://randomuser.me/api/portraits/women/12.jpg" className="w-10 h-10 rounded-full border border-border" alt="Jane Cooper" />
                  <div>
                    <p className="text-sm font-bold">Jane Cooper</p>
                    <p className="text-[10px] text-muted-foreground">jane.cooper@example.com</p>
                  </div>
                </div>
              ),
              col2: (
                <div>
                  <p className="text-sm font-bold">Urban Loft</p>
                  <p className="text-[10px] text-muted-foreground">New York, NY</p>
                </div>
              ),
              col3: `${formatDate('2024-10-20')} - ${formatDate('2024-10-22')}`,
              col4: <span className="text-sm font-bold text-tertiary">{formatCurrency(85000)}</span>,
              col5: (
                <span className="px-2 py-1 text-[10px] font-bold rounded-lg uppercase bg-tertiary/10 text-tertiary">
                  Confirmed
                </span>
              ),
              col6: (
                <Link 
                  to="/bookings/BK-9023"
                  className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary inline-flex"
                  aria-label="View booking"
                >
                  <Icon icon="lucide:more-vertical" className="text-lg" />
                </Link>
              )
            }
          ]}
          searchPlaceholder="Search bookings..."
          filterButton={true}
          exportButton={true}
          onExport={exportBookings}
          mobileColumns={[0, 1, 5]} // Show Booking ID, Guest, and Status on mobile
        />
      </div>
    </PageLayout>
  );
}
