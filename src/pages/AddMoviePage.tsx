import React, { useState } from 'react';
import { addMovie, uploadMoviePoster } from '../api/movieApi'; 
import { Select, Input, Button, Upload, message as antdMessage } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import NavBar from '../components/NavBar';
import type { UploadFile } from 'antd/es/upload/interface';

const AddMoviePage = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState(''); // 用于选择电影分类
  const [rating, setRating] = useState('');
  const [status, setStatus] = useState('available');
  const [description, setDescription] = useState('');
  const [posterFile, setPosterFile] = useState<UploadFile | null>(null);
  const [message, setMessage] = useState('');

  // 电影分类的选项
  const genreOptions = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 
    'Sci-Fi', 'Thriller', 'Documentary', 'Romance', 'Animation', 
    'Biography', 'Crime', 'Family', 'Historical', 'Musical', 'War', 'Western'
  ];

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const movieData = {
        title,
        year: parseInt(year),
        genre,
        rating: parseFloat(rating),
        status,
        description,
      };

      const response = await addMovie(movieData);
      const movieId = response.data.insertedId;

      // 上传电影海报
      if (posterFile && movieId) {
        const formData = new FormData();
        formData.append('poster', posterFile as any);
        await uploadMoviePoster(movieId, formData);
        antdMessage.success('Movie and poster added successfully!');
      }

      // 重置表单
      setTitle('');
      setYear('');
      setGenre('');
      setRating('');
      setStatus('available');
      setDescription('');
      setPosterFile(null);
    } catch (error) {
      setMessage('Failed to add movie. Please try again.');
      console.error('Failed to add movie', error);
    }
  };

  // 处理文件选择
  const handlePosterChange = (info: { file: UploadFile }) => {
    setPosterFile(info.file);
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
          <Select
            value={genre}
            onChange={setGenre}
            placeholder="Select a genre"
            style={{ width: 200 }}
            options={genreOptions.map((g) => ({ value: g }))}
            allowClear
          />
        </div>
        <div>
          <label>Rating (0.0 - 10.0):</label>
          <Input
            type="number"
            step="0.1"
            min={0}
            max={10}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <Select
            value={status}
            onChange={setStatus}
            style={{ width: 200 }}
          >
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="offline">Offline</Select.Option>
          </Select>
        </div>
        <div>
          <label>Description:</label>
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Poster:</label>
          <Upload
            beforeUpload={() => false}
            onChange={handlePosterChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select Poster</Button>
          </Upload>
        </div>
        <Button type="primary" htmlType="submit">Add Movie</Button>
      </form>
    </div>
  );
};

export default AddMoviePage;
