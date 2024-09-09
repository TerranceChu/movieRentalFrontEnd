// src/pages/ApplicationListPage.tsx
import React, { useState, useEffect } from 'react';
import { getApplications, updateApplicationStatus } from '../api/applicationApi';
import NavBar from '../components/NavBar';

const ApplicationListPage: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplications();
        setApplications(response.data);
      } catch (error) {
        setError('Failed to fetch applications');
        console.error('Failed to fetch applications:', error);
      }
    };

    fetchApplications();
  }, []);


  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateApplicationStatus(id, newStatus);
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      setError('Failed to update application status');
      console.error('Failed to update application status:', error);
    }
  };

  return (
    <div>
      {/* 导航栏 */}
      <NavBar />
      <h1>Application List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {applications.map((app) => (
          <li key={app._id}>
            <p>Name: {app.applicantName}</p>
            <p>Email: {app.applicantEmail}</p>
            <p>Description: {app.description}</p>
            <p>Status: {app.status}</p>
            <select
              value={app.status}
              onChange={(e) => handleStatusChange(app._id, e.target.value)}
            >
              <option value="new">New</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationListPage;
