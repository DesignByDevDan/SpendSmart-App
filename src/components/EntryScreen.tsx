// src/components/EntryScreen.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/spendsmart-logo.png';

const EntryScreen: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <img src={logo} alt="SpendSmart Logo" className="w-32 md:w-40 mb-6" />
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800">SpendSmart</h1>
      <p className="text-gray-600 mb-8 text-center text-lg md:text-xl">
        Managing your money has never been this easier.
      </p>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Login
          </button>
        </Link>
        <Link to="/sign-up">
          <button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EntryScreen;
