import React, { useEffect, useState, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../api/movieApi';
import NavBar from '../components/NavBar';

const MovieListPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (error) {
        setError('Failed to fetch movies');
        console.error('Failed to fetch movies', error);
      }
    };

    fetchMovies();
  }, []);

  // 样式定义
  const styles: { [key: string]: CSSProperties } = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    movieGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '15px',
      justifyContent: 'center',
    },
    movieCard: {
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      overflow: 'hidden',
      textAlign: 'center',
      transition: 'transform 0.3s ease-in-out',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    moviePoster: {
      width: '100%',
      height: '350px',
      objectFit: 'cover',
    },
    movieInfo: {
      padding: '10px',
      fontSize: '14px',
      color: '#333',
    },
    detailButton: {
      display: 'inline-block',
      margin: '10px 0',
      padding: '8px 15px',
      backgroundColor: '#FF6347',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      textDecoration: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    movieTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    movieSubInfo: {
      fontSize: '13px',
      color: '#777',
    },
  };

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <h1>Movie List</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {movies.length > 0 ? (
          <div style={styles.movieGrid}>
            {movies.map((movie) => (
              <div key={movie._id} style={styles.movieCard}>
                <img
                  src={movie.posterPath ? `http://localhost:3000/${movie.posterPath}` : '/default-poster.png'}
                  alt={`${movie.title} Poster`}
                  style={styles.moviePoster}
                />
                <div style={styles.movieInfo}>
                  <div style={styles.movieTitle}>{movie.title}</div>
                  <div style={styles.movieSubInfo}>
                    {movie.year} • {movie.genre} • {movie.rating}/10
                  </div>
                  <Link to={`/movies/${movie._id}`}>
                    <button style={styles.detailButton}>電影詳情 Movie Detail</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default MovieListPage;
