// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateRoute: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    const decodedToken: { role: string } = jwtDecode(token); // 解码 JWT 令牌，获取角色信息
    const userRole = decodedToken.role;

    return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/login" />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
