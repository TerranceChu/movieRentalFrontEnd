import axiosInstance from './axiosInstance'; // 引入 axiosInstance

const API_URL = '/users';

// 获取当前用户信息
export const getUser = async () => {
  return axiosInstance.get(`${API_URL}/me`);
};

// 更新用户信息
export const updateUser = async (userData: any) => {
  return axiosInstance.put(`${API_URL}/me`, userData);
};

// 删除用户账户
export const deleteUser = async () => {
  return axiosInstance.delete(`${API_URL}/me`);
};
