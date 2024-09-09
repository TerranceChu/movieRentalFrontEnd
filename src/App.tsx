import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApplicationPage from './pages/ApplicationPage';
import ApplicationListPage from './pages/ApplicationListPage';
import MovieListPage from './pages/MovieListPage';
import AddMoviePage from './pages/AddMoviePage';
import PrivateRoute from './components/PrivateRoute'; // 用于角色权限管理的路由

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 登录和注册页面，任何用户都可以访问 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 普通用户页面 */}
        <Route path="/application" element={<ApplicationPage />} />  {/* 提交申请 */}
        <Route path="/movies" element={<MovieListPage />} />          {/* 查看电影列表 */}

        {/* 员工管理页面，仅员工可访问 */}
        <Route
          path="/applications"
          element={<PrivateRoute allowedRoles={['employee']} />}
        >
          <Route path="/applications" element={<ApplicationListPage />} /> {/* 查看申请列表 */}
        </Route>

        <Route
          path="/add-movie"
          element={<PrivateRoute allowedRoles={['employee']} />}
        >
          <Route path="/add-movie" element={<AddMoviePage />} />      {/* 添加电影 */}
        </Route>

        {/* 处理未匹配的路由，重定向到登录页面 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
