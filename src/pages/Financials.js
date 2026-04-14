import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import PageLayout from '../components/PageLayout';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatCard = ({ title, value, trend, trendType, icon }) => {
  const trendColor = trendType === 'up' ? 'text-tertiary' : trendType === 'down' ? 'text-destructive' : 'text-primary';
  const trendIcon = trendType === 'up' ? 'lucide:arrow-up-right' : trendType === 'down' ? 'lucide:arrow-down-right' : icon;

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
      <p className="text-xs text-muted-foreground font-bold uppercase mb-1">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      <div className={`mt-4 flex items-center gap-1 ${trendColor}`}>
        {trendIcon && <Icon icon={trendIcon} />}
        <span className="text-xs font-bold">{trend}</span>
      </div>
    </div>
  );
};

const TransactionRow = ({ id, date, category, description, amount, status }) => (
  <tr className="hover:bg-muted/30 transition-colors">
    <td className="px-6 py-4 text-xs font-bold text-primary">{id}</td>
    <td className="px-6 py-4 text-xs">{date}</td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase ${
        category === 'Income' ? 'bg-tertiary/10 text-tertiary' : 'bg-destructive/10 text-destructive'
      }`}>
        {category}
      </span>
    </td>
    <td className="px-6 py-4 text-xs">{description}</td>
    <td className={`px-6 py-4 text-xs font-bold ${
      category === 'Income' ? 'text-tertiary' : 'text-destructive'
    }`}>
      {category === 'Income' ? '+' : '-'}{amount}
    </td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase ${
        status === 'Completed' ? 'bg-tertiary/10 text-tertiary' : 
        status === 'Pending' ? 'bg-primary/10 text-primary' : 
        'bg-muted text-muted-foreground'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
        <Icon icon="lucide:download" className="text-muted-foreground" />
      </button>
    </td>
  </tr>
);

export default function Financials() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Chart Data
  const barData = {
    labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Revenue',
        data: [45000, 52000, 61000, 58000, 124500],
        backgroundColor: '#2563eb',
        borderRadius: 6,
      },
      {
        label: 'Expenses',
        data: [12000, 15000, 18000, 14000, 32400],
        backgroundColor: '#e2e8f0',
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 10, font: { size: 10 } },
      },
    },
    scales: {
      y: { 
        grid: { display: false }, 
        ticks: { font: { size: 10 } } 
      },
      x: { 
        grid: { display: false }, 
        ticks: { font: { size: 10 } } 
      },
    },
  };

  const doughnutData = {
    labels: ['Maintenance', 'Marketing', 'Staff', 'Platform'],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: { boxWidth: 10, font: { size: 10 } },
      },
    },
  };

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-20 bg-card border-b border-border px-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-heading font-bold">Financials & Expenses</h1>
          <p className="text-sm text-muted-foreground">Track revenue, monitor operational costs, and manage payouts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-muted text-foreground px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-muted/80 transition-all text-xs">
            <Icon icon="lucide:download" className="text-lg" />
            <span>Download Report</span>
          </button>
          <Link 
            to="/financials/record-expense"
            className="bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all text-xs"
          >
            <Icon icon="lucide:plus" className="text-lg" />
            <span>Record Expense</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Gross Revenue" 
            value="$124,500" 
            trend="+18% vs last month" 
            trendType="up" 
          />
          <StatCard 
            title="Total Expenses" 
            value="$32,400" 
            trend="+5% vs last month" 
            trendType="down" 
          />
          <StatCard 
            title="Net Profit" 
            value="$92,100" 
            trend="+22% vs last month" 
            trendType="up" 
          />
          <StatCard 
            title="Pending Payouts" 
            value="$18,200" 
            trend="42 pending transfers" 
            trendType="neutral" 
            icon="lucide:clock" 
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="text-lg font-heading font-bold mb-6">Revenue vs Expenses</h2>
            <div className="h-64">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="text-lg font-heading font-bold mb-6">Expense Breakdown</h2>
            <div className="h-64 flex items-center justify-center">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-heading font-bold">Recent Transactions</h2>
            <div className="flex gap-2">
              {['All', 'Income', 'Expenses'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    activeFilter === filter
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <TransactionRow 
                  id="#TXN-4921"
                  date="Oct 24, 2024"
                  category="Income"
                  description="Booking #SN-9821 - Downtown Loft"
                  amount="$435.24"
                  status="Completed"
                />
                <TransactionRow 
                  id="#EXP-1034"
                  date="Oct 23, 2024"
                  category="Expense"
                  description="Maintenance - Plumbing Repair (Malibu Villa)"
                  amount="$850.00"
                  status="Completed"
                />
                <TransactionRow 
                  id="#EXP-1035"
                  date="Oct 22, 2024"
                  category="Expense"
                  description="Platform Subscription - AWS Hosting"
                  amount="$1,240.00"
                  status="Pending"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
