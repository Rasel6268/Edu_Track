const API_BASE_URL = 'http://localhost:5000/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (email, password) => 
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (username, email, password) => 
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }),
};

// Transactions API
export const transactionAPI = {
  getTransactions: (userId) => 
    apiCall(`/transactions/${userId}`),

  getStats: (userId) => 
    apiCall(`/transactions/${userId}/stats`),

  addTransaction: (userId, transaction) => 
    apiCall(`/transactions/${userId}`, {
      method: 'POST',
      body: JSON.stringify(transaction),
    }),

  updateTransaction: (userId, transactionId, updates) => 
    apiCall(`/transactions/${userId}/${transactionId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  deleteTransaction: (userId, transactionId) => 
    apiCall(`/transactions/${userId}/${transactionId}`, {
      method: 'DELETE',
    }),
};

// Budgets API
export const budgetAPI = {
  getBudgets: (userId) => 
    apiCall(`/budgets/${userId}`),

  saveBudget: (userId, budget) => 
    apiCall(`/budgets/${userId}`, {
      method: 'POST',
      body: JSON.stringify(budget),
    }),

  deleteBudget: (userId, budgetId) => 
    apiCall(`/budgets/${userId}/${budgetId}`, {
      method: 'DELETE',
    }),

  getBudgetAlerts: (userId) => 
    apiCall(`/budgets/${userId}/alerts`),
};