// src/components/SignUpScreen.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Import Firestore
import { setDoc, doc } from 'firebase/firestore'; // Import Firestore methods

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a Firestore document for the new user
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: 'John Doe' // You can change this to dynamically take a value if needed
      });

      // Redirect to the dashboard after successful sign-up
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="p-6 h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h1>
      <form onSubmit={handleSignUp} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-6">
        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-1">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-1">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-md"
          />
        </label>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpScreen;
