import apiClient from './apiClient';

const expensesService = {
  /**
   * Fetch all expenses
   */
  fetchExpenses: async (params = {}) => {
    const response = await apiClient.get('/expenses', { params });
    return response.data;
  },

  /**
   * Record a new expense
   * @param {Object} expenseData 
   */
  createExpense: async (expenseData) => {
    const response = await apiClient.post('/expenses', expenseData);
    return response.data;
  },

  /**
   * Update an existing expense
   * @param {string} id 
   * @param {Object} data 
   */
  updateExpense: async (id, data) => {
    const response = await apiClient.put(`/expenses/${id}`, data);
    return response.data;
  },

  /**
   * Delete an expense
   * @param {string} id 
   */
  deleteExpense: async (id) => {
    const response = await apiClient.delete(`/expenses/${id}`);
    return response.data;
  }
};

export default expensesService;
