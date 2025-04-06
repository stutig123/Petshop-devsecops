import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = ({ children }) => {
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <h2 style={{ margin: 0 }}>🐾 Pet Shop</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={styles.greeting}>Welcome, {username}</span>
          <Link to="/pets" style={styles.link}>All Pets</Link>
          {role === 'manager' && <Link to="/add-pet" style={styles.link}>Add Pet</Link>}
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
};

const styles = {
  navbar: {
    background: '#0077cc',
    color: 'white',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 12px',
    fontWeight: '500',
  },
  logoutBtn: {
    background: '#ff4444',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  greeting: {
    marginRight: '15px',
    fontWeight: '500',
    color: '#e0f0ff',
  },
  main: {
    padding: '30px',
    backgroundColor: '#f9fbff',
    minHeight: 'calc(100vh - 60px)',
  },
};

export default Dashboard;
