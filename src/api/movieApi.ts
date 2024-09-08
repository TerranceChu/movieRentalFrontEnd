import axiosInstance from './axiosInstance'; // 引入 axiosInstance

const API_URL = '/movies';

// 获取所有电影信息
export const getMovies = async () => {
  return axiosInstance.get(API_URL);
};

// 获取单个电影信息
export const getMovieById = async (id: string) => {
  return axiosInstance.get(`${API_URL}/${id}`);
};

// 添加新电影
export const addMovie = async (movieData: any) => {
  return axiosInstance.post(API_URL, movieData);
};

// 更新电影信息
export const updateMovie = async (id: string, movieData: any) => {
  return axiosInstance.put(`${API_URL}/${id}`, movieData);
};

// 删除电影
export const deleteMovie = async (id: string) => {
  return axiosInstance.delete(`${API_URL}/${id}`);
};

// 上传电影海报
export const uploadMoviePoster = async (id: string, formData: FormData) => {
  return axiosInstance.post(`${API_URL}/${id}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
