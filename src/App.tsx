// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApplicationPage from './pages/ApplicationPage';
import ApplicationListPage from './pages/ApplicationListPage';
import MovieListPage from './pages/MovieListPage';
import AddMoviePage from './pages/AddMoviePage';
import UserProfilePage from './pages/UserProfilePage';
import PrivateRoute from './components/PrivateRoute'; // 用于角色权限管理的路由
import MovieDetailPage from './pages/MovieDetailPage'; // 导入电影详情页面
import EditMoviePage from './pages/EditMoviePage';
import ChatPage from './pages/ChatPage';
import AdminChatPage from './pages/AdminChatPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 登录和注册页面，任何用户都可以访问 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 普通用户页面 */}
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/movies" element={<MovieListPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />  {/* 电影详情页面，不受角色限制 */}

        {/* 员工管理页面，仅员工可访问 */}
        <Route
          path="/applications"
          element={<PrivateRoute allowedRoles={['employee']} />}
        >
          <Route path="/applications" element={<ApplicationListPage />} />
        </Route>

        <Route
          path="/add-movie"
          element={<PrivateRoute allowedRoles={['employee']} />}
        >
          <Route path="/add-movie" element={<AddMoviePage />} />
        </Route>

          {/* 用户聊天页面 */}
  <Route path="/chat" element={<PrivateRoute allowedRoles={['user', 'employee']} />}>
    <Route path="/chat" element={<ChatPage />} />
  </Route>

  {/* 管理员聊天页面 */}
  <Route path="/admin-chat" element={<PrivateRoute allowedRoles={['employee']} />}>
    <Route path="/admin-chat" element={<AdminChatPage />} />
  </Route>

        {/* 用户个人资料页面，任何登录用户都可以访问 */}
        <Route path="/profile" element={<PrivateRoute allowedRoles={['user', 'employee']} />}>
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>

        <Route
          path="/edit-movie/:id"
          element={<PrivateRoute allowedRoles={['employee']} />}
        >
          <Route path="/edit-movie/:id" element={<EditMoviePage />} />
        </Route>

        {/* 处理未匹配的路由，重定向到登录页面 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;