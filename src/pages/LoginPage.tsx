import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // 确保正确导入 jwt_decode
import { login } from '../api/authApi'; // 假设已实现 login API

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // 用于页面跳转

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 发起登录请求
      const response = await login(username, password);
      const token = response.data.token;

      // 将 token 存储到 localStorage
      localStorage.setItem('token', token);

      // 解码 JWT，获取角色
      const decodedToken: { role: string } = jwt_decode(token); // 确保jwt_decode导入正确
      const userRole = decodedToken.role;

      // 将角色信息存储到 localStorage
      localStorage.setItem('role', userRole);

      // 根据角色跳转到不同页面
      if (userRole === 'employee') {
        navigate('/applications'); // 跳转到员工管理页面
      } else {
        navigate('/movies'); // 跳转到普通用户页面
      }

      setMessage('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {message && <p>{message}</p>} {/* 显示登录消息 */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
