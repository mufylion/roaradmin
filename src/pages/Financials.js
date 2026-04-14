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
import PageHeader from '../components/PageHeader';
import UniversalTable from '../components/UniversalTable';
import { useFormatCurrency, useFormatDate, DEFAULT_CONFIG } from '../config/useAppConfig';

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

const TransactionRow = ({ id, date, category, description, amount, status }) => {
  const downloadTransaction = () => {
    // Create transaction data for export
    const transactionData = {
      id,
      date,
      category,
      description,
      amount,
      status,
      exportDate: new Date().toISOString()
    };
    
    // Convert to CSV format
    const csvContent = `Transaction ID,Date,Category,Description,Amount,Status\n${id},"${date}","${category}","${description}","${amount}","${status}"`;
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transaction-${id.substring(1)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
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
        <div className="flex items-center gap-2 justify-end">
          {category === 'Expense' && (
            <Link 
              to={`/financials/edit-expense/${id.substring(1)}`}
              className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
              aria-label="Edit expense"
            >
              <Icon icon="lucide:edit" className="text-muted-foreground" />
            </Link>
          )}
          <button 
            onClick={downloadTransaction}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Download transaction"
          >
            <Icon icon="lucide:download" className="text-muted-foreground" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default function Financials() {
  const formatCurrency = useFormatCurrency();
  const formatDate = useFormatDate();
  const [activeFilter, setActiveFilter] = useState('All');

  const downloadReport = () => {
    // Filter transactions based on active filter
    const transactionsToExport = filteredTransactions;
    
    // Create CSV content for all transactions
    const csvContent = `Transaction ID,Date,Category,Description,Amount,Status\n${
      transactionsToExport.map(transaction => 
        `${transaction.id},"${transaction.date}","${transaction.category}","${transaction.description}","${transaction.amount}","${transaction.status}"`
      ).join('\n')
    }`;
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    link.download = `financial-report-${activeFilter}-${timestamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Sample transactions data
  const transactions = [
    {
      id: '#T-001',
      date: formatDate('2024-10-15'),
      category: 'Income',
      description: 'Platform revenue from booking commissions',
      amount: formatCurrency(250000), // Converting to Naira
      status: 'Completed'
    },
    {
      id: '#T-002',
      date: formatDate('2024-10-14'),
      category: 'Expense',
      description: 'Marketing campaign - Google Ads',
      amount: formatCurrency(45000), // Converting to Naira
      status: 'Completed'
    },
    {
      id: '#T-003',
      date: formatDate('2024-10-12'),
      category: 'Income',
      description: 'Host subscription fees',
      amount: formatCurrency(120000), // Converting to Naira
      status: 'Completed'
    },
    {
      id: '#T-004',
      date: formatDate('2024-10-10'),
      category: 'Expense',
      description: 'Server maintenance and hosting',
      amount: formatCurrency(32000), // Converting to Naira
      status: 'Pending'
    }
  ];

  // Filter transactions based on active filter
  const filteredTransactions = transactions.filter(transaction => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Income') return transaction.category === 'Income';
    if (activeFilter === 'Expenses') return transaction.category === 'Expense';
    return true;
  });

  // Chart Data
  const barData = {
    labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Revenue',
        data: [4500000, 5200000, 6100000, 5800000, 12450000], // Converting to Naira
        backgroundColor: '#2563eb',
        borderRadius: 6,
      },
      {
        label: 'Expenses',
        data: [1200000, 1500000, 1800000, 1400000, 3240000], // Converting to Naira
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
      <PageHeader
        title="Financials & Expenses"
        description="Track revenue, monitor operational costs, and manage payouts."
        actions={[
          {
            type: 'button',
            label: 'Download Report',
            shortLabel: 'Report',
            icon: 'lucide:download',
            onClick: downloadReport
          },
          {
            type: 'link',
            label: 'Record Expense',
            shortLabel: 'Expense',
            icon: 'lucide:plus',
            to: '/financials/record-expense',
            variant: 'primary'
          }
        ]}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Gross Revenue" 
            value={formatCurrency(12450000)} // Converting to Naira (assuming 1 USD = 100 NGN)
            trend="+18% vs last month" 
            trendType="up" 
          />
          <StatCard 
            title="Total Expenses" 
            value={formatCurrency(3240000)} // Converting to Naira
            trend="+5% vs last month" 
            trendType="down" 
          />
          <StatCard 
            title="Net Profit" 
            value={formatCurrency(9210000)} // Converting to Naira
            trend="+22% vs last month" 
            trendType="up" 
          />
          <StatCard 
            title="Pending Payouts" 
            value={formatCurrency(1820000)} // Converting to Naira
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

        {/* Recent Transactions */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Recent Transactions</h2>
                <p className="text-sm text-muted-foreground">Latest financial activities and expense records.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                  <Icon icon="lucide:filter" className="text-lg text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="px-4 md:px-6 py-4 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {['All', 'Income', 'Expenses'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
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
          
          <UniversalTable
            headers={['Transaction ID', 'Date', 'Category', 'Description', 'Amount', 'Status', 'Action']}
            data={filteredTransactions.map((transaction) => ({
              col0: transaction.id,
              col1: transaction.date,
              col2: (
                <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider ${
                  transaction.category === 'Income' ? 'bg-tertiary/10 text-tertiary' : 'bg-destructive/10 text-destructive'
                }`}>
                  {transaction.category}
                </span>
              ),
              col3: transaction.description,
              col4: (
                <span className={`text-sm font-bold ${
                  transaction.category === 'Income' ? 'text-tertiary' : 'text-destructive'
                }`}>
                  {transaction.amount}
                </span>
              ),
              col5: (
                <span className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase ${
                  transaction.status === 'Completed' ? 'bg-tertiary/10 text-tertiary' : 'bg-muted text-muted-foreground'
                }`}>
                  {transaction.status}
                </span>
              ),
              col6: (
                <div className="flex items-center gap-2 justify-end">
                  <button 
                    onClick={() => downloadTransaction(transaction)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    aria-label="Download transaction"
                  >
                    <Icon icon="lucide:download" className="text-muted-foreground" />
                  </button>
                  <Link 
                    to={`/financials/edit-transaction/${transaction.id.substring(1)}`}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    aria-label="Edit transaction"
                  >
                    <Icon icon="lucide:edit" className="text-muted-foreground" />
                  </Link>
                </div>
              )
            }))}
            searchPlaceholder="Search transactions..."
            filterButton={true}
            exportButton={true}
            onExport={downloadReport}
            mobileColumns={[0, 2, 4]} // Transaction ID, Category, Amount on mobile
            emptyMessage={`No ${activeFilter === 'All' ? 'transactions' : activeFilter.toLowerCase()} found`}
          />
        </div>
      </div>
    </PageLayout>
  );
};
