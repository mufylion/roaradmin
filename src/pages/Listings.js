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
  id
}) => (
  <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-20 bg-card border-b border-border px-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-heading font-bold">Manage Listings</h1>
          <p className="text-sm text-muted-foreground">Add, edit, and optimize your property portfolio.</p>
        </div>
        <Link to="/listings/add-new" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
          <Icon icon="lucide:plus" className="text-xl" />
          <span>Add New Listing</span>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        {/* Filter Bar */}
        <div className="bg-card p-4 rounded-2xl border border-border flex flex-col md:flex-row items-center gap-4 shadow-sm">
          <div className="relative flex-1 w-full group">
            <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, location, or ID..." 
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
          />
          <ListingCard 
            image="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            title="Lakeside Cottage"
            price="$180/night"
            location="Lake Tahoe, CA"
            status="Draft"
            statLabel="Completion"
            statValue="65%"
            reviewLabel="Missing"
            reviewValue="Photos"
            isDraft
            id="SN-98236"
          />
        </div>

        {/* Management Details */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                <Icon icon="lucide:pencil" className="text-primary" />
                Optimization & Settings
              </h2>
              <p className="text-xs text-muted-foreground mt-1">Configure global parameters for your selected listing</p>
            </div>
            <button className="px-4 py-2 bg-muted hover:bg-muted/80 text-xs font-black rounded-xl transition-all active:scale-95 uppercase tracking-widest">View History</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Seasonal Pricing</h3>
                <Icon icon="lucide:info" className="text-muted-foreground hover:text-primary cursor-help" />
              </div>
              <div className="bg-muted/30 p-5 rounded-2xl border border-border hover:border-primary/30 transition-colors group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold">Summer Peak</span>
                  <span className="text-xs font-black text-tertiary bg-tertiary/10 px-2 py-1 rounded-lg">+25%</span>
                </div>
                <div className="w-full bg-border h-2 rounded-full mb-6 overflow-hidden">
                  <div className="bg-gradient-to-r from-tertiary to-primary h-full w-3/4 rounded-full group-hover:scale-x-105 origin-left transition-transform duration-500"></div>
                </div>
                <button className="w-full py-2.5 bg-card text-xs font-black rounded-xl border border-border hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 uppercase tracking-widest">Manage Rules</button>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Media Gallery</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 hover:border-primary/50 transition-all group">
                  <Icon icon="lucide:plus" className="text-2xl text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
                  <span className="text-[8px] font-black uppercase mt-1 text-muted-foreground group-hover:text-primary">Upload</span>
                </div>
                <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                  <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200" className="aspect-square object-cover group-hover:scale-110 transition-transform duration-500" alt="Thumb" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon icon="lucide:eye" className="text-white" />
                  </div>
                </div>
                <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                  <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200" className="aspect-square object-cover group-hover:scale-110 transition-transform duration-500" alt="Thumb" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon icon="lucide:eye" className="text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Amenities</h3>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-4 py-2 bg-primary/10 text-primary text-[10px] font-black rounded-xl flex items-center gap-2 border border-transparent hover:border-primary/30 transition-all cursor-default">
                  <Icon icon="lucide:wifi" className="text-sm" /> WI-FI
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary text-[10px] font-black rounded-xl flex items-center gap-2 border border-transparent hover:border-primary/30 transition-all cursor-default">
                  <Icon icon="lucide:monitor" className="text-sm" /> SMART TV
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary text-[10px] font-black rounded-xl flex items-center gap-2 border border-transparent hover:border-primary/30 transition-all cursor-default">
                  <Icon icon="lucide:zap" className="text-sm" /> AC
                </span>
                <Link to="/listings/add-new" className="px-4 py-2 bg-muted text-muted-foreground text-[10px] font-black rounded-xl flex items-center gap-2 hover:bg-primary hover:text-white transition-all active:scale-95 uppercase tracking-widest">
                  <Icon icon="lucide:plus" className="text-sm" /> ADD NEW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
