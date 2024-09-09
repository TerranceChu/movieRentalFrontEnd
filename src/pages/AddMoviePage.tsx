import React, { useState } from 'react';
import { addMovie } from '../api/movieApi';
import { Select, AutoComplete, Input, Button } from 'antd';  // 引入 Ant Design 的组件
import NavBar from '../components/NavBar';

const { Option, OptGroup } = Select;

const AddMoviePage = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [status, setStatus] = useState('available');
  const [message, setMessage] = useState('');

  // Genre Options
  const genreOptions = [
    { value: 'Action' },
    { value: 'Adventure' },
    { value: 'Comedy' },
    { value: 'Drama' },
    { value: 'Fantasy' },
    { value: 'Horror' },
    { value: 'Sci-Fi' },
    { value: 'Thriller' },
    { value: 'Documentary' },
    { value: 'Romance' },
    { value: 'Animation' },
    { value: 'Biography' },
    { value: 'Crime' },
    { value: 'Family' },
    { value: 'Historical' },
    { value: 'Musical' },
    { value: 'War' },
    { value: 'Western' }
  ];

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
      <NavBar />
      <h1>Add Movie</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <Input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          {/* 下拉式清单与搜索 */}
          <AutoComplete
            options={genreOptions}
            style={{ width: 200 }}
            onSelect={(value) => setGenre(value)}
            placeholder="Select genre"
            filterOption={(inputValue, option) =>
              option!.value.toLowerCase().includes(inputValue.toLowerCase())
            }
          />
        </div>
        <div>
          <label>Rating:</label>
          <Input
            type="number"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <Select value={status} onChange={(value) => setStatus(value)} style={{ width: 200 }}>
            <Option value="available">Available</Option>
            <Option value="pending">Pending</Option>
            <Option value="offline">Offline</Option>
          </Select>
        </div>
        <Button type="primary" htmlType="submit">
          Add Movie
        </Button>
      </form>
    </div>
  );
};

export default AddMoviePage;
