import React, { useEffect, useState } from 'react';
import { getMovies } from '../api/movieApi'; // 引入API文件

const MovieListPage = () => {
  const [movies, setMovies] = useState<any[]>([]); // 保存电影列表
  const [error, setError] = useState<string>(''); // 用于处理错误信息

  useEffect(() => {
    // 获取电影列表的异步函数
    const fetchMovies = async () => {
      try {
        const response = await getMovies(); // 调用API获取电影数据
        setMovies(response.data); // 将返回的数据存入状态
      } catch (error) {
        setError('Failed to fetch movies');
        console.error('Failed to fetch movies', error);
      }
    };

    fetchMovies(); // 在组件挂载时调用获取数据函数
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 显示错误信息 */}
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.title}>
              <strong>{movie.title}</strong> ({movie.year}) - {movie.genre} - Rating: {movie.rating}/10 - Status: {movie.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default MovieListPage;
