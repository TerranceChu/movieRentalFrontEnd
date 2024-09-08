import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApplicationPage from './pages/ApplicationPage';
import ApplicationListPage from './pages/ApplicationListPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/applications" element={<ApplicationListPage />} />
        <Route path="*" element={<Navigate to="/login" />} />  {/* 处理无效路由的重定向 */}
      </Routes>
    </Router>
  );
};

export default App;
