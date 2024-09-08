// src/pages/MovieListPage.tsx
import React, { useEffect, useState } from 'react';
import { getMovies } from '../api/movieApi';

const MovieListPage = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <strong>{movie.title}</strong> ({movie.year}) - {movie.genre} - Rating: {movie.rating}/10 - Status: {movie.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieListPage;
