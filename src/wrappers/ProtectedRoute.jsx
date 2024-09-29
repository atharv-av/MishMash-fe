/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../utils/cookieHandler";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = getCookie("token");

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
