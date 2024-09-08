import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
  const role = localStorage.getItem('role');

  return allowedRoles.includes(role || '') ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
