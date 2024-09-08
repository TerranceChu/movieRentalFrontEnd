import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi'; // 引入登录 API

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState(''); // 用户名状态
  const [password, setPassword] = useState(''); // 密码状态
  const [errorMessage, setErrorMessage] = useState(''); // 错误消息状态
  const [loading, setLoading] = useState(false); // 是否正在加载
  const navigate = useNavigate(); // 路由导航

  // 表单提交处理函数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 设置加载状态

    try {
      // 发起登录请求
      const response = await login(username, password);
      const token = response.data.token;

      // 将 JWT 令牌存储到本地存储中
      localStorage.setItem('token', token);

      // 登录成功后重定向到申请页面
      navigate('/application');
    } catch (error) {
      // 处理错误
      setErrorMessage('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false); // 停止加载状态
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading} // 登录期间禁用输入
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading} // 登录期间禁用输入
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
