import axios from 'axios';

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // 设置后端 API 基础 URL
});

// 请求拦截器，自动为每个请求添加 Authorization 头
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 从本地存储中获取 JWT 令牌
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 添加 JWT 令牌到请求头
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
