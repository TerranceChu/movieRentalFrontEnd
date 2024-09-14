import axiosInstance from './axiosInstance'; 

const API_URL = '/chats';

// 发起新的聊天请求
export const startChat = async (message: string) => {
  return axiosInstance.post(`${API_URL}/start`, { message });
};

// 获取所有待处理的聊天（管理员使用）
export const getPendingChats = async () => {
  return axiosInstance.get(`${API_URL}/pending`);
};

// 接受聊天（管理员承接）
export const acceptChat = async (chatId: string) => {
  return axiosInstance.post(`${API_URL}/${chatId}/accept`);
};

// 发送消息
export const sendMessage = async (chatId: string, message: string) => {
  return axiosInstance.post(`${API_URL}/${chatId}/message`, { message });
};

// 获取特定聊天的详细信息（包括所有消息）
export const getChatById = async (chatId: string) => {
  return axiosInstance.get(`${API_URL}/${chatId}`);
};
