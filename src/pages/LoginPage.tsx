import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi'; // 引入登录 API

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
      
      // 获取响应中的 token
      const token = response.data.token;
      
      // 将 token 存储到 localStorage 中
      localStorage.setItem('token', token);
      
      // 设置成功消息
      setMessage('Login successful');
      
      // 跳转到申请页面
      navigate('/application');
    } catch (error) {
      // 捕获错误并设置失败消息
      console.error('Login error:', error);
      setMessage('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
      {message && <p>{message}</p>} {/* 显示消息 */}
    </div>
  );
};

export default LoginPage;
