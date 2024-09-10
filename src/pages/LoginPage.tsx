import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { login } from '../api/authApi';
import { Form, Input, Button, Alert, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); // 用于标识是否显示错误消息
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await login(username, password);
      const token = response.data.token;

      localStorage.setItem('token', token);

      const decodedToken: { role: string } = jwt_decode(token);
      const userRole = decodedToken.role;

      localStorage.setItem('role', userRole);

      if (userRole === 'employee') {
        navigate('/applications');
      } else {
        navigate('/movies');
      }

      setMessage('Login successful');
      setIsError(false);
    } catch (error) {
      setMessage('Login failed. Please check your credentials and try again.');
      setIsError(true);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
      
      {message && (
        <Alert
          message={message}
          type={isError ? 'error' : 'success'}
          showIcon
          style={{ marginBottom: '20px' }}
        />
      )}

      <Form
        name="login"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center' }}>
        <Text>Don't have an account? </Text>
        <Button type="link" onClick={handleRegisterClick}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
