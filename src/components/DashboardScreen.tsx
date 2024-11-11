// src/components/DashboardScreen.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../context/FirestoreContext';

const DashboardScreen: React.FC = () => {
  const { expenses } = useFirestore();

  return (
    <div className="p-6 h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Welcome to Your Dashboard</h1>
      <p className="text-gray-700 mb-8 text-lg">Manage your expenses effectively and keep track of your finances.</p>
      <div className="space-y-6 w-full max-w-md">
        <Link to="/add-expense">
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 mb-4">
            Add Expense
          </button>
        </Link>
        <Link to="/expense-list">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            View Expenses
          </button>
        </Link>
      </div>
      <div className="mt-12 w-full max-w-md">
        {expenses.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Recent Expenses</h2>
            {expenses.slice(0, 3).map((expense) => (
              <div key={expense.id} className="p-4 mb-2 border rounded-lg bg-gray-50">
                <div className="text-gray-900 font-semibold">Date: {expense.date}</div>
                <div className="text-gray-700">Category: {expense.category}</div>
                <div className="text-gray-700">Amount: ${expense.amount}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-lg mt-6">No recent expenses available.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardScreen;
