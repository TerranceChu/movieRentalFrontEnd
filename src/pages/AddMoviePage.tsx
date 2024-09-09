// src/pages/AddMoviePage.tsx
import React, { useState } from 'react';
import { addMovie } from '../api/movieApi';
import NavBar from '../components/NavBar';
const AddMoviePage = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [status, setStatus] = useState('available');
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
      await addMovie(movieData);
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
        <button type="submit">Add Movie</button>
      </form>

    </div>
  );
};

export default AddMoviePage;
