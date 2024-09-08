import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi'; // 引入登录 API
import jwt_decode from 'jwt-decode';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // 用于页面跳转

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login(username, password);
      const token = response.data.token;
  
      // 将 token 存储到 localStorage
      localStorage.setItem('token', token);
  
      // 解码 JWT，获取角色
      const decodedToken: { role: string } = jwt_decode(token);
      const userRole = decodedToken.role;
  
      // 将角色信息存储到 localStorage
      localStorage.setItem('role', userRole);
      
      // 根据角色跳转到不同页面
      if (userRole === 'employee') {
        // 跳转到员工管理页面
      } else {
        // 跳转到普通用户页面
      }
    } catch (error) {
      console.error('Login error:', error);
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
