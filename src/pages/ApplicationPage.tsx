import React, { useState, useEffect } from 'react';
import { createApplication, getUserApplications } from '../api/applicationApi';
import { Form, Input, Button, Alert, Typography, List, Spin } from 'antd';
import NavBar from '../components/NavBar';

const { Title } = Typography;

const ApplicationPage: React.FC = () => {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取当前用户的所有申请
  const fetchApplications = async () => {
    try {
      const response = await getUserApplications();
      setApplications(response.data);
    } catch (error) {
      console.error('Failed to fetch applications', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(); // 页面加载时获取数据
  }, []);

  // 处理表单提交的函数
  const handleSubmit = async () => {
    if (!applicantName || !applicantEmail || !description) {
      setMessage('All fields are required.');
      return;
    }

    try {
      await createApplication({ applicantName, applicantEmail, description });
      setMessage('Application submitted successfully.');
      setIsError(false);

      // 清空表单
      setApplicantName('');
      setApplicantEmail('');
      setDescription('');

      // 重新获取申请列表并刷新页面
      setLoading(true); // 设置加载状态
      await fetchApplications(); // 获取最新的申请数据
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

        {/* 已发出的申请状态列表 */}
        <div style={{ marginTop: '30px' }}>
          <Title level={4}>Your Submitted Applications</Title>
          {loading ? (
            <Spin />
          ) : (
            <List
              dataSource={applications}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.applicantName}
                    description={
                      <>
                        <p><strong>Email:</strong> {item.applicantEmail}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                        <p><strong>Status:</strong> {item.status}</p>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
