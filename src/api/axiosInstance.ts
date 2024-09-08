import axios from 'axios';

// 创建 Axios 实例，配置基础 URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // 设置 API 基础 URL
  timeout: 10000, // 设置超时时间为 10 秒
});

// 请求拦截器，用于在请求头中添加 JWT 令牌
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 从本地存储中获取 JWT 令牌
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 添加 Authorization 头
    }
    return config;
  },
  (error) => {
    // 请求错误时处理
    return Promise.reject(error);
  }
);

// 响应拦截器，用于处理全局错误，如 401 未授权错误
axiosInstance.interceptors.response.use(
  (response) => {
    // 响应成功时返回数据
    return response;
  },
  (error) => {
    // 处理响应错误，比如未授权或超时等
    if (error.response && error.response.status === 401) {
      // 未授权错误，可以重定向到登录页面或其他处理
      console.error('Unauthorized access - maybe redirect to login?');
      // 例如：window.location.href = '/login';
    }
    return Promise.reject(error); // 返回错误信息
  }
);

export default axiosInstance;
