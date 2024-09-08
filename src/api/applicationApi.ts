import axiosInstance from './axiosInstance'; // 引入 axiosInstance

const API_URL = '/applications';

// 获取所有申请
export const getApplications = async () => {
  return axiosInstance.get(API_URL);
};

// 获取单个申请
export const getApplicationById = async (id: string) => {
  return axiosInstance.get(`${API_URL}/${id}`);
};

// 创建新申请
export const createApplication = async (applicationData: any) => {
  return axiosInstance.post(API_URL, applicationData);
};

// 更新申请状态
export const updateApplicationStatus = async (id: string, status: string) => {
  return axiosInstance.put(`${API_URL}/${id}/status`, { status });
};

// 上传申请相关的图片
export const uploadApplicationImage = async (id: string, formData: FormData) => {
  return axiosInstance.post(`${API_URL}/${id}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
