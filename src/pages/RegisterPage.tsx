import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';
import { Form, Input, Button, Alert, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 新增确认密码
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); // 用于标识是否显示错误消息
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsError(true);
      return;
    }

    try {
      await register(username, password);
      setMessage('Registration successful. You can now log in.');
      setIsError(false);
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      setIsError(true);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '100px auto',
        padding: '20px',
        border: '1px solid #f0f0f0',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Title level={2} style={{ textAlign: 'center' }}>
        Register
      </Title>

      {message && (
        <Alert
          message={message}
          type={isError ? 'error' : 'success'}
          showIcon
          style={{ marginBottom: '20px' }}
        />
      )}

      <Form name="register" onFinish={handleSubmit} layout="vertical">
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

        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center' }}>
        <Text>Already have an account? </Text>
        <Button type="link" onClick={handleLoginClick}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
