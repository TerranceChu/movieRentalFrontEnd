// src/pages/MovieDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../api/movieApi'; // 引入获取单个电影的API
import NavBar from '../components/NavBar';

const MovieDetailPage = () => {
  const { id } = useParams(); // 获取URL中的电影ID
  const [movie, setMovie] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id!); // 使用电影ID获取详情
        setMovie(response.data);
      } catch (error) {
        setError('Failed to fetch movie details');
        console.error('Failed to fetch movie details', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <h1>{movie.title}</h1>
      <img
        src={movie.posterPath ? `http://localhost:3000/${movie.posterPath}` : '/default-poster.png'}
        alt={`${movie.title} Poster`}
        style={{ width: '300px', height: '450px', objectFit: 'cover' }}
      />
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Status:</strong> {movie.status}</p>
      <p><strong>Description:</strong> {movie.description}</p>
    </div>
  );
};

export default MovieDetailPage;
