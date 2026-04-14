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
  const [activeTab, setActiveTab] = useState('listings');
  
  // Filter listings based on search query
  const filteredListings = mockListings.filter(listing =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Debug log to check pricing
  console.log('Listings - Sample pricing:', {
    nightly: mockListings[0]?.price?.nightly,
    formatted: formatCurrency(mockListings[0]?.price?.nightly || 0),
    symbol: formatCurrency(12000)
  });

  const handleListingClick = (listingData) => {
    setSelectedListing(listingData);
    setActiveTab('optimization');
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

          {/* Optimization and Settings Sections */}
          {selectedListing && (
            <div className="mt-8 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img src={selectedListing?.images?.[0] || ''} alt={selectedListing?.title || ''} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{selectedListing?.title || ''}</h3>
                    <p className="text-sm text-muted-foreground">{selectedListing?.location?.city ? `${selectedListing.location.city}, ${selectedListing.location.state}` : ''}</p>
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
                        <span className="text-sm font-bold">{selectedListing?.stats?.occupancy || 0}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Average Rating</span>
                        <span className="text-sm font-bold">{selectedListing?.ratings?.overall || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                        <span className="text-sm font-bold">{formatCurrency(selectedListing?.stats?.revenue || 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Views This Month</span>
                        <span className="text-sm font-bold">{selectedListing?.stats?.views?.toLocaleString() || '0'}</span>
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
                        <p className="text-xs text-muted-foreground">Competitor analysis suggests {formatCurrency((selectedListing?.price?.nightly || 0) * 0.15)} increase</p>
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
