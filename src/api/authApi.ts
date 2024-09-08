import axiosInstance from './axiosInstance'; // 引入 axiosInstance

const API_URL = '/auth';

// 用户注册 API 请求
export const register = async (username: string, password: string) => {
  return axiosInstance.post(`${API_URL}/register`, { username, password });
};

// 用户登录 API 请求
export const login = async (username: string, password: string) => {
  return axiosInstance.post(`${API_URL}/login`, { username, password });
};
