import React, { useState } from 'react';
import { addMovie, uploadMoviePoster } from '../api/movieApi'; // 引入API文件
import { Select, AutoComplete, Input, Button, Upload, message as antdMessage } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import NavBar from '../components/NavBar';
import type { UploadFile } from 'antd/es/upload/interface';

const AddMoviePage = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [status, setStatus] = useState('available');
  const [description, setDescription] = useState(''); // 新增描述字段
  const [message, setMessage] = useState('');
  const [posterFile, setPosterFile] = useState<UploadFile | null>(null);

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
    { value: 'Western' },
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
        description, // 包括描述
      };

      // 添加电影数据
      const response = await addMovie(movieData);
      const movieId = response.data.insertedId;

      // 上传 Poster
      if (posterFile && movieId) {
        const formData = new FormData();
        formData.append('poster', posterFile as any);
        await uploadMoviePoster(movieId, formData);
        antdMessage.success('Movie and poster added successfully!');
      }

      setMessage('Movie added successfully!');

      // 清空表单
      setTitle('');
      setYear('');
      setGenre('');
      setRating('');
      setStatus('available');
      setDescription(''); // 清空描述
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
          <AutoComplete
            options={genreOptions}
            style={{ width: 200 }}
            onSelect={(value) => setGenre(value)}
            placeholder="Select genre"
            value={genre}
            filterOption={(inputValue, option) =>
              option!.value.toLowerCase().includes(inputValue.toLowerCase())
            }
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
          <Select value={status} onChange={(value) => setStatus(value)} style={{ width: 200 }}>
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="offline">Offline</Select.Option>
          </Select>
        </div>
        <div>
          <label>Description:</label> {/* 新增描述输入框 */}
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Poster:</label>
          <Upload
            beforeUpload={() => false} // 防止自动上传
            onChange={handlePosterChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select Poster</Button>
          </Upload>
        </div>
        <Button type="primary" htmlType="submit">
          Add Movie
        </Button>
      </form>
    </div>
  );
};

export default AddMoviePage;
