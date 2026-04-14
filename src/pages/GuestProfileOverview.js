import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';

const BookingCard = ({ 
  status, 
  refId, 
  title, 
  location, 
  checkIn, 
  checkOut, 
  price, 
  rating, 
  statusColor 
}) => (
  <div className={`bg-card rounded-2xl border-l-4 ${statusColor} border-y border-r border-border p-5 shadow-sm hover:shadow-md transition-all group`}>
    <div className="flex items-start justify-between mb-4">
      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
        status === 'Ongoing' ? 'bg-tertiary/10 text-tertiary' : 
        status === 'Upcoming' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
      }`}>
        {status}
      </span>
      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Ref: {refId}</p>
    </div>
    <h4 className="text-base font-bold mb-1 group-hover:text-primary transition-colors">{title}</h4>
    <p className="text-xs text-muted-foreground mb-4">{location}</p>
    <div className="flex items-center gap-4 py-3 border-y border-border mb-4">
      <div className="flex-1">
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Check In</p>
        <p className="text-xs font-bold">{checkIn}</p>
      </div>
      <Icon icon="lucide:arrow-right" className="text-muted-foreground" />
      <div className="flex-1 text-right">
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Check Out</p>
        <p className="text-xs font-bold">{checkOut}</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <p className="text-lg font-bold">{price}</p>
      {rating ? (
        <div className="flex items-center gap-1 text-tertiary">
          <Icon icon="lucide:star" />
          <span className="text-xs font-bold">{rating}</span>
        </div>
      ) : (
        <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
          {status === 'Upcoming' ? 'Manage' : 'View Details'}
        </button>
      )}
    </div>
  </div>
);

export default function GuestProfileOverview() {
  const [activeTab, setActiveTab] = useState('Bookings');

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-auto md:h-20 bg-card border-b border-border px-4 md:px-8 py-4 md:py-0 flex flex-col md:flex-row md:items-center justify-between shrink-0 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/users" className="p-2 bg-muted rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:scale-95">
            <Icon icon="lucide:arrow-left" className="text-xl" />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-heading font-bold">Guest Profile</h1>
            <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-black">ID: GS-94210</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <Link 
            to="/users/edit/GS-94210"
            className="flex-1 md:flex-none bg-muted text-foreground px-4 py-2.5 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-muted/80 transition-all text-[10px] uppercase tracking-widest border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Icon icon="lucide:shield" className="text-lg" />
            <span>Manage User</span>
          </Link>
          <button className="flex-1 md:flex-none bg-destructive text-destructive-foreground px-5 py-2.5 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-destructive/20 hover:opacity-90 transition-all text-[10px] uppercase tracking-widest">
            <Icon icon="lucide:trash-2" className="text-lg" />
            <span>Suspend User</span>
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 scroll-smooth">
        {/* Top Section: Identity & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm">
            <div className="relative">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-muted shadow-xl" alt="Arlene McCoy" />
              <span className="absolute bottom-2 right-2 w-8 h-8 bg-tertiary border-4 border-card rounded-full flex items-center justify-center shadow-lg">
                <Icon icon="lucide:check" className="text-white text-xs" />
              </span>
            </div>
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-1">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold">Arlene McCoy</h2>
                  <span className="inline-flex px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-wider self-center md:self-auto">Premium Guest</span>
                </div>
                <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 text-sm">
                  <Icon icon="lucide:mail" className="text-primary" />
                  arlene.mccoy@example.com
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-sm font-bold">+1 (555) 012-3456</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Location</p>
                  <p className="text-sm font-bold">New York, USA</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Joined</p>
                  <p className="text-sm font-bold">Oct 12, 2023</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon icon="lucide:zap" className="text-2xl text-primary" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">Lifetime Value</span>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-1 text-foreground">$12,480.00</h3>
              <p className="text-muted-foreground text-sm font-medium">Across 24 completed bookings</p>
            </div>
            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rating</p>
                <div className="flex items-center gap-1 mt-1">
                  <Icon icon="lucide:star" className="text-tertiary" />
                  <span className="font-bold text-foreground">4.9</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cancellations</p>
                <p className="font-bold mt-1 text-foreground">0%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section: Bookings & Financials */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-1 bg-muted p-1 rounded-xl w-full md:w-auto">
              {['Bookings', 'Billing History', 'Review Log'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === tab 
                      ? 'bg-card text-foreground shadow-sm border border-border' 
                      : 'text-muted-foreground hover:bg-card/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative group">
                <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
                <input 
                  type="text" 
                  placeholder={activeTab === 'Bookings' ? "Filter bookings..." : activeTab === 'Billing History' ? "Filter transactions..." : "Filter reviews..."}
                  className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-xs font-bold focus:ring-4 focus:ring-primary/10 w-full md:w-48 transition-all outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'Bookings' && (
            <div className="space-y-6">
              {/* Bookings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <BookingCard 
                  status="Ongoing"
                  refId="#BK-8821"
                  title="Skyline Penthouse Suite"
                  location="Manhattan, New York"
                  checkIn="Nov 12, 2023"
                  checkOut="Nov 18, 2023"
                  price="$2,450.00"
                  statusColor="border-tertiary"
                />
                <BookingCard 
                  status="Upcoming"
                  refId="#BK-9012"
                  title="Coastal Breeze Villa"
                  location="Malibu, California"
                  checkIn="Dec 20, 2023"
                  checkOut="Dec 27, 2023"
                  price="$4,800.00"
                  statusColor="border-primary"
                />
                <BookingCard 
                  status="Completed"
                  refId="#BK-7643"
                  title="Alpine Retreat Lodge"
                  location="Aspen, Colorado"
                  checkIn="Jan 05, 2023"
                  checkOut="Jan 12, 2023"
                  price="$3,100.00"
                  rating="5.0"
                  statusColor="border-muted-foreground"
                />
              </div>
            </div>
          )}

          {activeTab === 'Billing History' && (
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-lg font-heading font-bold">Recent Billing History</h3>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Download All Receipts</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-widest font-black">
                    <tr>
                      <th className="px-6 py-4">Transaction ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Booking Ref</th>
                      <th className="px-6 py-4">Method</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold">TXN-0092144</td>
                      <td className="px-6 py-4 text-xs font-medium text-muted-foreground">Nov 12, 2023</td>
                      <td className="px-6 py-4 text-xs font-bold text-primary">#BK-8821</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:credit-card" className="text-muted-foreground" />
                          <span className="text-xs font-medium">Visa</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold">$2,450.00</td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-black rounded-full uppercase">Paid</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold">TXN-0091022</td>
                      <td className="px-6 py-4 text-xs font-medium text-muted-foreground">Oct 24, 2023</td>
                      <td className="px-6 py-4 text-xs font-bold text-primary">#BK-9012</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:credit-card" className="text-muted-foreground" />
                          <span className="text-xs font-medium">Visa</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold">$4,800.00</td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase">Scheduled</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold">TXN-0087654</td>
                      <td className="px-6 py-4 text-xs font-medium text-muted-foreground">Oct 15, 2023</td>
                      <td className="px-6 py-4 text-xs font-bold text-primary">#BK-7643</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:credit-card" className="text-muted-foreground" />
                          <span className="text-xs font-medium">Mastercard</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold">$3,100.00</td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-black rounded-full uppercase">Paid</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Review Log' && (
            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-heading font-bold">Guest Reviews</h3>
                  <p className="text-sm text-muted-foreground">Reviews left by Arlene for properties</p>
                </div>
                <div className="divide-y divide-border">
                  <div className="p-6 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src="https://randomuser.me/api/portraits/men/45.jpg" className="w-10 h-10 rounded-full border border-border" alt="Host" />
                        <div>
                          <h4 className="text-sm font-bold">Michael Chen</h4>
                          <p className="text-xs text-muted-foreground">Skyline Penthouse Suite</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-tertiary mb-1">
                          <Icon icon="lucide:star" className="text-sm" />
                          <span className="text-sm font-bold">5.0</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Nov 20, 2023</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "Amazing stay! The penthouse was exactly as described and the view was breathtaking. Michael was an excellent host and very responsive. Would definitely book again!"
                    </p>
                  </div>
                  <div className="p-6 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src="https://randomuser.me/api/portraits/women/32.jpg" className="w-10 h-10 rounded-full border border-border" alt="Host" />
                        <div>
                          <h4 className="text-sm font-bold">Sarah Johnson</h4>
                          <p className="text-xs text-muted-foreground">Alpine Retreat Lodge</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-tertiary mb-1">
                          <Icon icon="lucide:star" className="text-sm" />
                          <span className="text-sm font-bold">4.8</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Jan 15, 2023</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "Beautiful mountain lodge with amazing amenities. The location was perfect for our ski trip. Sarah was very helpful with local recommendations. Only minor issue was the WiFi could be faster."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-heading font-bold">Host Reviews</h3>
                  <p className="text-sm text-muted-foreground">Reviews received from hosts</p>
                </div>
                <div className="divide-y divide-border">
                  <div className="p-6 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src="https://randomuser.me/api/portraits/men/45.jpg" className="w-10 h-10 rounded-full border border-border" alt="Host" />
                        <div>
                          <h4 className="text-sm font-bold">Michael Chen</h4>
                          <p className="text-xs text-muted-foreground">Host of Skyline Penthouse</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-tertiary mb-1">
                          <Icon icon="lucide:star" className="text-sm" />
                          <span className="text-sm font-bold">5.0</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Nov 19, 2023</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "Arlene was the perfect guest! Communication was excellent, she respected the house rules, and left the place spotless. Would welcome her back anytime!"
                    </p>
                  </div>
                  <div className="p-6 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src="https://randomuser.me/api/portraits/women/32.jpg" className="w-10 h-10 rounded-full border border-border" alt="Host" />
                        <div>
                          <h4 className="text-sm font-bold">Sarah Johnson</h4>
                          <p className="text-xs text-muted-foreground">Host of Alpine Retreat</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-tertiary mb-1">
                          <Icon icon="lucide:star" className="text-sm" />
                          <span className="text-sm font-bold">4.9</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Jan 14, 2023</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "Great guest! Very clean and respectful. Followed all house rules perfectly. The booking process was smooth and communication was clear throughout. Highly recommend!"
                    </p>
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
