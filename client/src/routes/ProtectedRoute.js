import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ element }) => {
  const [cookies] = useCookies(['access_token']);

  if (!cookies.access_token) {
    // If not authenticated, redirect to login
    return <Navigate to="/adminlogin" replace />;
  }
  // If authenticated, render the protected component /admin
  return element;
};

export default ProtectedRoute;