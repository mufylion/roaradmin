import React from 'react';
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
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [3200, 4100, 3800, 5200, 4800, 6500, 5900],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.05)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#2563eb',
      },
    ],
  };

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
          callback: (val) => '$' + val,
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
      {/* Header */}
      <header className="h-20 bg-card border-b border-border px-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-heading font-bold">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="pl-10 pr-4 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 w-64 transition-all outline-none"
            />
          </div>
          <Link to="/notifications" className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center relative transition-colors">
            <Icon icon="lucide:bell" className="text-xl" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-card animate-pulse"></span>
          </Link>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon="lucide:activity" 
            label="Total Revenue" 
            value="$48,250.00" 
            trend="12.5%" 
            colorClass="text-primary" 
            bgClass="bg-primary/10" 
          />
          <StatCard 
            icon="lucide:calendar" 
            label="Active Bookings" 
            value="154" 
            trend="8.2%" 
            colorClass="text-tertiary" 
            bgClass="bg-tertiary/10" 
          />
          <StatCard 
            icon="lucide:layers" 
            label="Total Listings" 
            value="42" 
            trend="Stable" 
            colorClass="text-orange-500" 
            bgClass="bg-orange-500/10" 
          />
          <StatCard 
            icon="lucide:users" 
            label="New Users" 
            value="1,205" 
            trend="+ 24" 
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
                <p className="text-xs text-muted-foreground">Monitor daily revenue trends</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20 transition-colors">Export</button>
                <select className="bg-muted border-none rounded-lg text-xs px-3 py-1.5 font-bold outline-none focus:ring-2 focus:ring-primary cursor-pointer">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Year</option>
                </select>
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
              <ActivityItem 
                icon="lucide:check-circle" 
                bgClass="bg-blue-50 hover:bg-blue-100" 
                iconColor="text-primary" 
                title="New Booking Confirmed" 
                subtitle="Modern Loft in NYC · $450.00" 
                time="2 mins ago" 
              />
              <ActivityItem 
                icon="lucide:plus" 
                bgClass="bg-orange-50 hover:bg-orange-100" 
                iconColor="text-orange-500" 
                title="New Listing Added" 
                subtitle="Seaside Villa, Malibu" 
                time="45 mins ago" 
              />
              <ActivityItem 
                icon="lucide:user-plus" 
                bgClass="bg-purple-50 hover:bg-purple-100" 
                iconColor="text-purple-500" 
                title="New User Registered" 
                subtitle="Sarah Jenkins (Guest)" 
                time="1 hour ago" 
              />
              <ActivityItem 
                icon="lucide:circle-alert" 
                bgClass="bg-destructive/10 hover:bg-destructive/20" 
                iconColor="text-destructive" 
                title="Payment Failed" 
                subtitle="Booking #RH-9421 · $120.00" 
                time="3 hours ago" 
              />
            </div>
            <Link to="/notifications" className="w-full mt-6 py-2.5 bg-muted hover:bg-muted/80 text-sm font-bold rounded-xl transition-all active:scale-95 text-center block">View All Activity</Link>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-heading font-bold">Recent Bookings</h2>
              <p className="text-xs text-muted-foreground">Manage your latest reservations</p>
            </div>
            <Link to="/bookings" className="text-primary text-sm font-bold hover:underline underline-offset-4 decoration-2">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-widest font-black">
                <tr>
                  <th className="px-6 py-4">Guest</th>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Check In</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-8 h-8 rounded-full ring-2 ring-transparent group-hover:ring-primary/20 transition-all" alt="User" />
                      <span className="text-sm font-semibold">Sophia Miller</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">Downtown Loft, NY</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Oct 24, 2024</td>
                  <td className="px-6 py-4 text-sm font-bold">$450.00</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-tertiary/10 text-tertiary text-[10px] font-black rounded-lg uppercase">Confirmed</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all">
                      <Icon icon="lucide:move-right" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src="https://randomuser.me/api/portraits/men/86.jpg" className="w-8 h-8 rounded-full ring-2 ring-transparent group-hover:ring-primary/20 transition-all" alt="User" />
                      <span className="text-sm font-semibold">James Wilson</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">Mountain Escape</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Oct 26, 2024</td>
                  <td className="px-6 py-4 text-sm font-bold">$1,200.00</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase">Pending</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all">
                      <Icon icon="lucide:move-right" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
