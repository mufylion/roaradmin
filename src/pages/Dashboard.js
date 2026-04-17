import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import UniversalTable from '../components/UniversalTable';
import TimePeriodFilter from '../components/TimePeriodFilter';
import { useFormatCurrency, useFormatDate } from '../config/useAppConfig';
import { mockBookings, getBookingStats } from '../data/mockBookings';
import { mockUsers, getUserStats } from '../data/mockUsers';
import { mockFinancials } from '../data/mockFinancials';
import { useTimeBasedData } from '../hooks/useTimeBasedData';

// Notification Item component for Dashboard
const DashboardNotificationItem = ({
  icon,
  iconBgClass,
  iconColorClass,
  title,
  time,
  description,
  actionLabel,
  showBorder = false,
  category = null,
  relatedId = null
}) => (
  <div className="bg-card p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-all group flex gap-4 items-start relative overflow-hidden">
    {showBorder && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
    <div className="w-10 h-10 flex-shrink-0">
      <div className={`w-full h-full ${iconBgClass} rounded-xl flex items-center justify-center`}>
        <Icon icon={icon} className={`text-xl ${iconColorClass}`} />
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className="text-sm font-bold text-foreground truncate">{title}</h3>
        <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap uppercase tracking-tighter">{time}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      {actionLabel && (
        category === 'bookings' && relatedId ? (
          <Link 
            to={`/bookings/${relatedId}`}
            className="text-xs font-bold text-primary hover:underline underline-offset-4"
          >
            {actionLabel}
          </Link>
        ) : category === 'users' && relatedId ? (
          <Link 
            to={`/users/${relatedId}`}
            className="text-xs font-bold text-primary hover:underline underline-offset-4"
          >
            {actionLabel}
          </Link>
        ) : (
          <button className="text-xs font-bold text-primary hover:underline underline-offset-4">
            {actionLabel}
          </button>
        )
      )}
    </div>
    <div className="flex flex-col items-end gap-2 shrink-0">
      <Icon icon="lucide:more-vertical" className="text-muted-foreground cursor-pointer hover:text-foreground" />
    </div>
  </div>
);

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const StatCard = ({
  icon,
  label,
  value,
  trend,
  colorClass,
  bgClass,
}) => (
  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group cursor-default">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 ${bgClass} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon icon={icon} className={`text-2xl ${colorClass}`} />
      </div>
      {trend && (
        <span className={`text-xs font-bold ${trend.includes('+') || trend.includes('%') ? 'text-tertiary bg-tertiary/10' : 'text-muted-foreground bg-muted'} px-2 py-1 rounded-lg flex items-center gap-1`}>
          {trend.includes('%') && <Icon icon="lucide:arrow-up-right" />}
          {trend}
        </span>
      )}
    </div>
    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{label}</p>
    <h3 className="text-2xl font-bold mt-1">{value}</h3>
  </div>
);

const ActivityItem = ({ icon, bgClass, iconColor, title, subtitle, time }) => (
  <div className="flex gap-4 group cursor-pointer">
    <div className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center shrink-0 transition-colors`}>
      <Icon icon={icon} className={`${iconColor} text-xl`} />
    </div>
    <div className="flex-1">
      <p className={`text-sm font-semibold group-hover:${iconColor} transition-colors`}>{title}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
      <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-tighter">{time}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const formatCurrency = useFormatCurrency();
  const formatDate = useFormatDate();
  const [chartPeriod, setChartPeriod] = useState('This Month');

  // Calculate stats from mock data
  const bookingStats = useMemo(() => getBookingStats(), []);
  const userStats = useMemo(() => getUserStats(), []);
  
  // Calculate truly active bookings (currently staying)
  const activeBookings = useMemo(() => {
    // Use current date (April 2026)
    const today = new Date();
    return mockBookings.filter(booking => {
      if (booking.status !== 'confirmed') return false;
      const checkIn = new Date(booking.dates.checkIn);
      const checkOut = new Date(booking.dates.checkOut);
      return checkIn <= today && checkOut >= today;
    }).length;
  }, []);

  // Use reusable time-based data hook
  const timeBasedData = useTimeBasedData(chartPeriod, mockBookings);

  // Generate recent activity notifications
  const recentActivity = useMemo(() => {
    const activities = [];
    
    // Add booking-related notifications
    const recentBookings = mockBookings
      .filter(b => b.status === 'confirmed' || b.status === 'pending')
      .slice(0, 3);
    
    recentBookings.forEach((booking, index) => {
      const bookingDate = new Date(booking.createdAt);
      const now = new Date();
      const diffMs = now - bookingDate;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      activities.push({
        id: 1000 + index,
        unread: Math.random() > 0.5,
        icon: "lucide:calendar-check",
        iconBgClass: "bg-primary/10",
        iconColorClass: "text-primary",
        title: booking.status === 'confirmed' ? "New Booking Confirmed" : "New Booking Request",
        time: diffDays > 0 ? `${diffDays} day${diffDays === 1 ? '' : 's'} ago` : `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`,
        description: <>
          Guest <span className="font-bold text-foreground">{booking.guest.name}</span> -{' '}
          <span className="font-bold text-foreground">{booking.listing.title}</span>
        </>,
        actionLabel: "View Details",
        category: "bookings",
        relatedId: booking.id
      });
    });

    // Add user-related notifications
    const recentUsers = mockUsers.filter(u => u.createdAt).slice(-2);
    recentUsers.forEach((user, index) => {
      const userDate = new Date(user.createdAt);
      const now = new Date();
      const diffMs = now - userDate;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      activities.push({
        id: 2000 + index,
        unread: Math.random() > 0.5,
        icon: "lucide:user-plus",
        iconBgClass: "bg-purple-500/10",
        iconColorClass: "text-purple-500",
        title: "New User Registration",
        time: diffDays > 0 ? `${diffDays} day${diffDays === 1 ? '' : 's'} ago` : `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`,
        description: <>
          <span className="font-bold text-foreground">{user.name}</span> joined the platform.
        </>,
        actionLabel: "View Profile",
        category: "users",
        relatedId: user.id
      });
    });

    // Add system notifications
    const systemNotifications = [
      {
        id: 3001,
        unread: true,
        icon: "lucide:shield-alert",
        iconBgClass: "bg-orange-500/10",
        iconColorClass: "text-orange-500",
        title: "Host Verification Required",
        time: "2 hours ago",
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
        time: "6 hours ago",
        description: <>
          Weekly payout of ₦1,245,000 has been initiated to your primary bank account ending in ****4291.
        </>,
        actionLabel: "View Details",
        category: "system"
      }
    ];

    return [...activities, ...systemNotifications];
  }, []);

  // Generate chart data from time-based hook
  const chartData = useMemo(() => {
    return {
      labels: timeBasedData.labels,
      datasets: [
        {
          label: 'Revenue',
          data: timeBasedData.revenueData,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#2563eb',
          pointBorderWidth: 2,
        },
      ],
    };
  }, [timeBasedData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { 
          tickBorderDash: [5, 5],
          color: '#e2e8f0',
        },
        ticks: {
          font: { size: 10, weight: 'bold' },
          color: '#64748b',
          callback: (val) => formatCurrency(val),
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 10, weight: 'bold' },
          color: '#64748b',
        },
      },
    },
  };

  return (
    <PageLayout>
      <PageHeader
        title="Dashboard Overview"
        description="Welcome back, here's what's happening today."
        customContent={
          <>
            <div className="relative group">
              <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 w-32 xs:w-40 sm:w-48 md:w-64 transition-all outline-none"
              />
            </div>
            <Link to="/notifications" className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center relative transition-colors">
              <Icon icon="lucide:bell" className="text-xl" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-card animate-pulse"></span>
            </Link>
          </>
        }
      />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon="lucide:activity" 
            label="Total Revenue" 
            value={formatCurrency(timeBasedData.totalRevenue)}
            trend={timeBasedData.monthlyGrowth > 0 ? `+${timeBasedData.monthlyGrowth}%` : "No activity this year"} 
            colorClass={timeBasedData.monthlyGrowth > 0 ? "text-primary" : "text-muted-foreground"} 
            bgClass={timeBasedData.monthlyGrowth > 0 ? "bg-primary/10" : "bg-muted"} 
          />
          <StatCard 
            icon="lucide:calendar" 
            label="Active Bookings" 
            value={activeBookings} 
            trend={activeBookings > 0 ? "+8.2%" : "None currently"} 
            colorClass="text-tertiary" 
            bgClass="bg-tertiary/10" 
          />
          <StatCard 
            icon="lucide:layers" 
            label="Total Listings" 
            value={userStats.totalListings} 
            trend="Stable" 
            colorClass="text-orange-500" 
            bgClass="bg-orange-500/10" 
          />
          <StatCard 
            icon="lucide:users" 
            label="Total Users" 
            value={userStats.total} 
            trend={`+${userStats.newThisMonth}`} 
            colorClass="text-purple-500" 
            bgClass="bg-purple-500/10" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-heading font-bold">Revenue Performance</h2>
                <p className="text-xs text-muted-foreground">Monitor {chartPeriod.toLowerCase()} revenue trends</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20 transition-colors">Export</button>
                <TimePeriodFilter 
                  value={chartPeriod}
                  onChange={setChartPeriod}
                />
              </div>
            </div>
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
            <h2 className="text-lg font-heading font-bold mb-6">Recent Activity</h2>
            <div className="space-y-6 flex-1">
              {recentActivity.slice(0, 3).map((activity, index) => (
                <DashboardNotificationItem 
                  key={activity.id}
                  icon={activity.icon}
                  iconBgClass={activity.iconBgClass}
                  iconColorClass={activity.iconColorClass}
                  title={activity.title}
                  time={activity.time}
                  description={activity.description}
                  actionLabel={activity.actionLabel}
                  showBorder={activity.unread}
                  category={activity.category}
                  relatedId={activity.relatedId}
                />
              ))}
            </div>
            <Link to="/notifications" className="w-full mt-6 py-2.5 bg-muted hover:bg-muted/80 text-sm font-bold rounded-xl transition-all active:scale-95 text-center block">View All Activity</Link>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-heading font-bold">Recent Bookings</h2>
              <p className="text-xs text-muted-foreground">Manage your latest reservations</p>
            </div>
            <Link to="/bookings" className="text-primary text-sm font-bold hover:underline underline-offset-4 decoration-2">View All</Link>
          </div>
          
          <UniversalTable
            headers={['Guest', 'Property', 'Check In', 'Amount', 'Status', 'Actions']}
            data={mockBookings.slice(0, 5).map(booking => ({
              col0: ({ rowIndex }) => (
                <div className="flex items-center gap-3">
                  <img src={booking.guest.avatar} className="w-8 h-8 rounded-full ring-2 ring-transparent group-hover:ring-primary/20 transition-all" alt={booking.guest.name} />
                  <span className="text-sm font-semibold">{booking.guest.name}</span>
                </div>
              ),
              col1: booking.listing.title,
              col2: formatDate(booking.dates.checkIn),
              col3: <span className="text-sm font-bold">{formatCurrency(booking.pricing.total)}</span>,
              col4: (
                <span className={`px-2 py-1 text-[10px] font-black rounded-lg uppercase ${
                  booking.status === 'confirmed' ? 'bg-tertiary/10 text-tertiary' : 
                  booking.status === 'pending' ? 'bg-primary/10 text-primary' : 
                  'bg-destructive/10 text-destructive'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              ),
              col5: (
                <Link 
                  to={`/bookings/${booking.id}`}
                  className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all inline-flex"
                  aria-label="View booking"
                >
                  <Icon icon="lucide:move-right" />
                </Link>
              )
            }))}
            searchPlaceholder="Search bookings..."
            filterButton={true}
            exportButton={true}
            mobileColumns={[0, 2, 4]} // Guest, Check In, Status on mobile
          />
        </div>
      </div>
    </PageLayout>
  );
}
