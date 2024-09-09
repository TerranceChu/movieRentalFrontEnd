// src/components/NavBar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // 获取用户角色

  // 导航函数
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // 登出处理
  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // 清除登录令牌
    localStorage.removeItem('role');  // 清除角色信息
    navigate('/login');
  };

  return (
    <div style={styles.navbar}>
      {/* 普通用户和员工共用的菜单项 */}
      <button style={styles.button} onClick={() => handleNavigation('/application')}>
        Application
      </button>
      <button style={styles.button} onClick={() => handleNavigation('/movies')}>
        Movie List
      </button>
      <button style={styles.button} onClick={() => handleNavigation('/profile')}>
        Profile
      </button>

      {role === 'employee' && (
        <>
          {/* 仅员工可见的额外选项 */}
          <button style={styles.button} onClick={() => handleNavigation('/applications')}>
            Application List
          </button>
          <button style={styles.button} onClick={() => handleNavigation('/add-movie')}>
            Add Movie
          </button>
        </>
      )}

      {/* 登出按钮 */}
      <button style={{ ...styles.button, marginLeft: 'auto' }} onClick={handleLogoutClick}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    padding: '10px',
    backgroundColor: '#333',
    color: 'white',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    margin: '0 5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default NavBar;
