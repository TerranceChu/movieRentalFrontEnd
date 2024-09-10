import React, { useState } from 'react';
import { createApplication } from '../api/applicationApi';
import { Form, Input, Button, Alert, Typography } from 'antd';
import NavBar from '../components/NavBar';

const { Title } = Typography;

const ApplicationPage: React.FC = () => {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); // 标识是否有错误

  // 处理表单提交的函数
  const handleSubmit = async () => {
    try {
      await createApplication({ applicantName, applicantEmail, description });
      setMessage('Application submitted successfully.');
      setIsError(false);
      // 清空表单
      setApplicantName('');
      setApplicantEmail('');
      setDescription('');
    } catch (error) {
      console.error('Application error:', error);
      setMessage('Failed to submit application. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Submit Your Application</Title>
        
        {/* 显示成功或失败消息 */}
        {message && (
          <Alert
            message={message}
            type={isError ? 'error' : 'success'}
            showIcon
            style={{ marginBottom: '20px' }}
          />
        )}
        
        <Form
          name="application"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="applicantName"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              placeholder="Enter your name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="applicantEmail"
            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
          >
            <Input
              value={applicantEmail}
              onChange={(e) => setApplicantEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input a description!' }]}
          >
            <Input.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Enter application details"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ApplicationPage;
