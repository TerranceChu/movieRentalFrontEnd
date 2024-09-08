import React, { useState, useEffect } from 'react';
import { getApplications } from '../api/applicationApi'; // 引入获取申请 API

const ApplicationListPage: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    // 获取申请列表
    const fetchApplications = async () => {
      try {
        const response = await getApplications();
        setApplications(response.data); // 设置申请列表
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h1>Application List</h1>
      <ul>
        {applications.map((app) => (
          <li key={app._id}>
            <p>Name: {app.applicantName}</p>
            <p>Email: {app.applicantEmail}</p>
            <p>Description: {app.description}</p>
            <p>Status: {app.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationListPage;
