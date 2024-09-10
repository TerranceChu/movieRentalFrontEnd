import React, { useEffect, useState, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { getMovies, deleteMovie } from '../api/movieApi';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { Select, Input } from 'antd'; // 导入Ant Design的Select和Input组件

const MovieListPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]); // 保存选中的电影分类
  const [searchTitle, setSearchTitle] = useState<string>(''); // 保存搜索的电影名称
  const navigate = useNavigate();
  
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setMovies(response.data);
        setFilteredMovies(response.data); // 初始时显示所有电影
      } catch (error) {
        setError('Failed to fetch movies');
        console.error('Failed to fetch movies', error);
      }
    };

    fetchMovies();
  }, []);

  // 电影分类选项
  const genreOptions = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 
    'Sci-Fi', 'Thriller', 'Documentary', 'Romance', 'Animation', 
    'Biography', 'Crime', 'Family', 'Historical', 'Musical', 'War', 'Western'
  ];

  // 根据用户选择的分类和电影名称过滤电影列表
  const handleFilters = (genres: string[], title: string) => {
    let filtered = movies;

    // 按分类过滤
    if (genres.length > 0) {
      filtered = filtered.filter((movie) => genres.includes(movie.genre));
    }

    // 按名称过滤
    if (title) {
      filtered = filtered.filter((movie) => movie.title.toLowerCase().includes(title.toLowerCase()));
    }

    setFilteredMovies(filtered);
  };

  // 处理分类选择变化
  const handleGenreChange = (genres: string[]) => {
    setSelectedGenres(genres);
    handleFilters(genres, searchTitle);
  };

  // 处理搜索框输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setSearchTitle(title);
    handleFilters(selectedGenres, title);
  };

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
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    },
    detailButton: {
      display: 'inline-block',
      margin: '0',
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
    filters: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    searchInput: {
      width: '100%',
      marginBottom: '20px',
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this movie?');
  
    if (isConfirmed) {
      try {
        await deleteMovie(id);
        // 删除成功后从原始电影列表和过滤后的电影列表中移除已删除的电影
        const updatedMovies = movies.filter((movie) => movie._id !== id);
        setMovies(updatedMovies);
        setFilteredMovies(updatedMovies);
        alert('Movie deleted successfully!');
      } catch (error) {
        console.error('Failed to delete movie', error);
        alert('Failed to delete movie. Please try again.');
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <h1>Movie List</h1>

        <div style={styles.filters}>
          {/* 电影分类过滤器 */}
          <Select
            mode="multiple"
            allowClear
            style={{ width: '45%' }}
            placeholder="Select movie genres"
            onChange={handleGenreChange}
            options={genreOptions.map((genre) => ({ value: genre, label: genre }))}
          />

          {/* 电影名称搜索框 */}
          <Input
            placeholder="Search by movie title"
            value={searchTitle}
            onChange={handleSearchChange}
            style={{ width: '45%' }}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {filteredMovies.length > 0 ? (
          <div style={styles.movieGrid}>
            {filteredMovies.map((movie) => (
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
                  <div style={styles.buttonGroup}>
                    <Link to={`/movies/${movie._id}`}>
                      <button style={styles.detailButton}>電影詳情 Movie Detail</button>
                    </Link>

                    {/* 仅员工可见 Edit 和 Delete 按钮 */}
                    {role === 'employee' && (
                      <>
                        <button style={styles.detailButton} onClick={() => navigate(`/edit-movie/${movie._id}`)}>Edit</button>
                        <button
                          style={{ ...styles.detailButton, backgroundColor: 'red' }}
                          onClick={() => handleDelete(movie._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
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
