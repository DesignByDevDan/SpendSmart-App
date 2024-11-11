// src/components/ExpenseContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  message: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (updatedExpense: Expense) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Fetch expenses from Firestore
      const fetchExpenses = async () => {
        const expenseCollection = collection(db, 'users', user.uid, 'expenses');
        const expenseSnapshot = await getDocs(expenseCollection);
        const expensesData = expenseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Expense[];
        setExpenses(expensesData);
      };

      fetchExpenses();
    }
  }, [user]);

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    if (user) {
      try {
        const docRef = await addDoc(collection(db, 'users', user.uid, 'expenses'), expense);
        setExpenses([...expenses, { id: docRef.id, ...expense }]);
      } catch (error) {
        console.error('Error adding expense: ', error);
      }
    }
  };

  const deleteExpense = async (id: string) => {
    if (user) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'expenses', id));
        setExpenses(expenses.filter((expense) => expense.id !== id));
      } catch (error) {
        console.error('Error deleting expense: ', error);
      }
    }
  };

  const updateExpense = async (updatedExpense: Expense) => {
    if (user) {
      try {
        const expenseRef = doc(db, 'users', user.uid, 'expenses', updatedExpense.id);
        await updateDoc(expenseRef, updatedExpense);
        setExpenses(expenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        ));
      } catch (error) {
        console.error('Error updating expense: ', error);
      }
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, updateExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
