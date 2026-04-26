import React, { useState, useMemo, useEffect } from 'react';
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
import PageHeader from '../components/PageHeader';
import UniversalTable from '../components/UniversalTable';
import TimePeriodFilter from '../components/TimePeriodFilter';
import { useFormatCurrency, useFormatDate } from '../config/useAppConfig';
import financialsService from '../services/financialsService';

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

export default function Financials() {
  const formatCurrency = useFormatCurrency();
  const formatDate = useFormatDate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [timePeriod, setTimePeriod] = useState('This Year');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await financialsService.fetchStats(timePeriod);
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch financials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [timePeriod]);

  const transactions = useMemo(() => {
    if (!stats) return [];
    return stats.transactions.map(t => ({
      ...t,
      displayDate: formatDate(t.date),
      displayAmount: formatCurrency(t.amount),
      displayStatus: t.status.charAt(0).toUpperCase() + t.status.slice(1)
    }));
  }, [stats, formatDate, formatCurrency]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Income') return t.category === 'Income';
      if (activeFilter === 'Expenses') return t.category === 'Expense';
      return true;
    });
  }, [transactions, activeFilter]);

  const barData = useMemo(() => ({
    labels: stats?.chartData?.labels || [],
    datasets: [
      {
        label: 'Revenue',
        data: stats?.chartData?.revenue || [],
        backgroundColor: '#2563eb',
        borderRadius: 6,
      },
      {
        label: 'Expenses',
        data: stats?.chartData?.expenses || [],
        backgroundColor: '#e2e8f0',
        borderRadius: 6,
      },
    ],
  }), [stats]);

  const doughnutData = useMemo(() => ({
    labels: stats?.categoryBreakdown?.labels || [],
    datasets: [
      {
        data: stats?.categoryBreakdown?.data || [],
        backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
        borderWidth: 0,
      },
    ],
  }), [stats]);

  if (loading) return (
    <PageLayout>
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </PageLayout>
  );

  const handleDownloadReport = () => {
    if (!transactions.length) return;
    
    const headers = ['Transaction ID', 'Date', 'Category', 'Type', 'Description', 'Amount', 'Status'];
    const csvRows = [
      headers.join(','),
      ...transactions.map(t => [
        t.id,
        t.date,
        t.category,
        t.type || 'N/A',
        `"${t.description.replace(/"/g, '""')}"`,
        t.amount,
        t.status
      ].join(','))
    ];
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `roar_financial_report_${timePeriod.toLowerCase().replace(' ', '_')}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const summary = stats?.summary || { totalRevenue: 0, totalExpenses: 0, netProfit: 0, monthlyGrowth: 0 };

  return (
    <PageLayout>
      <PageHeader
        title="Financials & Expenses"
        description="Track revenue, monitor operational costs, and manage payouts."
        customContent={<TimePeriodFilter value={timePeriod} onChange={setTimePeriod} />}
        actions={[
          {
            type: 'button',
            label: 'Download Report',
            icon: 'lucide:download',
            onClick: handleDownloadReport
          },
          {
            type: 'link',
            label: 'Record Expense',
            icon: 'lucide:plus',
            to: '/financials/record-expense',
            variant: 'primary'
          }
        ]}
      />

      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Gross Revenue" 
            value={formatCurrency(summary.totalRevenue)}
            trend={`+${summary.monthlyGrowth}% vs last month`} 
            trendType="up" 
          />
          <StatCard 
            title="Total Expenses" 
            value={formatCurrency(summary.totalExpenses)}
            trend="Stable" 
            trendType="neutral" 
          />
          <StatCard 
            title="Net Profit" 
            value={formatCurrency(summary.netProfit)}
            trend="Upward trend" 
            trendType="up" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="text-lg font-heading font-bold mb-6">Revenue vs Expenses</h2>
            <div className="h-64">
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="text-lg font-heading font-bold mb-6">Expense Breakdown</h2>
            <div className="h-64 flex items-center justify-center">
              <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, cutout: '70%' }} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {['All', 'Income', 'Expenses'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeFilter === filter ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <UniversalTable
            headers={['Transaction ID', 'Date', 'Category', 'Description', 'Amount', 'Status']}
            data={filteredTransactions.map((t) => ({
              col0: t.id,
              col1: t.displayDate,
              col2: (
                <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider ${
                  t.category === 'Income' ? 'bg-tertiary/10 text-tertiary' : 'bg-destructive/10 text-destructive'
                }`}>
                  {t.category}
                </span>
              ),
              col3: t.description,
              col4: (
                <span className={`text-sm font-bold ${t.category === 'Income' ? 'text-tertiary' : 'text-destructive'}`}>
                  {t.displayAmount}
                </span>
              ),
              col5: (
                <span className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase ${
                  t.status === 'completed' ? 'bg-tertiary/10 text-tertiary' : 'bg-muted text-muted-foreground'
                }`}>
                  {t.displayStatus}
                </span>
              )
            }))}
            loading={loading}
            emptyMessage={`No ${activeFilter === 'All' ? 'transactions' : activeFilter.toLowerCase()} found`}
          />
        </div>
      </div>
    </PageLayout>
  );
}
