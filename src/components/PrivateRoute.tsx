// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
  const role = localStorage.getItem('role');

  // 检查用户是否已登录并且角色是否符合
  if (!role) {
    return <Navigate to="/login" />;  // 未登录时重定向到登录页面
  }

  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/login" />; // 如果角色符合，显示内容；否则重定向到登录页面
};

export default PrivateRoute;
