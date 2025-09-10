import React, { useState, useEffect } from "react";
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
  FiHeart,
  FiLogOut,
  FiX
} from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../../components/loader";

const BudgetTracker = () => {
  const API_URL = "https://edu-track-backend-zeta.vercel.app";
  const [activeTab, setActiveTab] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  const [newBudget, setNewBudget] = useState({
    category: "",
    limit: "",
    period: "monthly"
  });

  const auth = useAuth();
  const user = auth.user;

  const incomeCategories = [
    "Allowance",
    "Part-time Job",
    "Scholarship",
    "Gift",
    "Other Income",
  ];
  const expenseCategories = [
    "Food",
    "Transport",
    "Entertainment",
    "Books",
    "School Supplies",
    "Rent",
    "Utilities",
    "Miscellaneous",
  ];


  const fetchData = async () => {
    if (!user) return;
    try {
      setIsLoading(true);

      
      const transactionsRes = await axios.get(
        `${API_URL}/transactions/${user.uid}`
      );
      
     
      const budgetsRes = await axios.get(`${API_URL}/budget/${user.uid}`);

      setTransactions(transactionsRes.data.transactions || []);
      setBudgets(budgetsRes.data || []);

    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

 
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;


  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {});

  
  const budgetLimits = budgets.reduce((acc, budget) => {
    acc[budget.category] = budget.limit;
    return acc;
  }, {});


  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (
      !newTransaction.category ||
      !newTransaction.amount ||
      !newTransaction.date
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const transactionData = {
        ...newTransaction,
        amount: parseFloat(newTransaction.amount),
        userId: user.uid
      };

      
      const res = await axios.post(
        `${API_URL}/transactions/${user.uid}`,
        transactionData
      );

      toast.success("Transaction added successfully!");

   
      fetchData();

      
      setNewTransaction({
        type: "expense",
        category: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction");
    }
  };


  const deleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      
      await axios.delete(`${API_URL}/transactions/${user.uid}/${id}`);
      // Refresh data
      fetchData();
      toast.success("Transaction deleted successfully!");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };

  // Handle add budget
  const handleAddBudget = async (e) => {
    e.preventDefault();
    
    if (!newBudget.category || !newBudget.limit) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      
      await axios.post(`${API_URL}/budget/${user.uid}`, {
        category: newBudget.category,
        limit: parseFloat(newBudget.limit),
        period: newBudget.period
      });
      
      
      fetchData();
      
      
      setNewBudget({
        category: '',
        limit: '',
        period: 'monthly'
      });
      setShowBudgetModal(false);
      
      toast.success("Budget limit added successfully!");
    } catch (error) {
      console.error("Error adding budget:", error);
      toast.error("Failed to add budget limit");
    }
  };

  // Delete budget
  const deleteBudget = async (budgetId) => {
    if (!window.confirm("Are you sure you want to delete this budget?")) {
      return;
    }

    try {
      // Corrected endpoint - matches your server route
      await axios.delete(`${API_URL}/budget/${user.uid}/${budgetId}`);
      
      // Refresh budgets
      fetchData();
      
      toast.success("Budget deleted successfully!");
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error("Failed to delete budget");
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <FiCoffee className="text-red-500" />;
      case "Transport":
        return <FiTruck className="text-blue-500" />;
      case "Entertainment":
        return <FiHeart className="text-purple-500" />;
      case "Books":
        return <FiBook className="text-green-500" />;
      case "School Supplies":
        return <FiShoppingBag className="text-yellow-500" />;
      case "Rent":
        return <FiHome className="text-indigo-500" />;
      case "Utilities":
        return <FiWifi className="text-gray-500" />;
      case "Allowance":
        return <FiDollarSign className="text-green-500" />;
      case "Part-time Job":
        return <FiTrendingUp className="text-blue-500" />;
      case "Scholarship":
        return <FiBook className="text-purple-500" />;
      default:
        return <FiDollarSign className="text-gray-500" />;
    }
  };

  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FiDollarSign className="mr-2 text-green-600" /> Budget Tracker
          </h2>
          <p className="text-gray-600">Welcome back, {user.username}!</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Income</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                ${totalIncome.toFixed(2)}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FiTrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Expenses
              </p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">
                ${totalExpenses.toFixed(2)}
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <FiTrendingDown className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Current Balance
              </p>
              <h3
                className={`text-2xl font-bold mt-1 ${
                  balance >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Add New Transaction
          </h3>

          <form onSubmit={handleAddTransaction} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() =>
                    setNewTransaction({ ...newTransaction, type: "income" })
                  }
                  className={`flex-1 py-2 rounded-lg text-sm ${
                    newTransaction.type === "income"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setNewTransaction({ ...newTransaction, type: "expense" })
                  }
                  className={`flex-1 py-2 rounded-lg text-sm ${
                    newTransaction.type === "expense"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Expense
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select category</option>
                {(newTransaction.type === "income"
                  ? incomeCategories
                  : expenseCategories
                ).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ($)
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <input
                type="text"
                placeholder="What was this for?"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center"
            >
              <FiPlus className="mr-2" /> Add Transaction
            </button>
          </form>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Expense Breakdown
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Expense Chart */}
            <div>
              <h4 className="font-medium text-gray-800 mb-3">By Category</h4>
              <div className="space-y-3">
                {Object.entries(expensesByCategory).map(
                  ([category, amount]) => {
                    const percentage = Math.round(
                      (amount / totalExpenses) * 100
                    );
                    const budgetLimit = budgetLimits[category] || 0;
                    const budgetPercentage =
                      budgetLimit > 0
                        ? Math.round((amount / budgetLimit) * 100)
                        : 0;

                    return (
                      <div key={category} className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            {getCategoryIcon(category)}
                            <span className="ml-2 text-sm font-medium">
                              {category}
                            </span>
                          </div>
                          <span className="text-sm font-medium">
                            ${amount.toFixed(2)}
                          </span>
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
                            <span
                              className={
                                budgetPercentage > 100
                                  ? "text-red-600"
                                  : "text-green-600"
                              }
                            >
                              {budgetPercentage}% of budget
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Budget Limits */}
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Budget Limits</h4>
              <div className="space-y-3">
                {budgets.map((budget) => {
                  const spent = expensesByCategory[budget.category] || 0;
                  const percentage =
                    budget.limit > 0 ? Math.round((spent / budget.limit) * 100) : 0;

                  return (
                    <div key={budget._id} className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          {getCategoryIcon(budget.category)}
                          <span className="ml-2 text-sm font-medium">
                            {budget.category}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          ${spent.toFixed(2)} / ${budget.limit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            percentage > 100
                              ? "bg-red-500"
                              : percentage > 80
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        {percentage > 100 ? (
                          <span className="text-red-600">
                            Over budget by ${(spent - budget.limit).toFixed(2)}
                          </span>
                        ) : (
                          <span>${(budget.limit - spent).toFixed(2)} remaining</span>
                        )}
                        <button
                          onClick={() => deleteBudget(budget._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setShowBudgetModal(true)}
                className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm"
              >
                + Add New Budget Category
              </button>

              {/* Budget Modal */}
              {showBudgetModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">
                        Add Budget Limit
                      </h2>
                      <button
                        onClick={() => setShowBudgetModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FiX size={24} />
                      </button>
                    </div>

                    <form onSubmit={handleAddBudget}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <select
                            value={newBudget.category}
                            onChange={(e) =>
                              setNewBudget({
                                ...newBudget,
                                category: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Select category</option>
                            {expenseCategories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Budget Limit ($)
                          </label>
                          <input
                            type="number"
                            placeholder="0.00"
                            value={newBudget.limit}
                            onChange={(e) =>
                              setNewBudget({
                                ...newBudget,
                                limit: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            min="0"
                            step="0.01"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Budget Period
                          </label>
                          <select
                            value={newBudget.period}
                            onChange={(e) =>
                              setNewBudget({
                                ...newBudget,
                                period: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                            <option value="yearly">Yearly</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end mt-6 space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowBudgetModal(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Add Budget
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Transaction History
          </h3>
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
                <th className="pb-3 text-left text-sm font-medium text-gray-500">
                  Date
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">
                  Description
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">
                  Category
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">
                  Amount
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-sm text-gray-800">
                    {transaction.description ||
                      `Payment for ${transaction.category}`}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      {getCategoryIcon(transaction.category)}
                      <span className="ml-2 text-sm text-gray-700">
                        {transaction.category}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`py-4 text-sm font-medium ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => deleteTransaction(transaction._id)}
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
              <p className="text-gray-500">
                No transactions yet. Add your first income or expense!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Financial Insights */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Financial Insights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center">
              <FiTrendingUp className="mr-2" /> Spending Trends
            </h4>
            <p className="text-sm text-blue-700">
              Your spending on Food has increased by 15% compared to last month.
              Consider meal prepping to save money.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2 flex items-center">
              <FiDollarSign className="mr-2" /> Savings Opportunity
            </h4>
            <p className="text-sm text-green-700">
              You could save approximately ${(totalExpenses * 0.1).toFixed(2)}{" "}
              this month by reducing expenses by 10%.
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
              <FiCalendar className="mr-2" /> Upcoming Expenses
            </h4>
            <p className="text-sm text-yellow-700">
              You have regular monthly expenses totaling $
              {(totalExpenses / 2).toFixed(2)}. Budget accordingly.
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2 flex items-center">
              <FiPieChart className="mr-2" /> Income vs Expenses
            </h4>
            <p className="text-sm text-purple-700">
              {balance >= 0
                ? `You're saving ${((balance / totalIncome) * 100).toFixed(
                    0
                  )}% of your income. Great job!`
                : `You're spending ${Math.abs(
                    (balance / totalIncome) * 100
                  ).toFixed(
                    0
                  )}% more than you earn. Consider reducing expenses.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;