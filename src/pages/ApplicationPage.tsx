import React, { useState } from 'react';
import { createApplication, uploadApplicationImage } from '../api/applicationApi'; // 引入API文件

const ApplicationPage: React.FC = () => {
  // 定义状态
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null); // 用于存储上传的文件
  const [message, setMessage] = useState('');

  // 处理文件选择事件
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 首先创建申请
      const response = await createApplication({
        applicantName,
        applicantEmail,
        description,
      });
      const applicationId = response.data._id;

      // 如果选择了文件，上传文件
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        await uploadApplicationImage(applicationId, formData);
      }

      // 提示成功消息
      setMessage('Application submitted successfully with image.');
      // 清空表单
      setApplicantName('');
      setApplicantEmail('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Application error:', error);
      setMessage('Failed to submit application. Please try again.');
    }
  };

  return (
    <div>
      <h1>Submit Application</h1>
      {/* 表单 */}
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
        <div>
          <label>Upload File (Optional):</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit Application</button>
      </form>
      {/* 显示消息 */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplicationPage;
