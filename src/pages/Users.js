import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import UniversalTable from '../components/UniversalTable';
import { mockUsers } from '../data/mockUsers';

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

const UserRow = ({ name, email, avatar, role, status, verification, joined, id }) => (
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
      <Link 
        to={`/users/profile/${id}`}
        className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary inline-flex"
        aria-label="View profile"
      >
        <Icon icon="lucide:more-vertical" className="text-lg" />
      </Link>
    </td>
  </tr>
);

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate stats from mock data
  const stats = useMemo(() => {
    const totalUsers = mockUsers.length;
    const activeHosts = mockUsers.filter(user => user.role === 'host' && user.status === 'active').length;
    const newThisMonth = mockUsers.filter(user => {
      const joinDate = new Date(user.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinDate >= thirtyDaysAgo;
    }).length;
    const suspended = mockUsers.filter(user => user.status !== 'active').length;

    return { totalUsers, activeHosts, newThisMonth, suspended };
  }, []);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return mockUsers;
    
    return mockUsers.filter(user =>
      user.profile.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.profile.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.profile.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const exportUsers = () => {
    // Use actual mock users data
    const usersData = mockUsers.map(user => ({
      name: `${user.profile.firstName} ${user.profile.lastName}`,
      email: user.contact.email,
      role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      status: user.status.charAt(0).toUpperCase() + user.status.slice(1),
      verification: user.verification.email && user.verification.phone ? 'Verified' : 'Pending',
      joined: new Date(user.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      id: user.id
    }));
    
    // Create CSV content
    const csvContent = `Name,Email,Role,Status,Verification,Joined,User ID\n${
      usersData.map(user => 
        `"${user.name}","${user.email}","${user.role}","${user.status}","${user.verification}","${user.joined}","${user.id}"`
      ).join('\n')
    }`;
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    link.download = `users-export-${timestamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <PageLayout>
      <PageHeader
        title="User Management"
        description="Manage platform guests, hosts, and account permissions."
        actions={[
          {
            type: 'button',
            label: 'Export CSV',
            shortLabel: 'Export',
            icon: 'lucide:download',
            onClick: exportUsers
          },
          {
            type: 'link',
            label: 'Add New User',
            shortLabel: 'Add User',
            icon: 'lucide:plus',
            to: '/users/add-new',
            variant: 'primary'
          }
        ]}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 scroll-smooth">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard icon="lucide:users" label="Total Users" value={stats.totalUsers.toLocaleString()} trend="12%" trendType="positive" />
          <StatCard icon="lucide:home" label="Active Hosts" value={stats.activeHosts.toLocaleString()} trend="5%" trendType="positive" />
          <StatCard icon="lucide:calendar" label="New This Month" value={stats.newThisMonth.toLocaleString()} trend="NEW" trendType="neutral" />
          <StatCard icon="lucide:shield" label="Suspended" value={stats.suspended.toLocaleString()} trend="FLAGGED" trendType="negative" />
        </div>

        {/* Users Table */}
        <UniversalTable
          headers={['User', 'Role', 'Status', 'Verification', 'Joined', 'Actions']}
          data={filteredUsers.map(user => ({
            col0: ({ rowIndex }) => (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={user.profile.avatar} className="w-10 h-10 rounded-full border border-border ring-2 ring-transparent group-hover:ring-primary/20 transition-all" alt={`${user.profile.firstName} ${user.profile.lastName}`} />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-card rounded-full ${
                    user.status === 'active' ? 'bg-tertiary' : 
                    user.status === 'suspended' ? 'bg-destructive' : 
                    'bg-muted-foreground'
                  }`}></span>
                </div>
                <div>
                  <p className="text-sm font-bold group-hover:text-primary transition-colors">{user.profile.firstName} {user.profile.lastName}</p>
                  <p className="text-[10px] text-muted-foreground font-medium">{user.contact.email}</p>
                </div>
              </div>
            ),
            col1: (
              <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider ${
                user.role === 'host' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            ),
            col2: (
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  user.status === 'active' ? 'bg-tertiary animate-pulse' : 'bg-destructive'
                }`}></span>
                <span className="text-xs font-bold">{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
              </div>
            ),
            col3: (
              user.verification.email && user.verification.phone ? (
                <div className="flex items-center gap-2 text-tertiary">
                  <Icon icon="lucide:circle-check" className="text-sm" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                </div>
              ) : (
                <span className="px-2 py-1 text-[10px] font-bold rounded-lg uppercase bg-primary/10 text-primary">
                  Pending
                </span>
              )
            ),
            col4: <span className="text-xs font-bold text-muted-foreground">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>,
            col5: (
              <Link 
                to={`/users/profile/${user.id}`}
                className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary inline-flex"
                aria-label="View profile"
              >
                <Icon icon="lucide:more-vertical" className="text-lg" />
              </Link>
            )
          }))}
          searchPlaceholder="Search users..."
          filterButton={true}
          exportButton={true}
          onExport={exportUsers}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          mobileColumns={[0, 5]} // Show User and Actions on mobile
        />
      </div>
    </PageLayout>
  );
}
