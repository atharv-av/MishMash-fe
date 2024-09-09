import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../utils/cookieHandler';

const PublicRoute = ({ children }) => {
  const token = getCookie('token');

  if (token) {
    return <Navigate to="/feed" replace />;
  }

  return children;
};

export default PublicRoute;