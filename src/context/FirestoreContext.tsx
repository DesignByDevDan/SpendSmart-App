import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

// Define ExpenseFormData type
interface ExpenseFormData {
  date: string;
  category: string;
  amount: number;
  message: string;
}

// Expense Type
interface Expense {
  id?: string; // Firestore document ID
  date: string;
  category: string;
  amount: number;
  message: string;
}



// Firestore Context Type
interface FirestoreContextProps {
  user: User | null;
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  editExpense: (id: string, updatedExpense: Expense) => void;
  addExpenseToFirestore: (expense: ExpenseFormData) => Promise<void>;

}

// Default context value
const FirestoreContext = createContext<FirestoreContextProps>({
  user: null,
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  editExpense: () => {},
  addExpenseToFirestore: async () => {},
});

export const useFirestore = () => useContext(FirestoreContext);

// Add props type to accept children
interface FirestoreProviderProps {
  children: ReactNode;
}

const FirestoreProvider: React.FC<FirestoreProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchExpenses(user.uid);
      } else {
        setExpenses([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchExpenses = async (userId: string) => {
    const expensesCollection = collection(db, 'users', userId, 'expenses');
    const snapshot = await getDocs(expensesCollection);
    const expensesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Expense[];
    setExpenses(expensesList);
  };

  const addExpense = async (expense: Expense) => {
    if (!user) return;

    try {
      const expensesCollection = collection(db, 'users', user.uid, 'expenses');
      const docRef = await addDoc(expensesCollection, expense);
      setExpenses([...expenses, { ...expense, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (id: string) => {
    if (!user) return;

    try {
      const expenseDoc = doc(db, 'users', user.uid, 'expenses', id);
      await deleteDoc(expenseDoc);
      setExpenses(expenses.filter(exp => exp.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const editExpense = async (id: string, updatedExpense: Expense) => {
    if (!user) return;

    try {
      const expenseDoc = doc(db, 'users', user.uid, 'expenses', id);
      await updateDoc(expenseDoc, { ...updatedExpense });
      setExpenses(expenses.map(exp => (exp.id === id ? { id, ...updatedExpense } : exp)));
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const addExpenseToFirestore = async (expense: ExpenseFormData) => {
    if (!user) return;

    try {
      const expensesCollection = collection(db, 'users', user.uid, 'expenses');
      await addDoc(expensesCollection, expense);
      fetchExpenses(user.uid); // Refresh expenses after adding
    } catch (error) {
      console.error('Error adding expense to Firestore:', error);
    }
  };

  return (
    <FirestoreContext.Provider value={{ user, expenses, addExpense, deleteExpense, editExpense, addExpenseToFirestore }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
