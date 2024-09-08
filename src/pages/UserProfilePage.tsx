import React, { useEffect, useState } from 'react';
import { getUser } from '../api/userApi';
import { User } from '../types/types'; // 引入类型定义

const UserProfilePage = () => {
  const [user, setUser] = useState<User | null>(null); // 指定类型为 User 或 null

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
