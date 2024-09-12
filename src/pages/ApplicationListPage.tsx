import React, { useState, useEffect } from 'react';
import { getApplications, updateApplicationStatus } from '../api/applicationApi';
import NavBar from '../components/NavBar';
import { Table, Select, Typography, Alert, Input } from 'antd';

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

const ApplicationListPage: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplications();
        setApplications(response.data);
        setFilteredApplications(response.data);
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

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterApplications(value, selectedStatus);
  };

  const handleFilterByStatus = (value: string | null) => {
    setSelectedStatus(value);
    filterApplications(searchTerm, value);
  };

  const filterApplications = (searchTerm: string, status: string | null) => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.applicantEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (status) {
      filtered = filtered.filter((app) => app.status === status);
    }

    setFilteredApplications(filtered);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'applicantName',
      key: 'applicantName',
    },
    {
      title: 'Email',
      dataIndex: 'applicantEmail',
      key: 'applicantEmail',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      key: 'status',
      render: (text: string, record: any) => (
        <Select
          value={record.status}
          onChange={(value) => handleStatusChange(record._id, value)}
          style={{ width: 120 }}
        >
          <Option value="new">New</Option>
          <Option value="pending">Pending</Option>
          <Option value="accepted">Accepted</Option>
          <Option value="rejected">Rejected</Option>
        </Select>
      ),
    },
  ];

  return (
    <div>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <Title level={2}>Application List</Title>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: '20px' }}
          />
        )}

        {/* Search Input */}
        <Search
          placeholder="Search by name or email"
          enterButton="Search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={handleSearch}
          style={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Status Filter */}
        <Select
          placeholder="Filter by status"
          style={{ width: 200, marginBottom: '20px', marginLeft: '20px' }}
          onChange={handleFilterByStatus}
          allowClear
        >
          <Option value="new">New</Option>
          <Option value="pending">Pending</Option>
          <Option value="accepted">Accepted</Option>
          <Option value="rejected">Rejected</Option>
        </Select>

        <Table
          dataSource={filteredApplications}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default ApplicationListPage;
