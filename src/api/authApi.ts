import axiosInstance from './axiosInstance';

const API_URL = '/auth';

// 用户注册
export const register = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// 用户登录
export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data; // 返回数据包含 JWT 令牌
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
