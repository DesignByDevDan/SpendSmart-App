import React from 'react';
import { useFirestore } from '../context/FirestoreContext';
import { useNavigate } from 'react-router-dom';

const ExpenseListScreen: React.FC = () => {
  const { expenses, deleteExpense } = useFirestore(); // Use deleteExpense from context
  const navigate = useNavigate();

  const handleEdit = (expenseId: string) => {
    navigate(`/edit-expense/${expenseId}`); // Navigate to edit expense screen
  };

  return (
    <div className="p-6 h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Expense List</h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <div key={expense.id} className="p-4 mb-4 border-b">
              <div className="text-gray-800 font-semibold">Date: {expense.date}</div>
              <div className="text-gray-600">Category: {expense.category}</div>
              <div className="text-gray-600">Amount: ${expense.amount}</div>
              <div className="text-gray-600">Message: {expense.message}</div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleEdit(expense.id!)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteExpense(expense.id!)} // Use deleteExpense from context
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No expenses added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseListScreen;
