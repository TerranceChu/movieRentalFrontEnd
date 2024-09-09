// src/pages/MovieListPage.tsx
import React, { useEffect, useState } from 'react';
import { getMovies } from '../api/movieApi'; // 引入获取电影的API
import NavBar from '../components/NavBar';

const MovieListPage = () => {
  const [movies, setMovies] = useState<any[]>([]); // 保存电影列表
  const [error, setError] = useState<string>(''); // 保存错误信息

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

  return (
    <div>
      {/* 导航栏 */}
      <NavBar />
      <h1>Movie List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 显示错误信息 */}
      {movies.length > 0 ? (
        <div style={styles.movieGrid}>
          {movies.map((movie) => (
            <div key={movie._id} style={styles.movieCard as React.CSSProperties}>
              <img
                src={movie.posterPath ? `http://localhost:3000/${movie.posterPath}` : '/default-poster.png'}
                alt={`${movie.title} Poster`}
                style={styles.moviePoster as React.CSSProperties}
              />
              <div style={styles.movieInfo as React.CSSProperties}>
                <strong>{movie.title}</strong> ({movie.year})<br />
                {movie.genre} - Rating: {movie.rating}/10 - Status: {movie.status}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

// 简单的样式定义
const styles = {
  movieGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    padding: '20px',
  } as React.CSSProperties,
  movieCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    textAlign: 'center' as 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  moviePoster: {
    width: '100%',
    height: '300px',
    objectFit: 'cover' as 'cover',
  },
  movieInfo: {
    padding: '10px',
  },
};

export default MovieListPage;
