import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';

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
      {/* Header */}
      <header className="h-20 bg-card border-b border-border px-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-heading font-bold">Booking Management</h1>
          <p className="text-sm text-muted-foreground">Monitor and manage all reservations across platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportBookings}
            className="bg-muted text-foreground px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-muted/80 transition-all text-xs"
          >
            <Icon icon="lucide:download" className="text-lg" />
            <span>Export CSV</span>
          </button>
          <Link to="/bookings/create" className="bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all text-xs">
            <Icon icon="lucide:plus" className="text-lg" />
            <span>New Booking</span>
          </Link>
        </div>
      </header>

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
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-heading font-bold">Recent Bookings</h2>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:flex-none">
                <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search bookings..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-muted border-none rounded-xl text-xs focus:ring-2 focus:ring-primary w-full md:w-64 outline-none"
                />
              </div>
              <button className="p-2.5 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                <Icon icon="lucide:funnel" className="text-lg text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Booking ID</th>
                  <th className="px-6 py-4">Guest</th>
                  <th className="px-6 py-4">Listing</th>
                  <th className="px-6 py-4">Check-in/out</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <BookingRow 
                  id="#BK-9021"
                  guest="Arlene McCoy"
                  avatar="https://randomuser.me/api/portraits/women/44.jpg"
                  listing="Ocean Breeze Villa"
                  location="Malibu, CA"
                  dates="Oct 12 - Oct 15"
                  nights="3"
                  amount="$1,250.00"
                  status="Confirmed"
                />
                <BookingRow 
                  id="#BK-9022"
                  guest="Cody Fisher"
                  avatar="https://randomuser.me/api/portraits/men/32.jpg"
                  listing="Mountain Retreat"
                  location="Aspen, CO"
                  dates="Oct 14 - Oct 18"
                  nights="4"
                  amount="$2,400.00"
                  status="Pending"
                />
                <BookingRow 
                  id="#BK-9023"
                  guest="Jane Cooper"
                  avatar="https://randomuser.me/api/portraits/women/12.jpg"
                  listing="Urban Loft"
                  location="New York, NY"
                  dates="Oct 20 - Oct 22"
                  nights="2"
                  amount="$850.00"
                  status="Confirmed"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
