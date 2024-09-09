import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApi'; // 引入注册 API

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 发起注册请求
      await register(username, password);
      
      // 设置成功消息
      setMessage('Registration successful. You can now log in.');
    } catch (error) {
      // 捕获错误并设置失败消息
      console.error('Registration error:', error);
      setMessage('Registration failed. Please try again.');
    }
  };

    // 导航到登录页面
    const handleLoginClick = () => {
        navigate('/login');
    };

  return (
    <div>
      <h1>Register</h1>
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
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>} {/* 显示消息 */}
    
    {/* 返回登录按钮 */}
    <div>
       <p>Already have an account? <button onClick={handleLoginClick}>Login</button></p>
     </div>
    
    </div>
  );
};

export default RegisterPage;
