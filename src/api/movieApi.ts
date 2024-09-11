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
export const addMovie = async (movieData: any, posterFile?: File) => {
  // 如果有电影海报上传，先上传电影海报，再添加电影
  if (posterFile) {
    const formData = new FormData();
    formData.append('poster', posterFile);

    // 上传电影海报
    const posterResponse = await uploadMoviePoster(movieData._id, formData);
    movieData.posterPath = posterResponse.data.path; // 设定海报路径
  }

  return axiosInstance.post(API_URL, movieData);
};

// 更新电影信息
export const updateMovie = async (id: string, movieData: any, posterFile?: File) => {
  // 如果有新的电影海报上传，先上传海报再更新电影信息
  if (posterFile) {
    const formData = new FormData();
    formData.append('poster', posterFile);

    // 上传新海报
    const posterResponse = await uploadMoviePoster(id, formData);
    movieData.posterPath = posterResponse.data.path; // 更新海报路径
  }

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
