import { useMemo } from 'react';

export const useTimeBasedData = (timePeriod, mockBookings, commissionRate = 0.12) => {
  return useMemo(() => {
    const currentYear = new Date().getFullYear();
    const currentYearBookings = mockBookings.filter(b => 
      new Date(b.createdAt).getFullYear() === currentYear
    );
    const hasCurrentYearRevenue = currentYearBookings.length > 0;

    switch (timePeriod) {
      case 'This Week':
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        if (hasCurrentYearRevenue) {
          const currentMonthRevenue = currentYearBookings
            .filter(b => new Date(b.createdAt).getMonth() === new Date().getMonth())
            .reduce((sum, b) => sum + (b.pricing.total * commissionRate), 0);
          const dailyAverage = currentMonthRevenue / 30;
          return {
            labels: days,
            revenueData: [
              dailyAverage * 1.2, dailyAverage * 0.9, dailyAverage * 1.1, 
              dailyAverage * 1.4, dailyAverage * 1.6, dailyAverage * 0.8, dailyAverage * 0.7
            ].map(val => Math.round(val)),
            expenseData: [0, 0, 0, 0, 0, 0, 0],
            totalRevenue: currentMonthRevenue,
            totalExpenses: 0,
            netProfit: currentMonthRevenue,
            monthlyGrowth: currentMonthRevenue > 0 ? 12.5 : 0
          };
        } else {
          return {
            labels: days,
            revenueData: [0, 0, 0, 0, 0, 0, 0],
            expenseData: [0, 0, 0, 0, 0, 0, 0],
            totalRevenue: 0,
            totalExpenses: 0,
            netProfit: 0,
            monthlyGrowth: 0
          };
        }
        
      case 'This Month':
        if (hasCurrentYearRevenue) {
          const currentMonthRevenue = currentYearBookings
            .filter(b => new Date(b.createdAt).getMonth() === new Date().getMonth())
            .reduce((sum, b) => sum + (b.pricing.total * commissionRate), 0);
          return {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            revenueData: [
              currentMonthRevenue * 0.25, currentMonthRevenue * 0.30, 
              currentMonthRevenue * 0.25, currentMonthRevenue * 0.20
            ].map(val => Math.round(val)),
            expenseData: [0, 0, 0, 0],
            totalRevenue: currentMonthRevenue,
            totalExpenses: 0,
            netProfit: currentMonthRevenue,
            monthlyGrowth: currentMonthRevenue > 0 ? 12.5 : 0
          };
        } else {
          return {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            revenueData: [0, 0, 0, 0],
            expenseData: [0, 0, 0, 0],
            totalRevenue: 0,
            totalExpenses: 0,
            netProfit: 0,
            monthlyGrowth: 0
          };
        }
        
      case 'This Year':
        const currentYearMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (hasCurrentYearRevenue) {
          const yearData = currentYearMonths.map((month, index) => {
            const monthBookings = currentYearBookings.filter(b => 
              new Date(b.createdAt).getMonth() === index
            );
            return monthBookings.reduce((sum, b) => sum + (b.pricing.total * commissionRate), 0);
          });
          const totalRevenue = yearData.reduce((sum, val) => sum + val, 0);
          return {
            labels: currentYearMonths,
            revenueData: yearData,
            expenseData: currentYearMonths.map(() => 0),
            totalRevenue,
            totalExpenses: 0,
            netProfit: totalRevenue,
            monthlyGrowth: totalRevenue > 0 ? 12.5 : 0
          };
        } else {
          return {
            labels: currentYearMonths,
            revenueData: currentYearMonths.map(() => 0),
            expenseData: currentYearMonths.map(() => 0),
            totalRevenue: 0,
            totalExpenses: 0,
            netProfit: 0,
            monthlyGrowth: 0
          };
        }
        
      default:
        throw new Error(`Unsupported time period: ${timePeriod}`);
    }
  }, [timePeriod, mockBookings, commissionRate]);
};
