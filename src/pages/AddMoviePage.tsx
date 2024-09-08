import React, { useState } from 'react';
import { addMovie } from '../api/movieApi'; // 引入API文件

const AddMoviePage = () => {
  const [title, setTitle] = useState(''); // 电影标题
  const [year, setYear] = useState(''); // 电影年份
  const [genre, setGenre] = useState(''); // 电影类型
  const [rating, setRating] = useState(''); // 电影评分
  const [status, setStatus] = useState('available'); // 电影状态
  const [message, setMessage] = useState(''); // 用于显示成功或失败的消息

  // 提交表单的处理函数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 创建电影数据对象
      const movieData = {
        title,
        year: parseInt(year), // 将年份从字符串转换为整数
        genre,
        rating: parseFloat(rating), // 将评分从字符串转换为浮点数
        status,
      };

      // 调用API添加电影
      await addMovie(movieData);
      setMessage('Movie added successfully!');
    } catch (error) {
      setMessage('Failed to add movie. Please try again.');
      console.error('Failed to add movie', error);
    }
  };

  return (
    <div>
      <h1>Add Movie</h1>
      {message && <p>{message}</p>} {/* 显示成功或失败的消息 */}
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
