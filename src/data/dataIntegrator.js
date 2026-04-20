// Data Integration System
// This module generates financial data from bookings to ensure consistency

import { mockBookings } from './mockBookings.js';
import { getUserById } from './mockUsers.js';

// Configuration
const COMMISSION_RATE = 0.12; // 12% commission on bookings
const SUBSCRIPTION_FEE = 15000; // Monthly host subscription fee
const PLATFORM_FEE = 5000; // Platform listing fee per property

// Calculate commission for a booking
const calculateCommission = (booking) => {
  return Math.round(booking.pricing.total * COMMISSION_RATE);
};

// Generate income transactions from bookings
export const generateIncomeTransactions = () => {
  const transactions = [];
  const paidBookings = mockBookings.filter(b => b.paymentStatus === 'paid');
  
  paidBookings.forEach(booking => {
    const user = getUserById(booking.guest.id);
    const guestName = user ? `${user.profile.firstName} ${user.profile.lastName}` : 'Unknown Guest';
    
    transactions.push({
      id: `#T-${String(transactions.length + 1).padStart(3, '0')}`,
      date: booking.createdAt,
      category: 'Income',
      description: `Booking commission - ${guestName} - ${booking.listing.title}`,
      amount: calculateCommission(booking),
      status: 'completed',
      type: 'commission',
      reference: booking.id,
      paymentMethod: booking.paymentMethod
    });
  });

  // Add subscription fees
  const months = ['2024-06', '2024-07', '2024-08', '2024-09', '2024-10'];
  months.forEach((month, index) => {
    transactions.push({
      id: `#T-${String(transactions.length + 1).padStart(3, '0')}`,
      date: `${month}-15`,
      category: 'Income',
      description: 'Host subscription fees',
      amount: SUBSCRIPTION_FEE,
      status: 'completed',
      type: 'subscription',
      reference: `SUB-${month}`,
      paymentMethod: 'bank_transfer'
    });
  });

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Generate expense transactions
export const generateExpenseTransactions = () => {
  const expenses = [
    {
      id: '#T-EXP-001',
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
      id: '#T-EXP-002',
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
      id: '#T-EXP-003',
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
      id: '#T-EXP-004',
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
      id: '#T-EXP-005',
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
      id: '#T-EXP-006',
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
      id: '#T-EXP-007',
      date: '2024-09-18',
      category: 'Expense',
      description: 'Property maintenance supplies',
      amount: 12000,
      status: 'completed',
      type: 'maintenance',
      reference: 'MAINT-SUPPLIES-001',
      paymentMethod: 'credit_card'
    }
  ];

  // Add monthly recurring expenses
  const months = ['2024-06', '2024-07', '2024-08', '2024-09', '2024-10'];
  months.forEach(month => {
    expenses.push({
      id: `#T-EXP-${String(expenses.length + 1).padStart(3, '0')}`,
      date: `${month}-01`,
      category: 'Expense',
      description: 'Platform operations and maintenance',
      amount: 75000,
      status: 'completed',
      type: 'operations',
      reference: `OPS-${month}`,
      paymentMethod: 'bank_transfer'
    });
  });

  return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Calculate monthly revenue from bookings
export const calculateMonthlyRevenue = () => {
  const paidBookings = mockBookings.filter(b => b.paymentStatus === 'paid');
  const monthlyData = {};
  
  // Initialize months
  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  months.forEach(month => {
    monthlyData[month] = {
      month,
      revenue: 0,
      bookings: 0
    };
  });

  // Calculate revenue and bookings by month
  paidBookings.forEach(booking => {
    const date = new Date(booking.createdAt);
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    
    if (monthlyData[monthName]) {
      monthlyData[monthName].revenue += calculateCommission(booking);
      monthlyData[monthName].bookings += 1;
    }
  });

  // Add subscription revenue
  months.forEach(month => {
    monthlyData[month].revenue += SUBSCRIPTION_FEE;
  });

  return Object.values(monthlyData);
};

// Calculate monthly expenses
export const calculateMonthlyExpenses = () => {
  const expenses = generateExpenseTransactions();
  const monthlyData = {};
  
  // Initialize months
  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  months.forEach(month => {
    monthlyData[month] = { month, amount: 0 };
  });

  // Calculate expenses by month
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    
    if (monthlyData[monthName]) {
      monthlyData[monthName].amount += expense.amount;
    }
  });

  return Object.values(monthlyData);
};

// Generate expense categories breakdown
export const calculateExpenseCategories = () => {
  const expenses = generateExpenseTransactions();
  const categories = {};
  
  expenses.forEach(expense => {
    const category = expense.type === 'operations' ? 'Operations' :
                    expense.type === 'marketing' ? 'Marketing' :
                    expense.type === 'maintenance' ? 'Maintenance' :
                    expense.type === 'software' ? 'Operations' :
                    expense.type === 'legal' ? 'Operations' : 'Other';
    
    if (!categories[category]) {
      categories[category] = 0;
    }
    categories[category] += expense.amount;
  });

  const total = Object.values(categories).reduce((sum, amount) => sum + amount, 0);
  
  return Object.entries(categories).map(([category, amount]) => ({
    category,
    amount,
    percentage: Math.round((amount / total) * 100)
  }));
};

// Generate comprehensive financial summary
export const generateFinancialSummary = () => {
  const incomeTransactions = generateIncomeTransactions();
  const expenseTransactions = generateExpenseTransactions();
  const monthlyRevenue = calculateMonthlyRevenue();
  const monthlyExpenses = calculateMonthlyExpenses();
  
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  
  // Calculate growth rates
  const currentMonth = monthlyRevenue[monthlyRevenue.length - 1];
  const previousMonth = monthlyRevenue[monthlyRevenue.length - 2];
  const monthlyGrowth = previousMonth ? 
    ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1) : 0;
  
  return {
    summary: {
      totalRevenue: totalIncome,
      totalExpenses: totalExpenses,
      netProfit: netProfit,
      grossMargin: Math.round((netProfit / totalIncome) * 100),
      monthlyGrowth: parseFloat(monthlyGrowth),
      yearToDateGrowth: 28.3
    },
    revenue: {
      monthly: monthlyRevenue,
      sources: [
        { source: 'Direct Bookings', amount: Math.round(totalIncome * 0.498), percentage: 49.8 },
        { source: 'Airbnb', amount: Math.round(totalIncome * 0.305), percentage: 30.5 },
        { source: 'Booking.com', amount: Math.round(totalIncome * 0.149), percentage: 14.9 },
        { source: 'Other', amount: Math.round(totalIncome * 0.048), percentage: 4.8 }
      ],
      categories: [
        { category: 'Luxury Properties', amount: Math.round(totalIncome * 0.627), percentage: 62.7 },
        { category: 'Standard Properties', amount: Math.round(totalIncome * 0.257), percentage: 25.7 },
        { category: 'Budget Properties', amount: Math.round(totalIncome * 0.116), percentage: 11.6 }
      ]
    },
    expenses: {
      monthly: monthlyExpenses,
      categories: calculateExpenseCategories()
    },
    transactions: [...incomeTransactions, ...expenseTransactions].sort((a, b) => new Date(b.date) - new Date(a.date))
  };
};

// Generate payouts data
export const generatePayouts = () => {
  const paidBookings = mockBookings.filter(b => b.paymentStatus === 'paid');
  const payouts = [];
  const now = new Date();
  
  // Generate weekly payouts for the last 4 weeks (processed)
  for (let i = 1; i <= 4; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (i * 7));
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    const weekBookings = paidBookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt);
      return bookingDate >= weekStart && bookingDate <= weekEnd;
    });
    
    const totalPayout = weekBookings.reduce((sum, booking) => {
      return sum + Math.round(booking.pricing.total * 0.85); // 85% to host after commission
    }, 0);
    
    if (totalPayout > 0) {
      payouts.push({
        id: `#P-${String(i).padStart(3, '0')}`,
        date: date.toISOString().split('T')[0],
        amount: totalPayout,
        status: 'processed',
        method: 'bank_transfer',
        recipients: new Set(weekBookings.map(b => b.guest.id)).size,
        description: 'Weekly host payouts'
      });
    }
  }
  
  // Generate pending payouts for current week
  const currentWeekStart = new Date(now);
  currentWeekStart.setDate(now.getDate() - now.getDay());
  currentWeekStart.setHours(0, 0, 0, 0);
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
  currentWeekEnd.setHours(23, 59, 59, 999);
  
  const currentWeekBookings = paidBookings.filter(booking => {
    const bookingDate = new Date(booking.createdAt);
    return bookingDate >= currentWeekStart && bookingDate <= currentWeekEnd;
  });
  
  const currentWeekPayout = currentWeekBookings.reduce((sum, booking) => {
    return sum + Math.round(booking.pricing.total * 0.85); // 85% to host after commission
  }, 0);
  
  if (currentWeekPayout > 0) {
    payouts.push({
      id: `#P-005`,
      date: currentWeekEnd.toISOString().split('T')[0],
      amount: currentWeekPayout,
      status: 'pending',
      method: 'bank_transfer',
      recipients: new Set(currentWeekBookings.map(b => b.guest.id)).size,
      description: 'Weekly host payouts (pending)'
    });
  }
  
  // Sort by date (newest first)
  return payouts.sort((a, b) => new Date(b.date) - new Date(a.date));
};
