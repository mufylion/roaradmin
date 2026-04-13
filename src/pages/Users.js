import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';

const StatCard = ({ icon, label, value, trend, trendType }) => {
  const trendStyles = {
    positive: 'text-tertiary bg-tertiary/10',
    negative: 'text-destructive bg-destructive/10',
    neutral: 'text-muted-foreground bg-muted',
    new: 'text-primary bg-primary/10',
  };

  return (
    <div className="bg-card p-5 md:p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group cursor-default">
      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-3 flex items-center gap-2">
        <Icon icon={icon} className={trendType === 'negative' ? 'text-destructive' : 'text-primary'} />
        {label}
      </p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-bold">{value}</h3>
        <span className={`text-[10px] font-black flex items-center gap-1 px-2 py-1 rounded-lg ${
          trendType === 'positive' ? 'text-tertiary bg-tertiary/10' : 
          trendType === 'negative' ? 'text-destructive bg-destructive/10' : 
          'text-primary bg-primary/10'
        }`}>
          {trend && <Icon icon="lucide:arrow-up-right" className="text-xs" />}
          {trend}
        </span>
      </div>
    </div>
  );
};

const UserRow = ({ name, email, avatar, role, status, verification, joined }) => (
  <tr className="hover:bg-muted/30 transition-colors group">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={avatar} className="w-10 h-10 rounded-full border border-border ring-2 ring-transparent group-hover:ring-primary/20 transition-all" alt={name} />
          <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-card rounded-full ${
            status === 'Active' ? 'bg-tertiary' : 
            status === 'Suspended' ? 'bg-destructive' : 
            'bg-muted-foreground'
          }`}></span>
        </div>
        <div>
          <p className="text-sm font-bold group-hover:text-primary transition-colors">{name}</p>
          <p className="text-[10px] text-muted-foreground font-medium">{email}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider ${
        role === 'Host' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
      }`}>
        {role}
      </span>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${
          status === 'Active' ? 'bg-tertiary animate-pulse' : 'bg-destructive'
        }`}></span>
        <span className="text-xs font-bold">{status}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2 text-tertiary">
        <Icon icon="lucide:circle-check" className="text-sm" />
        <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
      </div>
    </td>
    <td className="px-6 py-4 text-xs font-bold text-muted-foreground">{joined}</td>
    <td className="px-6 py-4 text-right">
      <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="More actions">
        <Icon icon="lucide:more-vertical" className="text-lg" />
      </button>
    </td>
  </tr>
);

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-auto md:h-20 bg-card border-b border-border px-4 md:px-8 py-4 md:py-0 flex flex-col md:flex-row md:items-center justify-between shrink-0 gap-4">
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-heading font-bold">User Management</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">Manage platform guests, hosts, and account permissions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <button className="flex-1 md:flex-none bg-muted text-foreground px-4 py-2.5 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-muted/80 transition-all active:scale-95 text-[10px] uppercase tracking-widest border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Icon icon="lucide:download" className="text-lg" />
            <span>Export CSV</span>
          </button>
          <button className="flex-1 md:flex-none bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 text-[10px] uppercase tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Icon icon="lucide:plus" className="text-lg" />
            <span>Add New User</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 scroll-smooth">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard icon="lucide:users" label="Total Users" value="12,405" trend="12%" trendType="positive" />
          <StatCard icon="lucide:home" label="Active Hosts" value="1,240" trend="5%" trendType="positive" />
          <StatCard icon="lucide:calendar" label="New This Month" value="842" trend="NEW" trendType="neutral" />
          <StatCard icon="lucide:shield" label="Suspended" value="24" trend="FLAGGED" trendType="negative" />
        </div>

        {/* Users Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-heading font-bold">User Directory</h2>
              <p className="text-xs text-muted-foreground mt-1">Search and manage all platform participants</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none group">
                <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-muted border border-transparent rounded-xl text-xs font-bold focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 w-full md:w-64 transition-all outline-none" 
                  aria-label="Search users"
                />
              </div>
              <button className="p-2.5 bg-muted rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Filter users">
                <Icon icon="lucide:funnel" className="text-lg" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-wider font-black">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Verification</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <UserRow 
                  name="Arlene McCoy"
                  email="arlene.mccoy@example.com"
                  avatar="https://randomuser.me/api/portraits/women/44.jpg"
                  role="Host"
                  status="Active"
                  verification="Verified"
                  joined="Oct 12, 2023"
                />
                <UserRow 
                  name="Cody Fisher"
                  email="cody.fisher@example.com"
                  avatar="https://randomuser.me/api/portraits/men/32.jpg"
                  role="Guest"
                  status="Active"
                  verification="Pending"
                  joined="Oct 14, 2023"
                />
                <UserRow 
                  name="Dianne Russell"
                  email="dianne.r@example.com"
                  avatar="https://randomuser.me/api/portraits/women/42.jpg"
                  role="Host"
                  status="Suspended"
                  verification="Flagged"
                  joined="Nov 02, 2023"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
