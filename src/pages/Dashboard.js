import React, { useMemo, useState, useEffect } from 'react';
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
import { useDashboardStats } from '../hooks/useDashboardStats';
import { useBookings } from '../hooks/useBookings';
import { useProperties } from '../hooks/useProperties';

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
      <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>
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
  loading = false
}) => (
  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group cursor-default">
    {loading ? (
      <div className="animate-pulse space-y-4">
        <div className="flex justify-between">
          <div className="w-12 h-12 bg-muted rounded-xl"></div>
          <div className="w-12 h-6 bg-muted rounded-lg"></div>
        </div>
        <div className="h-4 bg-muted w-1/2 rounded"></div>
        <div className="h-8 bg-muted w-3/4 rounded"></div>
      </div>
    ) : (
      <>
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
      </>
    )}
  </div>
);

export default function Dashboard() {
  const formatCurrency = useFormatCurrency();
  const formatDate = useFormatDate();
  const [chartPeriod, setChartPeriod] = useState('This Month');

  const { stats, activity, loading: statsLoading, error: statsError } = useDashboardStats();
  const { bookings, loading: bookingsLoading } = useBookings({ limit: 5 });
  const { properties } = useProperties();

  // Generate chart data from real backend series
  const chartData = useMemo(() => {
    const series = stats?.revenueSeries || [];
    const labels = series.length > 0 ? series.map(s => s.month) : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = series.length > 0 ? series.map(s => s.revenue) : [0, 0, 0, 0, 0, 0];

    return {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data,
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
  }, [stats]);

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

      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        {statsError && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-xl text-sm font-bold">
            {statsError}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon="lucide:activity" 
            label="Total Revenue" 
            value={formatCurrency(stats?.totalRevenue || 0)}
            trend={stats?.revenueGrowth > 0 ? `+${stats.revenueGrowth}%` : "No growth"} 
            colorClass="text-primary" 
            bgClass="bg-primary/10" 
            loading={statsLoading}
          />
          <StatCard 
            icon="lucide:calendar" 
            label="Confirmed Bookings" 
            value={stats?.confirmedBookings || 0} 
            trend="Active" 
            colorClass="text-tertiary" 
            bgClass="bg-tertiary/10" 
            loading={statsLoading}
          />
          <StatCard 
            icon="lucide:layers" 
            label="Total Listings" 
            value={stats?.totalProperties || properties.length} 
            trend="Stable" 
            colorClass="text-orange-500" 
            bgClass="bg-orange-500/10" 
            loading={statsLoading}
          />
          <StatCard 
            icon="lucide:users" 
            label="Total Users" 
            value={stats?.totalUsers || 0} 
            trend={`+${stats?.newUsersToday || 0}`} 
            colorClass="text-purple-500" 
            bgClass="bg-purple-500/10" 
            loading={statsLoading}
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
              {statsLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Icon icon="lucide:loader-2" className="text-3xl text-primary animate-spin" />
                </div>
              ) : (
                activity.slice(0, 2).map((item) => (
                  <DashboardNotificationItem 
                    key={item.id}
                    icon={item.icon || (item.type === 'booking' ? "lucide:calendar-check" : "lucide:user-plus")}
                    iconBgClass={
                      item.type === 'booking' ? "bg-primary/10" : 
                      item.type === 'property' ? "bg-orange-500/10" : "bg-purple-500/10"
                    }
                    iconColorClass={
                      item.type === 'booking' ? "text-primary" : 
                      item.type === 'property' ? "text-orange-500" : "text-purple-500"
                    }
                    title={item.title}
                    time={formatDate(item.time)}
                    description={item.description}
                    actionLabel="View Details"
                    category={item.type === 'booking' ? "bookings" : item.type === 'user' ? "users" : "listings"}
                    relatedId={item.id.split('-')[1]}
                  />
                ))
              )}
              {!statsLoading && activity.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No recent activity.
                </div>
              )}
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
            data={bookings.map(booking => ({
              col0: ({ rowIndex }) => (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-border bg-muted flex items-center justify-center overflow-hidden">
                    {booking.User?.avatar ? (
                      <img src={booking.User.avatar} className="w-full h-full object-cover" alt="guest" />
                    ) : (
                      <Icon icon="lucide:user" className="text-muted-foreground" />
                    )}
                  </div>
                  <span className="text-sm font-semibold">
                    {`${booking.guestFirstName || booking.User?.firstName || ''} ${booking.guestLastName || booking.User?.lastName || ''}`.trim()}
                  </span>
                </div>
              ),
              col1: booking.Property?.name || 'Unknown',
              col2: formatDate(booking.checkInDate),
              col3: <span className="text-sm font-bold">{formatCurrency(booking.totalAmount)}</span>,
              col4: (
                <span className={`px-2 py-1 text-[10px] font-black rounded-lg uppercase ${
                  booking.status === 'confirmed' ? 'bg-tertiary/10 text-tertiary' : 
                  booking.status === 'pending' ? 'bg-primary/10 text-primary' : 
                  'bg-destructive/10 text-destructive'
                }`}>
                  {booking.status}
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
            loading={bookingsLoading}
            searchPlaceholder="Search bookings..."
            filterButton={true}
            exportButton={true}
            mobileColumns={[0, 2, 4]} 
          />
        </div>
      </div>
    </PageLayout>
  );
}

