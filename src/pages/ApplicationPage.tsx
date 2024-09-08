import React, { useState } from 'react';
import { createApplication } from '../api/applicationApi';

const ApplicationPage: React.FC = () => {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  // 处理表单提交的函数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 发送创建申请的 API 请求
      await createApplication({ applicantName, applicantEmail, description });
      setMessage('Application submitted successfully.');
      setApplicantName(''); // 清空表单
      setApplicantEmail('');
      setDescription('');
    } catch (error) {
      console.error('Application error:', error);
      setMessage('Failed to submit application. Please try again.');
    }
  };

  return (
    <div>
      <h1>Submit Your Application</h1>
      {message && <p>{message}</p>} {/* 显示成功或失败消息 */}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationPage;
