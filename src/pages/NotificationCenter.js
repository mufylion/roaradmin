import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { mockBookings } from '../data/mockBookings';
import { mockUsers } from '../data/mockUsers';

const NotificationItem = ({
  unread = false,
  icon,
  iconBgClass,
  iconColorClass,
  title,
  time,
  description,
  actionLabel,
  actionClass = "text-primary",
  showBorder = false,
  onDismiss,
  onMarkAsRead,
  relatedId = null, // New prop for linking
  category = null    // New prop for categorizing actions
}) => (
  <div
    className={`bg-card p-4 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group flex gap-4 items-start relative overflow-hidden ${
      !unread ? 'bg-card/50 opacity-80 hover:opacity-100' : ''
    }`}
  >
    {unread && showBorder && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
    <div className={`w-12 h-12 ${iconBgClass} rounded-xl flex items-center justify-center shrink-0`}>
      <Icon icon={icon} className={`text-2xl ${iconColorClass}`} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className={`text-sm font-bold text-foreground transition-colors truncate ${unread ? 'group-hover:text-primary' : ''}`}>
          {title}
        </h3>
        <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap uppercase tracking-tighter">
          {time}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      {(actionLabel || unread) && (
        <div className="flex items-center gap-4 mt-3">
          {actionLabel && (
            category === 'bookings' && relatedId ? (
              <Link 
                to={`/bookings/${relatedId}`}
                className={`text-xs font-bold hover:underline underline-offset-4 ${actionClass}`}
              >
                {actionLabel}
              </Link>
            ) : category === 'users' && relatedId ? (
              <Link 
                to={`/users/${relatedId}`}
                className={`text-xs font-bold hover:underline underline-offset-4 ${actionClass}`}
              >
                {actionLabel}
              </Link>
            ) : (
              <button className={`text-xs font-bold hover:underline underline-offset-4 ${actionClass}`}>
                {actionLabel}
              </button>
            )
          )}
          {unread && (
            <button 
              className="text-xs font-bold text-muted-foreground hover:text-foreground"
              onClick={() => onMarkAsRead && onMarkAsRead()}
            >
              Dismiss
            </button>
          )}
        </div>
      )}
    </div>
    <div className="flex flex-col items-end gap-2 shrink-0">
      {unread && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
      <Icon icon="lucide:more-vertical" className="text-muted-foreground cursor-pointer hover:text-foreground" />
    </div>
  </div>
);

// Helper function to calculate time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Debug: Log the calculation
    console.log('Time calculation debug:', {
      now: now.toISOString(),
      date: new Date(date).toISOString(),
      diffMs,
      diffHours,
      diffDays
    });
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else if (diffHours > 24) { // More than 24 hours
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else if (diffMs > 60000) { // More than 1 minute
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    } else {
      return 'Just now';
    }
  };

export default function NotificationCenter() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Generate all notifications from existing mock data
  const notifications = useMemo(() => {
    let allNotifications = [];
    
    // Generate booking-related notifications
    const recentBookings = mockBookings
      .filter(b => b.status === 'confirmed' || b.status === 'pending')
      .slice(0, 3);
    
    recentBookings.forEach((booking, index) => {
      const bookingDate = new Date(booking.createdAt);
      const now = new Date();
      const diffMs = now - bookingDate;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      allNotifications.push({
        id: 1000 + index,
        unread: Math.random() > 0.5,
        icon: "lucide:calendar-check",
        iconBgClass: "bg-primary/10",
        iconColorClass: "text-primary",
        title: booking.status === 'confirmed' ? "New Booking Confirmed" : "New Booking Request",
        time: getTimeAgo(bookingDate),
        description: <>
          Guest <span className="font-bold text-foreground">{booking.guest.name}</span> -{' '}
          <span className="font-bold text-foreground">{booking.dates.nights}-night stay at {booking.listing.title}</span>. Total value: ₦{booking.pricing.total.toLocaleString()}.
        </>,
        actionLabel: "View Details",
        category: "bookings",
        relatedId: booking.id
      });
    });

    // Generate user-related notifications
    const recentUsers = mockUsers
      .filter(u => u.createdAt)
      .slice(-2);
      
    recentUsers.forEach((user, index) => {
      const userDate = new Date(user.createdAt);
      const now = new Date();
      const diffMs = now - userDate;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      allNotifications.push({
        id: 2000 + index,
        unread: Math.random() > 0.5,
        icon: "lucide:user-plus",
        iconBgClass: "bg-purple-500/10",
        iconColorClass: "text-purple-500",
        title: "New User Registration",
        time: getTimeAgo(userDate),
        description: <>
          <span className="font-bold text-foreground">{user.name}</span> joined the platform.
        </>,
        actionLabel: "View Profile",
        category: "users",
        relatedId: user.id
      });
    });

    // Generate system notifications with dynamic timestamps based on mock data
    const getLatestBookingDate = () => {
      const dates = mockBookings.map(b => new Date(b.createdAt));
      return new Date(Math.max(...dates));
    };

    const getLatestUserDate = () => {
      const dates = mockUsers.filter(u => u.createdAt).map(u => new Date(u.createdAt));
      return new Date(Math.max(...dates));
    };

    const systemNotifications = [
      {
        id: 3001,
        unread: true,
        icon: "lucide:shield-alert",
        iconBgClass: "bg-orange-500/10",
        iconColorClass: "text-orange-500",
        title: "Host Verification Required",
        time: getTimeAgo(new Date(getLatestBookingDate().getTime() - 2 * 60 * 60 * 1000)), // 2 hours before latest booking
        description: <>
          Host <span className="font-bold text-foreground">Marcus Chen</span> uploaded new identity documents for{' '}
          verification. Action required before listing activation.
        </>,
        actionLabel: "Review Documents",
        category: "system"
      },
      {
        id: 3002,
        unread: false,
        icon: "lucide:credit-card",
        iconBgClass: "bg-muted",
        iconColorClass: "text-muted-foreground",
        title: "Payout Processed Successfully",
        time: getTimeAgo(new Date(getLatestBookingDate().getTime() - 6 * 60 * 60 * 1000)), // 6 hours before latest booking
        description: <>
          Weekly payout of ₦1,245,000 has been initiated to your primary bank account ending in ****4291.
        </>,
        actionLabel: "View Details",
        category: "system"
      },
      {
        id: 3003,
        unread: true,
        icon: "lucide:circle-alert",
        iconBgClass: "bg-destructive/10",
        iconColorClass: "text-destructive",
        title: "Security Alert: Unusual Login",
        time: getTimeAgo(new Date(getLatestBookingDate().getTime() - 2 * 24 * 60 * 60 * 1000)), // 2 days before latest booking
        description: <>
          Unusual login detected for admin account <span className="font-bold text-foreground">j.doe@roarhomes.com</span>{' '}
          from a new IP in London, UK.
        </>,
        actionLabel: "Review Security Log",
        category: "system"
      }
    ];

    // Combine all notifications
    return [...allNotifications, ...systemNotifications];
  }, []);  

  const tabs = ['All', 'Unread', 'System', 'Bookings'];

  const getUnreadCount = () => notifications.filter(n => n.unread).length;
  const getFilteredNotifications = () => {
    let filtered = notifications;
    
    // Filter by tab
    if (activeTab === 'Unread') {
      filtered = filtered.filter(n => n.unread);
    } else if (activeTab === 'System') {
      filtered = filtered.filter(n => n.category === 'system');
    } else if (activeTab === 'Bookings') {
      filtered = filtered.filter(n => n.category === 'bookings');
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof n.description === 'string' && n.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const dismissNotification = (id) => {
    markAsRead(id);
  };

  return (
    <PageLayout>
      <PageHeader
        title="Notifications Center"
        description="Manage system alerts and user activity."
        customContent={
          <>
            <div className="relative group">
              <Icon
                icon="lucide:search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              />
              <input
                type="text"
                placeholder="Filter alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 w-48 md:w-64 transition-all outline-none"
              />
            </div>
            <button className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center relative transition-colors shadow-lg shadow-primary/20">
              <Icon icon="lucide:bell" className="text-xl" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-primary-foreground animate-pulse"></span>
            </button>
          </>
        }
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
        {/* Tabs and Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center bg-muted p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-card shadow-sm text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'Unread' ? `${tab} (${getUnreadCount()})` : tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-all"
            >
              <Icon icon="lucide:check-check" className="text-lg" />
              Mark all as read
            </button>
            <button 
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-destructive hover:bg-destructive/10 rounded-xl transition-all"
            >
              <Icon icon="lucide:trash-2" className="text-lg" />
              Clear All
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {getFilteredNotifications().length > 0 ? (
            getFilteredNotifications().map((notification) => (
              <NotificationItem
                key={notification.id}
                unread={notification.unread}
                showBorder={notification.unread}
                icon={notification.icon}
                iconBgClass={notification.iconBgClass}
                iconColorClass={notification.iconColorClass}
                title={notification.title}
                time={notification.time}
                description={notification.description}
                actionLabel={notification.actionLabel}
                actionClass={notification.actionClass}
                onMarkAsRead={() => dismissNotification(notification.id)}
                category={notification.category}
                relatedId={notification.relatedId}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Icon icon="lucide:inbox" className="text-4xl text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications found</p>
              <p className="text-sm text-muted-foreground mt-2">
                {activeTab === 'Unread' ? 'All notifications have been read' : 
                 activeTab === 'System' ? 'No system notifications' : 
                 activeTab === 'Bookings' ? 'No booking notifications' : 
                 searchTerm ? 'Try adjusting your search' : 'No notifications available'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination/Load More */}
        <div className="flex items-center justify-center py-6">
          <button className="px-8 py-3 bg-card border border-border rounded-xl text-sm font-bold hover:bg-muted transition-all active:scale-95 shadow-sm flex items-center gap-2">
            <Icon icon="lucide:refresh-cw" className="text-lg" />
            Load Older Notifications
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
