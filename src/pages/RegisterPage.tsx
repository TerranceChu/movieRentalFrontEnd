import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApi'; // 引入注册 API

const RegisterPage = () => {
  const [username, setUsername] = useState(''); // 用户名
  const [password, setPassword] = useState(''); // 密码
  const [confirmPassword, setConfirmPassword] = useState(''); // 确认密码
  const [message, setMessage] = useState(''); // 注册结果信息
  const [error, setError] = useState(''); // 错误信息
  const navigate = useNavigate(); // 用于页面导航

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 检查两次输入的密码是否一致
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(username, password); // 调用注册 API
      setMessage('Registration successful! You can now log in.');
      setError('');
      
      // 注册成功后2秒钟跳转到登录页面
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Registration failed. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {/* 错误信息显示 */}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {message && <div className="text-green-500 mb-2">{message}</div>}

        <form onSubmit={handleSubmit}>
          {/* 用户名输入框 */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter username"
            />
          </div>

          {/* 密码输入框 */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter password"
            />
          </div>

          {/* 确认密码输入框 */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Confirm password"
            />
          </div>

          {/* 注册按钮 */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
