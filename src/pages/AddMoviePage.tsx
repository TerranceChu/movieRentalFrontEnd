// src/pages/AddMoviePage.tsx
import React, { useState } from 'react';
import { addMovie, uploadMoviePoster } from '../api/movieApi'; // 新增 uploadMoviePoster API 调用
import NavBar from '../components/NavBar';

const AddMoviePage = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [status, setStatus] = useState('available');
  const [poster, setPoster] = useState<File | null>(null); // 用于存储选择的图片
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const movieData = {
        title,
        year: parseInt(year),
        genre,
        rating: parseFloat(rating),
        status,
      };

      // 添加电影到数据库
      const movieResponse = await addMovie(movieData);
      const movieId = movieResponse.data.insertedId;

      // 上传海报图片
      if (poster && movieId) {
        const formData = new FormData();
        formData.append('poster', poster);

        await uploadMoviePoster(movieId, formData); // 上传图片
      }

      setMessage('Movie added successfully!');
    } catch (error) {
      setMessage('Failed to add movie. Please try again.');
      console.error('Failed to add movie', error);
    }
  };

  return (
    <div>
      {/* 导航栏 */}
      <NavBar />
      <h1>Add Movie</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        <div>
          <label>Poster:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPoster(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMoviePage;
