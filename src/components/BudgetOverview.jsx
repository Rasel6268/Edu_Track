import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiPieChart, FiCalendar, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const BudgetOverview = () => {
  const { user } = useAuth();
  const API_URL = "http://localhost:3001";
  const [budgetData, setBudgetData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    expensesByCategory: {},
    budgetLimits: {},
    recentTransactions: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly');

  useEffect(() => {
    if (!user) return;
    
    const fetchBudgetData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch transactions
        const transactionsRes = await axios.get(`${API_URL}/transactions/${user.uid}`);
        const transactions = transactionsRes.data.transactions || [];
        
        // Fetch budgets
        const budgetsRes = await axios.get(`${API_URL}/budget/${user.uid}`);
        
        // Calculate totals
        const totalIncome = transactions
          .filter(t => t.type === "income")
          .reduce((sum, transaction) => sum + transaction.amount, 0);
          
        const totalExpenses = transactions
          .filter(t => t.type === "expense")
          .reduce((sum, transaction) => sum + transaction.amount, 0);
          
        const balance = totalIncome - totalExpenses;
        
        // Calculate expenses by category
        const expensesByCategory = transactions
          .filter(t => t.type === "expense")
          .reduce((acc, transaction) => {
            if (!acc[transaction.category]) {
              acc[transaction.category] = 0;
            }
            acc[transaction.category] += transaction.amount;
            return acc;
          }, {});
        
        // Convert budgets to object
        const budgetLimits = {};
        budgetsRes.data.forEach(b => {
          budgetLimits[b.category] = b.limit;
        });
        
        // Get recent transactions (last 5)
        const recentTransactions = transactions
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        
        setBudgetData({
          totalIncome,
          totalExpenses,
          balance,
          expensesByCategory,
          budgetLimits,
          recentTransactions
        });
      } catch (error) {
        console.error("Error fetching budget data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBudgetData();
  }, [user, timeRange]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Get top 3 expense categories
  const topExpenseCategories = Object.entries(budgetData.expensesByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Find categories over budget
  const overBudgetCategories = Object.entries(budgetData.budgetLimits)
    .filter(([category, limit]) => {
      const spent = budgetData.expensesByCategory[category] || 0;
      return spent > limit;
    })
    .map(([category, limit]) => ({
      category,
      overspent: (budgetData.expensesByCategory[category] || 0) - limit
    }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FiDollarSign className="mr-2" /> Budget Overview
        </h3>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Income</p>
              <p className="text-2xl font-bold text-blue-800">${budgetData.totalIncome.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiTrendingUp className="text-blue-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-2 text-xs text-blue-600">
            <span>This {timeRange}</span>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-red-600 text-sm font-medium">Total Expenses</p>
              <p className="text-2xl font-bold text-red-800">${budgetData.totalExpenses.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <FiTrendingDown className="text-red-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-2 text-xs text-red-600">
            <span>This {timeRange}</span>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg border ${
          budgetData.balance >= 0 
            ? 'bg-green-50 border-green-100' 
            : 'bg-red-50 border-red-100'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium ${
                budgetData.balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                Current Balance
              </p>
              <p className={`text-2xl font-bold ${
                budgetData.balance >= 0 ? 'text-green-800' : 'text-red-800'
              }`}>
                ${Math.abs(budgetData.balance).toFixed(2)}
              </p>
            </div>
            <div className={`p-2 rounded-lg ${
              budgetData.balance >= 0 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {budgetData.balance >= 0 ? (
                <FiTrendingUp className="text-green-600" size={20} />
              ) : (
                <FiTrendingDown className="text-red-600" size={20} />
              )}
            </div>
          </div>
          <div className={`flex items-center mt-2 text-xs ${
            budgetData.balance >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {budgetData.balance >= 0 ? 'Remaining' : 'Over Budget'}
          </div>
        </div>
      </div>
      
      {/* Budget Alerts */}
      {overBudgetCategories.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <FiAlertCircle className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-800">Budget Alert</h4>
              <p className="text-sm text-yellow-700 mt-1">
                You've exceeded your budget in {overBudgetCategories.length} category
                {overBudgetCategories.length > 1 ? 's' : ''}:
              </p>
              <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside">
                {overBudgetCategories.map(({category, overspent}) => (
                  <li key={category}>{category}: ${overspent.toFixed(2)} over</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
            <FiPieChart className="mr-2" /> Top Expenses
          </h4>
          <div className="space-y-3">
            {topExpenseCategories.map(([category, amount]) => {
              const budgetLimit = budgetData.budgetLimits[category] || 0;
              const percentage = budgetLimit > 0 ? Math.round((amount / budgetLimit) * 100) : 0;
              
              return (
                <div key={category} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <span className="text-sm font-medium text-gray-800">
                      ${amount.toFixed(2)}
                      {budgetLimit > 0 && ` / $${budgetLimit}`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentage > 100 
                          ? 'bg-red-500' 
                          : percentage > 80 
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{percentage}% of budget</span>
                    {budgetLimit > 0 && (
                      <span>
                        {percentage > 100 ? (
                          <span className="text-red-600">Over by ${(amount - budgetLimit).toFixed(2)}</span>
                        ) : (
                          <span className="text-green-600">${(budgetLimit - amount).toFixed(2)} left</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            
            {topExpenseCategories.length === 0 && (
              <p className="text-sm text-gray-500">No expenses recorded yet</p>
            )}
          </div>
        </div>
        
        {/* Recent Transactions */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
            <FiCalendar className="mr-2" /> Recent Transactions
          </h4>
          <div className="space-y-3">
            {budgetData.recentTransactions.map(transaction => (
              <div key={transaction._id} className="flex justify-between items-center p-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {transaction.description || transaction.category}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-sm font-medium ${
                  transaction.type === "income" ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
            
            {budgetData.recentTransactions.length === 0 && (
              <p className="text-sm text-gray-500">No recent transactions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;