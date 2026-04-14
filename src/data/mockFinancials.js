// Mock Financials Data
export const mockFinancials = {
  summary: {
    totalRevenue: 12450000,
    totalExpenses: 3240000,
    netProfit: 9210000,
    grossMargin: 74.0,
    monthlyGrowth: 12.5,
    yearToDateGrowth: 28.3
  },
  revenue: {
    monthly: [
      { month: 'Jun', revenue: 4500000, bookings: 45 },
      { month: 'Jul', revenue: 5200000, bookings: 52 },
      { month: 'Aug', revenue: 6100000, bookings: 61 },
      { month: 'Sep', revenue: 5800000, bookings: 58 },
      { month: 'Oct', revenue: 12450000, bookings: 124 }
    ],
    sources: [
      { source: 'Direct Bookings', amount: 6200000, percentage: 49.8 },
      { source: 'Airbnb', amount: 3800000, percentage: 30.5 },
      { source: 'Booking.com', amount: 1850000, percentage: 14.9 },
      { source: 'Other', amount: 600000, percentage: 4.8 }
    ],
    categories: [
      { category: 'Luxury Properties', amount: 7800000, percentage: 62.7 },
      { category: 'Standard Properties', amount: 3200000, percentage: 25.7 },
      { category: 'Budget Properties', amount: 1450000, percentage: 11.6 }
    ]
  },
  expenses: {
    monthly: [
      { month: 'Jun', amount: 1200000 },
      { month: 'Jul', amount: 1500000 },
      { month: 'Aug', amount: 1800000 },
      { month: 'Sep', amount: 1400000 },
      { month: 'Oct', amount: 3240000 }
    ],
    categories: [
      { category: 'Marketing', amount: 850000, percentage: 26.2 },
      { category: 'Operations', amount: 1250000, percentage: 38.6 },
      { category: 'Maintenance', amount: 450000, percentage: 13.9 },
      { category: 'Staff', amount: 690000, percentage: 21.3 }
    ]
  },
  transactions: [
    {
      id: '#T-001',
      date: '2024-10-15',
      category: 'Income',
      description: 'Platform revenue from booking commissions',
      amount: 250000,
      status: 'completed',
      type: 'commission',
      reference: 'BK-9021',
      paymentMethod: 'bank_transfer'
    },
    {
      id: '#T-002',
      date: '2024-10-14',
      category: 'Expense',
      description: 'Marketing campaign - Google Ads',
      amount: 45000,
      status: 'completed',
      type: 'marketing',
      reference: 'GOOGL-AD-001',
      paymentMethod: 'credit_card'
    },
    {
      id: '#T-003',
      date: '2024-10-12',
      category: 'Income',
      description: 'Host subscription fees',
      amount: 120000,
      status: 'completed',
      type: 'subscription',
      reference: 'SUB-2024-10',
      paymentMethod: 'bank_transfer'
    },
    {
      id: '#T-004',
      date: '2024-10-10',
      category: 'Expense',
      description: 'Server maintenance and hosting',
      amount: 32000,
      status: 'pending',
      type: 'operations',
      reference: 'AWS-2024-10',
      paymentMethod: 'credit_card'
    },
    {
      id: '#T-005',
      date: '2024-10-08',
      category: 'Income',
      description: 'Booking commission - Luxury Penthouse',
      amount: 45000,
      status: 'completed',
      type: 'commission',
      reference: 'BK-9029',
      paymentMethod: 'bank_transfer'
    },
    {
      id: '#T-006',
      date: '2024-10-06',
      category: 'Expense',
      description: 'Customer support software license',
      amount: 18000,
      status: 'completed',
      type: 'software',
      reference: 'ZENDESK-2024',
      paymentMethod: 'credit_card'
    },
    {
      id: '#T-007',
      date: '2024-10-05',
      category: 'Income',
      description: 'Host onboarding fees',
      amount: 35000,
      status: 'completed',
      type: 'onboarding',
      reference: 'HOST-NEW-001',
      paymentMethod: 'bank_transfer'
    },
    {
      id: '#T-008',
      date: '2024-10-03',
      category: 'Expense',
      description: 'Office rent and utilities',
      amount: 85000,
      status: 'completed',
      type: 'operations',
      reference: 'RENT-2024-10',
      paymentMethod: 'bank_transfer'
    },
    {
      id: '#T-009',
      date: '2024-10-01',
      category: 'Income',
      description: 'Booking commission - Beachfront Villa',
      amount: 68000,
      status: 'completed',
      type: 'commission',
      reference: 'BK-9025',
      paymentMethod: 'bank_transfer'
    },
    {
      id: '#T-010',
      date: '2024-09-28',
      category: 'Expense',
      description: 'Social media advertising',
      amount: 25000,
      status: 'completed',
      type: 'marketing',
      reference: 'META-ADS-001',
      paymentMethod: 'credit_card'
    },
    {
      id: '#T-011',
      date: '2024-09-25',
      category: 'Income',
      description: 'Premium listing fees',
      amount: 45000,
      status: 'completed',
      type: 'listing',
      reference: 'PREMIUM-LIST-001',
      paymentMethod: 'bank_transfer'
    },
    {
      id: '#T-012',
      date: '2024-09-22',
      category: 'Expense',
      description: 'Legal and compliance fees',
      amount: 15000,
      status: 'completed',
      type: 'legal',
      reference: 'LEGAL-2024-Q3',
      paymentMethod: 'bank_transfer'
    },
    {
      id: '#T-013',
      date: '2024-09-20',
      category: 'Income',
      description: 'Booking commission - Mountain Retreat',
      amount: 32000,
      status: 'completed',
      type: 'commission',
      reference: 'BK-9030',
      paymentMethod: 'bank_transfer'
    },
    {
      id: '#T-014',
      date: '2024-09-18',
      category: 'Expense',
      description: 'Property maintenance supplies',
      amount: 12000,
      status: 'completed',
      type: 'maintenance',
      reference: 'MAINT-SUPPLIES-001',
      paymentMethod: 'credit_card'
    },
    {
      id: '#T-015',
      date: '2024-09-15',
      category: 'Income',
      description: 'Host subscription renewals',
      amount: 98000,
      status: 'completed',
      type: 'subscription',
      reference: 'SUB-RENEW-2024-09',
      paymentMethod: 'bank_transfer'
    }
  ],
  payouts: [
    {
      id: '#P-001',
      date: '2024-10-15',
      amount: 2450000,
      status: 'processed',
      method: 'bank_transfer',
      recipients: 12,
      description: 'Weekly host payouts'
    },
    {
      id: '#P-002',
      date: '2024-10-08',
      amount: 2180000,
      status: 'processed',
      method: 'bank_transfer',
      recipients: 11,
      description: 'Weekly host payouts'
    },
    {
      id: '#P-003',
      date: '2024-10-01',
      amount: 1920000,
      status: 'processed',
      method: 'bank_transfer',
      recipients: 10,
      description: 'Weekly host payouts'
    },
    {
      id: '#P-004',
      date: '2024-09-24',
      amount: 2340000,
      status: 'processed',
      method: 'bank_transfer',
      recipients: 13,
      description: 'Weekly host payouts'
    },
    {
      id: '#P-005',
      date: '2024-09-17',
      amount: 1870000,
      status: 'processed',
      method: 'bank_transfer',
      recipients: 9,
      description: 'Weekly host payouts'
    }
  ],
  metrics: {
    keyPerformanceIndicators: [
      {
        name: 'Average Daily Rate',
        current: 18500,
        previous: 16500,
        change: 12.1,
        trend: 'up',
        currency: 'NGN'
      },
      {
        name: 'Occupancy Rate',
        current: 78.5,
        previous: 72.3,
        change: 8.6,
        trend: 'up',
        currency: '%'
      },
      {
        name: 'Revenue Per Available Room',
        current: 14523,
        previous: 11925,
        change: 21.8,
        trend: 'up',
        currency: 'NGN'
      },
      {
        name: 'Guest Satisfaction',
        current: 4.8,
        previous: 4.7,
        change: 2.1,
        trend: 'up',
        currency: 'stars'
      }
    ],
    conversionRates: [
      {
        stage: 'Listing Views',
        count: 45678,
        rate: 100
      },
      {
        stage: 'Booking Inquiries',
        count: 3456,
        rate: 7.6
      },
      {
        stage: 'Booking Requests',
        count: 1234,
        rate: 35.7
      },
      {
        stage: 'Confirmed Bookings',
        count: 892,
        rate: 72.3
      }
    ]
  },
  forecasts: {
    nextMonth: {
      revenue: 13200000,
      expenses: 3500000,
      netProfit: 9700000,
      confidence: 85
    },
    nextQuarter: {
      revenue: 41000000,
      expenses: 10500000,
      netProfit: 30500000,
      confidence: 78
    },
    nextYear: {
      revenue: 168000000,
      expenses: 42000000,
      netProfit: 126000000,
      confidence: 72
    }
  }
};

export const getTransactionById = (id) => {
  return mockFinancials.transactions.find(transaction => transaction.id === id);
};

export const getTransactionsByCategory = (category) => {
  return mockFinancials.transactions.filter(transaction => transaction.category === category);
};

export const getTransactionsByStatus = (status) => {
  return mockFinancials.transactions.filter(transaction => transaction.status === status);
};

export const getTransactionsByDateRange = (startDate, endDate) => {
  return mockFinancials.transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const filterStart = new Date(startDate);
    const filterEnd = new Date(endDate);
    
    return transactionDate >= filterStart && transactionDate <= filterEnd;
  });
};

export const getRevenueByMonth = (months = 6) => {
  return mockFinancials.revenue.monthly.slice(-months);
};

export const getExpensesByCategory = () => {
  return mockFinancials.expenses.categories;
};

export const getTopPerformingListings = (limit = 5) => {
  // This would typically come from booking data analysis
  return [
    {
      listingId: 'SN-98238',
      title: 'Luxury Penthouse Miami',
      revenue: 1560000,
      bookings: 24,
      occupancy: 88,
      averageRate: 45000
    },
    {
      listingId: 'SN-98235',
      title: 'Beachfront Villa Malibu',
      revenue: 890000,
      bookings: 18,
      occupancy: 92,
      averageRate: 35000
    },
    {
      listingId: 'SN-98234',
      title: 'Modern Downtown Loft',
      revenue: 312000,
      bookings: 12,
      occupancy: 84,
      averageRate: 12000
    },
    {
      listingId: 'SN-98236',
      title: 'Mountain Retreat Aspen',
      revenue: 678000,
      bookings: 15,
      occupancy: 76,
      averageRate: 18000
    },
    {
      listingId: 'SN-98237',
      title: 'Urban Studio Brooklyn',
      revenue: 0,
      bookings: 0,
      occupancy: 0,
      averageRate: 8500
    }
  ];
};

export const getFinancialSummary = (period = 'month') => {
  const summaries = {
    month: {
      revenue: mockFinancials.revenue.monthly[mockFinancials.revenue.monthly.length - 1].revenue,
      expenses: mockFinancials.expenses.monthly[mockFinancials.expenses.monthly.length - 1].amount,
      bookings: mockFinancials.revenue.monthly[mockFinancials.revenue.monthly.length - 1].bookings
    },
    quarter: {
      revenue: mockFinancials.revenue.monthly.slice(-3).reduce((sum, item) => sum + item.revenue, 0),
      expenses: mockFinancials.expenses.monthly.slice(-3).reduce((sum, item) => sum + item.amount, 0),
      bookings: mockFinancials.revenue.monthly.slice(-3).reduce((sum, item) => sum + item.bookings, 0)
    },
    year: {
      revenue: mockFinancials.summary.totalRevenue,
      expenses: mockFinancials.summary.totalExpenses,
      bookings: mockFinancials.revenue.monthly.reduce((sum, item) => sum + item.bookings, 0)
    }
  };
  
  return summaries[period] || summaries.month;
};
