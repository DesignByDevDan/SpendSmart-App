// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EntryScreen from './components/EntryScreen';
import AddExpenseScreen from './components/AddExpenseScreen';
import ExpenseListScreen from './components/ExpenseListScreen';
import DashboardScreen from './components/DashboardScreen';
import SignUpScreen from './components/SignUpScreen';
import LoginScreen from './components/LoginScreen';
import Navbar from './components/Navbar';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<EntryScreen />} />
          <Route path="/sign-up" element={<SignUpScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-expense"
            element={
              <PrivateRoute>
                <AddExpenseScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/expense-list"
            element={
              <PrivateRoute>
                <ExpenseListScreen />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
