// src/components/AddExpenseScreen.tsx
import React, { useState } from 'react';
import { useFirestore } from '../context/FirestoreContext';

interface ExpenseFormData {
  date: string;
  category: string;
  amount: number;
  message: string;
}

const AddExpenseScreen: React.FC = () => {
  const { addExpenseToFirestore } = useFirestore(); // Import the function to add expense to Firestore
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: '',
    category: '',
    amount: 0,
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add expense to Firestore
    try {
      await addExpenseToFirestore({
        date: formData.date,
        category: formData.category,
        amount: Number(formData.amount), // Ensure amount is a number
        message: formData.message,
      });

      // Clear form after submission
      setFormData({
        date: '',
        category: '',
        amount: 0,
        message: '',
      });
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="p-6 h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Expense</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-1">Date</span>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="block w-full p-3 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-1">Category</span>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select the category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
          </select>
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-1">Amount</span>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="block w-full p-3 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-1">Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="block w-full p-3 border border-gray-300 rounded-md"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddExpenseScreen;
