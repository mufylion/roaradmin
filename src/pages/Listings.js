import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';

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
  onClick
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
      {!isDraft && (
        <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Link to={`/listings/edit/${id}`} className="p-2 bg-white/90 text-foreground rounded-lg backdrop-blur-md hover:bg-primary hover:text-white transition-all shadow-lg">
            <Icon icon="lucide:pencil" />
          </Link>
          <button className="p-2 bg-white/90 text-destructive rounded-lg backdrop-blur-md hover:bg-destructive hover:text-white transition-all shadow-lg">
            <Icon icon="lucide:trash-2" />
          </button>
        </div>
      )}
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
          {isDraft ? <Icon icon="lucide:trash-2" className="text-lg" /> : 'Pricing'}
        </button>
      </div>
    </div>
  </div>
);

export default function Listings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [activeTab, setActiveTab] = useState('optimization');

  const handleListingClick = (listingData) => {
    setSelectedListing(listingData);
    setActiveTab('optimization');
  };

  return (
    <PageLayout>
      <>
        {/* Header */}
        <header className="h-20 bg-card border-b border-border px-8 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-2xl font-heading font-bold">Manage Listings</h1>
            <p className="text-sm text-muted-foreground">Add, edit, and optimize your property portfolio.</p>
          </div>
          <Link to="/listings/add-new" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
            <Icon icon="lucide:plus" className="text-xl" />
            Add New Listing
          </Link>
        </header>

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
            <ListingCard 
              image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              title="Modern Downtown Loft"
              price="$120/night"
              location="Manhattan, New York"
              status="Active"
              statLabel="Occupancy"
              statValue="84%"
              reviewLabel="Reviews"
              reviewValue="4.9 (127)"
              id="SN-98234"
              onClick={handleListingClick}
            />
            <ListingCard 
              image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              title="Beachfront Villa"
              price="$350/night"
              location="Malibu, CA"
              status="Active"
              statLabel="Occupancy"
              statValue="92%"
              reviewLabel="Reviews"
              reviewValue="4.8 (84)"
              id="SN-98235"
              onClick={handleListingClick}
            />
            <ListingCard 
              image="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              title="Mountain Retreat"
              price="$180/night"
              location="Aspen, Colorado"
              status="Active"
              statLabel="Occupancy"
              statValue="76%"
              reviewLabel="Reviews"
              reviewValue="4.7 (92)"
              id="SN-98236"
              onClick={handleListingClick}
            />
            <ListingCard 
              image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              title="Urban Studio"
              price="$85/night"
              location="Brooklyn, New York"
              status="Draft"
              statLabel="Setup"
              statValue="60%"
              reviewLabel="Reviews"
              reviewValue="No reviews"
              id="SN-98237"
              isDraft
              onClick={handleListingClick}
            />
            <ListingCard 
              image="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              title="Luxury Penthouse"
              price="$450/night"
              location="Miami, FL"
              status="Active"
              statLabel="Occupancy"
              statValue="88%"
              reviewLabel="Reviews"
              reviewValue="5.0 (156)"
              id="SN-98238"
              onClick={handleListingClick}
            />
          </div>

          {/* Optimization and Settings Sections */}
          {selectedListing && (
            <div className="mt-8 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img src={selectedListing.image} alt={selectedListing.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold">{selectedListing.title}</h2>
                    <p className="text-sm text-muted-foreground">{selectedListing.location} - {selectedListing.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedListing(null)}
                  className="p-2 hover:bg-muted rounded-xl transition-colors"
                >
                  <Icon icon="lucide:x" className="text-xl" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit">
                <button
                  onClick={() => setActiveTab('optimization')}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    activeTab === 'optimization' 
                      ? 'bg-card text-primary shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon icon="lucide:trending-up" className="mr-2" />
                  Optimization
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    activeTab === 'settings' 
                      ? 'bg-card text-primary shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon icon="lucide:settings" className="mr-2" />
                  Settings
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'optimization' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Performance Metrics */}
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Icon icon="lucide:bar-chart" className="text-primary" />
                      Performance Metrics
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Occupancy Rate</span>
                        <span className="text-sm font-bold">{selectedListing.statValue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Average Rating</span>
                        <span className="text-sm font-bold">{selectedListing.reviewValue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                        <span className="text-sm font-bold">$3,120</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Views This Month</span>
                        <span className="text-sm font-bold">1,247</span>
                      </div>
                    </div>
                  </div>

                  {/* Optimization Suggestions */}
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Icon icon="lucide:lightbulb" className="text-tertiary" />
                      Optimization Tips
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-tertiary/10 rounded-xl border border-tertiary/20">
                        <p className="text-sm font-medium mb-1">Update Photos</p>
                        <p className="text-xs text-muted-foreground">New photos could increase bookings by 25%</p>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                        <p className="text-sm font-medium mb-1">Adjust Pricing</p>
                        <p className="text-xs text-muted-foreground">Competitor analysis suggests $15 increase</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-xl">
                        <p className="text-sm font-medium mb-1">Improve Description</p>
                        <p className="text-xs text-muted-foreground">Add more details about amenities</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Icon icon="lucide:zap" className="text-tertiary" />
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full py-2 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-95">
                        Boost Visibility
                      </button>
                      <button className="w-full py-2 bg-tertiary text-tertiary-foreground rounded-xl font-bold text-sm hover:bg-tertiary/80 transition-all active:scale-95">
                        Update Pricing
                      </button>
                      <button className="w-full py-2 bg-muted text-foreground rounded-xl font-bold text-sm hover:bg-muted/80 transition-all active:scale-95">
                        Refresh Photos
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Listing Settings */}
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Icon icon="lucide:settings" className="text-primary" />
                      Listing Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Instant Booking</span>
                        <button className="w-12 h-6 bg-primary rounded-full relative transition-all">
                          <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></span>
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Availability Sync</span>
                        <button className="w-12 h-6 bg-muted rounded-full relative transition-all">
                          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></span>
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Auto-Reply</span>
                        <button className="w-12 h-6 bg-primary rounded-full relative transition-all">
                          <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></span>
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Smart Pricing</span>
                        <button className="w-12 h-6 bg-muted rounded-full relative transition-all">
                          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Booking Preferences */}
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Icon icon="lucide:calendar" className="text-tertiary" />
                      Booking Preferences
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Minimum Stay</label>
                        <select className="w-full px-3 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary transition-all outline-none">
                          <option>1 night</option>
                          <option>2 nights</option>
                          <option>3 nights</option>
                          <option>1 week</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Advance Notice</label>
                        <select className="w-full px-3 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary transition-all outline-none">
                          <option>Same day</option>
                          <option>1 day</option>
                          <option>2 days</option>
                          <option>3 days</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Cancellation Policy</label>
                        <select className="w-full px-3 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary transition-all outline-none">
                          <option>Flexible</option>
                          <option>Moderate</option>
                          <option>Strict</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </>
    </PageLayout>
  );
}
