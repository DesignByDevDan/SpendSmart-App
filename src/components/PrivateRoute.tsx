
// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  if (!auth) return <div>Error: Auth context is undefined</div>;
  const { currentUser } = auth;

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
