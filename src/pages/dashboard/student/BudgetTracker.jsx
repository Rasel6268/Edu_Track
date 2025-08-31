import React, { useState } from 'react';
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiPieChart, 
  FiCalendar,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiUpload,
  FiFilter,
  FiShoppingBag,
  FiBook,
  FiCoffee,
  FiHome,
  FiWifi,
  FiTruck,
  FiHeart
} from 'react-icons/fi';

const BudgetTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'income', category: 'Allowance', amount: 200, date: '2023-10-15', description: 'Monthly allowance from parents' },
    { id: 2, type: 'income', category: 'Part-time Job', amount: 150, date: '2023-10-10', description: 'Campus bookstore shift' },
    { id: 3, type: 'expense', category: 'Food', amount: 25, date: '2023-10-14', description: 'Lunch with friends' },
    { id: 4, type: 'expense', category: 'Books', amount: 85, date: '2023-10-12', description: 'Textbook for Physics class' },
    { id: 5, type: 'expense', category: 'Entertainment', amount: 15, date: '2023-10-08', description: 'Movie ticket' },
    { id: 6, type: 'expense', category: 'Transport', amount: 20, date: '2023-10-05', description: 'Bus pass' },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const [budgetLimits, setBudgetLimits] = useState({
    Food: 200,
    Transport: 100,
    Entertainment: 50,
    Books: 150,
    Miscellaneous: 75
  });

  const incomeCategories = ['Allowance', 'Part-time Job', 'Scholarship', 'Gift', 'Other Income'];
  const expenseCategories = ['Food', 'Transport', 'Entertainment', 'Books', 'School Supplies', 'Rent', 'Utilities', 'Miscellaneous'];

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Calculate expenses by category
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {});

  // Add new transaction
  const addTransaction = () => {
    if (newTransaction.category && newTransaction.amount && newTransaction.date) {
      setTransactions([...transactions, {
        ...newTransaction,
        id: Date.now(),
        amount: parseFloat(newTransaction.amount)
      }]);
      setNewTransaction({
        type: 'expense',
        category: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
    }
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Food': return <FiCoffee className="text-red-500" />;
      case 'Transport': return <FiTruck className="text-blue-500" />;
      case 'Entertainment': return <FiHeart className="text-purple-500" />;
      case 'Books': return <FiBook className="text-green-500" />;
      case 'School Supplies': return <FiShoppingBag className="text-yellow-500" />;
      case 'Rent': return <FiHome className="text-indigo-500" />;
      case 'Utilities': return <FiWifi className="text-gray-500" />;
      case 'Allowance': return <FiDollarSign className="text-green-500" />;
      case 'Part-time Job': return <FiTrendingUp className="text-blue-500" />;
      case 'Scholarship': return <FiBook className="text-purple-500" />;
      default: return <FiDollarSign className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FiDollarSign className="mr-2 text-green-600" /> Budget Tracker
        </h2>
        <p className="text-gray-600">Manage your income and expenses effectively</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Income</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">${totalIncome.toFixed(2)}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FiTrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Expenses</p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">${totalExpenses.toFixed(2)}</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <FiTrendingDown className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Current Balance</p>
              <h3 className={`text-2xl font-bold mt-1 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${balance.toFixed(2)}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiDollarSign className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Add Transaction */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Transaction</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setNewTransaction({...newTransaction, type: 'income'})}
                  className={`flex-1 py-2 rounded-lg text-sm ${newTransaction.type === 'income' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Income
                </button>
                <button 
                  onClick={() => setNewTransaction({...newTransaction, type: 'expense'})}
                  className={`flex-1 py-2 rounded-lg text-sm ${newTransaction.type === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Expense
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                {(newTransaction.type === 'income' ? incomeCategories : expenseCategories).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
              <input 
                type="number"
                placeholder="0.00"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input 
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
              <input 
                type="text"
                placeholder="What was this for?"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button 
              onClick={addTransaction}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center"
            >
              <FiPlus className="mr-2" /> Add Transaction
            </button>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Expense Breakdown</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Expense Chart */}
            <div>
              <h4 className="font-medium text-gray-800 mb-3">By Category</h4>
              <div className="space-y-3">
                {Object.entries(expensesByCategory).map(([category, amount]) => {
                  const percentage = Math.round((amount / totalExpenses) * 100);
                  const budgetLimit = budgetLimits[category] || 0;
                  const budgetPercentage = budgetLimit > 0 ? Math.round((amount / budgetLimit) * 100) : 0;
                  
                  return (
                    <div key={category} className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          {getCategoryIcon(category)}
                          <span className="ml-2 text-sm font-medium">{category}</span>
                        </div>
                        <span className="text-sm font-medium">${amount.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{percentage}% of total</span>
                        {budgetLimit > 0 && (
                          <span className={budgetPercentage > 100 ? 'text-red-600' : 'text-green-600'}>
                            {budgetPercentage}% of budget
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Budget Limits */}
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Budget Limits</h4>
              <div className="space-y-3">
                {Object.entries(budgetLimits).map(([category, limit]) => {
                  const spent = expensesByCategory[category] || 0;
                  const percentage = limit > 0 ? Math.round((spent / limit) * 100) : 0;
                  
                  return (
                    <div key={category} className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          {getCategoryIcon(category)}
                          <span className="ml-2 text-sm font-medium">{category}</span>
                        </div>
                        <span className="text-sm font-medium">${spent.toFixed(2)} / ${limit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {percentage > 100 ? (
                          <span className="text-red-600">Over budget by ${(spent - limit).toFixed(2)}</span>
                        ) : (
                          <span>${(limit - spent).toFixed(2)} remaining</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm">
                Edit Budget Limits
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Transaction History</h3>
          <div className="flex space-x-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm flex items-center">
              <FiFilter className="mr-1" /> Filter
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm flex items-center">
              <FiDownload className="mr-1" /> Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Description</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Category</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 text-sm text-gray-600">{transaction.date}</td>
                  <td className="py-4 text-sm text-gray-800">
                    {transaction.description || `Payment for ${transaction.category}`}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      {getCategoryIcon(transaction.category)}
                      <span className="ml-2 text-sm text-gray-700">{transaction.category}</span>
                    </div>
                  </td>
                  <td className={`py-4 text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-4">
                    <button 
                      onClick={() => deleteTransaction(transaction.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {transactions.length === 0 && (
            <div className="text-center py-8">
              <FiDollarSign className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-500">No transactions yet. Add your first income or expense!</p>
            </div>
          )}
        </div>
      </div>

      {/* Financial Insights */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Financial Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center">
              <FiTrendingUp className="mr-2" /> Spending Trends
            </h4>
            <p className="text-sm text-blue-700">
              Your spending on Food has increased by 15% compared to last month. Consider meal prepping to save money.
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2 flex items-center">
              <FiDollarSign className="mr-2" /> Savings Opportunity
            </h4>
            <p className="text-sm text-green-700">
              You could save approximately $50 this month by reducing Entertainment expenses by 30%.
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
              <FiCalendar className="mr-2" /> Upcoming Expenses
            </h4>
            <p className="text-sm text-yellow-700">
              You have a textbook purchase coming up next week. Budget $75-100 for this expense.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2 flex items-center">
              <FiPieChart className="mr-2" /> Income vs Expenses
            </h4>
            <p className="text-sm text-purple-700">
              You're saving {(balance/totalIncome * 100).toFixed(0)}% of your income. Great job!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;