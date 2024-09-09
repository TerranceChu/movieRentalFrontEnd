// src/pages/MovieListPage.tsx
import React, { useEffect, useState } from 'react';
import { getMovies } from '../api/movieApi'; // 引入获取电影的API
import { useNavigate } from 'react-router-dom'; // 用于页面跳转

const MovieListPage = () => {
  const [movies, setMovies] = useState<any[]>([]); // 保存电影列表
  const [error, setError] = useState<string>(''); // 保存错误信息
  const navigate = useNavigate(); // 用于页面跳转

  useEffect(() => {
    // 获取电影列表的异步函数
    const fetchMovies = async () => {
      try {
        const response = await getMovies(); // 调用API获取电影数据
        setMovies(response.data); // 设置电影数据
      } catch (error) {
        setError('Failed to fetch movies');
        console.error('Failed to fetch movies', error);
      }
    };

    fetchMovies(); // 组件挂载时调用获取电影列表
  }, []);

  // 返回主页页面
  const handleBackClick = () => {
    navigate('/application'); // 导航到申请页面
  };

  // 登出并返回登录页面
  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // 清除登录令牌
    navigate('/login'); // 导航到登录页面
  };

  return (
    <div>
      <h1>Movie List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 显示错误信息 */}
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              <strong>{movie.title}</strong> ({movie.year}) - {movie.genre} - Rating: {movie.rating}/10 - Status: {movie.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found</p>
      )}

      {/* 返回主页按钮 */}
      <button onClick={handleBackClick}>Back to Application</button>

      {/* 登出按钮 */}
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default MovieListPage;
