// src/pages/EditMoviePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, updateMovie } from '../api/movieApi';
import NavBar from '../components/NavBar';

const EditMoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState<any>({
    title: '',
    year: '',
    genre: '',
    rating: '',
    status: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id!);
        setMovieData(response.data);
      } catch (error) {
        console.error('Failed to fetch movie', error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 移除 _id 字段，避免发送到后端
    const { _id, ...updateData } = movieData;

    try {
      await updateMovie(id!, updateData); // 发送更新请求，不包括 _id
      setMessage('Movie updated successfully!');
      navigate('/movies'); // 更新成功后导航回电影列表
    } catch (error) {
      setMessage('Failed to update movie. Please try again.');
      console.error('Failed to update movie', error);
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Edit Movie</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={movieData.title}
            onChange={(e) => setMovieData({ ...movieData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            value={movieData.year}
            onChange={(e) => setMovieData({ ...movieData, year: parseInt(e.target.value) })}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={movieData.genre}
            onChange={(e) => setMovieData({ ...movieData, genre: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            step="0.1"
            value={movieData.rating}
            onChange={(e) => setMovieData({ ...movieData, rating: parseFloat(e.target.value) })}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={movieData.status}
            onChange={(e) => setMovieData({ ...movieData, status: e.target.value })}
            required
          >
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={movieData.description}
            onChange={(e) => setMovieData({ ...movieData, description: e.target.value })}
            required
          />
        </div>
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default EditMoviePage;
