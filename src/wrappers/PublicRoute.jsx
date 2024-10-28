/* eslint-disable react/prop-types */

import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookieHandler';

const PublicRoute = ({ children }) => {
  const token = getCookie('token');

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;