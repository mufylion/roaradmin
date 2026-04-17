// Mock Financials Data - Integrated with Bookings
import { generateFinancialSummary, generatePayouts } from './dataIntegrator.js';

export const mockFinancials = {
  ...generateFinancialSummary(),
  payouts: generatePayouts(),
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
